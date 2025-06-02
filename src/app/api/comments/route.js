import { NextResponse } from "next/server";
import { getDB } from "@/db";
import { comments, posts, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, desc, and, isNull } from "drizzle-orm";
import { generateId } from "@/utils/idGenerator";

/**
 * GET /api/comments
 * Fetch comments for a specific post
 */
export async function GET(request) {
  try {
    const db = getDB();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const parentId = searchParams.get("parentId");

    if (!postId) {
      return NextResponse.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }

    // Build query to fetch comments
    let whereClause = and(
      eq(comments.postId, postId),
      eq(comments.status, "active")
    );

    // If parentId is specified, get replies to that comment
    // If parentId is null, get top-level comments
    if (parentId) {
      whereClause = and(whereClause, eq(comments.parentId, parentId));
    } else {
      whereClause = and(whereClause, isNull(comments.parentId));
    }

    const result = await db
      .select({
        id: comments.id,
        postId: comments.postId,
        authorId: comments.authorId,
        parentId: comments.parentId,
        content: comments.content,
        isAnonymous: comments.isAnonymous,
        likes: comments.likes,
        status: comments.status,
        createdAt: comments.createdAt,
        // Include author info if not anonymous
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          avatar: users.avatar
        }
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(whereClause)
      .orderBy(desc(comments.createdAt));

    return NextResponse.json({
      success: true,
      data: {
        comments: result,
        postId,
        parentId
      }
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/comments
 * Create a new comment or reply
 */
export async function POST(request) {
  try {
    const db = getDB();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      postId,
      content,
      parentId = null,
      isAnonymous = false
    } = body;

    if (!postId || !content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Post ID and content are required" },
        { status: 400 }
      );
    }

    // Verify the post exists and allows comments
    const post = await db
      .select({
        id: posts.id,
        allowComments: posts.allowComments,
        status: posts.status
      })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    if (post[0].status !== "active") {
      return NextResponse.json(
        { success: false, message: "Post is not active" },
        { status: 403 }
      );
    }

    if (!post[0].allowComments) {
      return NextResponse.json(
        { success: false, message: "Comments are not allowed on this post" },
        { status: 403 }
      );
    }

    // If this is a reply, verify the parent comment exists
    if (parentId) {
      const parentComment = await db
        .select({ id: comments.id })
        .from(comments)
        .where(and(
          eq(comments.id, parentId),
          eq(comments.postId, postId),
          eq(comments.status, "active")
        ))
        .limit(1);

      if (parentComment.length === 0) {
        return NextResponse.json(
          { success: false, message: "Parent comment not found" },
          { status: 404 }
        );
      }
    }

    // Get user from database to get their actual user ID
    const userResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users?email=${encodeURIComponent(session.user.email)}`
    );

    let authorId = session.user.id;
    if (userResponse.ok) {
      const userData = await userResponse.json();
      authorId = userData.data.id;
    }

    const commentId = generateId("comment");

    const newComment = {
      id: commentId,
      postId,
      authorId: isAnonymous ? null : authorId,
      parentId: parentId || null,
      content: content.trim(),
      isAnonymous,
      likes: 0,
      status: "active",
      createdAt: new Date()
    };

    const result = await db.insert(comments).values(newComment).returning();

    // Update the post's comment count
    await db
      .update(posts)
      .set({
        comments: posts.comments + 1,
        updatedAt: new Date()
      })
      .where(eq(posts.id, postId));

    return NextResponse.json({
      success: true,
      message: "Comment created successfully",
      data: result[0]
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create comment" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/comments
 * Delete a comment (soft delete by setting status to "deleted")
 */
export async function DELETE(request) {
  try {
    const db = getDB();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("id");

    if (!commentId) {
      return NextResponse.json(
        { success: false, message: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Get user from database to verify ownership
    const userResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users?email=${encodeURIComponent(session.user.email)}`
    );

    let userId = session.user.id;
    if (userResponse.ok) {
      const userData = await userResponse.json();
      userId = userData.data.id;
    }

    // Verify the comment exists and belongs to the user
    const comment = await db
      .select({
        id: comments.id,
        authorId: comments.authorId,
        postId: comments.postId,
        status: comments.status
      })
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (comment.length === 0) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    if (comment[0].authorId !== userId) {
      return NextResponse.json(
        { success: false, message: "Not authorized to delete this comment" },
        { status: 403 }
      );
    }

    if (comment[0].status === "deleted") {
      return NextResponse.json(
        { success: false, message: "Comment already deleted" },
        { status: 410 }
      );
    }

    // Soft delete the comment
    await db
      .update(comments)
      .set({
        status: "deleted",
        content: "[Comment deleted by user]"
      })
      .where(eq(comments.id, commentId));

    // Decrease the post's comment count
    await db
      .update(posts)
      .set({
        comments: Math.max(0, posts.comments - 1),
        updatedAt: new Date()
      })
      .where(eq(posts.id, comment[0].postId));

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
