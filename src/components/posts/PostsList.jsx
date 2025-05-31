"use client";

import { useState } from "react";
import { PostCard } from "./PostCard";

/**
 * PostsList Component
 * Renders a list of posts with the ability to filter
 */
export function PostsList({
  posts,
  currentUser,
  onLike,
  onComment,
  onShare,
  onBookmark
}) {
  // You can add filtering, sorting, and pagination logic here

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onBookmark={onBookmark}
        />
      ))}

      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts to display</p>
        </div>
      )}
    </div>
  );
}
