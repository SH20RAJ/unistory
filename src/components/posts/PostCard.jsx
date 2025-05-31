"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MediaGallery } from "@/components/media/MediaGallery";
import { CommentsList } from "@/components/comments";
import {
  Heart,
  MessageSquare,
  Share,
  Bookmark,
  MoreHorizontal,
  Users
} from "lucide-react";

/**
 * Post Component
 * A versatile social media post component with media support
 */
export function PostCard({
  post,
  currentUser,
  onLike,
  onComment,
  onShare,
  onBookmark,
  showCommentForm = false
}) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [showComments, setShowComments] = useState(showCommentForm);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    if (onLike) onLike(post.id, !isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark(post.id, !isBookmarked);
  };

  const handleShare = () => {
    if (onShare) onShare(post.id);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
    if (onComment && !showComments) onComment(post.id);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div>
              <Link
                href={`/profile/${post.author.id}`}
                className="font-semibold text-sm hover:underline"
              >
                {post.author.name}
              </Link>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}

                {post.isInCircle && (
                  <>
                    <span className="mx-1">•</span>
                    <Link
                      href={`/circles/${post.circleId || 'circle1'}`}
                      className="hover:underline inline-flex items-center gap-1"
                    >
                      <Users className="h-3 w-3" />
                      {post.circleName}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm mt-1 whitespace-pre-wrap">{post.content}</p>
        </div>
      </CardHeader>

      {post.media && post.media.length > 0 && (
        <CardContent className="p-0">
          <MediaGallery media={post.media} />
        </CardContent>
      )}

      <CardFooter className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full h-8 w-8 ${isLiked ? 'text-primary' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <span className="text-sm font-medium">{likeCount}</span>

          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-2" onClick={handleCommentClick}>
            <MessageSquare className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{post.comments}</span>

          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-2" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full h-8 w-8 ${isBookmarked ? 'text-primary' : ''}`}
          onClick={handleBookmark}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>
      </CardFooter>

      {showComments && post.commentsList && (
        <div className="border-t px-4 py-3">
          <CommentsList
            comments={post.commentsList}
            postId={post.id}
            currentUser={currentUser}
          />
        </div>
      )}
    </Card>
  );
}
