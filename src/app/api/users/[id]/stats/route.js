import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { userStats } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/users/[id]/stats - Get user statistics
export async function GET(request, { params }) {
    const db = getDB();
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
        }

        const stats = await db.select().from(userStats).where(eq(userStats.userId, id)).limit(1);

        if (stats.length === 0) {
            // Return default stats if none exist
            const defaultStats = {
                posts: 0,
                connections: 0,
                studyScore: 0,
                studyStreak: 0,
                confessionsSent: 0,
                crushesSent: 0,
                eventsAttended: 0,
                clubsMember: 0,
                likesReceived: 0,
                commentsCount: 0
            };
            return NextResponse.json({ success: true, data: defaultStats });
        }

        // Transform database stats to match frontend expectations
        const userStatsData = stats[0];
        const transformedStats = {
            posts: userStatsData.postsCount || 0,
            connections: userStatsData.connectionsCount || 0,
            studyScore: userStatsData.studyScore || 0,
            studyStreak: userStatsData.studyStreak || 0,
            confessionsSent: userStatsData.confessionsCount || 0,
            crushesSent: userStatsData.crushesCount || 0,
            eventsAttended: userStatsData.eventsAttended || 0,
            clubsMember: userStatsData.clubsMembership || 0,
            likesReceived: userStatsData.likesReceived || 0,
            commentsCount: userStatsData.commentsCount || 0
        };

        return NextResponse.json({ success: true, data: transformedStats });
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch user stats" }, { status: 500 });
    }
}
