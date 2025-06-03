import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { action } = await request.json();

        if (action === 'seed_demo_data') {
            // Demo data seeding logic would go here
            // For now, return success response
            return NextResponse.json({
                success: true,
                message: 'Demo data seeded successfully'
            });
        }

        if (action === 'get_analytics') {
            // Return mock analytics data
            return NextResponse.json({
                success: true,
                data: {
                    totalUsers: 150,
                    totalReferrals: 45,
                    completedReferrals: 38,
                    totalRewards: 12,
                    totalPoints: 4500,
                    conversionRate: 84.4
                }
            ];

            // Insert demo users
            for (const user of demoUsers) {
                try {
                    await db.insert(users).values(user).onConflictDoNothing();
                } catch (error) {
                    console.log(`User ${user.id} might already exist`);
                }
            }

            // Create referral codes
            const referralCodesData = [
                {
                    id: 'ref1',
                    userId: 'user1',
                    code: 'ALEX2024',
                    isActive: true,
                    maxUses: 50,
                    currentUses: 3,
                    rewardPoints: 100,
                    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 'ref2',
                    userId: 'user2',
                    code: 'EMMA2024',
                    isActive: true,
                    maxUses: 25,
                    currentUses: 1,
                    rewardPoints: 100,
                    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];

            for (const refCode of referralCodesData) {
                try {
                    await db.insert(referralCodes).values(refCode).onConflictDoNothing();
                } catch (error) {
                    console.log(`Referral code ${refCode.id} might already exist`);
                }
            }

            // Create referral relationships
            const referralsData = [
                {
                    id: 'referral1',
                    referrerId: 'user1',
                    referredId: 'user2',
                    referralCodeId: 'ref1',
                    status: 'completed',
                    rewardEarned: 100,
                    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 'referral2',
                    referrerId: 'user1',
                    referredId: 'user3',
                    referralCodeId: 'ref1',
                    status: 'completed',
                    rewardEarned: 100,
                    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 'referral3',
                    referrerId: 'user1',
                    referredId: 'user4',
                    referralCodeId: 'ref1',
                    status: 'completed',
                    rewardEarned: 100,
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];

            for (const referral of referralsData) {
                try {
                    await db.insert(referrals).values(referral).onConflictDoNothing();
                } catch (error) {
                    console.log(`Referral ${referral.id} might already exist`);
                }
            }

            // Create referral rewards
            const rewardsData = [
                {
                    id: 'reward1',
                    userId: 'user1',
                    referralId: 'referral1',
                    type: 'signup_bonus',
                    points: 100,
                    status: 'earned',
                    description: 'Referral signup bonus for Emma Davis',
                    earnedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 'reward2',
                    userId: 'user1',
                    referralId: 'referral2',
                    type: 'signup_bonus',
                    points: 100,
                    status: 'earned',
                    description: 'Referral signup bonus for Michael Chen',
                    earnedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: 'reward3',
                    userId: 'user1',
                    referralId: 'referral3',
                    type: 'signup_bonus',
                    points: 100,
                    status: 'earned',
                    description: 'Referral signup bonus for Sarah Kim',
                    earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];

            for (const reward of rewardsData) {
                try {
                    await db.insert(referralRewards).values(reward).onConflictDoNothing();
                } catch (error) {
                    console.log(`Reward ${reward.id} might already exist`);
                }
            }

            return NextResponse.json({
                success: true,
                message: 'Demo data seeded successfully',
                data: {
                    users: demoUsers.length,
                    referralCodes: referralCodesData.length,
                    referrals: referralsData.length,
                    rewards: rewardsData.length
                }
            });
        }

        if (action === 'get_stats') {
            // Get referral stats for analytics
            const totalUsers = await db.select({ count: sql`count(*)` }).from(users);
            const totalReferrals = await db.select({ count: sql`count(*)` }).from(referrals);
            const totalRewards = await db.select({ count: sql`count(*)` }).from(referralRewards);
            
            const completedReferrals = await db
                .select({ count: sql`count(*)` })
                .from(referrals)
                .where(eq(referrals.status, 'completed'));

            const totalPoints = await db
                .select({ total: sql`sum(${referralRewards.points})` })
                .from(referralRewards)
                .where(eq(referralRewards.status, 'earned'));

            const conversionRate = totalUsers[0]?.count > 0 
                ? (completedReferrals[0]?.count / totalUsers[0]?.count * 100).toFixed(1)
                : 0;

            return NextResponse.json({
                success: true,
                data: {
                    totalUsers: totalUsers[0]?.count || 0,
                    totalReferrals: totalReferrals[0]?.count || 0,
                    completedReferrals: completedReferrals[0]?.count || 0,
                    totalRewards: totalRewards[0]?.count || 0,
                    totalPoints: totalPoints[0]?.total || 0,
                    conversionRate: conversionRate
                }
            });
        }

        return NextResponse.json({
            success: false,
            error: 'Invalid action'
        }, { status: 400 });

    } catch (error) {
        console.error('Demo API error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}
            const referralCodesData = [
                {
                    id: 'rc1',
                    code: 'ALEX2025',
                    userId: 'user1',
                    isActive: true,
                    usageCount: 2,
                    maxUsage: 10,
                    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'rc2',
                    code: 'SARAH2026',
                    userId: 'user2',
                    isActive: true,
                    usageCount: 1,
                    maxUsage: 10,
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'rc3',
                    code: 'MIKE2025',
                    userId: 'user3',
                    isActive: true,
                    usageCount: 0,
                    maxUsage: 10,
                    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'rc4',
                    code: 'EMMA2027',
                    userId: 'user4',
                    isActive: true,
                    usageCount: 0,
                    maxUsage: 10,
                    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                }
            ];

            for (const code of referralCodesData) {
                await db.insert(referralCodes).values(code).onConflictDoNothing();
            }

            // Create referrals
            const referralsData = [
                {
                    id: 'ref1',
                    referrerId: 'user1',
                    refereeId: 'user2',
                    referralCodeId: 'rc1',
                    status: 'completed',
                    completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'ref2',
                    referrerId: 'user1',
                    refereeId: 'user3',
                    referralCodeId: 'rc1',
                    status: 'completed',
                    completedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
                    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'ref3',
                    referrerId: 'user2',
                    refereeId: 'user4',
                    referralCodeId: 'rc2',
                    status: 'completed',
                    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                }
            ];

            for (const referral of referralsData) {
                await db.insert(referrals).values(referral).onConflictDoNothing();
            }

            // Create user stats
            const userStatsData = [
                {
                    userId: 'user1',
                    totalReferrals: 2,
                    successfulReferrals: 2,
                    totalRewards: 200,
                    currentStreak: 2,
                    longestStreak: 2,
                    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    userId: 'user2',
                    totalReferrals: 1,
                    successfulReferrals: 1,
                    totalRewards: 150,
                    currentStreak: 1,
                    longestStreak: 1,
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    userId: 'user3',
                    totalReferrals: 0,
                    successfulReferrals: 0,
                    totalRewards: 50,
                    currentStreak: 0,
                    longestStreak: 0,
                    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    userId: 'user4',
                    totalReferrals: 0,
                    successfulReferrals: 0,
                    totalRewards: 50,
                    currentStreak: 0,
                    longestStreak: 0,
                    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                }
            ];

            for (const stats of userStatsData) {
                await db.insert(userStats).values(stats).onConflictDoNothing();
            }

            // Create referral rewards
            const rewardsData = [
                {
                    id: 'reward1',
                    userId: 'user1',
                    referralId: 'ref1',
                    type: 'referral_bonus',
                    points: 100,
                    description: 'Referred Sarah Chen',
                    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'reward2',
                    userId: 'user1',
                    referralId: 'ref2',
                    type: 'referral_bonus',
                    points: 100,
                    description: 'Referred Mike Rodriguez',
                    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'reward3',
                    userId: 'user2',
                    referralId: 'ref1',
                    type: 'signup_bonus',
                    points: 50,
                    description: 'Welcome bonus for joining via referral',
                    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'reward4',
                    userId: 'user2',
                    referralId: 'ref3',
                    type: 'referral_bonus',
                    points: 100,
                    description: 'Referred Emma Wilson',
                    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'reward5',
                    userId: 'user3',
                    referralId: 'ref2',
                    type: 'signup_bonus',
                    points: 50,
                    description: 'Welcome bonus for joining via referral',
                    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                },
                {
                    id: 'reward6',
                    userId: 'user4',
                    referralId: 'ref3',
                    type: 'signup_bonus',
                    points: 50,
                    description: 'Welcome bonus for joining via referral',
                    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                    updatedAt: new Date()
                }
            ];

            for (const reward of rewardsData) {
                await db.insert(referralRewards).values(reward).onConflictDoNothing();
            }

            return NextResponse.json({ 
                success: true, 
                message: 'Demo data seeded successfully',
                data: {
                    users: demoUsers.length,
                    referralCodes: referralCodesData.length,
                    referrals: referralsData.length,
                    rewards: rewardsData.length
                }
            });
        }

        if (action === 'get_demo_stats') {
            // Get comprehensive stats for demo
            const totalUsers = await db.select({ count: sql`count(*)` }).from(users);
            const totalReferrals = await db.select({ count: sql`count(*)` }).from(referrals);
            const totalRewards = await db.select({ 
                total: sql`sum(${referralRewards.points})` 
            }).from(referralRewards);
            
            const topReferrers = await db
                .select({
                    userId: users.id,
                    fullName: users.fullName,
                    email: users.email,
                    referralCode: users.referralCode,
                    totalReferrals: userStats.totalReferrals,
                    totalRewards: userStats.totalRewards
                })
                .from(users)
                .leftJoin(userStats, eq(users.id, userStats.userId))
                .orderBy(sql`${userStats.totalReferrals} DESC`)
                .limit(5);

            return NextResponse.json({
                success: true,
                stats: {
                    totalUsers: totalUsers[0]?.count || 0,
                    totalReferrals: totalReferrals[0]?.count || 0,
                    totalRewards: totalRewards[0]?.total || 0,
                    topReferrers
                }
            });
        }

        return NextResponse.json({ 
            success: false, 
            error: 'Invalid action' 
        }, { status: 400 });

    } catch (error) {
        console.error('Demo API error:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'An error occurred' 
        }, { status: 500 });
    }
}
