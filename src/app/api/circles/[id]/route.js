import { getDB } from '@/db';
import { circles, users, posts, circleMemberships } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export async function GET(request, { params }) {
    const db = getDB();
    try {
        const { id } = await params;

        // Fetch circle details
        const circle = await db
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
                }
            })
            .from(circles)
            .leftJoin(users, eq(circles.createdBy, users.id))
            .where(eq(circles.id, id))
            .limit(1);

        if (circle.length === 0) {
            return Response.json(
                { success: false, error: 'Circle not found' },
                { status: 404 }
            );
        }

        // Fetch circle members
        const members = await db
            .select({
                id: users.id,
                username: users.username,
                name: users.name,
                avatar: users.avatar,
                role: circleMemberships.role,
                joinedAt: circleMemberships.joinedAt
            })
            .from(circleMemberships)
            .leftJoin(users, eq(circleMemberships.userId, users.id))
            .where(eq(circleMemberships.circleId, id))
            .orderBy(circleMemberships.joinedAt);

        // Fetch circle posts
        const circlePosts = await db
            .select({
                id: posts.id,
                content: posts.content,
                type: posts.type,
                mood: posts.mood,
                tags: posts.tags,
                createdAt: posts.createdAt,
                authorId: posts.authorId,
                user: {
                    id: users.id,
                    username: users.username,
                    name: users.name,
                    avatar: users.avatar
                }
            })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .where(eq(posts.circleId, id))
            .orderBy(desc(posts.createdAt))
            .limit(20);

        return Response.json({
            success: true,
            data: {
                circle: circle[0],
                members,
                posts: circlePosts
            }
        });
    } catch (error) {
        console.error('Error fetching circle details:', error);
        return Response.json(
            { success: false, error: 'Failed to fetch circle details' },
            { status: 500 }
        );
    }
}
