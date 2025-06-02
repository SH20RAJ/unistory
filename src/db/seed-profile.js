import { db } from "./index.js";
import { achievements, userAchievements, userStats, users } from "./schema.js";
import { generateId } from "../utils/idGenerator.js";

const sampleAchievements = [
    {
        id: generateId(),
        name: "Study Streak Master",
        description: "Maintained a 30-day study streak",
        icon: "🔥",
        category: "study",
        type: "streak",
        requirement: JSON.stringify({ studyDays: 30 }),
        points: 500,
        isActive: true
    },
    {
        id: generateId(),
        name: "Social Butterfly",
        description: "Made 50+ connections",
        icon: "🦋",
        category: "social",
        type: "milestone",
        requirement: JSON.stringify({ connections: 50 }),
        points: 300,
        isActive: true
    },
    {
        id: generateId(),
        name: "Confession King",
        description: "Posted 20+ anonymous confessions",
        icon: "👑",
        category: "social",
        type: "activity",
        requirement: JSON.stringify({ confessions: 20 }),
        points: 200,
        isActive: true
    },
    {
        id: generateId(),
        name: "Event Enthusiast",
        description: "Attended 25+ campus events",
        icon: "🎉",
        category: "event",
        type: "milestone",
        requirement: JSON.stringify({ eventsAttended: 25 }),
        points: 400,
        isActive: true
    },
    {
        id: generateId(),
        name: "Study Leader",
        description: "Created 10+ study groups",
        icon: "📚",
        category: "study",
        type: "activity",
        requirement: JSON.stringify({ studyGroupsCreated: 10 }),
        points: 350,
        isActive: true
    },
    {
        id: generateId(),
        name: "Community Helper",
        description: "Helped 100+ students",
        icon: "🤝",
        category: "social",
        type: "milestone",
        requirement: JSON.stringify({ studentsHelped: 100 }),
        points: 600,
        isActive: true
    },
    {
        id: generateId(),
        name: "Wellness Warrior",
        description: "Checked mood for 30 consecutive days",
        icon: "🌱",
        category: "wellness",
        type: "streak",
        requirement: JSON.stringify({ moodDays: 30 }),
        points: 250,
        isActive: true
    },
    {
        id: generateId(),
        name: "First Steps",
        description: "Complete your profile setup",
        icon: "👶",
        category: "milestone",
        type: "milestone",
        requirement: JSON.stringify({ profileComplete: true }),
        points: 50,
        isActive: true
    }
];

async function seedProfileData() {
    try {
        console.log("🌱 Starting profile data seeding...");

        // First, insert achievements
        console.log("📊 Inserting achievements...");
        for (const achievement of sampleAchievements) {
            await db.insert(achievements).values(achievement).onConflictDoNothing();
        }
        console.log(`✅ Inserted ${sampleAchievements.length} achievements`);

        // Get all users to create user stats for them
        const allUsers = await db.select().from(users);
        console.log(`👥 Found ${allUsers.length} users`);

        // Create user stats for each user
        for (const user of allUsers) {
            // Create user stats
            const userStatsData = {
                id: generateId(),
                userId: user.id,
                postsCount: Math.floor(Math.random() * 50) + 5,
                commentsCount: Math.floor(Math.random() * 100) + 10,
                likesReceived: Math.floor(Math.random() * 200) + 20,
                likesGiven: Math.floor(Math.random() * 150) + 15,
                connectionsCount: Math.floor(Math.random() * 80) + 10,
                messagesCount: Math.floor(Math.random() * 300) + 50,
                studyScore: Math.floor(Math.random() * 2000) + 500,
                studyStreak: Math.floor(Math.random() * 30) + 1,
                studyTimeThisWeek: Math.floor(Math.random() * 1200) + 120, // in minutes
                eventsAttended: Math.floor(Math.random() * 20) + 2,
                eventsCreated: Math.floor(Math.random() * 5),
                confessionsSent: Math.floor(Math.random() * 15) + 1,
                crushesSent: Math.floor(Math.random() * 8) + 1,
                clubsMember: Math.floor(Math.random() * 5) + 1,
                engagementScore: Math.floor(Math.random() * 1000) + 200
            };

            await db.insert(userStats).values(userStatsData).onConflictDoNothing();

            // Create some user achievements (randomly assign 2-5 achievements per user)
            const numAchievements = Math.floor(Math.random() * 4) + 2;
            const userAchievementsList = [];

            for (let i = 0; i < numAchievements; i++) {
                const randomAchievement = sampleAchievements[Math.floor(Math.random() * sampleAchievements.length)];
                const isCompleted = Math.random() > 0.3; // 70% chance of completion

                const userAchievement = {
                    id: generateId(),
                    userId: user.id,
                    achievementId: randomAchievement.id,
                    progress: isCompleted ? 100 : Math.floor(Math.random() * 80) + 10,
                    isCompleted: isCompleted,
                    completedAt: isCompleted ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : null // Random date in last 30 days
                };

                userAchievementsList.push(userAchievement);
            }

            // Insert user achievements
            for (const userAchievement of userAchievementsList) {
                await db.insert(userAchievements).values(userAchievement).onConflictDoNothing();
            }
        }

        console.log("✅ Profile data seeding completed successfully!");
        console.log("📈 Summary:");
        console.log(`   - ${sampleAchievements.length} achievements created`);
        console.log(`   - ${allUsers.length} user stats created`);
        console.log(`   - User achievements assigned to all users`);

    } catch (error) {
        console.error("❌ Error seeding profile data:", error);
        throw error;
    }
}

