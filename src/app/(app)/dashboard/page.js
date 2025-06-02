"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePosts } from "@/hooks/useSWR";
import { toast } from "sonner";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  BookOpen,
  Users,
  Zap,
  Calendar,
  TrendingUp,
  Shield,
  MoreHorizontal,
  Coffee,
  Star,
  Clock,
  Eye
} from "lucide-react";

// Import modular dashboard components
import {
  FocusSession,
  UpcomingEvents,
  StudyStreak,
  StudyBuddies,
  PersonalStats
} from "@/components/dashboard";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  // Use SWR to fetch posts data
  const { data: postsData, error: postsError, isLoading: postsLoading } = usePosts();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin?callbackUrl=/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Transform posts data when it changes
  useEffect(() => {
    if (postsData) {
      // Transform API data to match component expectations
      const transformedPosts = postsData.map(post => ({
        id: post.id,
        type: post.type || 'social',
        content: post.content,
        author: post.user?.name || 'Anonymous',
        authorId: post.authorId,
        authorAvatar: post.user?.avatar,
        authorInitials: post.user?.name?.split(' ').map(n => n[0]).join('') ||
          post.user?.username?.slice(0, 2).toUpperCase() || 'UN',
        timestamp: formatTimeAgo(new Date(post.createdAt)),
        likes: parseInt(post.likeCount) || 0,
        comments: parseInt(post.commentCount) || 0,
        isLiked: false, // Could be enhanced with user-specific data
        mood: post.mood || null,
        tags: post.tags || null,
        circleId: post.circleId || null,
        circleName: post.circle?.name
      }));
      setPosts(transformedPosts);
    }
  }, [postsData]);

  // Show error toast if posts fetch fails
  useEffect(() => {
    if (postsError) {
      console.error('Error fetching posts:', postsError);
      toast.error("Failed to load posts. Please try again later.");
    }
  }, [postsError]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const PostCard = ({ post }) => {
    const getPostTypeColor = (type) => {
      switch (type) {
        case 'confession': return 'border-l-purple-500';
        case 'study': return 'border-l-green-500';
        case 'event': return 'border-l-blue-500';
        case 'social': return 'border-l-orange-500';
        default: return 'border-l-gray-500';
      }
    };

    const getPostTypeIcon = (type) => {
      switch (type) {
        case 'confession': return <Shield className="w-5 h-5 text-purple-500" />;
        case 'study': return <BookOpen className="w-5 h-5 text-green-500" />;
        case 'event': return <Calendar className="w-5 h-5 text-blue-500" />;
        default: return <MessageCircle className="w-5 h-5 text-orange-500" />;
      }
    };

    return (
      <Card className={`border-l-4 ${getPostTypeColor(post.type)}`}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            {post.anonymous ? (
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            ) : (
              <Avatar>
                <AvatarFallback className="bg-blue-500 text-white">
                  {post.authorInitials}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                {getPostTypeIcon(post.type)}
                <div className="font-medium">
                  {post.anonymous ? 'Anonymous Confession' : post.author}
                </div>
                {post.mood && <span className="text-lg">{post.mood}</span>}
                {post.trending && (
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {post.major && `${post.major} • `}{post.timestamp}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{post.content}</p>

          {post.imageUrl && (
            <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt="Post image"
                width={800}
                height={400}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {post.videoUrl && (
            <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <video
                src={post.videoUrl}
                controls
                className="w-full h-auto max-h-96"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {post.eventDate && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{post.eventDate}</span>
                {post.location && (
                  <>
                    <span>•</span>
                    <span>{post.location}</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            {post.type === 'study' && (
              <Badge variant="secondary">Study Group</Badge>
            )}
            {post.type === 'event' && (
              <Badge variant="secondary">Campus Event</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-4">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={post.isLiked ? "text-red-500" : ""}
            >
              <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            <span>{Math.floor(Math.random() * 500) + 100}</span>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Input
                placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'there'}?`}
                className="flex-1 bg-gray-100 dark:bg-gray-700 border-0"
              />
              <Button>Post</Button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Shield className="w-4 h-4 mr-1" />
                  Confession
                </Button>
                <Button variant="ghost" size="sm">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Study Group
                </Button>
                <Button variant="ghost" size="sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Event
                </Button>
              </div>
              <Badge variant="outline" className="text-xs">
                😊 Feeling good
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        {postsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No posts yet. Be the first to share something!</p>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Load More Posts</Button>
        </div>
      </div>

      {/* Right Sidebar - Clean Modular Components */}
      <div className="lg:col-span-1 space-y-6">
        <FocusSession />
        <UpcomingEvents />
        <StudyStreak />
        <StudyBuddies />
        <PersonalStats />
      </div>
    </div>
  );
}