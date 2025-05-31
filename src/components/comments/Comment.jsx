"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Heart, Reply, MoreHorizontal } from "lucide-react";
import { CommentReplyForm } from "./CommentReplyForm";

/**
 * Comment Component
 * Renders a single comment with user info and content
 */
export function Comment({
  comment,
  currentUser,
  onLike,
  onReply,
  onDelete,
  depth = 0,
  showReplyForm = false,
}) {
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [showReplyInput, setShowReplyInput] = useState(showReplyForm);
  const [showReplies, setShowReplies] = useState(depth < 2);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    if (onLike) onLike(comment.id, !isLiked);
  };

  const handleReplySubmit = (replyText) => {
    if (onReply) {
      onReply(comment.id, replyText);
    }

    setShowReplyInput(false);
  };

  return (
    <div className={`comment-card ${depth > 0 ? 'ml-0 sm:ml-4 md:ml-6 mt-3' : ''}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">
                {comment.user.name}
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm mt-1">{comment.content}</p>
          </div>

          <div className="flex items-center gap-3 mt-1 px-1">
            <button
              onClick={handleLike}
              className={`text-xs flex items-center gap-1 ${isLiked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`}
            >
              <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
              {likeCount > 0 && likeCount}
            </button>

            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Reply className="h-3 w-3" /> Reply
            </button>

            <span className="text-xs text-muted-foreground">
              {/* This time will be added later */}
              {/* {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })} */}
              {new Date(comment.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          {showReplyInput && (
            <div className="mt-2">
              <CommentReplyForm
                currentUser={currentUser}
                onSubmit={handleReplySubmit}
                onCancel={() => setShowReplyInput(false)}
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {!showReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto py-1 px-2"
                  onClick={() => setShowReplies(true)}
                >
                  Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </Button>
              )}

              {showReplies && (
                <div className="space-y-2">
                  {comment.replies.map(reply => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      currentUser={currentUser}
                      onLike={onLike}
                      onReply={onReply}
                      onDelete={onDelete}
                      depth={depth + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