// Run the seeding function
seedProfileData()
    .then(() => {
        console.log("🎉 Seeding completed!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("💥 Seeding failed:", error);
        process.exit(1);
    });

export async function seedAchievements() {
    console.log("🌱 Seeding achievements...");

    try {
        // Clear existing achievements
        await db.delete(achievements);

        // Insert new achievements
        await db.insert(achievements).values(sampleAchievements);

        console.log(`✅ Seeded ${sampleAchievements.length} achievements`);
    } catch (error) {
        console.error("❌ Error seeding achievements:", error);
    }
}

export async function seedUserAchievements(userId) {
    console.log(`🌱 Seeding user achievements for user ${userId}...`);

    try {
        // Get all achievements
        const allAchievements = await db.select().from(achievements);

        if (allAchievements.length === 0) {
            console.log("No achievements found, seeding achievements first...");
            await seedAchievements();
            return seedUserAchievements(userId);
        }

        // Create user achievements - some completed, some in progress
        const userAchievementData = [
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[0].id, // Study Streak Master
                progress: 100,
                isCompleted: true,
                completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
            },
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[1].id, // Social Butterfly
                progress: 100,
                isCompleted: true,
                completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
            },
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[2].id, // Confession King
                progress: 100,
                isCompleted: true,
                completedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
            },
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[3].id, // Event Enthusiast
                progress: 100,
                isCompleted: true,
                completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
            },
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[4].id, // Study Leader
                progress: 100,
                isCompleted: true,
                completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // 12 days ago
            },
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[5].id, // Mood Tracker
                progress: 100,
                isCompleted: true,
                completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
            },
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[6].id, // Club President
                progress: 75,
                isCompleted: false,
                completedAt: null
            },
            {
                id: generateId(),
                userId: userId,
                achievementId: allAchievements[7].id, // Match Maker
                progress: 30,
                isCompleted: false,
                completedAt: null
            }
        ];

        // Clear existing user achievements for this user
        await db.delete(userAchievements).where(eq(userAchievements.userId, userId));

        // Insert new user achievements
        await db.insert(userAchievements).values(userAchievementData);

        console.log(`✅ Seeded ${userAchievementData.length} user achievements`);
    } catch (error) {
        console.error("❌ Error seeding user achievements:", error);
    }
}

export async function seedUserStats(userId) {
    console.log(`🌱 Seeding user stats for user ${userId}...`);

    try {
        const statsData = {
            id: generateId(),
            userId: userId,
            postsCount: 87,
            commentsCount: 234,
            likesReceived: 456,
            likesGiven: 321,
            connectionsCount: 156,
            messagesCount: 89,
            studyScore: 2450,
            studyStreak: 12,
            studyTimeThisWeek: 1470, // 24.5 hours in minutes
            eventsAttended: 34,
            eventsCreated: 3,
            clubsMembership: 4,
            confessionsCount: 23,
            crushesCount: 5,
            achievementsUnlocked: 6
        };

        // Clear existing stats for this user
        await db.delete(userStats).where(eq(userStats.userId, userId));

        // Insert new stats
        await db.insert(userStats).values(statsData);

        console.log("✅ Seeded user stats");
    } catch (error) {
        console.error("❌ Error seeding user stats:", error);
    }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    // You would need to provide a userId to seed data for
    const userId = process.argv[2];
    if (!userId) {
        console.error("Please provide a userId as an argument");
        process.exit(1);
    }

    await seedAchievements();
    await seedUserAchievements(userId);
    await seedUserStats(userId);
}
