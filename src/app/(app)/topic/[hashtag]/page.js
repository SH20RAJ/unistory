"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PostCard } from "@/components/posts/PostCard";
import { CreatePostForm } from "@/components/posts/CreatePostForm";
import {
  ArrowLeft,
  Hash,
  TrendingUp,
  Users,
  Plus,
  Filter,
  SortDesc,
  Bookmark,
  Share2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for hashtag posts
const MOCK_HASHTAG_POSTS = {
  "ComputerScience": [
    {
      id: "post1",
      author: {
        id: "user123",
        name: "Alex Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        isVerified: true
      },
      content: "Just finished implementing a machine learning recommendation system for my capstone project! The algorithm can predict student course preferences with 89% accuracy. #ComputerScience #MachineLearning #AI",
      media: [
        {
          id: "media1",
          type: "image",
          src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
          title: "ML Project Demo"
        }
      ],
      likes: 247,
      comments: 18,
      isLiked: false,
      isBookmarked: false,
      createdAt: "2024-06-02T14:30:00Z",
      topics: ["ComputerScience", "MachineLearning", "AI"],
      audience: "Public"
    },
    {
      id: "post2",
      author: {
        id: "user456",
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        isVerified: false
      },
      content: "Looking for study partners for Data Structures & Algorithms! Planning to meet every Tuesday and Thursday at the library. DM me if interested! #ComputerScience #StudyGroup #DSA",
      media: [],
      likes: 89,
      comments: 12,
      isLiked: true,
      isBookmarked: false,
      createdAt: "2024-06-02T10:15:00Z",
      topics: ["ComputerScience", "StudyGroup", "DSA"],
      audience: "Public"
    },
    {
      id: "post3",
      author: {
        id: "user789",
        name: "Michael Wong",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        isVerified: true
      },
      content: "Our team just won first place at the university hackathon! Built a sustainable campus transport app in 48 hours. Couldn't have done it without my amazing teammates! 🏆 #ComputerScience #Hackathon #TeamWork",
      media: [
        {
          id: "media2",
          type: "image",
          src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
          title: "Hackathon Winners"
        }
      ],
      likes: 312,
      comments: 24,
      isLiked: false,
      isBookmarked: true,
      createdAt: "2024-06-01T18:45:00Z",
      topics: ["ComputerScience", "Hackathon", "TeamWork"],
      audience: "Public"
    }
  ],
  "StudyGroup": [
    {
      id: "post4",
      author: {
        id: "user101",
        name: "Emma Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        isVerified: false
      },
      content: "Finals week is approaching! Creating a study schedule and looking for accountability partners. Let's crush these exams together! 📚✨ #StudyGroup #Finals #Motivation",
      media: [],
      likes: 156,
      comments: 31,
      isLiked: true,
      isBookmarked: false,
      createdAt: "2024-06-02T12:20:00Z",
      topics: ["StudyGroup", "Finals", "Motivation"],
      audience: "Public"
    }
  ]
};

const MOCK_HASHTAG_STATS = {
  "ComputerScience": {
    totalPosts: 1247,
    followers: 892,
    trending: true,
    description: "Discussions about computer science, programming, algorithms, and technology.",
    relatedTags: ["Programming", "AI", "MachineLearning", "WebDev", "DataScience"]
  },
  "StudyGroup": {
    totalPosts: 634,
    followers: 445,
    trending: false,
    description: "Find study partners and groups for collaborative learning.",
    relatedTags: ["Education", "Finals", "Motivation", "Collaboration", "Learning"]
  }
};

const MOCK_CURRENT_USER = {
  id: "currentUser",
  name: "Current User",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
};

export default function HashtagPage() {
  const params = useParams();
  const router = useRouter();
  const hashtag = params.hashtag;
  
  const [posts, setPosts] = useState(MOCK_HASHTAG_POSTS[hashtag] || []);
  const [stats, setStats] = useState(MOCK_HASHTAG_STATS[hashtag] || {});
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [sortBy, setSortBy] = useState("recent"); // recent, popular, oldest

  useEffect(() => {
    // In a real app, fetch posts for this hashtag
    const hashtagPosts = MOCK_HASHTAG_POSTS[hashtag] || [];
    const hashtagStats = MOCK_HASHTAG_STATS[hashtag] || {
      totalPosts: 0,
      followers: 0,
      trending: false,
      description: `Posts tagged with #${hashtag}`,
      relatedTags: []
    };
    
    setPosts(hashtagPosts);
    setStats(hashtagStats);
  }, [hashtag]);

  const handleFollowHashtag = () => {
    setIsFollowing(!isFollowing);
    // In a real app, send API request to follow/unfollow hashtag
  };

  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    // In a real app, refetch posts with new sorting
    let sortedPosts = [...posts];
    switch (newSortBy) {
      case "popular":
        sortedPosts.sort((a, b) => b.likes - a.likes);
        break;
      case "oldest":
        sortedPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default: // recent
        sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setPosts(sortedPosts);
  };

  const handleCreatePost = (postData) => {
    // Add the hashtag to the post
    const newPost = {
      id: `post-${Date.now()}`,
      author: MOCK_CURRENT_USER,
      content: `${postData.content} #${hashtag}`,
      media: postData.media || [],
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date().toISOString(),
      topics: [hashtag, ...(postData.topics || [])],
      audience: "Public"
    };
    
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  const handlePostLike = (postId, isLiked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked, likes: isLiked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  };

  const handlePostBookmark = (postId, isBookmarked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked }
        : post
    ));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `#${hashtag} on Unistory`,
        text: `Check out posts about #${hashtag}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="-ml-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Hash className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    #{hashtag}
                    {stats.trending && (
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {stats.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant={isFollowing ? "secondary" : "default"}
                  size="sm"
                  onClick={handleFollowHashtag}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <span className="font-medium">{stats.totalPosts?.toLocaleString() || 0}</span>
                <span>posts</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{stats.followers?.toLocaleString() || 0}</span>
                <span>followers</span>
              </div>
            </div>

            {/* Related Tags */}
            {stats.relatedTags && stats.relatedTags.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Related topics:</span>
                <div className="flex flex-wrap gap-2">
                  {stats.relatedTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => router.push(`/topic/${tag}`)}
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardHeader>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SortDesc className="h-4 w-4 mr-2" />
                Sort: {sortBy === "recent" ? "Recent" : sortBy === "popular" ? "Popular" : "Oldest"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSort("recent")}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("popular")}>
                Most Popular
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("oldest")}>
                Oldest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Button 
          size="sm"
          onClick={() => setShowCreatePost(!showCreatePost)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Create Post Form */}
      {showCreatePost && (
        <Card>
          <CardContent className="p-4">
            <CreatePostForm
              currentUser={MOCK_CURRENT_USER}
              onSubmit={handleCreatePost}
              onCancel={() => setShowCreatePost(false)}
              defaultHashtags={[hashtag]}
              placeholder={`What's on your mind about #${hashtag}?`}
            />
          </CardContent>
        </Card>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Hash className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to post about #{hashtag}!
              </p>
              <Button onClick={() => setShowCreatePost(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={MOCK_CURRENT_USER}
              onLike={handlePostLike}
              onBookmark={handlePostBookmark}
            />
          ))
        )}
      </div>

      {/* Load More */}
      {posts.length > 0 && (
        <div className="text-center py-6">
          <Button variant="outline">
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
}
