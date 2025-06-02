import { getDB } from '@/db';
import { circles, users, posts, circleMemberships } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { generateSimpleId } from '@/utils/idGenerator';

export async function GET() {
    try {
        const db = getDB();
        // Fetch circles with member counts and recent activity
        const circlesWithDetails = await db
            .select({
                id: circles.id,
                name: circles.name,
                description: circles.description,
                avatar: circles.avatar,
                coverImage: circles.coverImage,
                isPrivate: circles.isPrivate,
                category: circles.category,
                college: circles.college,
                memberCount: circles.memberCount,
                createdAt: circles.createdAt,
                createdBy: circles.createdBy,
                creator: {
                    id: users.id,
                    username: users.username,
                    name: users.name,
                    avatar: users.avatar
                },
                postCount: sql`(SELECT COUNT(*) FROM ${posts} WHERE ${posts.circleId} = ${circles.id})`
            })
            .from(circles)
            .leftJoin(users, eq(circles.createdBy, users.id))
            .orderBy(desc(circles.createdAt));

        return Response.json({
            success: true,
            data: circlesWithDetails
        });
    } catch (error) {
        console.error('Error fetching circles:', error);
        return Response.json(
            { success: false, error: 'Failed to fetch circles' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const db = getDB();
        const body = await request.json();
        const { name, description, avatar, coverImage, isPrivate, category, college, createdBy } = body;

        if (!name || !description || !category || !college || !createdBy) {
            return Response.json(
                { success: false, error: 'Name, description, category, college, and createdBy are required' },
                { status: 400 }
            );
        }

        const newCircle = await db.insert(circles).values({
            id: generateSimpleId('circle'),
            name,
            description,
            avatar,
            coverImage,
            isPrivate: isPrivate || false,
            category,
            college,
            createdBy,
            createdAt: new Date()
        }).returning();

        // Automatically add creator as a member
        await db.insert(circleMemberships).values({
            id: generateSimpleId('membership'),
            userId: createdBy,
            circleId: newCircle[0].id,
            role: 'owner',
            joinedAt: new Date()
        });

        return Response.json({
            success: true,
            data: newCircle[0]
        });
    } catch (error) {
        console.error('Error creating circle:', error);
        return Response.json(
            { success: false, error: 'Failed to create circle' },
            { status: 500 }
        );
    }
}
