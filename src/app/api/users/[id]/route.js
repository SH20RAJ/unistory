import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/users/[id] - Get user profile by ID
export async function GET(request, { params }) {
    const db = getDB();
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
        }

        const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

        if (user.length === 0) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        // For security, don't return sensitive info in public profile views
        const { password, ...safeUser } = user[0];

        return NextResponse.json({ success: true, data: safeUser });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch user profile" }, { status: 500 });
    }
}

// PATCH /api/users/[id] - Update user profile
export async function PATCH(request, { params }) {
    const db = getDB();
    try {
        const { id } = await params;
        const updates = await request.json();

        if (!id) {
            return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
        }

        // Remove fields that shouldn't be updated via this endpoint
        const { id: _, email: __, createdAt: ___, updatedAt: ____, ...allowedUpdates } = updates;

        if (Object.keys(allowedUpdates).length === 0) {
            return NextResponse.json({ success: false, error: "No valid updates provided" }, { status: 400 });
        }

        // Add updatedAt timestamp
        allowedUpdates.updatedAt = new Date().toISOString();

        const updatedUser = await db
            .update(users)
            .set(allowedUpdates)
            .where(eq(users.id, id))
            .returning();

        if (updatedUser.length === 0) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        // Remove sensitive data from response
        const { password, ...safeUser } = updatedUser[0];

        return NextResponse.json({ success: true, data: safeUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json({ success: false, error: "Failed to update user profile" }, { status: 500 });
    }
}
