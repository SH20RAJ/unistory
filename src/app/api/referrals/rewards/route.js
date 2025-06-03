import { NextResponse } from 'next/server';
import { createDB } from '@/db';
import { referrals, referralRewards, referralCodes, users, userStats } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { calculateReferralRewards } from '@/lib/referral';
import { nanoid } from 'nanoid';

export async function POST(request) {
  try {
    const { referrerId, refereeId, referralCode } = await request.json();

    if (!referrerId || !refereeId || !referralCode) {
      return NextResponse.json({
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const db = createDB(request.env?.DB);

    // Create referral record
    const referralId = nanoid();
    const referralData = {
      id: referralId,
      referrerId,
      refereeId,
      referralCode,
      status: 'completed',
      completedAt: new Date(),
      createdAt: new Date(),
    };

    await db.insert(referrals).values(referralData);

    // Calculate rewards
    const rewards = calculateReferralRewards('standard');

    // Create reward for referrer
    const referrerRewardId = nanoid();
    const referrerReward = {
      id: referrerRewardId,
      referralId,
      userId: referrerId,
      type: 'points',
      value: rewards.referrer.points,
      description: rewards.referrer.description,
      status: 'claimed',
      claimedAt: new Date(),
      createdAt: new Date(),
    };

    await db.insert(referralRewards).values(referrerReward);

    // Create reward for referee
    const refereeRewardId = nanoid();
    const refereeReward = {
      id: refereeRewardId,
      referralId,
      userId: refereeId,
      type: 'points',
      value: rewards.referee.points,
      description: rewards.referee.description,
      status: 'claimed',
      claimedAt: new Date(),
      createdAt: new Date(),
    };

    await db.insert(referralRewards).values(refereeReward);

    // Update referral code usage count
    await db.update(referralCodes)
      .set({
        usageCount: db.select().from(referralCodes).where(eq(referralCodes.code, referralCode)).then(codes =>
          codes[0]?.usageCount + 1 || 1
        )
      })
      .where(eq(referralCodes.code, referralCode));

    // Update user stats for referrer
    await db.update(userStats)
      .set({
        referralsSent: db.select().from(userStats).where(eq(userStats.userId, referrerId)).then(stats =>
          stats[0]?.referralsSent + 1 || 1
        ),
        successfulReferrals: db.select().from(userStats).where(eq(userStats.userId, referrerId)).then(stats =>
          stats[0]?.successfulReferrals + 1 || 1
        ),
        referralPointsEarned: db.select().from(userStats).where(eq(userStats.userId, referrerId)).then(stats =>
          (stats[0]?.referralPointsEarned || 0) + rewards.referrer.points
        ),
      })
      .where(eq(userStats.userId, referrerId));

    // Update total points for both users
    await db.update(users)
      .set({
        totalPoints: db.select().from(users).where(eq(users.id, referrerId)).then(users =>
          (users[0]?.totalPoints || 0) + rewards.referrer.points
        ),
      })
      .where(eq(users.id, referrerId));

    await db.update(users)
      .set({
        totalPoints: db.select().from(users).where(eq(users.id, refereeId)).then(users =>
          (users[0]?.totalPoints || 0) + rewards.referee.points
        ),
      })
      .where(eq(users.id, refereeId));

    return NextResponse.json({
      success: true,
      referral: referralData,
      rewards: {
        referrer: referrerReward,
        referee: refereeReward,
      }
    });

  } catch (error) {
    console.error('Error processing referral rewards:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
