import { getDB } from '@/db/index.js';
import { follows, users } from '@/db/schema.js';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth.js';
import { generateId } from '@/utils/idGenerator.js';

export async function GET(request) {
  try {
    const db = getDB();
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // 'following' or 'followers'
    const userId = url.searchParams.get('userId') || session.user.id;

    let result;
    if (type === 'following') {
      // Get users that this user is following
      result = await db
        .select({
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatar: users.avatar,
          bio: users.bio
        })
        .from(follows)
        .innerJoin(users, eq(follows.followingId, users.id))
        .where(eq(follows.followerId, userId));
    } else if (type === 'followers') {
      // Get users that follow this user
      result = await db
        .select({
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatar: users.avatar,
          bio: users.bio
        })
        .from(follows)
        .innerJoin(users, eq(follows.followerId, users.id))
        .where(eq(follows.followingId, userId));
    } else {
      return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching follows:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = getDB();
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { followingId } = await request.json();

    if (!followingId) {
      return Response.json({ error: 'followingId is required' }, { status: 400 });
    }

    if (followingId === session.user.id) {
      return Response.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    // Check if user exists
    const targetUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, followingId))
      .limit(1);

    if (targetUser.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already following
    const existingFollow = await db
      .select({ id: follows.id })
      .from(follows)
      .where(
        and(
          eq(follows.followerId, session.user.id),
          eq(follows.followingId, followingId)
        )
      )
      .limit(1);

    if (existingFollow.length > 0) {
      return Response.json({ error: 'Already following this user' }, { status: 400 });
    }

    // Create follow relationship
    const followId = generateId();
    await db.insert(follows).values({
      id: followId,
      followerId: session.user.id,
      followingId: followingId,
      createdAt: new Date().toISOString()
    });

    return Response.json({ success: true, followId });
  } catch (error) {
    console.error('Error creating follow:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const db = getDB();
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const followingId = url.searchParams.get('followingId');

    if (!followingId) {
      return Response.json({ error: 'followingId is required' }, { status: 400 });
    }

    // Delete follow relationship
    const result = await db
      .delete(follows)
      .where(
        and(
          eq(follows.followerId, session.user.id),
          eq(follows.followingId, followingId)
        )
      );

    if (result.changes === 0) {
      return Response.json({ error: 'Follow relationship not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting follow:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
