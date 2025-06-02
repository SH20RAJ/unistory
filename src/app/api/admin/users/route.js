import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { users, userStats, auditLog } from "@/db/schema";
import { eq, desc, and, or, like, count, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(request) {
    try {
        const db = getDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search');

        // Build filter conditions
        let conditions = [];

        if (status && status !== 'all') {
            conditions.push(eq(users.status, status));
        }

        if (search) {
            conditions.push(
                or(
                    like(users.name, `%${search}%`),
                    like(users.email, `%${search}%`),
                    like(users.username, `%${search}%`)
                )
            );
        }

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        // Fetch users with their stats
        const usersData = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                username: users.username,
                status: users.status,
                joinedDate: users.joinedDate,
                lastActive: users.lastActive,
                university: users.university,
                major: users.major,
                year: users.year,
                avatar: users.avatar,
                postsCount: userStats.postsCount,
                connectionsCount: userStats.connectionsCount,
            })
            .from(users)
            .leftJoin(userStats, eq(users.id, userStats.userId))
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(desc(users.joinedDate))
            .limit(limit)
            .offset(offset);

        // Get total count for pagination
        const totalCountResult = await db
            .select({ count: count() })
            .from(users)
            .where(conditions.length > 0 ? and(...conditions) : undefined);

        const total = totalCountResult[0].count;

        // Format the response to match the mock data structure
        const formattedUsers = usersData.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            joinDate: new Date(user.joinedDate).toISOString().split('T')[0],
            posts: user.postsCount || 0,
            reports: 0, // This would need a separate query to count reports
            warnings: 0, // This would need a separate query or field
            lastActive: user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never',
            university: user.university,
            major: user.major,
            year: user.year
        }));

        return NextResponse.json({
            success: true,
            data: {
                users: formattedUsers,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function PATCH(request) {
    try {
        const db = getDB();
        const body = await request.json();
        const { userId, status, adminId, reason } = body;

        if (!userId || !status) {
            return NextResponse.json(
                { success: false, error: 'User ID and status are required' },
                { status: 400 }
            );
        }

        // Update the user status
        const updatedUser = await db
            .update(users)
            .set({
                status,
                updatedAt: new Date()
            })
            .where(eq(users.id, userId))
            .returning();

        if (updatedUser.length === 0) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        // Log the admin action
        if (adminId) {
            await db.insert(auditLog).values({
                id: nanoid(),
                adminId,
                action: `Changed user status to ${status}`,
                targetType: 'user',
                targetId: userId,
                details: JSON.stringify({ reason, oldStatus: updatedUser[0].status, newStatus: status }),
                createdAt: new Date()
            });
        }

        return NextResponse.json({
            success: true,
            data: updatedUser[0]
        });

    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update user' },
            { status: 500 }
        );
    }
}
