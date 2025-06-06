"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MediaGallery } from "@/components/media";
import { CommentsList } from "@/components/comments";
import { PostCard } from "@/components/posts";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import {
    Heart,
    Share,
    Bookmark,
    MoreHorizontal,
    ArrowLeft,
    Users,
    Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MOCK_CURRENT_USER = {
    id: "user123",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    isVerified: true,
    college: "Stanford University",
    major: "Computer Science"
};

const MOCK_POST = {
    id: "post123",
    authorId: "user456",
    content: "Exploring the nuances of machine learning algorithms. It's fascinating how they can learn and adapt!",
    media: [
        {
            id: "media1",
            type: "image",
            src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2073&auto=format&fit=crop",
            title: "Machine Learning"
        },
        {
            id: "media2",
            type: "image",
            src: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=2073&auto=format&fit=crop",
            title: "Coding Session"
        }
    ],
    likes: 128,
    isLiked: false,
    comments: 24,
    isBookmarked: false,
    createdAt: "2025-05-30T15:43:00Z",
    audience: "Public",
    topics: ["ComputerScience", "MachineLearning", "Education"],
    circle: {
        id: "circle123",
        name: "CS50 Study Group",
        image: null,
        isPrivate: false
    }
};

const MOCK_COMMENTS = [
    {
        id: "comment1",
        user: {
            id: "user789",
            name: "Sarah Williams",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            isVerified: false
        },
        content: "This looks amazing! How long did it take you to build the machine learning component?",
        likeCount: 12,
        isLiked: true,
        createdAt: "2025-05-30T16:10:00Z",
        replies: []
    },
    {
        id: "comment2",
        user: {
            id: "user234",
            name: "Michael Chang",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            isVerified: true
        },
        content: "I've been working on something similar for my thesis. Would love to compare notes! Which ML models did you use?",
        likeCount: 8,
        isLiked: false,
        createdAt: "2025-05-30T17:25:00Z",
        replies: [
            {
                id: "reply1",
                user: {
                    id: "author456",
                    name: "Alex Johnson",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                    isVerified: true
                },
                content: "I used a combination of collaborative filtering and content-based recommendation systems. Happy to chat more about it!",
                likeCount: 5,
                isLiked: true,
                createdAt: "2025-05-30T18:05:00Z"
            }
        ]
    },
    {
        id: "comment3",
        user: {
            id: "user567",
            name: "Emily Davis",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            isVerified: false
        },
        content: "This is exactly what education needs right now! Would you consider making this open source?",
        likeCount: 15,
        isLiked: false,
        createdAt: "2025-05-30T19:45:00Z",
        replies: []
    }
];

const SUGGESTED_POSTS = [
    {
        id: "post234",
        author: {
            id: "user789",
            name: "Sarah Williams",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            isVerified: false
        },
        content: "Just submitted my application for the Google AI Summer Research Program! Fingers crossed! 🤞",
        media: [],
        likes: 42,
        comments: 7,
        isLiked: true,
        isBookmarked: false,
        createdAt: "2025-05-29T14:23:00Z",
        audience: "Friends"
    },
    {
        id: "post345",
        author: {
            id: "user234",
            name: "Michael Chang",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            isVerified: true
        },
        content: "Our robotics team won first place at the university competition! So proud of everyone's hard work.",
        media: [
            {
                id: "media3",
                type: "image",
                src: "https://images.unsplash.com/photo-1559124581-0af12a5f3ff2?q=80&w=1470&auto=format&fit=crop",
                title: "Robotics Competition"
            }
        ],
        likes: 87,
        comments: 15,
        isLiked: false,
        isBookmarked: false,
        createdAt: "2025-05-28T10:17:00Z",
        audience: "Public",
        topics: ["Robotics", "Competition", "Engineering"]
    }
];

// Add these additional mock data for suggestions
const MOCK_SUGGESTED_POSTS = [
    {
        id: "suggestedPost1",
        author: {
            id: "user789",
            name: "Maya Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
            isVerified: true
        },
        content: "Just launched my portfolio project using React and ThreeJS. Check it out!",
        media: [
            {
                id: "media-sugg-1",
                type: "image",
                src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
                title: "Web Portfolio"
            }
        ],
        createdAt: "2023-10-09T14:30:00Z",
        likes: 42,
        comments: 8
    },
    {
        id: "suggestedPost2",
        author: {
            id: "user567",
            name: "Jason Park",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason",
            isVerified: true
        },
        content: "Study tips for finals week: create a schedule, use spaced repetition, and most importantly - get enough sleep!",
        createdAt: "2023-10-08T18:45:00Z",
        likes: 53,
        comments: 12
    }
];

const MOCK_SUGGESTED_CIRCLES = [
    {
        id: "circle1",
        name: "Computer Science Hub",
        description: "For CS students to discuss coursework, projects, and career opportunities.",
        memberCount: 1250,
        isPrivate: false,
        isMember: true,
        category: "Academic"
    },
    {
        id: "circle2",
        name: "Campus Photography Club",
        description: "Share your campus shots and photography techniques. Weekly challenges and contests.",
        memberCount: 743,
        isPrivate: false,
        isMember: false,
        category: "Hobby"
    },
    {
        id: "circle3",
        name: "Stanford Entrepreneurs",
        description: "For student entrepreneurs to connect, share ideas, and find co-founders.",
        memberCount: 892,
        isPrivate: true,
        isMember: false,
        category: "Career"
    }
];

const MOCK_SUGGESTED_USERS = [
    {
        id: "user456",
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        isVerified: true,
        college: "Stanford University",
        major: "Computer Science"
    },
    {
        id: "user789",
        name: "Maya Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        isVerified: true,
        college: "Stanford University",
        major: "Design"
    },
    {
        id: "user567",
        name: "Jason Park",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason",
        isVerified: true,
        college: "Stanford University",
        major: "Economics"
    },
    {
        id: "user890",
        name: "Elena Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        isVerified: true,
        college: "Stanford University",
        major: "Biology"
    }
];

const SUGGESTED_USERS = [
    {
        id: "user456",
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        isVerified: true,
        college: "Stanford University",
        major: "Computer Science"
    },
    {
        id: "user789",
        name: "Maya Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        isVerified: true,
        college: "Stanford University",
        major: "Design"
    },
    {
        id: "user567",
        name: "Jason Park",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason",
        isVerified: true,
        college: "Stanford University",
        major: "Economics"
    },
    {
        id: "user890",
        name: "Elena Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        isVerified: true,
        college: "Stanford University",
        major: "Biology"
    }
];

const SUGGESTED_CIRCLES = [
    {
        id: "circle1",
        name: "Computer Science Hub",
        description: "For CS students to discuss coursework, projects, and career opportunities.",
        memberCount: 1250,
        isPrivate: false,
        isMember: true,
        category: "Academic"
    },
    {
        id: "circle2",
        name: "Campus Photography Club",
        description: "Share your campus shots and photography techniques. Weekly challenges and contests.",
        memberCount: 743,
        isPrivate: false,
        isMember: false,
        category: "Hobby"
    },
    {
        id: "circle3",
        name: "Stanford Entrepreneurs",
        description: "For student entrepreneurs to connect, share ideas, and find co-founders.",
        memberCount: 892,
        isPrivate: true,
        isMember: false,
        category: "Career"
    }
];

export default function PostDetailPage() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(MOCK_COMMENTS);
    const [suggestedPosts, setSuggestedPosts] = useState(SUGGESTED_POSTS);
    const [suggestedUsers, setSuggestedUsers] = useState(SUGGESTED_USERS);
    const [suggestedCircles, setSuggestedCircles] = useState(SUGGESTED_CIRCLES);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch post data from API
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                console.log(`Fetching post with id: ${params.id}`);

                // Fetch all posts and find the specific one
                const response = await fetch('/api/posts');
                const result = await response.json();

                if (result.success) {
                    const foundPost = result.data.find(p => p.id === params.id);
                    if (foundPost) {
                        setPost(foundPost);
                        setIsLiked(foundPost.isLiked || false);
                        setLikeCount(foundPost.likeCount || 0);
                        setIsBookmarked(foundPost.isBookmarked || false);
                    } else {
                        setError('Post not found');
                    }
                } else {
                    setError('Failed to fetch post');
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        // Also fetch suggested posts
        const fetchSuggestedPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const result = await response.json();

                if (result.success) {
                    // Get 2 random posts that aren't the current one
                    const otherPosts = result.data
                        .filter(p => p.id !== params.id)
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 2);

                    setSuggestedPosts(otherPosts);
                }
            } catch (err) {
                console.error('Error fetching suggested posts:', err);
            }
        };

        if (params.id) {
            fetchPost();
            fetchSuggestedPosts();
        }
    }, [params.id]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

        // In a real app, send API request to update like status
        // fetch(`/api/posts/${post.id}/like`, {
        //   method: 'POST',
        //   body: JSON.stringify({ liked: !isLiked }),
        // });
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);

        // In a real app, send API request to update bookmark status
        // fetch(`/api/posts/${post.id}/bookmark`, {
        //   method: 'POST',
        //   body: JSON.stringify({ bookmarked: !isBookmarked }),
        // });
    };

    const handleAddComment = (content) => {
        const newComment = {
            id: `comment-${Date.now()}`,
            user: MOCK_CURRENT_USER,
            content,
            likeCount: 0,
            isLiked: false,
            createdAt: new Date().toISOString(),
            replies: []
        };

        setComments([newComment, ...comments]);

        // In a real app, send API request to add comment
        // fetch(`/api/posts/${post.id}/comments`, {
        //   method: 'POST',
        //   body: JSON.stringify({ content }),
        // });
    };

    const handleCommentLike = (commentId, liked) => {
        // Update comment like status in state
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    isLiked: liked,
                    likeCount: liked ? comment.likeCount + 1 : comment.likeCount - 1
                };
            }

            // Check nested replies
            if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: comment.replies.map(reply => {
                        if (reply.id === commentId) {
                            return {
                                ...reply,
                                isLiked: liked,
                                likeCount: liked ? reply.likeCount + 1 : reply.likeCount - 1
                            };
                        }
                        return reply;
                    })
                };
            }

            return comment;
        }));

        // In a real app, send API request to update comment like status
        // fetch(`/api/comments/${commentId}/like`, {
        //   method: 'POST',
        //   body: JSON.stringify({ liked }),
        // });
    };

    const handleCommentReply = (commentId, content) => {
        // Find the comment to reply to
        const newReply = {
            id: `reply-${Date.now()}`,
            user: MOCK_CURRENT_USER,
            content,
            likeCount: 0,
            isLiked: false,
            createdAt: new Date().toISOString()
        };

        // Add reply to the comment
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                };
            }
            return comment;
        }));

        // In a real app, send API request to add reply
        // fetch(`/api/comments/${commentId}/replies`, {
        //   method: 'POST',
        //   body: JSON.stringify({ content }),
        // });
    };

    return (
        <div className="container mx-auto py-4 lg:py-8 px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Navigation header */}
                    <div className="flex items-center mb-2">
                        <Button variant="ghost" size="icon" asChild className="mr-2">
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-xl font-medium">Post</h1>
                    </div>

                    {/* Main post content */}
                    {loading ? (
                        <Card className="p-6">
                            <div className="animate-pulse">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                </div>
                                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                            </div>
                        </Card>
                    ) : error ? (
                        <Card className="p-6">
                            <div className="text-center py-10">
                                <h3 className="text-lg font-medium text-red-500 mb-2">Error</h3>
                                <p className="text-gray-500">{error}</p>
                                <Button className="mt-4" variant="outline" asChild>
                                    <Link href="/dashboard">Go to Dashboard</Link>
                                </Button>
                            </div>
                        </Card>
                    ) : post ? (
                        <Card>
                            <CardHeader className="pt-4 pb-0">
                                <div className="flex justify-between">
                                    <Link href={`/profile/${post.authorId}`} className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
                                            <AvatarFallback>{post.user?.name?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <div className="font-medium flex items-center">
                                                {post.user?.name || 'Anonymous'}
                                                {post.user?.isVerified && (
                                                    <span className="ml-1 text-blue-500 text-xs">✓</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center">
                                                {post.createdAt && formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}

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
                                    <p className="text-base mb-4">{post.content}</p>
                                )}

                                {post.media && post.media.length > 0 && (
                                    <div className="mt-2 mb-4">
                                        <MediaGallery items={post.media} />
                                    </div>
                                )}

                                {post.tags && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {post.tags.split(',').map((tag) => (
                                            <Link
                                                href={`/topic/${tag.trim()}`}
                                                key={tag}
                                                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full px-3 py-1 transition-colors"
                                            >
                                                #{tag.trim()}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Post circle info */}
                                {post.circleId && (
                                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <Link href={`/circles/${post.circleId}`} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                            <Users className="h-4 w-4" />
                                            <span>Posted in a circle</span>
                                        </Link>
                                    </div>
                                )}

                                {/* Post stats and actions */}
                                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="mr-4">{likeCount} likes</span>
                                        <span>{post.commentCount || 0} comments</span>
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
                                            onClick={handleLike}
                                        >
                                            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-red-500' : ''}`} />
                                            Like
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center text-gray-600"
                                        >
                                            <Share className="h-4 w-4 mr-1" />
                                            Share
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center text-gray-600"
                                            onClick={handleBookmark}
                                        >
                                            <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? 'fill-gray-600' : ''}`} />
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : null}

                    {/* Comments section - Only show if post is loaded */}
                    {post && (
                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <CommentsList
                                    comments={comments}
                                    currentUser={MOCK_CURRENT_USER}
                                    onAddComment={handleAddComment}
                                    onLike={handleCommentLike}
                                    onReply={handleCommentReply}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right sidebar with suggestions - Only show if post is loaded */}
                {post && (
                    <div className="space-y-6">
                        {/* Author Card */}
                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="text-sm font-medium text-muted-foreground">Posted by</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
                                        <AvatarFallback>{post.user?.name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{post.user?.name || 'Anonymous'}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {post.user?.university || "University Student"}
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full mt-4" variant="outline" asChild>
                                    <Link href={`/profile/${post.authorId}`}>
                                        View Profile
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Suggested Posts */}
                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="text-sm font-medium text-muted-foreground">You might also like</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {suggestedPosts.map(post => (
                                    <Link key={post.id} href={`/post/${post.id}`} className="block">
                                        <div className="rounded-lg border p-3 hover:bg-accent transition-colors">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
                                                    <AvatarFallback>{post.user?.name?.[0] || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">{post.user?.name || 'Anonymous'}</span>
                                            </div>
                                            <p className="text-sm line-clamp-2">{post.content}</p>
                                        </div>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Suggested Circles */}
                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="text-sm font-medium text-muted-foreground">Suggested Circles</h3>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {MOCK_SUGGESTED_CIRCLES.map(circle => (
                                    <Link key={circle.id} href={`/circles/${circle.id}`} className="block">
                                        <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${circle.name}`}
                                                        alt={circle.name}
                                                    />
                                                    <AvatarFallback>{circle.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-sm">{circle.name}</div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Users className="h-3 w-3" />
                                                        <span>{circle.memberCount} members</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge variant={circle.isMember ? "outline" : "secondary"} className="ml-2 whitespace-nowrap">
                                                {circle.category}
                                            </Badge>
                                        </div>
                                    </Link>
                                ))}
                                <Button variant="ghost" size="sm" className="w-full" asChild>
                                    <Link href="/circles">
                                        View All Circles
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Suggested Users */}
                        <Card>
                            <CardHeader className="pb-2">
                                <h3 className="text-sm font-medium text-muted-foreground">People to follow</h3>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {MOCK_SUGGESTED_USERS.map(user => (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-sm">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.major}</div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Follow
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
