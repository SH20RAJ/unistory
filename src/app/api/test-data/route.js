import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { users, posts, circles, clubs, events, comments, likes, connections, userStats, moods, userAchievements, clubMemberships } from "@/db/schema";
import { getDB } from "@/db";

// GET test endpoint to verify seeded data
export async function GET() {
    try {
        const db = getDB();

        // Fetch some data from each major table to verify seeding
        const allUsers = await db.select().from(users).limit(10);
        const allPosts = await db.select().from(posts).limit(10);
        const allCircles = await db.select().from(circles).limit(10);
        const allClubs = await db.select().from(clubs).limit(10);
        const allEvents = await db.select().from(events).limit(10);
        const allComments = await db.select().from(comments).limit(10);
        const allLikes = await db.select().from(likes).limit(10);
        const allConnections = await db.select().from(connections).limit(10);
        const allStats = await db.select().from(userStats).limit(10);
        const allMoods = await db.select().from(moods).limit(10);
        const allAchievements = await db.select().from(userAchievements).limit(10);
        const allClubMemberships = await db.select().from(clubMemberships).limit(10);

        const summary = {
            users: {
                count: allUsers.length,
                sample: allUsers
            },
            posts: {
                count: allPosts.length,
                sample: allPosts
            },
            circles: {
                count: allCircles.length,
                sample: allCircles
            },
            clubs: {
                count: allClubs.length,
                sample: allClubs
            },
            events: {
                count: allEvents.length,
                sample: allEvents
            },
            comments: {
                count: allComments.length,
                sample: allComments
            },
            likes: {
                count: allLikes.length,
                sample: allLikes
            },
            connections: {
                count: allConnections.length,
                sample: allConnections
            },
            userStats: {
                count: allStats.length,
                sample: allStats
            },
            moods: {
                count: allMoods.length,
                sample: allMoods
            },
            userAchievements: {
                count: allAchievements.length,
                sample: allAchievements
            },
            clubMemberships: {
                count: allClubMemberships.length,
                sample: allClubMemberships
            }
        };

        return NextResponse.json(summary);
    } catch (error) {
        console.error("Error fetching test data:", error);
        return NextResponse.json({ error: "Failed to fetch test data", details: error.message }, { status: 500 });
    }
}
