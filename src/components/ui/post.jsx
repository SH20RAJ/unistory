"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MediaGallery, MediaUpload } from "@/components/ui/media";
import {
    Heart,
    MessageSquare,
    Share,
    Bookmark,
    MoreHorizontal,
    Image as ImageIcon,
    Film,
    Mic,
    Send,
    X,
    LucideIcon,
    Loader2
} from "lucide-react";
import { parseHashtags } from "@/utils/hashtagParser";

/**
 * Post Component
 * A versatile social media post component with media support
 */
export function Post({
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
    const [commentText, setCommentText] = useState('');
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

    const handleComment = () => {
        if (!commentText.trim()) return;

        if (onComment) {
            onComment(post.id, commentText);
        }

        setCommentText('');
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="pt-4 pb-0">
                <div className="flex justify-between">
                    <Link href={`/profile/${post.author.id}`} className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                            <div className="font-medium flex items-center">
                                {post.author.name}
                                {post.author.isVerified && (
                                    <span className="ml-1 text-blue-500 text-xs">✓</span>
                                )}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}

                                {post.audience && (
                                    <span className="flex items-center ml-1">
                                        <span className="mx-1">•</span>
                                        {post.audience}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>

                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="pt-3">
                {post.content && (
                    <div className="text-base mb-4">
                        {parseHashtags(post.content)}
                    </div>
                )}

                {post.media && post.media.length > 0 && (
                    <div className="mt-2 mb-4">
                        <MediaGallery items={post.media} />
                    </div>
                )}

                {post.topics && post.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {post.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                                #{topic}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-0 pb-3 flex flex-col">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
                            onClick={handleLike}
                        >
                            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-red-500' : ''}`} />
                            {likeCount > 0 && <span>{likeCount}</span>}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center text-gray-600"
                            onClick={() => setShowComments(!showComments)}
                        >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.comments > 0 && <span>{post.comments}</span>}
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600">
                            <Share className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600"
                            onClick={handleBookmark}
                        >
                            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-gray-600' : ''}`} />
                        </Button>
                    </div>
                </div>

                {showComments && (
                    <div className="mt-3 pt-3 border-t w-full">
                        <div className="flex items-start space-x-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                                <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 relative">
                                <Textarea
                                    placeholder="Write a comment..."
                                    className="min-h-[40px] py-2 pr-10 text-sm resize-none"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full"
                                    disabled={!commentText.trim()}
                                    onClick={handleComment}
                                >
                                    <Send className={`h-4 w-4 ${commentText.trim() ? 'text-blue-500' : 'text-gray-400'}`} />
                                </Button>
                            </div>
                        </div>

                        {post.commentPreviews && post.commentPreviews.length > 0 && (
                            <div className="mt-3 space-y-3">
                                {post.commentPreviews.map((comment) => (
                                    <div key={comment.id} className="flex items-start space-x-2">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
                                                <div className="font-medium text-xs">{comment.user.name}</div>
                                                <div className="text-sm">{comment.content}</div>
                                            </div>

                                            <div className="flex items-center mt-1 space-x-3">
                                                <button className="text-xs text-gray-500">Like</button>
                                                <button className="text-xs text-gray-500">Reply</button>
                                                <span className="text-xs text-gray-500">
                                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {post.comments > post.commentPreviews.length && (
                                    <Link href={`/post/${post.id}`} className="text-sm text-blue-600 block mt-2">
                                        View all {post.comments} comments
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

/**
 * CreatePostForm Component
 * A form for creating a new post with media upload capabilities
 */
export function CreatePostForm({
    onSubmit,
    currentUser,
    placeholder = "What's on your mind?",
    inCircle = null
}) {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Use the currentUser from props or from a global state/context
    const user = currentUser || {
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You"
    };

    const handleMediaUpload = (uploadedMedia) => {
        setMedia(uploadedMedia.map(item => ({
            id: item.id,
            type: item.file.type.split('/')[0],
            src: URL.createObjectURL(item.file),
            title: item.file.name
        })));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim() && media.length === 0) return;

        setIsSubmitting(true);

        // In a real app, you would upload the media files to your storage
        const postData = {
            content: content.trim(),
            media,
        };

        if (inCircle) {
            postData.circleName = inCircle;
            postData.isInCircle = true;
        }

        onSubmit(postData);

        // Reset the form
        setContent('');
        setMedia([]);
        setIsExpanded(false);
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <div
                        className={`rounded-full border bg-background px-4 py-2 text-sm ${isExpanded ? 'rounded-b-none' : ''
                            }`}
                        onClick={() => setIsExpanded(true)}
                    >
                        {!isExpanded ? (
                            <div className="text-muted-foreground">{placeholder}</div>
                        ) : (
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={placeholder}
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none mt-2 p-0 min-h-20"
                                autoFocus
                            />
                        )}
                    </div>

                    {isExpanded && (
                        <div className="border border-t-0 rounded-b-lg p-3 space-y-3">
                            {media.length > 0 && (
                                <div className="mt-2">
                                    <MediaGallery media={media} />
                                </div>
                            )}

                            <div className="flex flex-wrap justify-between items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <MediaUpload
                                        onUpload={handleMediaUpload}
                                        maxFiles={4}
                                        allowedTypes={["image", "video", "audio"]}
                                    >
                                        <Button type="button" variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                                            <ImageIcon className="h-4 w-4" />
                                            <span className="sr-only md:not-sr-only">Photo</span>
                                        </Button>
                                    </MediaUpload>

                                    <MediaUpload
                                        onUpload={handleMediaUpload}
                                        maxFiles={1}
                                        allowedTypes={["video"]}
                                    >
                                        <Button type="button" variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                                            <Film className="h-4 w-4" />
                                            <span className="sr-only md:not-sr-only">Video</span>
                                        </Button>
                                    </MediaUpload>

                                    <MediaUpload
                                        onUpload={handleMediaUpload}
                                        maxFiles={1}
                                        allowedTypes={["audio"]}
                                    >
                                        <Button type="button" variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                                            <Mic className="h-4 w-4" />
                                            <span className="sr-only md:not-sr-only">Audio</span>
                                        </Button>
                                    </MediaUpload>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsExpanded(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        disabled={(!content.trim() && media.length === 0) || isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Posting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Post
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
