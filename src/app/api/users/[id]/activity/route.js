import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { posts, comments, userAchievements, achievements } from "@/db/schema";
import { eq, desc, or } from "drizzle-orm";

// GET /api/users/[id]/activity - Get user recent activity
export async function GET(request, { params }) {
    const db = getDB();
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit')) || 10;

        if (!id) {
            return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
        }

        // Get recent activities from multiple sources
        const activities = [];

        // Recent posts
        const recentPosts = await db
            .select({
                id: posts.id,
                content: posts.content,
                type: posts.type,
                likes: posts.likes,
                createdAt: posts.createdAt
            })
            .from(posts)
            .where(eq(posts.authorId, id))
            .orderBy(desc(posts.createdAt))
            .limit(5);

        recentPosts.forEach(post => {
            activities.push({
                type: 'post',
                content: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
                timestamp: getRelativeTime(post.createdAt),
                likes: post.likes,
                id: post.id
            });
        });

        // Recent comments
        const recentComments = await db
            .select({
                id: comments.id,
                content: comments.content,
                postId: comments.postId,
                createdAt: comments.createdAt
            })
            .from(comments)
            .where(eq(comments.authorId, id))
            .orderBy(desc(comments.createdAt))
            .limit(3);

        recentComments.forEach(comment => {
            activities.push({
                type: 'comment',
                content: `Commented: ${comment.content.substring(0, 80)}${comment.content.length > 80 ? '...' : ''}`,
                timestamp: getRelativeTime(comment.createdAt),
                id: comment.id
            });
        });

        // Recent achievements
        const recentAchievements = await db
            .select({
                id: userAchievements.id,
                completedAt: userAchievements.completedAt,
                achievement: {
                    name: achievements.name,
                    icon: achievements.icon
                }
            })
            .from(userAchievements)
            .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
            .where(eq(userAchievements.userId, id))
            .orderBy(desc(userAchievements.completedAt))
            .limit(3);

        recentAchievements.forEach(item => {
            if (item.completedAt) {
                activities.push({
                    type: 'achievement',
                    content: `Earned '${item.achievement.name}' badge`,
                    timestamp: getRelativeTime(item.completedAt),
                    id: item.id
                });
            }
        });

        // Sort all activities by timestamp and limit
        activities.sort((a, b) => {
            const timeA = parseRelativeTime(a.timestamp);
            const timeB = parseRelativeTime(b.timestamp);
            return timeA - timeB;
        });

        const limitedActivities = activities.slice(0, limit);

        return NextResponse.json({ success: true, data: limitedActivities });
    } catch (error) {
        console.error("Error fetching user activity:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch user activity" }, { status: 500 });
    }
}

// Helper function to get relative time
function getRelativeTime(date) {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes <= 1 ? 'just now' : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
}

// Helper function to parse relative time for sorting
function parseRelativeTime(timeStr) {
    if (timeStr === 'just now') return 0;

    const match = timeStr.match(/(\d+)\s+(minute|hour|day|week)s?\s+ago/);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 'minute': return value;
        case 'hour': return value * 60;
        case 'day': return value * 60 * 24;
        case 'week': return value * 60 * 24 * 7;
        default: return 0;
    }
}
