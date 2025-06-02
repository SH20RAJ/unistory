import { db } from "../src/db/index.js";
import { notifications, users } from "../src/db/schema.js";

async function createSampleNotifications() {
    console.log("Creating sample notifications...");

    try {
        // Sample notifications data
        const sampleNotifications = [
            {
                type: 'like',
                title: 'New Like',
                message: 'Sarah Johnson liked your post about campus life',
                toUserId: '1',
                fromUserId: '2',
                priority: 'low',
                actionUrl: '/posts/123',
                isRead: false,
            },
            {
                type: 'comment',
                title: 'New Comment',
                message: 'Alex Chen commented on your study group post',
                toUserId: '1',
                fromUserId: '3',
                priority: 'medium',
                actionUrl: '/posts/124',
                isRead: false,
            },
            {
                type: 'match',
                title: 'New Match!',
                message: 'You have a new match with Emma Wilson',
                toUserId: '1',
                fromUserId: '4',
                priority: 'high',
                actionUrl: '/matches',
                isRead: false,
            },
            {
                type: 'study_room',
                title: 'Study Room Invitation',
                message: 'Michael Brown invited you to join Computer Science Study Group',
                toUserId: '1',
                fromUserId: '5',
                priority: 'medium',
                actionUrl: '/study-rooms/cs101',
                isRead: true,
            },
            {
                type: 'achievement',
                title: 'Achievement Unlocked!',
                message: 'You earned the "Study Buddy" badge for helping 5 students',
                toUserId: '1',
                fromUserId: null,
                priority: 'medium',
                actionUrl: '/profile/achievements',
                isRead: false,
            },
            {
                type: 'system',
                title: 'System Update',
                message: 'Unistory has been updated with new features!',
                toUserId: '1',
                fromUserId: null,
                priority: 'low',
                actionUrl: '/updates',
                isRead: true,
            },
            {
                type: 'message',
                title: 'New Message',
                message: 'Taylor sent you a message',
                toUserId: '1',
                fromUserId: '6',
                priority: 'high',
                actionUrl: '/messages/taylor',
                isRead: false,
            },
            {
                type: 'event',
                title: 'Event Reminder',
                message: 'Tech Meetup starts in 1 hour',
                toUserId: '1',
                fromUserId: null,
                priority: 'high',
                actionUrl: '/events/tech-meetup',
                isRead: false,
            },
            {
                type: 'follow',
                title: 'New Follower',
                message: 'Jordan Kim started following you',
                toUserId: '1',
                fromUserId: '7',
                priority: 'low',
                actionUrl: '/profile/jordan',
                isRead: true,
            },
            {
                type: 'like',
                title: 'Post Popular',
                message: 'Your post has reached 50 likes!',
                toUserId: '1',
                fromUserId: null,
                priority: 'medium',
                actionUrl: '/posts/125',
                isRead: false,
            }
        ];

        // Insert notifications
        const insertedNotifications = await db
            .insert(notifications)
            .values(sampleNotifications.map(notification => ({
                ...notification,
                createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
                updatedAt: new Date(),
            })))
            .returning();

        console.log(`Created ${insertedNotifications.length} sample notifications`);

        // Display created notifications
        insertedNotifications.forEach((notification, index) => {
            console.log(`${index + 1}. ${notification.title} - ${notification.type} (${notification.priority})`);
        });

    } catch (error) {
        console.error("Error creating sample notifications:", error);
    } finally {
        process.exit(0);
    }
}

createSampleNotifications();
