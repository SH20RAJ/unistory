import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../src/db/schema.js';

// Create a local SQLite database for development
const sqlite = new Database('./local.db');
const db = drizzle(sqlite, { schema });

async function createNotificationsTable() {
    console.log("Creating notifications table...");

    try {
        // Create notifications table
        await db.run(`
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
                id: '1',
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
                id: '2',
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
                id: '3',
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
                id: '4',
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
                id: '5',
                type: 'achievement',
                title: 'Achievement Unlocked!',
                message: 'You earned the "Study Buddy" badge for helping 5 students',
                toUserId: '1',
                fromUserId: null,
                priority: 'medium',
                actionUrl: '/profile/achievements',
                isRead: 0,
            }
        ];

        // Insert notifications
        for (const notification of sampleNotifications) {
            await db.run(`
        INSERT OR REPLACE INTO notifications 
        (id, type, title, message, toUserId, fromUserId, priority, actionUrl, isRead, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `, [
                notification.id,
                notification.type,
                notification.title,
                notification.message,
                notification.toUserId,
                notification.fromUserId,
                notification.priority,
                notification.actionUrl,
                notification.isRead
            ]);
        }

        console.log(`Created ${sampleNotifications.length} sample notifications`);

        // Verify the data
        const result = await db.all('SELECT * FROM notifications');
        console.log('Notifications in database:', result.length);

    } catch (error) {
        console.error("Error creating notifications table:", error);
    } finally {
        sqlite.close();
    }
}

createNotificationsTable();
