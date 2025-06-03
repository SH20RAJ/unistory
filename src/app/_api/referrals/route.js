import { NextResponse } from 'next/server';
import { createDB } from '@/db';
import { referralCodes, referrals, users, userStats } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { generateReferralCode, validateReferralCode } from '@/lib/referral';
import { nanoid } from 'nanoid';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // This would typically use Cloudflare D1 in production
    // For now, we'll return mock data structure
    const db = createDB(request.env?.DB);

    // Get user's referral code
    const userReferralCode = await db.select()
      .from(referralCodes)
      .where(eq(referralCodes.userId, userId))
      .limit(1);

    // Get user's referrals
    const userReferrals = await db.select({
      id: referrals.id,
      refereeId: referrals.refereeId,
      status: referrals.status,
      createdAt: referrals.createdAt,
      completedAt: referrals.completedAt,
      refereeName: users.name,
      refereeAvatar: users.avatar,
    })
      .from(referrals)
      .leftJoin(users, eq(referrals.refereeId, users.id))
      .where(eq(referrals.referrerId, userId));

    // Get referral stats
    const stats = await db.select({
      referralsSent: userStats.referralsSent,
      successfulReferrals: userStats.successfulReferrals,
      referralPointsEarned: userStats.referralPointsEarned,
    })
      .from(userStats)
      .where(eq(userStats.userId, userId))
      .limit(1);

    return NextResponse.json({
      referralCode: userReferralCode[0] || null,
      referrals: userReferrals,
      stats: stats[0] || {
        referralsSent: 0,
        successfulReferrals: 0,
        referralPointsEarned: 0,
      }
    });

  } catch (error) {
    console.error('Error fetching referral data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId, action, ...data } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const db = createDB(request.env?.DB);

    switch (action) {
      case 'generate_code':
        // Check if user already has a referral code
        const existingCode = await db.select()
          .from(referralCodes)
          .where(eq(referralCodes.userId, userId))
          .limit(1);

        if (existingCode.length > 0) {
          return NextResponse.json({
            referralCode: existingCode[0]
          });
        }

        // Generate new referral code
        const newCode = generateReferralCode();
        const referralCodeData = {
          id: nanoid(),
          userId,
          code: newCode,
          type: 'standard',
          usageCount: 0,
          isActive: true,
          createdAt: new Date(),
        };

        await db.insert(referralCodes).values(referralCodeData);

        return NextResponse.json({
          referralCode: referralCodeData
        });

      case 'validate_code':
        const { code } = data;

        if (!validateReferralCode(code)) {
          return NextResponse.json({
            valid: false,
            error: 'Invalid code format'
          });
        }

        const codeData = await db.select({
          id: referralCodes.id,
          userId: referralCodes.userId,
          code: referralCodes.code,
          isActive: referralCodes.isActive,
          usageLimit: referralCodes.usageLimit,
          usageCount: referralCodes.usageCount,
          expiresAt: referralCodes.expiresAt,
        })
          .from(referralCodes)
          .where(and(
            eq(referralCodes.code, code),
            eq(referralCodes.isActive, true)
          ))
          .limit(1);

        if (codeData.length === 0) {
          return NextResponse.json({
            valid: false,
            error: 'Code not found or inactive'
          });
        }

        const referralCode = codeData[0];

        // Check if code is expired
        if (referralCode.expiresAt && new Date() > new Date(referralCode.expiresAt)) {
          return NextResponse.json({
            valid: false,
            error: 'Code has expired'
          });
        }

        // Check usage limit
        if (referralCode.usageLimit && referralCode.usageCount >= referralCode.usageLimit) {
          return NextResponse.json({
            valid: false,
            error: 'Code usage limit reached'
          });
        }

        // Check if user is trying to use their own code
        if (referralCode.userId === userId) {
          return NextResponse.json({
            valid: false,
            error: 'Cannot use your own referral code'
          });
        }

        return NextResponse.json({
          valid: true,
          referralCode
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error processing referral request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
