"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Comment } from "./Comment";
import { Send } from "lucide-react";

/**
 * CommentsList Component
 * Renders a list of comments with replies
 */
export function CommentsList({
  comments = [],
  currentUser,
  onAddComment,
  onLike,
  onReply,
  onDelete
}) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    if (onAddComment) {
      onAddComment(newComment);
    }
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      {onAddComment && (
        <form className="flex gap-3" onSubmit={handleSubmitComment}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="min-h-0 h-10 py-2 resize-none flex-1 rounded-r-none"
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 rounded-l-none"
              disabled={!newComment.trim() || isSubmitting}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              onLike={onLike}
              onReply={onReply}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}
