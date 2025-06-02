"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MediaGallery } from "@/components/media/MediaGallery";
import { CommentsList } from "@/components/comments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MessageSquare,
  Share,
  Bookmark,
  MoreHorizontal,
  Users,
  Share2,
  Flag,
  EyeOff,
  UserMinus,
  Copy,
  ExternalLink
} from "lucide-react";
import { parseHashtags } from "@/utils/hashtagParser";

/**
 * PostCard Component
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
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [showComments, setShowComments] = useState(showCommentForm);
  const [showShareMenu, setShowShareMenu] = useState(false);

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
    // Open native share if available
    if (navigator.share) {
      navigator.share({
        title: `Story by ${post.author.name}`,
        text: post.content,
        url: `${window.location.origin}/post/${post.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    }
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
    if (onComment && !showComments) onComment(post.id);
  };

  const handlePostClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button') || e.target.closest('a')) return;
    router.push(`/post/${post.id}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
  };

  const handleReport = () => {
    // TODO: Implement report functionality
    console.log('Report post:', post.id);
  };

  const handleHide = () => {
    // TODO: Implement hide post functionality
    console.log('Hide post:', post.id);
  };

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={handlePostClick}>
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Link href={`/profile/${post.author.id}`} onClick={(e) => e.stopPropagation()}>
          <Avatar className="h-10 w-10 hover:ring-2 hover:ring-blue-200 transition-all">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div>
              <Link
                href={`/profile/${post.author.id}`}
                className="font-semibold text-sm hover:underline"
                onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Users className="h-3 w-3" />
                      {post.circleName}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleCopyLink(); }}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/post/${post.id}`); }}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View story
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleBookmark(); }}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  {isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleHide(); }}>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide this story
                </DropdownMenuItem>
                {currentUser?.id !== post.author.id && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleReport(); }}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report story
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserMinus className="mr-2 h-4 w-4" />
                      Unfollow {post.author.name}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="text-sm mt-1 whitespace-pre-wrap">
            {parseHashtags(post.content)}
          </div>
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
            className={`rounded-full h-8 w-8 ${isLiked ? 'text-red-500' : ''} hover:bg-red-50 hover:text-red-500`}
            onClick={(e) => { e.stopPropagation(); handleLike(); }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <span className="text-sm font-medium">{likeCount}</span>

          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8 ml-2 hover:bg-blue-50 hover:text-blue-500" 
            onClick={(e) => { e.stopPropagation(); handleCommentClick(); }}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{post.comments || 0}</span>

          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8 ml-2 hover:bg-green-50 hover:text-green-500" 
            onClick={(e) => { e.stopPropagation(); handleShare(); }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full h-8 w-8 ${isBookmarked ? 'text-blue-500' : ''} hover:bg-blue-50 hover:text-blue-500`}
          onClick={(e) => { e.stopPropagation(); handleBookmark(); }}
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
