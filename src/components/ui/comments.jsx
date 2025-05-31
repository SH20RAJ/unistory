"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Heart, Reply, MoreHorizontal, Send, ThumbsUp, Smile } from "lucide-react";

/**
 * Comment Component
 * Renders a single comment with user info and content
 */
function Comment({
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
    const [replyText, setReplyText] = useState('');
    const [showReplies, setShowReplies] = useState(depth < 2);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        if (onLike) onLike(comment.id, !isLiked);
    };

    const handleReply = () => {
        if (!replyText.trim()) return;

        if (onReply) {
            onReply(comment.id, replyText);
        }

        setReplyText('');
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
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-semibold text-sm">
                                {comment.user.name}
                            </span>
                            {comment.user.isVerified && (
                                <span className="ml-1 text-blue-500 text-xs">✓</span>
                            )}
                            <span className="text-xs text-gray-500 ml-2">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </span>
                        </div>

                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="mt-1 text-sm">
                        {comment.content}
                    </div>

                    <div className="mt-2 flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`text-xs flex items-center ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={handleLike}
                        >
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            {likeCount > 0 && <span>{likeCount}</span>}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs flex items-center text-gray-500"
                            onClick={() => setShowReplyInput(!showReplyInput)}
                        >
                            <Reply className="h-3.5 w-3.5 mr-1" />
                            Reply
                        </Button>
                    </div>

                    {showReplyInput && (
                        <div className="mt-3 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                                <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 relative">
                                <Textarea
                                    placeholder="Write a reply..."
                                    className="min-h-[36px] py-2 pr-10 text-sm resize-none"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full"
                                    disabled={!replyText.trim()}
                                    onClick={handleReply}
                                >
                                    <Send className={`h-4 w-4 ${replyText.trim() ? 'text-blue-500' : 'text-gray-400'}`} />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Nested replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3">
                            {comment.replies.length > 3 && !showReplies && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-blue-600 hover:text-blue-700 mb-2"
                                    onClick={() => setShowReplies(true)}
                                >
                                    Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                                </Button>
                            )}

                            {showReplies && (
                                <div className="comment-thread">
                                    {comment.replies.map((reply) => (
                                        <Comment
                                            key={reply.id}
                                            comment={reply}
                                            currentUser={currentUser}
                                            onLike={onLike}
                                            onReply={onReply}
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

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        if (onAddComment) {
            onAddComment(newComment);
        }

        setNewComment('');
    };

    return (
        <div className="comments-container">
            <h3 className="text-lg font-medium mb-4">Comments</h3>

            <div className="flex items-start gap-3 mb-6">
                <Avatar>
                    <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                    <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="relative flex-1">
                    <Textarea
                        placeholder="Add a comment..."
                        className="resize-none pr-12"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                        >
                            <Smile className="h-5 w-5 text-gray-500" />
                        </Button>

                        <Button
                            variant={newComment.trim() ? "default" : "ghost"}
                            size="sm"
                            className="h-8 rounded-full"
                            disabled={!newComment.trim()}
                            onClick={handleAddComment}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            currentUser={currentUser}
                            onLike={onLike}
                            onReply={onReply}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
