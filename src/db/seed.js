// Comprehensive seed data for Unistory database
// Based on analysis of all hardcoded mock data in the application

import { getDB } from './index.js';
import {
    users, posts, postMedia, comments, circles, circleMemberships,
    clubs, clubMemberships, events, eventAttendance, connections,
    conversations, conversationParticipants, messages,
    likes, bookmarks, secretCrushes, achievements, userAchievements,
    userStats, moods, studySessions, reports, auditLog
} from './schema.js';

// Generate unique IDs
function generateId(prefix = '') {
    return `${prefix}${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Seed data
export async function seedDatabase() {
    console.log('🌱 Starting database seeding...');

    const db = getDB();

    try {
        // 1. Create Universities
        const universities = ['Stanford University', 'University of Technology', 'University of California'];

        // 2. Create Users
        const userData = [
            {
                id: 'user_001',
                email: 'john.doe@university.edu',
                username: 'johndoe',
                name: 'John Doe',
                bio: 'Passionate about AI and machine learning. Always looking for new challenges and opportunities to grow. Love connecting with like-minded people! 🚀',
                major: 'Computer Science',
                year: 'Junior',
                university: 'University of Technology',
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
                showMood: true
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
                profileVisibility: 'public'
            },
            {
                id: 'user_003',
                email: 'sarah.kim@university.edu',
                username: 'sarahkim',
                name: 'Sarah Kim',
                bio: 'Data Science enthusiast. Love organizing study groups and helping peers succeed!',
                major: 'Data Science',
                year: 'Sophomore',
                university: 'University of Technology',
                isVerified: false,
                profileVisibility: 'public'
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
                profileVisibility: 'public'
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
                profileVisibility: 'public'
            },
            {
                id: 'user_006',
                email: 'sophia.chen@stanford.edu',
                username: 'sophiachen',
                name: 'Sophia Chen',
                bio: 'Study group organizer and academic excellence advocate.',
                major: 'Computer Science',
                year: 'Sophomore',
                university: 'Stanford University',
                isVerified: true,
                profileVisibility: 'public'
            },
            {
                id: 'user_007',
                email: 'maya.smith@stanford.edu',
                username: 'mayasmith',
                name: 'Maya Smith',
                bio: 'Design enthusiast and creative problem solver.',
                major: 'Design',
                year: 'Junior',
                university: 'Stanford University',
                isVerified: true,
                profileVisibility: 'public'
            },
            {
                id: 'user_008',
                email: 'jason.park@stanford.edu',
                username: 'jasonpark',
                name: 'Jason Park',
                bio: 'Economics major with interest in tech and entrepreneurship.',
                major: 'Economics',
                year: 'Senior',
                university: 'Stanford University',
                isVerified: true,
                profileVisibility: 'public'
            },
            {
                id: 'user_009',
                email: 'elena.rodriguez@stanford.edu',
                username: 'elenarodriguez',
                name: 'Elena Rodriguez',
                bio: 'Biology student passionate about research and wellness.',
                major: 'Biology',
                year: 'Junior',
                university: 'Stanford University',
                isVerified: true,
                profileVisibility: 'public'
            },
            {
                id: 'user_010',
                email: 'maria.santos@university.edu',
                username: 'mariasantos',
                name: 'Maria Santos',
                bio: 'Photography club president and visual storyteller.',
                major: 'Arts',
                year: 'Senior',
                university: 'University of Technology',
                isVerified: false,
                profileVisibility: 'public'
            }
        ];

        // Insert users
        console.log('👥 Seeding users...');
        for (const user of userData) {
            await db.insert(users).values(user);
        }

        // 3. Create Achievements
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
                name: 'Confession King',
                description: 'Posted 20+ anonymous confessions',
                icon: '👑',
                category: 'content',
                type: 'milestone',
                requirement: JSON.stringify({ type: 'confessions_sent', value: 20 }),
                points: 200,
                isActive: true
            },
            {
                id: 'ach_004',
                name: 'Event Enthusiast',
                description: 'Attended 25+ campus events',
                icon: '🎉',
                category: 'event',
                type: 'milestone',
                requirement: JSON.stringify({ type: 'events_attended', value: 25 }),
                points: 400,
                isActive: true
            },
            {
                id: 'ach_005',
                name: 'Study Leader',
                description: 'Created 10+ study groups',
                icon: '📚',
                category: 'study',
                type: 'activity',
                requirement: JSON.stringify({ type: 'study_groups_created', value: 10 }),
                points: 350,
                isActive: true
            },
            {
                id: 'ach_006',
                name: 'Mood Tracker',
                description: 'Logged mood for 60 consecutive days',
                icon: '😊',
                category: 'wellness',
                type: 'streak',
                requirement: JSON.stringify({ type: 'mood_streak', value: 60 }),
                points: 250,
                isActive: true
            }
        ];

        console.log('🏆 Seeding achievements...');
        for (const achievement of achievementsData) {
            await db.insert(achievements).values(achievement);
        }

        // 4. Create Circles
        const circlesData = [
            {
                id: 'circle_001',
                name: 'Computer Science Hub',
                description: 'For CS students to discuss coursework, projects, and career opportunities. Share study resources, ask questions about assignments, and connect with peers in your major.',
                coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
                avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=CS',
                memberCount: 1250,
                isPrivate: false,
                category: 'Academic',
                college: 'Stanford University',
                rules: JSON.stringify([
                    'Be respectful and constructive in discussions',
                    'No spam or self-promotion without permission',
                    'No cheating or sharing of exam materials',
                    'Credit sources when sharing resources',
                    'Respect intellectual property and copyright'
                ]),
                tags: JSON.stringify(['programming', 'algorithms', 'career', 'internships']),
                createdBy: 'user_002'
            },
            {
                id: 'circle_002',
                name: 'Campus Photography Club',
                description: 'Share your campus shots and photography techniques. Weekly challenges and contests.',
                coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop',
                memberCount: 743,
                isPrivate: false,
                category: 'Hobby',
                college: 'Stanford University',
                rules: JSON.stringify([
                    'Share original photography only',
                    'Credit other photographers when sharing',
                    'Be constructive with feedback',
                    'Follow campus photography guidelines'
                ]),
                tags: JSON.stringify(['photography', 'art', 'creative', 'contests']),
                createdBy: 'user_010'
            },
            {
                id: 'circle_003',
                name: 'Stanford Entrepreneurs',
                description: 'For student entrepreneurs to connect, share ideas, and find co-founders.',
                coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
                memberCount: 892,
                isPrivate: true,
                requireApproval: true,
                category: 'Career',
                college: 'Stanford University',
                rules: JSON.stringify([
                    'No spam or excessive self-promotion',
                    'Respect intellectual property',
                    'Be supportive of fellow entrepreneurs',
                    'Share resources and opportunities'
                ]),
                tags: JSON.stringify(['startup', 'entrepreneurship', 'business', 'networking']),
                createdBy: 'user_008'
            },
            {
                id: 'circle_004',
                name: 'Campus Mental Health Support',
                description: 'A safe space for discussing mental health challenges and supporting each other.',
                coverImage: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=2070&auto=format&fit=crop',
                memberCount: 426,
                isPrivate: true,
                requireApproval: true,
                category: 'Wellness',
                college: 'Stanford University',
                rules: JSON.stringify([
                    'Maintain confidentiality and privacy',
                    'Be supportive and non-judgmental',
                    'No medical advice - seek professional help',
                    'Report concerning content to moderators'
                ]),
                tags: JSON.stringify(['mental health', 'support', 'wellness', 'community']),
                createdBy: 'user_009'
            },
            {
                id: 'circle_005',
                name: 'Stanford Gaming League',
                description: 'For gamers to connect, organize tournaments, and discuss latest games.',
                coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1947&auto=format&fit=crop',
                memberCount: 1130,
                isPrivate: false,
                category: 'Entertainment',
                college: 'Stanford University',
                rules: JSON.stringify([
                    'Keep discussions gaming-related',
                    'No toxicity or harassment',
                    'Respect all gaming platforms and preferences',
                    'Organize tournaments fairly'
                ]),
                tags: JSON.stringify(['gaming', 'esports', 'tournaments', 'community']),
                createdBy: 'user_007'
            }
        ];

        console.log('⭕ Seeding circles...');
        for (const circle of circlesData) {
            await db.insert(circles).values(circle);
        }

        // 5. Create Clubs
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
                nextEventLocation: 'Engineering Lab B'
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
                nextEventLocation: 'Main Quad'
            },
            {
                id: 'club_003',
                name: 'Debate Society',
                description: 'Developing critical thinking and public speaking through competitive debate',
                image: '🎭',
                category: 'Academic',
                members: 67,
                rating: 4.9,
                president: 'Jordan Mitchell',
                founded: '2010',
                location: 'Auditorium A',
                website: 'debate.university.edu',
                email: 'debate@university.edu',
                achievements: JSON.stringify(['National Championship 2023', 'Best Speaker Awards']),
                tags: JSON.stringify(['Public Speaking', 'Critical Thinking', 'Competition']),
                nextEvent: 'Inter-University Debate Tournament',
                nextEventDate: '2024-03-20',
                nextEventLocation: 'Auditorium A'
            },
            {
                id: 'club_004',
                name: 'Mental Health Awareness',
                description: 'Supporting student wellbeing through awareness, resources, and community',
                image: '💙',
                category: 'Wellness',
                members: 234,
                rating: 4.7,
                president: 'Emma Rodriguez',
                founded: '2019',
                location: 'Student Center',
                website: 'wellness.university.edu',
                instagram: '@uniwellness',
                email: 'wellness@university.edu',
                achievements: JSON.stringify(['Campus Wellness Award', '500+ Students Helped']),
                tags: JSON.stringify(['Wellness', 'Support', 'Community']),
                nextEvent: 'Mindfulness Workshop',
                nextEventDate: '2024-03-14',
                nextEventLocation: 'Student Center'
            },
            {
                id: 'club_005',
                name: 'Gaming Community',
                description: 'Connecting gamers across campus for tournaments, events, and casual play',
                image: '🎮',
                category: 'Entertainment',
                members: 312,
                rating: 4.5,
                president: 'Tyler Chen',
                founded: '2017',
                location: 'Gaming Lounge',
                website: 'gaming.university.edu',
                instagram: '@unigaming',
                twitter: '@unigaming',
                email: 'gaming@university.edu',
                achievements: JSON.stringify(['Regional Esports Champions', 'Largest Club Membership']),
                tags: JSON.stringify(['Gaming', 'Esports', 'Social']),
                nextEvent: 'Esports Tournament Finals',
                nextEventDate: '2024-03-18',
                nextEventLocation: 'Gaming Lounge'
            }
        ];

        console.log('🏛️ Seeding clubs...');
        for (const club of clubsData) {
            await db.insert(clubs).values(club);
        }

        // 6. Create Events
        const eventsData = [
            {
                id: 'event_001',
                title: 'Tech Career Fair 2025',
                description: 'Connect with top tech companies and explore internship and full-time opportunities. Representatives from Google, Apple, Microsoft, and 50+ other companies.',
                category: 'career',
                date: '2025-01-25',
                time: '10:00 AM - 4:00 PM',
                location: 'Main Auditorium',
                organizer: 'Career Services',
                organizerAvatar: 'CS',
                attendees: 234,
                interested: 567,
                price: 'Free',
                tags: JSON.stringify(['networking', 'internships', 'career']),
                isFeatured: true,
                requiresRegistration: true,
                capacity: 1000,
                isPublic: true
            },
            {
                id: 'event_002',
                title: 'Mental Health Awareness Workshop',
                description: 'Learn about mental health resources on campus and stress management techniques.',
                category: 'wellness',
                date: '2025-01-20',
                time: '2:00 PM - 4:00 PM',
                location: 'Student Center',
                organizer: 'Wellness Center',
                clubId: 'club_004',
                attendees: 89,
                interested: 156,
                price: 'Free',
                tags: JSON.stringify(['mental health', 'wellness', 'workshop']),
                isFeatured: false,
                requiresRegistration: true,
                capacity: 200,
                isPublic: true
            },
            {
                id: 'event_003',
                title: 'Hackathon 2025: Innovation Challenge',
                description: '48-hour coding marathon to build innovative solutions for campus problems.',
                category: 'academic',
                date: '2025-02-15',
                time: '6:00 PM',
                endTime: '6:00 PM (Feb 17)',
                location: 'Engineering Building',
                organizer: 'CS Department',
                attendees: 156,
                interested: 342,
                price: 'Free',
                tags: JSON.stringify(['hackathon', 'coding', 'innovation', 'prizes']),
                isFeatured: true,
                requiresRegistration: true,
                capacity: 300,
                isPublic: true
            },
            {
                id: 'event_004',
                title: 'Spring Mixer: Campus Social',
                description: 'Meet new people and enjoy music, food, and games at our annual spring social event.',
                category: 'social',
                date: '2025-03-05',
                time: '7:00 PM - 11:00 PM',
                location: 'Student Union Ballroom',
                organizer: 'Student Activities',
                attendees: 445,
                interested: 723,
                price: '$15',
                tags: JSON.stringify(['social', 'mixer', 'music', 'food']),
                isFeatured: true,
                requiresRegistration: true,
                capacity: 500,
                isPublic: true
            },
            {
                id: 'event_005',
                title: 'Environmental Action: Campus Cleanup',
                description: 'Join us in making our campus more sustainable and beautiful.',
                category: 'community',
                date: '2025-02-22',
                time: '9:00 AM - 12:00 PM',
                location: 'Campus Wide',
                organizer: 'Environmental Club',
                attendees: 78,
                interested: 134,
                price: 'Free',
                tags: JSON.stringify(['environment', 'sustainability', 'community service']),
                isFeatured: false,
                requiresRegistration: false,
                isPublic: true
            }
        ];

        console.log('📅 Seeding events...');
        for (const event of eventsData) {
            await db.insert(events).values(event);
        }

        // 7. Create Posts
        const postsData = [
            {
                id: 'post_001',
                authorId: 'user_002',
                content: 'Just finished my final project for CS50! Been working on this adaptive learning platform for the past month. It uses machine learning to personalize education content based on student performance and learning style. Check out the demo!',
                type: 'social',
                mood: '🎉',
                category: 'Academic',
                tags: JSON.stringify(['ComputerScience', 'MachineLearning', 'Education']),
                audience: 'public',
                circleId: 'circle_001',
                likes: 128,
                comments: 24,
                shares: 15,
                views: 456,
                isPinned: false,
                isFeatured: true,
                isTrending: true
            },
            {
                id: 'post_002',
                authorId: null, // Anonymous confession
                content: 'Sometimes I feel like I\'m the only one struggling with calculus. Everyone else seems to get it so easily, but I spend hours on homework and still feel lost. Anyone else feeling this way?',
                type: 'confession',
                isAnonymous: true,
                mood: '😔',
                category: 'Academic',
                tags: JSON.stringify(['study', 'help', 'calculus']),
                audience: 'public',
                likes: 67,
                comments: 23,
                shares: 8,
                views: 234,
                isTrending: true
            },
            {
                id: 'post_003',
                authorId: 'user_003',
                content: 'Looking for people to join a machine learning study group! We\'ll meet twice a week to go through Andrew Ng\'s course together. DM me if interested!',
                type: 'study',
                mood: '📚',
                category: 'Academic',
                tags: JSON.stringify(['studygroup', 'machinelearning', 'collaboration']),
                audience: 'public',
                circleId: 'circle_001',
                likes: 45,
                comments: 18,
                shares: 12,
                views: 189
            },
            {
                id: 'post_004',
                authorId: null, // Anonymous confession
                content: 'I have a huge crush on someone in my physics class, but I\'m too shy to even talk to them. They seem so smart and confident, and I feel like I\'d just embarrass myself. How do people even start conversations with their crushes? 😅',
                type: 'confession',
                isAnonymous: true,
                mood: '😊',
                category: 'Relationships',
                tags: JSON.stringify(['dating', 'advice', 'crush']),
                audience: 'public',
                likes: 89,
                comments: 34,
                shares: 5,
                views: 312,
                isTrending: true
            },
            {
                id: 'post_005',
                authorId: 'user_005',
                content: 'Just released my open-source project for graph algorithm visualization! Perfect for anyone taking Algorithm Design. Check it out and let me know what you think! #CS #Algorithms #OpenSource',
                type: 'social',
                mood: '🚀',
                category: 'Academic',
                tags: JSON.stringify(['opensource', 'algorithms', 'visualization']),
                audience: 'public',
                circleId: 'circle_001',
                likes: 76,
                comments: 19,
                shares: 23,
                views: 287
            },
            {
                id: 'post_006',
                authorId: 'user_006',
                content: 'Study group for the upcoming Operating Systems midterm! Meeting at the Engineering Library this Friday from 6-9pm. BYOC (bring your own coffee) ☕ Comment if you\'re joining! #StudyGroup #OS #Midterm',
                type: 'study',
                mood: '☕',
                category: 'Academic',
                tags: JSON.stringify(['studygroup', 'operatingsystems', 'midterm']),
                audience: 'public',
                circleId: 'circle_001',
                likes: 32,
                comments: 17,
                shares: 8,
                views: 145
            },
            {
                id: 'post_007',
                authorId: 'user_004',
                content: 'Just dropped a comprehensive set of notes for CS246: Machine Learning. Covers everything from basic regression to neural networks with examples. Link in the comments! #MachineLearning #CS246 #StudyResources',
                type: 'social',
                mood: '📝',
                category: 'Academic',
                tags: JSON.stringify(['notes', 'machinelearning', 'resources']),
                audience: 'public',
                circleId: 'circle_001',
                likes: 95,
                comments: 28,
                shares: 34,
                views: 423,
                isFeatured: true
            },
            {
                id: 'post_008',
                authorId: null, // Anonymous confession
                content: 'Does anyone else feel like they\'re not smart enough for their major? I see everyone around me excelling and I feel like I\'m barely keeping up. Imposter syndrome is real 😞',
                type: 'confession',
                isAnonymous: true,
                mood: '😞',
                category: 'Academic',
                tags: JSON.stringify(['impostersyndrome', 'support', 'mentalhealth']),
                audience: 'public',
                likes: 156,
                comments: 47,
                shares: 12,
                views: 589,
                isTrending: true
            }
        ];

        console.log('📝 Seeding posts...');
        for (const post of postsData) {
            await db.insert(posts).values(post);
        }

        // 8. Create Post Media
        const postMediaData = [
            {
                id: 'media_001',
                postId: 'post_001',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
                title: 'Project Demo Screenshot',
                order: 0
            },
            {
                id: 'media_002',
                postId: 'post_001',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=2073&auto=format&fit=crop',
                title: 'Coding Session',
                order: 1
            },
            {
                id: 'media_003',
                postId: 'post_005',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
                title: 'Graph Visualization',
                order: 0
            },
            {
                id: 'media_004',
                postId: 'post_007',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
                title: 'Machine Learning Notes',
                order: 0
            },
            {
                id: 'media_005',
                postId: 'post_007',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
                title: 'Neural Network Diagram',
                order: 1
            }
        ];

        console.log('📷 Seeding post media...');
        for (const media of postMediaData) {
            await db.insert(postMedia).values(media);
        }

        // 9. Create Circle Memberships
        const circleMembershipsData = [
            // CS Hub members
            { id: 'cm_001', circleId: 'circle_001', userId: 'user_001', role: 'member' },
            { id: 'cm_002', circleId: 'circle_001', userId: 'user_002', role: 'admin' },
            { id: 'cm_003', circleId: 'circle_001', userId: 'user_003', role: 'member' },
            { id: 'cm_004', circleId: 'circle_001', userId: 'user_004', role: 'admin' },
            { id: 'cm_005', circleId: 'circle_001', userId: 'user_005', role: 'admin' },
            { id: 'cm_006', circleId: 'circle_001', userId: 'user_006', role: 'member' },

            // Photography Club members
            { id: 'cm_007', circleId: 'circle_002', userId: 'user_007', role: 'member' },
            { id: 'cm_008', circleId: 'circle_002', userId: 'user_010', role: 'owner' },

            // Entrepreneurs members
            { id: 'cm_009', circleId: 'circle_003', userId: 'user_008', role: 'owner' },
            { id: 'cm_010', circleId: 'circle_003', userId: 'user_001', role: 'member' },

            // Mental Health Support members
            { id: 'cm_011', circleId: 'circle_004', userId: 'user_009', role: 'owner' },

            // Gaming League members
            { id: 'cm_012', circleId: 'circle_005', userId: 'user_007', role: 'owner' },
            { id: 'cm_013', circleId: 'circle_005', userId: 'user_001', role: 'member' }
        ];

        console.log('👥 Seeding circle memberships...');
        for (const membership of circleMembershipsData) {
            await db.insert(circleMemberships).values(membership);
        }

        // 10. Create Club Memberships
        const clubMembershipsData = [
            { id: 'clubm_001', clubId: 'club_001', userId: 'user_002', role: 'member' },
            { id: 'clubm_002', clubId: 'club_002', userId: 'user_010', role: 'president' },
            { id: 'clubm_003', clubId: 'club_003', userId: 'user_008', role: 'member' },
            { id: 'clubm_004', clubId: 'club_004', userId: 'user_009', role: 'officer' },
            { id: 'clubm_005', clubId: 'club_005', userId: 'user_007', role: 'member' },
            { id: 'clubm_006', clubId: 'club_001', userId: 'user_001', role: 'member' }
        ];

        console.log('🏛️ Seeding club memberships...');
        for (const membership of clubMembershipsData) {
            await db.insert(clubMemberships).values(membership);
        }

        // 11. Create User Stats
        const userStatsData = [
            {
                id: 'stats_001',
                userId: 'user_001',
                postsCount: 87,
                commentsCount: 234,
                likesReceived: 1456,
                likesGiven: 892,
                connectionsCount: 156,
                messagesCount: 2340,
                studyScore: 2450,
                studyStreak: 12,
                studyTimeThisWeek: 1470, // 24.5 hours
                eventsAttended: 34,
                eventsCreated: 5,
                confessionsSent: 23,
                crushesSent: 5,
                clubsMember: 4,
                engagementScore: 8750
            },
            {
                id: 'stats_002',
                userId: 'user_002',
                postsCount: 45,
                commentsCount: 123,
                likesReceived: 890,
                likesGiven: 567,
                connectionsCount: 89,
                messagesCount: 1234,
                studyScore: 1890,
                studyStreak: 8,
                studyTimeThisWeek: 1260, // 21 hours
                eventsAttended: 12,
                eventsCreated: 3,
                confessionsSent: 8,
                crushesSent: 2,
                clubsMember: 2,
                engagementScore: 5432
            },
            {
                id: 'stats_003',
                userId: 'user_003',
                postsCount: 67,
                commentsCount: 189,
                likesReceived: 723,
                likesGiven: 456,
                connectionsCount: 134,
                messagesCount: 1876,
                studyScore: 2100,
                studyStreak: 15,
                studyTimeThisWeek: 1680, // 28 hours
                eventsAttended: 28,
                eventsCreated: 2,
                confessionsSent: 12,
                crushesSent: 3,
                clubsMember: 3,
                engagementScore: 6789
            }
        ];

        console.log('📊 Seeding user stats...');
        for (const stats of userStatsData) {
            await db.insert(userStats).values(stats);
        }

        // 12. Create User Achievements
        const userAchievementsData = [
            {
                id: 'ua_001',
                userId: 'user_001',
                achievementId: 'ach_001',
                progress: 100,
                isCompleted: true,
                completedAt: new Date('2024-02-15').getTime()
            },
            {
                id: 'ua_002',
                userId: 'user_001',
                achievementId: 'ach_002',
                progress: 100,
                isCompleted: true,
                completedAt: new Date('2024-01-20').getTime()
            },
            {
                id: 'ua_003',
                userId: 'user_001',
                achievementId: 'ach_003',
                progress: 100,
                isCompleted: true,
                completedAt: new Date('2024-01-05').getTime()
            },
            {
                id: 'ua_004',
                userId: 'user_001',
                achievementId: 'ach_004',
                progress: 100,
                isCompleted: true,
                completedAt: new Date('2024-02-01').getTime()
            },
            {
                id: 'ua_005',
                userId: 'user_003',
                achievementId: 'ach_005',
                progress: 100,
                isCompleted: true,
                completedAt: new Date('2024-02-10').getTime()
            },
            {
                id: 'ua_006',
                userId: 'user_003',
                achievementId: 'ach_006',
                progress: 100,
                isCompleted: true,
                completedAt: new Date('2024-02-28').getTime()
            }
        ];

        console.log('🏆 Seeding user achievements...');
        for (const achievement of userAchievementsData) {
            await db.insert(userAchievements).values(achievement);
        }

        // 13. Create Moods
        const moodsData = [
            {
                id: 'mood_001',
                userId: 'user_001',
                mood: '😊',
                note: 'Great day! Finished my project.',
                date: '2024-03-10',
                streak: 7
            },
            {
                id: 'mood_002',
                userId: 'user_001',
                mood: '😴',
                note: 'Tired but productive.',
                date: '2024-03-09',
                streak: 6
            },
            {
                id: 'mood_003',
                userId: 'user_002',
                mood: '🎉',
                note: 'Hackathon success!',
                date: '2024-03-10',
                streak: 3
            },
            {
                id: 'mood_004',
                userId: 'user_003',
                mood: '📚',
                note: 'Study group went well.',
                date: '2024-03-10',
                streak: 15
            }
        ];

        console.log('😊 Seeding moods...');
        for (const mood of moodsData) {
            await db.insert(moods).values(mood);
        }

        // 14. Create Study Sessions
        const studySessionsData = [
            {
                id: 'study_001',
                userId: 'user_001',
                subject: 'Machine Learning',
                duration: 120,
                notes: 'Worked on neural network implementation',
                focusScore: 85,
                sessionType: 'solo',
                date: '2024-03-10'
            },
            {
                id: 'study_002',
                userId: 'user_001',
                subject: 'Algorithms',
                duration: 90,
                notes: 'Graph algorithms study group',
                focusScore: 78,
                sessionType: 'group',
                date: '2024-03-09'
            },
            {
                id: 'study_003',
                userId: 'user_003',
                subject: 'Statistics',
                duration: 150,
                notes: 'Probability distributions review',
                focusScore: 92,
                sessionType: 'pomodoro',
                date: '2024-03-10'
            }
        ];

        console.log('📚 Seeding study sessions...');
        for (const session of studySessionsData) {
            await db.insert(studySessions).values(session);
        }

        // 15. Create Comments
        const commentsData = [
            {
                id: 'comment_001',
                postId: 'post_001',
                authorId: 'user_003',
                content: 'This looks amazing! What technologies did you use for the ML part?',
                likes: 15,
                isAnonymous: false
            },
            {
                id: 'comment_002',
                postId: 'post_001',
                authorId: 'user_002',
                parentId: 'comment_001',
                content: 'Thanks! I used TensorFlow for the model training and Flask for the API backend. The recommendation engine uses collaborative filtering combined with content-based filtering.',
                likes: 8,
                isAnonymous: false
            },
            {
                id: 'comment_003',
                postId: 'post_002',
                authorId: 'user_004',
                content: 'You\'re definitely not alone! I struggled with calculus too. Have you tried forming a study group? It really helped me.',
                likes: 23,
                isAnonymous: false
            },
            {
                id: 'comment_004',
                postId: 'post_003',
                authorId: 'user_005',
                content: 'I\'m interested! I\'ve been wanting to learn ML. When are you planning to meet?',
                likes: 7,
                isAnonymous: false
            },
            {
                id: 'comment_005',
                postId: 'post_004',
                authorId: 'user_007',
                content: 'Start with small talk about class! Maybe ask about homework or upcoming exams. You got this! 💪',
                likes: 12,
                isAnonymous: false
            }
        ];

        console.log('💬 Seeding comments...');
        for (const comment of commentsData) {
            await db.insert(comments).values(comment);
        }

        // 16. Create Connections
        const connectionsData = [
            {
                id: 'conn_001',
                requesterId: 'user_001',
                addresseeId: 'user_002',
                status: 'accepted',
                type: 'friend',
                acceptedAt: new Date('2024-01-15').getTime()
            },
            {
                id: 'conn_002',
                requesterId: 'user_001',
                addresseeId: 'user_003',
                status: 'accepted',
                type: 'study_partner',
                acceptedAt: new Date('2024-02-01').getTime()
            },
            {
                id: 'conn_003',
                requesterId: 'user_002',
                addresseeId: 'user_004',
                status: 'accepted',
                type: 'friend',
                acceptedAt: new Date('2024-01-20').getTime()
            },
            {
                id: 'conn_004',
                requesterId: 'user_003',
                addresseeId: 'user_005',
                status: 'accepted',
                type: 'friend',
                acceptedAt: new Date('2024-02-05').getTime()
            },
            {
                id: 'conn_005',
                requesterId: 'user_006',
                addresseeId: 'user_001',
                status: 'pending',
                type: 'friend'
            }
        ];

        console.log('🤝 Seeding connections...');
        for (const connection of connectionsData) {
            await db.insert(connections).values(connection);
        }

        // 17. Create Event Attendance
        const eventAttendanceData = [
            { id: 'ea_001', eventId: 'event_001', userId: 'user_001', status: 'interested' },
            { id: 'ea_002', eventId: 'event_001', userId: 'user_002', status: 'going' },
            { id: 'ea_003', eventId: 'event_002', userId: 'user_009', status: 'going' },
            { id: 'ea_004', eventId: 'event_003', userId: 'user_001', status: 'going' },
            { id: 'ea_005', eventId: 'event_003', userId: 'user_002', status: 'going' },
            { id: 'ea_006', eventId: 'event_003', userId: 'user_003', status: 'interested' },
            { id: 'ea_007', eventId: 'event_004', userId: 'user_007', status: 'going' },
            { id: 'ea_008', eventId: 'event_005', userId: 'user_009', status: 'going' }
        ];

        console.log('📅 Seeding event attendance...');
        for (const attendance of eventAttendanceData) {
            await db.insert(eventAttendance).values(attendance);
        }

        // 18. Create Likes
        const likesData = [
            { id: 'like_001', userId: 'user_001', targetId: 'post_001', targetType: 'post' },
            { id: 'like_002', userId: 'user_003', targetId: 'post_001', targetType: 'post' },
            { id: 'like_003', userId: 'user_005', targetId: 'post_001', targetType: 'post' },
            { id: 'like_004', userId: 'user_002', targetId: 'post_003', targetType: 'post' },
            { id: 'like_005', userId: 'user_004', targetId: 'post_007', targetType: 'post' },
            { id: 'like_006', userId: 'user_001', targetId: 'comment_001', targetType: 'comment' },
            { id: 'like_007', userId: 'user_005', targetId: 'comment_003', targetType: 'comment' },
            { id: 'like_008', userId: 'user_007', targetId: 'post_004', targetType: 'post' }
        ];

        console.log('❤️ Seeding likes...');
        for (const like of likesData) {
            await db.insert(likes).values(like);
        }

        // 19. Create Secret Crushes
        const secretCrushesData = [
            {
                id: 'crush_001',
                senderId: 'user_001',
                targetId: 'user_007',
                isRevealed: false,
                isMatched: false,
                status: 'active'
            },
            {
                id: 'crush_002',
                senderId: 'user_003',
                targetId: 'user_005',
                isRevealed: true,
                isMatched: true,
                matchedAt: new Date('2024-02-14').getTime(),
                status: 'active'
            },
            {
                id: 'crush_003',
                senderId: 'user_005',
                targetId: 'user_003',
                isRevealed: true,
                isMatched: true,
                matchedAt: new Date('2024-02-14').getTime(),
                status: 'active'
            }
        ];

        console.log('💕 Seeding secret crushes...');
        for (const crush of secretCrushesData) {
            await db.insert(secretCrushes).values(crush);
        }

        // 20. Create Sample Conversations and Messages
        const conversationsData = [
            {
                id: 'conv_001',
                type: 'direct',
                lastActivity: new Date().getTime()
            },
            {
                id: 'conv_002',
                type: 'group',
                name: 'CS Study Group',
                lastActivity: new Date().getTime()
            }
        ];

        console.log('💬 Seeding conversations...');
        for (const conversation of conversationsData) {
            await db.insert(conversations).values(conversation);
        }

        const conversationParticipantsData = [
            { id: 'cp_001', conversationId: 'conv_001', userId: 'user_001', role: 'member' },
            { id: 'cp_002', conversationId: 'conv_001', userId: 'user_002', role: 'member' },
            { id: 'cp_003', conversationId: 'conv_002', userId: 'user_001', role: 'admin' },
            { id: 'cp_004', conversationId: 'conv_002', userId: 'user_003', role: 'member' },
            { id: 'cp_005', conversationId: 'conv_002', userId: 'user_005', role: 'member' }
        ];

        console.log('👥 Seeding conversation participants...');
        for (const participant of conversationParticipantsData) {
            await db.insert(conversationParticipants).values(participant);
        }

        const messagesData = [
            {
                id: 'msg_001',
                conversationId: 'conv_001',
                senderId: 'user_001',
                content: 'Hey! How did your project presentation go?',
                type: 'text'
            },
            {
                id: 'msg_002',
                conversationId: 'conv_001',
                senderId: 'user_002',
                content: 'It went great! Thanks for asking. The demo worked perfectly.',
                type: 'text'
            },
            {
                id: 'msg_003',
                conversationId: 'conv_002',
                senderId: 'user_001',
                content: 'Hey everyone! Ready for our study session tomorrow?',
                type: 'text'
            },
            {
                id: 'msg_004',
                conversationId: 'conv_002',
                senderId: 'user_003',
                content: 'Yes! I have all the materials ready. Should we meet at the library?',
                type: 'text'
            }
        ];

        console.log('📨 Seeding messages...');
        for (const message of messagesData) {
            await db.insert(messages).values(message);
        }

        console.log('✅ Database seeding completed successfully!');
        console.log(`
📊 Seeded data summary:
- 👥 Users: ${userData.length}
- 🏆 Achievements: ${achievementsData.length}
- ⭕ Circles: ${circlesData.length}
- 🏛️ Clubs: ${clubsData.length}
- 📅 Events: ${eventsData.length}
- 📝 Posts: ${postsData.length}
- 📷 Post Media: ${postMediaData.length}
- 💬 Comments: ${commentsData.length}
- 🤝 Connections: ${connectionsData.length}
- ❤️ Likes: ${likesData.length}
- 💕 Secret Crushes: ${secretCrushesData.length}
- 📊 User Stats: ${userStatsData.length}
- 😊 Moods: ${moodsData.length}
- 📚 Study Sessions: ${studySessionsData.length}
- 💬 Conversations: ${conversationsData.length}
- 👥 Conversation Participants: ${conversationParticipantsData.length}
- 📨 Messages: ${messagesData.length}
- 🔖 Bookmarks: ${bookmarksData.length}
- 🚨 Reports: ${reportsData.length}
- 📋 Audit Log: ${auditLogData.length}
- ⭕ Circle Memberships: ${circleMembershipsData.length}
- 🏛️ Club Memberships: ${clubMembershipsData.length}
- 📅 Event Attendance: ${eventAttendanceData.length}
    `);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

// Export for use in scripts
export default seedDatabase;

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase().catch(console.error);
}
