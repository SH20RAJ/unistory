import { NextResponse } from "next/server";
import { and, eq, desc, sql, or } from "drizzle-orm";
import { conversations, conversationParticipants, messages, users } from "@/db/schema";
import { getDB } from "@/db";
import { generateSimpleId } from '@/utils/idGenerator';

// GET conversations for a user
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const limit = parseInt(searchParams.get('limit')) || 50;
        const type = searchParams.get('type'); // 'direct', 'group', 'anonymous'

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const db = getDB();

        // Get conversations where user is a participant
        let conversationsQuery = db
            .select({
                id: conversations.id,
                type: conversations.type,
                name: conversations.name,
                avatar: conversations.avatar,
                lastMessageId: conversations.lastMessageId,
                lastActivity: conversations.lastActivity,
                isArchived: conversations.isArchived,
                createdAt: conversations.createdAt,
                // Participant info
                userRole: conversationParticipants.role,
                userJoinedAt: conversationParticipants.joinedAt,
                userLastRead: conversationParticipants.lastRead,
            })
            .from(conversations)
            .innerJoin(
                conversationParticipants,
                eq(conversations.id, conversationParticipants.conversationId)
            )
            .where(
                and(
                    eq(conversationParticipants.userId, userId),
                    eq(conversationParticipants.isActive, true),
                    eq(conversations.isArchived, false)
                )
            )
            .orderBy(desc(conversations.lastActivity))
            .limit(limit);

        // Filter by type if specified
        if (type) {
            conversationsQuery = conversationsQuery.where(eq(conversations.type, type));
        }

        const userConversations = await conversationsQuery;

        // Get conversation details including last message and unread count
        const conversationsWithDetails = await Promise.all(
            userConversations.map(async (conv) => {
                // Get last message
                const lastMessage = await db
                    .select({
                        id: messages.id,
                        content: messages.content,
                        type: messages.type,
                        senderId: messages.senderId,
                        timestamp: messages.timestamp,
                        senderName: users.name,
                        senderAvatar: users.avatar,
                    })
                    .from(messages)
                    .leftJoin(users, eq(messages.senderId, users.id))
                    .where(eq(messages.conversationId, conv.id))
                    .orderBy(desc(messages.timestamp))
                    .limit(1);

                // Get unread count
                const unreadCount = await db
                    .select({ count: sql`count(*)` })
                    .from(messages)
                    .where(
                        and(
                            eq(messages.conversationId, conv.id),
                            conv.userLastRead
                                ? sql`${messages.timestamp} > ${conv.userLastRead}`
                                : sql`1=1`
                        )
                    );

                // Get other participants for direct conversations
                let otherParticipants = [];
                if (conv.type === 'direct') {
                    otherParticipants = await db
                        .select({
                            id: users.id,
                            name: users.name,
                            avatar: users.avatar,
                            major: users.major,
                            isVerified: users.isVerified,
                            lastSeen: users.lastSeen,
                        })
                        .from(users)
                        .innerJoin(conversationParticipants, eq(users.id, conversationParticipants.userId))
                        .where(
                            and(
                                eq(conversationParticipants.conversationId, conv.id),
                                sql`${conversationParticipants.userId} != ${userId}`,
                                eq(conversationParticipants.isActive, true)
                            )
                        );
                }

                // Get member count for group conversations
                let memberCount = 0;
                if (conv.type === 'group') {
                    const memberCountResult = await db
                        .select({ count: sql`count(*)` })
                        .from(conversationParticipants)
                        .where(
                            and(
                                eq(conversationParticipants.conversationId, conv.id),
                                eq(conversationParticipants.isActive, true)
                            )
                        );
                    memberCount = memberCountResult[0]?.count || 0;
                }

                const lastMsg = lastMessage[0];
                const unread = unreadCount[0]?.count || 0;
                const otherUser = otherParticipants[0];

                return {
                    id: conv.id,
                    type: conv.type,
                    name: conv.type === 'direct' ? otherUser?.name : conv.name,
                    avatar: conv.type === 'direct' ? otherUser?.avatar : conv.avatar,
                    lastMessage: lastMsg ? {
                        id: lastMsg.id,
                        content: lastMsg.content,
                        type: lastMsg.type,
                        senderId: lastMsg.senderId,
                        senderName: lastMsg.senderName,
                        timestamp: lastMsg.timestamp,
                    } : null,
                    lastMessageText: lastMsg?.content || '',
                    timestamp: conv.lastActivity,
                    unread: parseInt(unread),
                    online: conv.type === 'direct' ? isUserOnline(otherUser?.lastSeen) : false,
                    major: conv.type === 'direct' ? otherUser?.major : null,
                    verified: conv.type === 'direct' ? Boolean(otherUser?.isVerified) : false,
                    memberCount: conv.type === 'group' ? parseInt(memberCount) : undefined,
                    userRole: conv.userRole,
                    createdAt: conv.createdAt,
                };
            })
        );

        return NextResponse.json({
            success: true,
            data: {
                conversations: conversationsWithDetails,
                total: conversationsWithDetails.length,
            }
        });

    } catch (error) {
        console.error("Error fetching conversations:", error);
        return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
    }
}

// POST create a new conversation
export async function POST(request) {
    try {
        const { type, participantIds, name, avatar } = await request.json();

        if (!type || !participantIds || !Array.isArray(participantIds) || participantIds.length < 2) {
            return NextResponse.json({
                error: "Type and at least 2 participants are required"
            }, { status: 400 });
        }

        if (type === 'direct' && participantIds.length !== 2) {
            return NextResponse.json({
                error: "Direct conversations must have exactly 2 participants"
            }, { status: 400 });
        }

        if (type === 'group' && !name) {
            return NextResponse.json({
                error: "Group conversations must have a name"
            }, { status: 400 });
        }

        const db = getDB();

        // Check if direct conversation already exists
        if (type === 'direct') {
            const existingConversation = await db
                .select({ id: conversations.id })
                .from(conversations)
                .innerJoin(conversationParticipants, eq(conversations.id, conversationParticipants.conversationId))
                .where(
                    and(
                        eq(conversations.type, 'direct'),
                        or(
                            eq(conversationParticipants.userId, participantIds[0]),
                            eq(conversationParticipants.userId, participantIds[1])
                        )
                    )
                )
                .groupBy(conversations.id)
                .having(sql`count(*) = 2`);

            if (existingConversation.length > 0) {
                return NextResponse.json({
                    success: true,
                    data: { conversationId: existingConversation[0].id },
                    message: "Conversation already exists"
                });
            }
        }

        // Create conversation
        const conversationId = generateSimpleId();
        const newConversation = await db.insert(conversations).values({
            id: conversationId,
            type,
            name: type === 'group' ? name : null,
            avatar: type === 'group' ? avatar : null,
            lastActivity: new Date(),
            createdAt: new Date(),
        }).returning();

        // Add participants
        const participantRecords = participantIds.map((userId, index) => ({
            id: generateSimpleId(),
            conversationId,
            userId,
            role: index === 0 ? 'admin' : 'member', // First participant is admin for groups
            joinedAt: new Date(),
        }));

        await db.insert(conversationParticipants).values(participantRecords);

        return NextResponse.json({
            success: true,
            data: {
                conversation: newConversation[0],
                conversationId,
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating conversation:", error);
        return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
    }
}

// Helper function to check if user is online
function isUserOnline(lastSeen) {
    if (!lastSeen) return false;
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const timeDifference = now - lastSeenDate;
    return timeDifference < 5 * 60 * 1000; // Consider online if last seen within 5 minutes
}
