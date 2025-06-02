import { NextResponse } from "next/server";
import { and, eq, desc, sql } from "drizzle-orm";
import { messages, conversations, conversationParticipants, users } from "@/db/schema";
import { getDB } from "@/db";
import { generateSimpleId } from '@/utils/idGenerator';

// GET messages for a conversation
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const conversationId = searchParams.get('conversationId');
        const userId = searchParams.get('userId');
        const limit = parseInt(searchParams.get('limit')) || 50;
        const offset = parseInt(searchParams.get('offset')) || 0;

        if (!conversationId || !userId) {
            return NextResponse.json({
                error: "Conversation ID and User ID are required"
            }, { status: 400 });
        }

        const db = getDB();

        // Verify user has access to this conversation
        const userAccess = await db
            .select()
            .from(conversationParticipants)
            .where(
                and(
                    eq(conversationParticipants.conversationId, conversationId),
                    eq(conversationParticipants.userId, userId),
                    eq(conversationParticipants.isActive, true)
                )
            )
            .limit(1);

        if (userAccess.length === 0) {
            return NextResponse.json({
                error: "Access denied to this conversation"
            }, { status: 403 });
        }

        // Get messages with sender info
        const conversationMessages = await db
            .select({
                id: messages.id,
                conversationId: messages.conversationId,
                senderId: messages.senderId,
                content: messages.content,
                type: messages.type,
                timestamp: messages.timestamp,
                editedAt: messages.editedAt,
                isDeleted: messages.isDeleted,
                metadata: messages.metadata,
                // Sender info
                senderName: users.name,
                senderAvatar: users.avatar,
            })
            .from(messages)
            .leftJoin(users, eq(messages.senderId, users.id))
            .where(
                and(
                    eq(messages.conversationId, conversationId),
                    eq(messages.isDeleted, false)
                )
            )
            .orderBy(desc(messages.timestamp))
            .limit(limit)
            .offset(offset);

        // Get conversation info
        const conversation = await db
            .select()
            .from(conversations)
            .where(eq(conversations.id, conversationId))
            .limit(1);

        return NextResponse.json({
            success: true,
            data: {
                messages: conversationMessages.map(msg => ({
                    id: msg.id,
                    conversationId: msg.conversationId,
                    senderId: msg.senderId,
                    senderName: msg.senderName,
                    senderAvatar: msg.senderAvatar,
                    content: msg.content,
                    type: msg.type,
                    timestamp: msg.timestamp,
                    editedAt: msg.editedAt,
                    metadata: msg.metadata ? JSON.parse(msg.metadata) : null,
                })),
                conversation: conversation[0],
                total: conversationMessages.length,
                hasMore: conversationMessages.length === limit,
            }
        });

    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

// POST send a new message
export async function POST(request) {
    try {
        const { action, conversationId, senderId, content, type = 'text', metadata } = await request.json();

        if (action === 'markAsRead') {
            return await markMessagesAsRead(conversationId, senderId);
        }

        if (!conversationId || !senderId || !content) {
            return NextResponse.json({
                error: "Conversation ID, sender ID, and content are required"
            }, { status: 400 });
        }

        const db = getDB();

        // Verify user has access to this conversation
        const userAccess = await db
            .select()
            .from(conversationParticipants)
            .where(
                and(
                    eq(conversationParticipants.conversationId, conversationId),
                    eq(conversationParticipants.userId, senderId),
                    eq(conversationParticipants.isActive, true)
                )
            )
            .limit(1);

        if (userAccess.length === 0) {
            return NextResponse.json({
                error: "Access denied to this conversation"
            }, { status: 403 });
        }

        // Create message
        const messageId = generateSimpleId();
        const timestamp = new Date();

        const newMessage = await db.insert(messages).values({
            id: messageId,
            conversationId,
            senderId,
            content,
            type,
            timestamp,
            metadata: metadata ? JSON.stringify(metadata) : null,
        }).returning();

        // Update conversation last activity and last message
        await db.update(conversations)
            .set({
                lastMessageId: messageId,
                lastActivity: timestamp,
            })
            .where(eq(conversations.id, conversationId));

        // Get sender info for response
        const senderInfo = await db
            .select({
                id: users.id,
                name: users.name,
                avatar: users.avatar,
            })
            .from(users)
            .where(eq(users.id, senderId))
            .limit(1);

        const messageWithSender = {
            ...newMessage[0],
            senderName: senderInfo[0]?.name,
            senderAvatar: senderInfo[0]?.avatar,
            metadata: metadata || null,
        };

        return NextResponse.json({
            success: true,
            data: { message: messageWithSender }
        }, { status: 201 });

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}

// Helper function to mark messages as read
async function markMessagesAsRead(conversationId, userId) {
    try {
        const db = getDB();

        // Update user's last read timestamp
        const timestamp = new Date();
        await db.update(conversationParticipants)
            .set({ lastRead: timestamp })
            .where(
                and(
                    eq(conversationParticipants.conversationId, conversationId),
                    eq(conversationParticipants.userId, userId)
                )
            );

        return NextResponse.json({
            success: true,
            data: { lastRead: timestamp }
        });

    } catch (error) {
        console.error("Error marking messages as read:", error);
        return NextResponse.json({ error: "Failed to mark messages as read" }, { status: 500 });
    }
}
