import { getDB } from "@/db";
import { notifications, users } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc, and, inArray } from "drizzle-orm";

// GET - Fetch notifications for a user
export async function GET(request) {
    try {
        const db = getDB();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || '1';
        const limit = parseInt(searchParams.get('limit')) || 50;

        console.log('Fetching notifications for user:', userId);

        // Use Drizzle ORM properly
        const userNotifications = await db
            .select()
            .from(notifications)
            .where(eq(notifications.toUserId, userId))
            .orderBy(desc(notifications.createdAt))
            .limit(limit);

        // Convert isRead from integer to boolean for frontend (Drizzle already converts to boolean)
        const formattedNotifications = userNotifications.map(notification => {
            return {
                ...notification,
                isRead: Boolean(notification.isRead) // Ensure it's a boolean
            };
        });

        // Calculate statistics - simplified
        const allNotifications = await db
            .select()
            .from(notifications)
            .where(eq(notifications.toUserId, userId));

        const totalCount = allNotifications.length;
        const unreadCount = allNotifications.filter(n => !n.isRead).length; // Changed from n.isRead === 0
        const highPriorityCount = allNotifications.filter(n => n.priority === 'high').length;

        return NextResponse.json({
            success: true,
            data: {
                notifications: formattedNotifications,
                stats: {
                    total: totalCount,
                    unread: unreadCount,
                    highPriority: highPriorityCount,
                }
            }
        });

    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch notifications',
                details: error.message
            },
            { status: 500 }
        );
    }
}

// POST - Create a new notification or mark as read/unread
export async function POST(request) {
    try {
        const db = getDB();
        const body = await request.json();
        const { action, notificationIds, ...notificationData } = body;

        if (action === 'markAsRead') {
            // Mark specific notifications as read
            if (notificationIds && notificationIds.length > 0) {
                await db
                    .update(notifications)
                    .set({
                        isRead: 1, // Use 1 for SQLite boolean true
                        updatedAt: new Date().toISOString()
                    })
                    .where(inArray(notifications.id, notificationIds));

                return NextResponse.json({
                    success: true,
                    message: `${notificationIds.length} notifications marked as read`
                });
            }
        }

        if (action === 'markAllAsRead') {
            // Mark all notifications as read for a user
            const userId = body.userId || '1';

            await db
                .update(notifications)
                .set({
                    isRead: 1, // Use 1 for SQLite boolean true
                    updatedAt: new Date().toISOString()
                })
                .where(eq(notifications.toUserId, userId));

            return NextResponse.json({
                success: true,
                message: 'All notifications marked as read'
            });
        }

        if (action === 'delete') {
            // Delete specific notifications
            if (notificationIds && notificationIds.length > 0) {
                await db
                    .delete(notifications)
                    .where(inArray(notifications.id, notificationIds));

                return NextResponse.json({
                    success: true,
                    message: `${notificationIds.length} notifications deleted`
                });
            }
        }

        if (action === 'create') {
            // Create a new notification
            const {
                type,
                title,
                message,
                toUserId,
                fromUserId,
                priority = 'medium',
                actionUrl
            } = notificationData;

            if (!type || !title || !message || !toUserId) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Missing required fields: type, title, message, toUserId'
                    },
                    { status: 400 }
                );
            }

            const [newNotification] = await db
                .insert(notifications)
                .values({
                    type,
                    title,
                    message,
                    toUserId,
                    fromUserId: fromUserId || null,
                    priority,
                    actionUrl: actionUrl || null,
                    isRead: 0, // Use 0 for SQLite boolean false
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
                .returning();

            return NextResponse.json({
                success: true,
                message: 'Notification created successfully',
                data: newNotification
            });
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Invalid action. Supported actions: markAsRead, markAllAsRead, delete, create'
            },
            { status: 400 }
        );

    } catch (error) {
        console.error('Error handling notification action:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to process notification action',
                details: error.message
            },
            { status: 500 }
        );
    }
}
