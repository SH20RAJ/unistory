import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { messages, conversationParticipants } from "@/db/schema";
import { getDB } from "@/db";

// PUT update/edit a message
export async function PUT(request, { params }) {
    try {
        const messageId = params.id;
        const { userId, content, action } = await request.json();

        if (!messageId || !userId) {
            return NextResponse.json({
                error: "Message ID and User ID are required"
            }, { status: 400 });
        }

        const db = getDB();

        // Get the message to verify ownership and get conversation ID
        const message = await db
            .select()
            .from(messages)
            .where(eq(messages.id, messageId))
            .limit(1);

        if (message.length === 0) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        const messageData = message[0];

        // Verify user owns the message
        if (messageData.senderId !== userId) {
            return NextResponse.json({
                error: "You can only edit your own messages"
            }, { status: 403 });
        }

        // Verify user still has access to the conversation
        const userAccess = await db
            .select()
            .from(conversationParticipants)
            .where(
                and(
                    eq(conversationParticipants.conversationId, messageData.conversationId),
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

        let updateData = {};

        if (action === 'edit') {
            if (!content || content.trim() === '') {
                return NextResponse.json({
                    error: "Content is required for editing"
                }, { status: 400 });
            }
            updateData = {
                content: content.trim(),
                editedAt: new Date(),
            };
        } else if (action === 'delete') {
            updateData = {
                isDeleted: true,
                content: '[This message was deleted]',
                editedAt: new Date(),
            };
        } else {
            return NextResponse.json({
                error: "Invalid action. Use 'edit' or 'delete'"
            }, { status: 400 });
        }

        // Update the message
        const updatedMessage = await db.update(messages)
            .set(updateData)
            .where(eq(messages.id, messageId))
            .returning();

        return NextResponse.json({
            success: true,
            data: { message: updatedMessage[0] }
        });

    } catch (error) {
        console.error("Error updating message:", error);
        return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
    }
}

// DELETE permanently delete a message (admin only)
export async function DELETE(request, { params }) {
    try {
        const messageId = params.id;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const isAdmin = searchParams.get('isAdmin') === 'true';

        if (!messageId || !userId) {
            return NextResponse.json({
                error: "Message ID and User ID are required"
            }, { status: 400 });
        }

        const db = getDB();

        // Get the message
        const message = await db
            .select()
            .from(messages)
            .where(eq(messages.id, messageId))
            .limit(1);

        if (message.length === 0) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        const messageData = message[0];

        // Only allow deletion if user owns the message or is admin
        if (messageData.senderId !== userId && !isAdmin) {
            return NextResponse.json({
                error: "You can only delete your own messages"
            }, { status: 403 });
        }

        // Permanently delete the message
        await db.delete(messages).where(eq(messages.id, messageId));

        return NextResponse.json({
            success: true,
            data: { messageId }
        });

    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }
}
