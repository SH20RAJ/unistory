import Database from "better-sqlite3";
import path from "path";

const dbPath = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/de2b995f358d4c87c1ca785ebebdb978ca228e19277974df2a72180287c73af6.sqlite';

async function setupNotificationsTable() {
    console.log("Setting up notifications table...");

    try {
        const sqlite = new Database(dbPath);

        // Create notifications table
        sqlite.exec(`
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        toUserId TEXT NOT NULL,
        fromUserId TEXT,
        priority TEXT DEFAULT 'medium',
        actionUrl TEXT,
        isRead INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log("Notifications table created successfully!");

        // Insert sample notifications
        const sampleNotifications = [
            {
                type: 'like',
                title: 'New Like',
                message: 'Sarah Johnson liked your post about campus life',
                toUserId: '1',
                fromUserId: '2',
                priority: 'low',
                actionUrl: '/posts/123',
                isRead: 0,
            },
            {
                type: 'comment',
                title: 'New Comment',
                message: 'Alex Chen commented on your study group post',
                toUserId: '1',
                fromUserId: '3',
                priority: 'medium',
                actionUrl: '/posts/124',
                isRead: 0,
            },
            {
                type: 'match',
                title: 'New Match!',
                message: 'You have a new match with Emma Wilson',
                toUserId: '1',
                fromUserId: '4',
                priority: 'high',
                actionUrl: '/matches',
                isRead: 0,
            },
            {
                type: 'study_room',
                title: 'Study Room Invitation',
                message: 'Michael Brown invited you to join Computer Science Study Group',
                toUserId: '1',
                fromUserId: '5',
                priority: 'medium',
                actionUrl: '/study-rooms/cs101',
                isRead: 1,
            },
            {
                type: 'achievement',
                title: 'Achievement Unlocked!',
                message: 'You earned the "Study Buddy" badge for helping 5 students',
                toUserId: '1',
                fromUserId: null,
                priority: 'medium',
                actionUrl: '/profile/achievements',
                isRead: 0,
            },
            {
                type: 'event',
                title: 'Event Reminder',
                message: 'Tech Meetup starts in 1 hour',
                toUserId: '1',
                fromUserId: null,
                priority: 'high',
                actionUrl: '/events/tech-meetup',
                isRead: 0,
            },
            {
                type: 'system',
                title: 'System Update',
                message: 'Unistory has been updated with new features!',
                toUserId: '1',
                fromUserId: null,
                priority: 'low',
                actionUrl: '/updates',
                isRead: 1,
            },
            {
                type: 'message',
                title: 'New Message',
                message: 'Taylor sent you a message',
                toUserId: '1',
                fromUserId: '6',
                priority: 'high',
                actionUrl: '/messages/taylor',
                isRead: 0,
            }
        ];

        // Clear existing notifications for user 1
        sqlite.prepare('DELETE FROM notifications WHERE toUserId = ?').run('1');

        // Insert notifications
        const insertStmt = sqlite.prepare(`
      INSERT INTO notifications 
      (type, title, message, toUserId, fromUserId, priority, actionUrl, isRead, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-' || ? || ' minutes'), datetime('now'))
    `);

        sampleNotifications.forEach((notification, index) => {
            insertStmt.run(
                notification.type,
                notification.title,
                notification.message,
                notification.toUserId,
                notification.fromUserId,
                notification.priority,
                notification.actionUrl,
                notification.isRead,
                Math.floor(Math.random() * 1440) // Random time within last 24 hours
            );
        });

        console.log(`Created ${sampleNotifications.length} sample notifications`);

        // Verify the data
        const result = sqlite.prepare('SELECT * FROM notifications WHERE toUserId = ?').all('1');
        console.log('Notifications in database:', result.length);

        // Show stats
        const unreadCount = sqlite.prepare('SELECT COUNT(*) as count FROM notifications WHERE toUserId = ? AND isRead = 0').get('1').count;
        const highPriorityCount = sqlite.prepare("SELECT COUNT(*) as count FROM notifications WHERE toUserId = ? AND priority = 'high'").get('1').count;

        console.log(`Stats - Total: ${result.length}, Unread: ${unreadCount}, High Priority: ${highPriorityCount}`);

        sqlite.close();

    } catch (error) {
        console.error("Error setting up notifications table:", error);
    }
}

setupNotificationsTable();
