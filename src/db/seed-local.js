#!/usr/bin/env node

// Simple seed script that works with local D1 database
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';
import { eq } from 'drizzle-orm';

// Extract all tables from schema
const {
    users, posts, postMedia, comments, circles, circleMemberships,
    clubs, clubMemberships, events, eventAttendance, connections,
    conversations, conversationParticipants, messages,
    likes, bookmarks, secretCrushes, achievements, userAchievements,
    userStats, moods, studySessions, reports, auditLog
} = schema;

// Create connection to local SQLite database
const sqlite = new Database('.wrangler/state/v3/d1/miniflare-D1DatabaseObject/de2b995f358d4c87c1ca785ebebdb978ca228e19277974df2a72180287c73af6.sqlite');
const db = drizzle(sqlite, { schema });

// Generate unique IDs
function generateId(prefix = '') {
    return `${prefix}${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Seed data function
async function seedDatabase() {
    console.log('🌱 Starting comprehensive database seeding...');

    try {
        // Clear existing data first (in reverse dependency order)
        console.log('🧹 Clearing existing data...');

        await db.delete(auditLog);
        await db.delete(reports);
        await db.delete(bookmarks);
        await db.delete(conversationParticipants);
        await db.delete(messages);
        await db.delete(conversations);
        await db.delete(eventAttendance);
        await db.delete(clubMemberships);
        await db.delete(circleMemberships);
        await db.delete(connections);
        await db.delete(secretCrushes);
        await db.delete(likes);
        await db.delete(postMedia);
        await db.delete(comments);
        await db.delete(posts);
        await db.delete(events);
        await db.delete(clubs);
        await db.delete(circles);
        await db.delete(userAchievements);
        await db.delete(achievements);
        await db.delete(studySessions);
        await db.delete(moods);
        await db.delete(userStats);
        await db.delete(users);

        console.log('✅ Existing data cleared successfully!');

        // 1. Create Users
        const userData = [
            {
                id: 'user_001',
                email: 'john.doe@stanford.edu',
                username: 'johndoe',
                name: 'John Doe',
                bio: 'CS student passionate about AI and machine learning. Always looking for new challenges and opportunities to grow. Love connecting with like-minded people! 🚀',
                major: 'Computer Science',
                year: 'Junior',
                university: 'Stanford University',
                location: 'San Francisco, CA',
                isVerified: true,
                instagram: '@johndoe',
                twitter: '@john_doe_dev',
                github: 'johndoe',
                linkedin: 'john-doe-dev',
                website: 'johndoe.dev',
                profileVisibility: 'public',
                showEmail: false,
                showStats: true,
                allowMessages: true,
                showMood: true,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date()
            },
            {
                id: 'user_002',
                email: 'alex.johnson@stanford.edu',
                username: 'alexjohnson',
                name: 'Alex Johnson',
                bio: 'CS student passionate about building innovative projects and connecting with fellow developers.',
                major: 'Computer Science',
                year: 'Senior',
                university: 'Stanford University',
                isVerified: true,
                profileVisibility: 'public',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                createdAt: new Date('2024-01-10'),
                updatedAt: new Date()
            },
            {
                id: 'user_003',
                email: 'sarah.kim@stanford.edu',
                username: 'sarahkim',
                name: 'Sarah Kim',
                bio: 'Data Science enthusiast. Love organizing study groups and helping peers succeed!',
                major: 'Data Science',
                year: 'Sophomore',
                university: 'Stanford University',
                isVerified: false,
                profileVisibility: 'public',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                createdAt: new Date('2024-02-01'),
                updatedAt: new Date()
            },
            {
                id: 'user_004',
                email: 'emma.wilson@stanford.edu',
                username: 'emmawilson',
                name: 'Emma Wilson',
                bio: 'Machine Learning researcher and note-sharing enthusiast.',
                major: 'Computer Science',
                year: 'Graduate',
                university: 'Stanford University',
                isVerified: true,
                profileVisibility: 'public',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date()
            },
            {
                id: 'user_005',
                email: 'noah.martinez@stanford.edu',
                username: 'noahmartinez',
                name: 'Noah Martinez',
                bio: 'Full-stack developer and open source contributor.',
                major: 'Computer Science',
                year: 'Junior',
                university: 'Stanford University',
                isVerified: true,
                profileVisibility: 'public',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
                createdAt: new Date('2024-01-25'),
                updatedAt: new Date()
            }
        ];

        console.log('👥 Seeding users...');
        for (const user of userData) {
            await db.insert(users).values(user);
        }

        // 2. Create Achievements
        const achievementsData = [
            {
                id: 'ach_001',
                name: 'Study Streak Master',
                description: 'Maintained a 30-day study streak',
                icon: '🔥',
                category: 'study',
                type: 'streak',
                requirement: JSON.stringify({ type: 'study_streak', value: 30 }),
                points: 500,
                isActive: true
            },
            {
                id: 'ach_002',
                name: 'Social Butterfly',
                description: 'Made 50+ connections',
                icon: '🦋',
                category: 'social',
                type: 'milestone',
                requirement: JSON.stringify({ type: 'connections_count', value: 50 }),
                points: 300,
                isActive: true
            },
            {
                id: 'ach_003',
                name: 'Event Enthusiast',
                description: 'Attended 25+ campus events',
                icon: '🎉',
                category: 'event',
                type: 'milestone',
                requirement: JSON.stringify({ type: 'events_attended', value: 25 }),
                points: 400,
                isActive: true
            }
        ];

        console.log('🏆 Seeding achievements...');
        for (const achievement of achievementsData) {
            await db.insert(achievements).values(achievement);
        }

        // 3. Create Circles
        const circlesData = [
            {
                id: 'circle_001',
                name: 'Computer Science Hub',
                description: 'For CS students to discuss coursework, projects, and career opportunities.',
                coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
                avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=CS',
                memberCount: 125,
                isPrivate: false,
                category: 'Academic',
                college: 'Stanford University',
                rules: JSON.stringify(['Be respectful', 'No spam', 'No cheating']),
                tags: JSON.stringify(['programming', 'algorithms', 'career']),
                createdBy: 'user_002',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date()
            },
            {
                id: 'circle_002',
                name: 'Photography Club',
                description: 'Share your campus shots and photography techniques.',
                coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop',
                memberCount: 74,
                isPrivate: false,
                category: 'Hobby',
                college: 'Stanford University',
                rules: JSON.stringify(['Share original photography only', 'Credit sources']),
                tags: JSON.stringify(['photography', 'art', 'creative']),
                createdBy: 'user_003',
                createdAt: new Date('2024-02-01'),
                updatedAt: new Date()
            }
        ];

        console.log('⭕ Seeding circles...');
        for (const circle of circlesData) {
            await db.insert(circles).values(circle);
        }

        // 4. Create Circle Memberships
        const circleMembershipsData = [
            { id: 'cm_001', circleId: 'circle_001', userId: 'user_001', role: 'member', joinedAt: new Date('2024-01-16') },
            { id: 'cm_002', circleId: 'circle_001', userId: 'user_002', role: 'admin', joinedAt: new Date('2024-01-15') },
            { id: 'cm_003', circleId: 'circle_001', userId: 'user_003', role: 'member', joinedAt: new Date('2024-02-02') },
            { id: 'cm_004', circleId: 'circle_002', userId: 'user_003', role: 'admin', joinedAt: new Date('2024-02-01') },
            { id: 'cm_005', circleId: 'circle_002', userId: 'user_001', role: 'member', joinedAt: new Date('2024-02-03') }
        ];

        console.log('👥 Seeding circle memberships...');
        for (const membership of circleMembershipsData) {
            await db.insert(circleMemberships).values(membership);
        }

        // 5. Create Posts
        const postsData = [
            {
                id: 'post_001',
                userId: 'user_001',
                content: 'Just finished my machine learning project! 🚀 Super excited about the results. The model achieved 94% accuracy on the test set. Anyone else working on ML projects this semester?',
                type: 'text',
                visibility: 'public',
                circleId: 'circle_001',
                likesCount: 15,
                commentsCount: 8,
                isAnonymous: false,
                mood: 'excited',
                tags: JSON.stringify(['ml', 'project', 'coding']),
                createdAt: new Date('2024-03-01T10:30:00'),
                updatedAt: new Date('2024-03-01T10:30:00')
            },
            {
                id: 'post_002',
                userId: 'user_002',
                content: 'Beautiful sunset from the engineering building today 📸 Love how the light hits the campus at this time of day. Perfect for photography practice!',
                type: 'image',
                visibility: 'public',
                circleId: 'circle_002',
                likesCount: 23,
                commentsCount: 5,
                isAnonymous: false,
                mood: 'calm',
                tags: JSON.stringify(['photography', 'sunset', 'campus']),
                createdAt: new Date('2024-03-02T17:45:00'),
                updatedAt: new Date('2024-03-02T17:45:00')
            },
            {
                id: 'post_003',
                userId: 'user_003',
                content: 'Anyone interested in forming a study group for CS229? I think it would be really helpful to work through the problem sets together. Planning to meet twice a week in the library.',
                type: 'text',
                visibility: 'public',
                circleId: 'circle_001',
                likesCount: 12,
                commentsCount: 6,
                isAnonymous: false,
                mood: 'hopeful',
                tags: JSON.stringify(['study-group', 'cs229', 'collaboration']),
                createdAt: new Date('2024-03-03T09:15:00'),
                updatedAt: new Date('2024-03-03T09:15:00')
            }
        ];

        console.log('📝 Seeding posts...');
        for (const post of postsData) {
            await db.insert(posts).values(post);
        }

        // 6. Create Comments
        const commentsData = [
            {
                id: 'comment_001',
                postId: 'post_001',
                userId: 'user_003',
                content: 'Wow, 94% accuracy is impressive! What dataset did you use?',
                likesCount: 3,
                isAnonymous: false,
                createdAt: new Date('2024-03-01T11:00:00'),
                updatedAt: new Date('2024-03-01T11:00:00')
            },
            {
                id: 'comment_002',
                postId: 'post_001',
                userId: 'user_004',
                content: 'Great work! I\'d love to hear more about your approach.',
                likesCount: 2,
                isAnonymous: false,
                createdAt: new Date('2024-03-01T11:30:00'),
                updatedAt: new Date('2024-03-01T11:30:00')
            },
            {
                id: 'comment_003',
                postId: 'post_003',
                userId: 'user_001',
                content: 'Count me in! I could really use help with the linear algebra parts.',
                likesCount: 1,
                isAnonymous: false,
                createdAt: new Date('2024-03-03T09:30:00'),
                updatedAt: new Date('2024-03-03T09:30:00')
            }
        ];

        console.log('💬 Seeding comments...');
        for (const comment of commentsData) {
            await db.insert(comments).values(comment);
        }

        // 7. Create Likes
        const likesData = [
            { id: 'like_001', targetId: 'post_001', targetType: 'post', userId: 'user_002', createdAt: new Date('2024-03-01T10:35:00') },
            { id: 'like_002', targetId: 'post_001', targetType: 'post', userId: 'user_003', createdAt: new Date('2024-03-01T10:40:00') },
            { id: 'like_003', targetId: 'post_002', targetType: 'post', userId: 'user_001', createdAt: new Date('2024-03-02T17:50:00') },
            { id: 'like_004', targetId: 'post_003', targetType: 'post', userId: 'user_002', createdAt: new Date('2024-03-03T09:20:00') }
        ];

        console.log('❤️ Seeding likes...');
        for (const like of likesData) {
            await db.insert(likes).values(like);
        }

        // 8. Create Connections
        const connectionsData = [
            {
                id: 'conn_001',
                requesterId: 'user_001',
                addresseeId: 'user_002',
                status: 'accepted',
                createdAt: new Date('2024-01-20'),
                acceptedAt: new Date('2024-01-20')
            },
            {
                id: 'conn_002',
                requesterId: 'user_001',
                addresseeId: 'user_003',
                status: 'accepted',
                createdAt: new Date('2024-02-05'),
                acceptedAt: new Date('2024-02-05')
            },
            {
                id: 'conn_003',
                requesterId: 'user_002',
                addresseeId: 'user_004',
                status: 'pending',
                createdAt: new Date('2024-03-01')
            }
        ];

        console.log('🤝 Seeding connections...');
        for (const connection of connectionsData) {
            await db.insert(connections).values(connection);
        }

        // 9. Create User Stats
        const userStatsData = [
            {
                id: 'stats_001',
                userId: 'user_001',
                totalPosts: 15,
                totalLikes: 42,
                totalComments: 28,
                studyStreak: 7,
                totalStudyTime: 1440, // 24 hours in minutes
                connectionsCount: 12,
                achievementsCount: 3,
                averageMood: 7.2,
                lastActive: new Date(),
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date()
            },
            {
                id: 'stats_002',
                userId: 'user_002',
                totalPosts: 23,
                totalLikes: 67,
                totalComments: 45,
                studyStreak: 12,
                totalStudyTime: 2160, // 36 hours
                connectionsCount: 18,
                achievementsCount: 5,
                averageMood: 8.1,
                lastActive: new Date(),
                createdAt: new Date('2024-01-10'),
                updatedAt: new Date()
            }
        ];

        console.log('📊 Seeding user stats...');
        for (const stats of userStatsData) {
            await db.insert(userStats).values(stats);
        }

        // 10. Create Moods
        const moodsData = [
            {
                id: 'mood_001',
                userId: 'user_001',
                mood: 'excited',
                intensity: 8,
                note: 'Great progress on my ML project today!',
                date: '2024-03-01',
                createdAt: new Date('2024-03-01T22:00:00')
            },
            {
                id: 'mood_002',
                userId: 'user_002',
                mood: 'calm',
                intensity: 7,
                note: 'Peaceful evening walk around campus',
                date: '2024-03-02',
                createdAt: new Date('2024-03-02T19:30:00')
            },
            {
                id: 'mood_003',
                userId: 'user_003',
                mood: 'motivated',
                intensity: 9,
                note: 'Ready to tackle this new study group!',
                date: '2024-03-03',
                createdAt: new Date('2024-03-03T08:00:00')
            }
        ];

        console.log('😊 Seeding moods...');
        for (const mood of moodsData) {
            await db.insert(moods).values(mood);
        }

        // 11. Create Clubs
        const clubsData = [
            {
                id: 'club_001',
                name: 'Robotics Society',
                description: 'Building the future through innovative robotics projects and competitions',
                image: '🤖',
                category: 'Technology',
                members: 156,
                rating: 4.8,
                president: 'Alex Zhang',
                founded: '2018',
                location: 'Engineering Lab B',
                website: 'robotics.university.edu',
                instagram: '@unirobotics',
                email: 'robotics@university.edu',
                achievements: JSON.stringify(['1st Place Regional Competition 2023', 'Best Innovation Award 2022']),
                tags: JSON.stringify(['Engineering', 'Innovation', 'Competition']),
                nextEvent: 'Robot Building Workshop',
                nextEventDate: '2024-03-15',
                nextEventLocation: 'Engineering Lab B',
                createdAt: new Date('2024-01-01')
            },
            {
                id: 'club_002',
                name: 'Photography Club',
                description: 'Capturing campus life and exploring creative photography techniques together',
                image: '📸',
                category: 'Arts',
                members: 89,
                rating: 4.6,
                president: 'Maria Santos',
                founded: '2015',
                location: 'Main Quad',
                website: 'photography.university.edu',
                instagram: '@uniphoto',
                email: 'photo@university.edu',
                achievements: JSON.stringify(['Featured in Campus Magazine', 'Annual Exhibition Winner']),
                tags: JSON.stringify(['Photography', 'Creative', 'Social']),
                nextEvent: 'Golden Hour Campus Shoot',
                nextEventDate: '2024-03-12',
                nextEventLocation: 'Main Quad',
                createdAt: new Date('2024-01-05')
            }
        ];

        console.log('🏛️ Seeding clubs...');
        for (const club of clubsData) {
            await db.insert(clubs).values(club);
        }

        // 12. Create Events
        const eventsData = [
            {
                id: 'event_001',
                title: 'CS Department Tech Talk',
                description: 'Join us for an exciting tech talk about the latest developments in AI and machine learning.',
                date: '2024-03-20',
                time: '18:00',
                endTime: '20:00',
                location: 'Gates Building Auditorium',
                category: 'academic',
                organizer: 'Alex Johnson',
                organizerId: 'user_002',
                attendees: 87,
                interested: 25,
                capacity: 200,
                price: 'Free',
                isPublic: true,
                createdAt: new Date('2024-03-01')
            },
            {
                id: 'event_002',
                title: 'Campus Photography Workshop',
                description: 'Learn professional photography techniques and explore the beautiful Stanford campus.',
                date: '2024-03-18',
                time: '14:00',
                endTime: '17:00',
                location: 'Main Quad',
                category: 'social',
                organizer: 'Sarah Kim',
                organizerId: 'user_003',
                attendees: 24,
                interested: 12,
                capacity: 30,
                price: 'Free',
                isPublic: true,
                createdAt: new Date('2024-03-02')
            }
        ];

        console.log('📅 Seeding events...');
        for (const event of eventsData) {
            await db.insert(events).values(event);
        }

        // 13. Create Event Attendance
        const eventAttendanceData = [
            {
                id: 'attendance_001',
                eventId: 'event_001',
                userId: 'user_001',
                status: 'going',
                createdAt: new Date('2024-03-05')
            },
            {
                id: 'attendance_002',
                eventId: 'event_001',
                userId: 'user_003',
                status: 'interested',
                createdAt: new Date('2024-03-06')
            },
            {
                id: 'attendance_003',
                eventId: 'event_002',
                userId: 'user_001',
                status: 'going',
                createdAt: new Date('2024-03-07')
            }
        ];

        console.log('🎉 Seeding event attendance...');
        for (const attendance of eventAttendanceData) {
            await db.insert(eventAttendance).values(attendance);
        }

        // 14. Create User Achievements
        const userAchievementsData = [
            {
                id: 'user_ach_001',
                userId: 'user_001',
                achievementId: 'ach_001',
                unlockedAt: new Date('2024-02-15'),
                progress: 100
            },
            {
                id: 'user_ach_002',
                userId: 'user_002',
                achievementId: 'ach_002',
                unlockedAt: new Date('2024-02-20'),
                progress: 100
            },
            {
                id: 'user_ach_003',
                userId: 'user_001',
                achievementId: 'ach_003',
                unlockedAt: new Date('2024-03-01'),
                progress: 100
            }
        ];

        console.log('🏅 Seeding user achievements...');
        for (const userAch of userAchievementsData) {
            await db.insert(userAchievements).values(userAch);
        }

        // 15. Create Club Memberships
        const clubMembershipsData = [
            {
                id: 'clubmem_001',
                clubId: 'club_001',
                userId: 'user_001',
                role: 'member',
                joinedAt: new Date('2024-02-01')
            },
            {
                id: 'clubmem_002',
                clubId: 'club_001',
                userId: 'user_002',
                role: 'officer',
                joinedAt: new Date('2024-01-15')
            },
            {
                id: 'clubmem_003',
                clubId: 'club_002',
                userId: 'user_003',
                role: 'president',
                joinedAt: new Date('2024-01-10')
            }
        ];

        console.log('🏛️ Seeding club memberships...');
        for (const membership of clubMembershipsData) {
            await db.insert(clubMemberships).values(membership);
        }

        console.log('✅ Database seeding completed successfully!');
        console.log(`
📊 Seeded data summary:
- 👥 Users: ${userData.length}
- 🏆 Achievements: ${achievementsData.length}
- ⭕ Circles: ${circlesData.length}
- 👥 Circle Memberships: ${circleMembershipsData.length}
- 📝 Posts: ${postsData.length}
- 💬 Comments: ${commentsData.length}
- ❤️ Likes: ${likesData.length}
- 🤝 Connections: ${connectionsData.length}
- 📊 User Stats: ${userStatsData.length}
- 😊 Mood Entries: ${moodsData.length}
- 🏛️ Clubs: ${clubsData.length}
- 📅 Events: ${eventsData.length}
- 🎉 Event Attendance: ${eventAttendanceData.length}
- 🏅 User Achievements: ${userAchievementsData.length}
    `);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        sqlite.close();
    }
}

// Run the seeding
seedDatabase().catch(console.error);
