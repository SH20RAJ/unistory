"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

/**
 * CommentReplyForm Component
 * A form for replying to comments
 */
export function CommentReplyForm({ currentUser, onSubmit, onCancel }) {
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    onSubmit(replyText);
    setReplyText('');
    setIsSubmitting(false);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 flex">
        <Textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          className="min-h-0 h-8 py-1 text-sm resize-none flex-1 rounded-r-none"
        />
        <Button
          type="submit"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          disabled={!replyText.trim() || isSubmitting}
        >
          <Send className="h-3 w-3" />
        </Button>
      </div>

      {onCancel && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 px-2"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
    </form>
  );
}
