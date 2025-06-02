import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { userAchievements, achievements } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/users/[id]/achievements - Get user achievements
export async function GET(request, { params }) {
    const db = getDB();
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
        }

        // Fetch user achievements with achievement details
        const userAchievementData = await db
            .select({
                id: userAchievements.id,
                progress: userAchievements.progress,
                isCompleted: userAchievements.isCompleted,
                completedAt: userAchievements.completedAt,
                achievement: {
                    id: achievements.id,
                    name: achievements.name,
                    description: achievements.description,
                    icon: achievements.icon,
                    category: achievements.category,
                    type: achievements.type,
                    points: achievements.points
                }
            })
            .from(userAchievements)
            .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
            .where(eq(userAchievements.userId, id));

        // Transform data to match frontend expectations
        const transformedAchievements = userAchievementData.map(item => ({
            id: item.achievement.id,
            name: item.achievement.name,
            description: item.achievement.description,
            icon: item.achievement.icon,
            category: item.achievement.category,
            type: item.achievement.type,
            points: item.achievement.points,
            unlocked: item.isCompleted,
            progress: item.progress,
            date: item.completedAt?.toISOString()
        }));

        return NextResponse.json({ success: true, data: transformedAchievements });
    } catch (error) {
        console.error("Error fetching user achievements:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch user achievements" }, { status: 500 });
    }
}
