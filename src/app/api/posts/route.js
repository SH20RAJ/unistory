import { getDB } from '@/db';
import { posts, users, likes, comments } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { generateSimpleId } from '@/utils/idGenerator';

export async function GET() {
    try {
        const db = getDB();
        // Fetch posts with user information, like counts, and comment counts
        const postsWithDetails = await db
            .select({
                id: posts.id,
                content: posts.content,
                type: posts.type,
                mood: posts.mood,
                tags: posts.tags,
                circleId: posts.circleId,
                createdAt: posts.createdAt,
                updatedAt: posts.updatedAt,
                authorId: posts.authorId,
                user: {
                    id: users.id,
                    username: users.username,
                    name: users.name,
                    avatar: users.avatar
                },
                likeCount: sql`(SELECT COUNT(*) FROM ${likes} WHERE ${likes.targetId} = ${posts.id} AND ${likes.targetType} = 'post')`,
                commentCount: sql`(SELECT COUNT(*) FROM ${comments} WHERE ${comments.postId} = ${posts.id})`
            })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .orderBy(desc(posts.createdAt))
            .limit(50);

        return Response.json({
            success: true,
            data: postsWithDetails
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return Response.json(
            { success: false, error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const db = getDB();
        const body = await request.json();
        const { content, type, mood, tags, authorId, circleId } = body;

        if (!content || !authorId) {
            return Response.json(
                { success: false, error: 'Content and authorId are required' },
                { status: 400 }
            );
        }

        // Verify that the author exists
        const author = await db.select().from(users).where(eq(users.id, authorId)).limit(1);
        if (author.length === 0) {
            return Response.json(
                { success: false, error: 'Author not found' },
                { status: 400 }
            );
        }

        // If circleId is provided, verify it exists
        if (circleId) {
            const { circles } = await import('@/db/schema');
            const circle = await db.select().from(circles).where(eq(circles.id, circleId)).limit(1);
            if (circle.length === 0) {
                return Response.json(
                    { success: false, error: 'Circle not found' },
                    { status: 400 }
                );
            }
        }

        const newPost = await db.insert(posts).values({
            id: generateSimpleId('post'),
            content,
            type: type || 'text',
            mood,
            tags,
            authorId,
            circleId: circleId || null, // Ensure null if not provided
            createdAt: new Date(),
            updatedAt: new Date()
        }).returning();

        return Response.json({
            success: true,
            data: newPost[0]
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return Response.json(
            { success: false, error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
