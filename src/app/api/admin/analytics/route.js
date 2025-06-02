import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { users, posts, reports, userStats } from "@/db/schema";
import { count, eq, and, gte, sql } from "drizzle-orm";

export async function GET(request) {
    const db = getDB();
    try {
        // Get total users
        const totalUsersResult = await db.select({ count: count() }).from(users);
        const totalUsers = totalUsersResult[0].count;

        // Get active users (logged in within last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const activeUsersResult = await db
            .select({ count: count() })
            .from(users)
            .where(
                and(
                    eq(users.status, 'active'),
                    gte(users.lastActive, thirtyDaysAgo)
                )
            );
        const activeUsers = activeUsersResult[0].count;

        // Get total posts
        const totalPostsResult = await db.select({ count: count() }).from(posts);
        const totalPosts = totalPostsResult[0].count;

        // Get reports statistics
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const reportsToday = await db
            .select({ count: count() })
            .from(reports)
            .where(gte(reports.createdAt, today));

        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const reportsThisWeek = await db
            .select({ count: count() })
            .from(reports)
            .where(gte(reports.createdAt, weekAgo));

        const resolvedReports = await db
            .select({ count: count() })
            .from(reports)
            .where(eq(reports.status, 'resolved'));

        const pendingReports = await db
            .select({ count: count() })
            .from(reports)
            .where(eq(reports.status, 'pending'));

        // Get post categories distribution
        const categoryStats = await db
            .select({
                category: posts.category,
                count: count()
            })
            .from(posts)
            .where(eq(posts.status, 'active'))
            .groupBy(posts.category);

        // Calculate percentages for categories
        const categoriesWithPercentage = categoryStats.map(cat => ({
            name: cat.category || 'Other',
            posts: cat.count,
            percentage: totalPosts > 0 ? parseFloat(((cat.count / totalPosts) * 100).toFixed(1)) : 0
        }));

        // Sort by post count and take top 5
        const topCategories = categoriesWithPercentage
            .sort((a, b) => b.posts - a.posts)
            .slice(0, 5);

        // Calculate community score (simplified algorithm)
        const communityScore = Math.min(
            Math.max(
                (activeUsers / totalUsers) * 5 + // Activity factor
                (1 - (pendingReports[0].count / Math.max(totalPosts, 1))) * 3 + // Low reports factor
                (resolvedReports[0].count / Math.max(reportsThisWeek[0].count, 1)) * 2, // Resolution rate
                0
            ),
            10
        );

        const analytics = {
            totalUsers,
            activeUsers,
            totalPosts,
            reportsToday: reportsToday[0].count,
            reportsThisWeek: reportsThisWeek[0].count,
            resolvedReports: resolvedReports[0].count,
            pendingReports: pendingReports[0].count,
            communityScore: parseFloat(communityScore.toFixed(1)),
            topCategories
        };

        return NextResponse.json({
            success: true,
            data: analytics
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
