"use client";
export const runtime = 'edge';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleMember } from "@/components/circles";
import { PostCard } from "@/components/posts";
import { CreatePostForm } from "@/components/posts";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
    Users,
    Globe,
    Lock,
    Bell,
    BellOff,
    Calendar,
    FileText,
    MessageSquare,
    Settings,
    UserPlus,
    ArrowLeft,
    PlusCircle,
    Share2,
    Info
} from "lucide-react";

// Mock data for the circle
const MOCK_CIRCLE = {
    id: "circle1",
    name: "Computer Science Hub",
    description: "For CS students to discuss coursework, projects, and career opportunities. Share study resources, ask questions about assignments, and connect with peers in your major.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=CS",
    memberCount: 1250,
    isPrivate: false,
    isMember: true,
    isMuted: false,
    category: "Academic",
    college: "Stanford University",
    createdAt: "2023-09-15T12:00:00Z",
    rules: [
        "Be respectful and constructive in discussions",
        "No spam or self-promotion without permission",
        "No cheating or sharing of exam materials",
        "Credit sources when sharing resources",
        "Respect intellectual property and copyright"
    ]
};

// Mock data for members
const MOCK_MEMBERS = [
    {
        id: "user1",
        name: "Emma Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        isAdmin: true,
        college: "Stanford University",
        joined: "2023-09-15T12:00:00Z"
    },
    {
        id: "user2",
        name: "Noah Martinez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
        isAdmin: true,
        college: "Stanford University",
        joined: "2023-09-15T13:00:00Z"
    },
    {
        id: "user3",
        name: "Sophia Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
        isAdmin: false,
        college: "Stanford University",
        joined: "2023-09-16T09:00:00Z"
    },
    {
        id: "user4",
        name: "Liam Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
        isAdmin: false,
        college: "Stanford University",
        joined: "2023-09-17T10:30:00Z"
    },
    {
        id: "user5",
        name: "Olivia Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
        isAdmin: false,
        college: "Stanford University",
        joined: "2023-09-18T14:20:00Z"
    }
];

// Mock data for posts
const MOCK_POSTS = [
    {
        id: "post1",
        author: {
            id: "user2",
            name: "Noah Martinez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
            isVerified: true
        },
        content: "Just released my open-source project for graph algorithm visualization! Perfect for anyone taking Algorithm Design. Check it out and let me know what you think! #CS #Algorithms #OpenSource",
        media: [
            {
                id: "media1",
                type: "image",
                src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
                title: "Graph Visualization"
            }
        ],
        createdAt: "2023-10-10T15:45:00Z",
        likes: 48,
        comments: 13,
        isInCircle: true,
        circleName: "Computer Science Hub"
    },
    {
        id: "post2",
        author: {
            id: "user3",
            name: "Sophia Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
            isVerified: true
        },
        content: "Study group for the upcoming Operating Systems midterm! Meeting at the Engineering Library this Friday from 6-9pm. BYOC (bring your own coffee) ☕ Comment if you're joining! #StudyGroup #OS #Midterm",
        createdAt: "2023-10-09T11:20:00Z",
        likes: 32,
        comments: 17,
        isInCircle: true,
        circleName: "Computer Science Hub"
    },
    {
        id: "post3",
        author: {
            id: "user1",
            name: "Emma Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            isVerified: true
        },
        content: "Just dropped a comprehensive set of notes for CS246: Machine Learning. Covers everything from basic regression to neural networks with examples. Link in the comments! #MachineLearning #CS246 #StudyResources",
        media: [
            {
                id: "media3",
                type: "image",
                src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
                title: "Machine Learning Notes"
            },
            {
                id: "media4",
                type: "image",
                src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
                title: "Neural Network Diagram"
            }
        ],
        createdAt: "2023-10-08T09:15:00Z",
        likes: 75,
        comments: 23,
        isInCircle: true,
        circleName: "Computer Science Hub"
    }
];

// Mock current user
const MOCK_CURRENT_USER = {
    id: "user123",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    isVerified: true,
    college: "Stanford University"
};

export default function CircleDetailPage() {
    const params = useParams();
    const { user, isAuthenticated } = useAuth();
    const [circle, setCircle] = useState(MOCK_CIRCLE);
    const [members, setMembers] = useState(MOCK_MEMBERS);
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [joined, setJoined] = useState(circle.isMember);
    const [muted, setMuted] = useState(circle.isMuted);

    // In a real app, you'd fetch the circle data based on the ID
    useEffect(() => {
        // Simulating API call
        console.log(`Fetching circle with ID: ${params.id}`);
        // In a real app, you'd fetch the circle data from an API
        // setCircle(fetchedCircleData)

        // Set current user's info if authenticated
        if (isAuthenticated && user) {
            setMockCurrentUser({
                id: user.id || "user123",
                name: user.name || "John Doe",
                avatar: user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                isVerified: true,
                college: "Stanford University"
            });
        }
    }, [params.id, isAuthenticated, user]);

    const handleJoinCircle = () => {
        setJoined(true);
        // In a real app, you would make an API call here
    };

    const handleLeaveCircle = () => {
        setJoined(false);
        // In a real app, you would make an API call here
    };

    const handleToggleMute = () => {
        setMuted(!muted);
        // In a real app, you would make an API call here
    };

    const handleCreatePost = (postData) => {
        const newPost = {
            id: `post-${Date.now()}`,
            author: MOCK_CURRENT_USER,
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: 0,
            isInCircle: true,
            circleName: circle.name,
            ...postData
        };

        setPosts([newPost, ...posts]);
    };

    return (
        <div className="container max-w-7xl py-6 space-y-8">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/circles">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <span className="text-sm text-muted-foreground">Back to Circles</span>
            </div>

            {/* Circle Header */}
            <div className="relative rounded-xl overflow-hidden">
                <div className="h-48 md:h-60 lg:h-80 w-full relative">
                    {circle.coverImage && (
                        <Image
                            src={circle.coverImage}
                            fill
                            className="object-cover"
                            alt={circle.name}
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col gap-4">
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-4 border-background">
                                {circle.avatar ? (
                                    <AvatarImage src={circle.avatar} alt={circle.name} />
                                ) : (
                                    <AvatarFallback className="text-2xl">{circle.name.charAt(0)}</AvatarFallback>
                                )}
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-white font-display">{circle.name}</h1>
                                    {circle.isPrivate ? (
                                        <Lock className="h-4 w-4 text-white/80" />
                                    ) : (
                                        <Globe className="h-4 w-4 text-white/80" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-white/80">
                                    <Users className="h-4 w-4" />
                                    <span>{circle.memberCount} members</span>
                                    <Badge variant="secondary" className="ml-1">{circle.category}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {joined ? (
                                <>
                                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm" onClick={handleToggleMute}>
                                        {muted ? (
                                            <>
                                                <BellOff className="h-4 w-4 mr-2" />
                                                <span>Unmute</span>
                                            </>
                                        ) : (
                                            <>
                                                <Bell className="h-4 w-4 mr-2" />
                                                <span>Mute</span>
                                            </>
                                        )}
                                    </Button>
                                    <Button variant="destructive" size="sm" className="bg-destructive/80 backdrop-blur-sm" onClick={handleLeaveCircle}>
                                        Leave
                                    </Button>
                                </>
                            ) : (
                                <Button size="sm" className="bg-primary/90 backdrop-blur-sm" onClick={handleJoinCircle}>
                                    {circle.isPrivate ? "Request to Join" : "Join Circle"}
                                </Button>
                            )}
                            <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Create Post Form (if member) */}
                    {joined && (
                        <div className="rounded-lg border bg-card">
                            <CreatePostForm
                                onSubmit={handleCreatePost}
                                placeholder={`Share something with ${circle.name}...`}
                                inCircle={circle.name}
                            />
                        </div>
                    )}

                    <Tabs defaultValue="posts" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="posts" className="gap-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>Posts</span>
                            </TabsTrigger>
                            <TabsTrigger value="files" className="gap-2">
                                <FileText className="h-4 w-4" />
                                <span>Files</span>
                            </TabsTrigger>
                            <TabsTrigger value="events" className="gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Events</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="posts" className="space-y-4">
                            {posts.length === 0 ? (
                                <div className="text-center py-12">
                                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                                    <h3 className="mt-4 text-lg font-medium">No posts yet</h3>
                                    {joined ? (
                                        <p className="text-muted-foreground mt-1">
                                            Be the first to share something with this circle
                                        </p>
                                    ) : (
                                        <p className="text-muted-foreground mt-1">
                                            Join this circle to see and create posts
                                        </p>
                                    )}
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        currentUser={MOCK_CURRENT_USER}
                                    />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="files" className="py-6">
                            <div className="text-center py-12">
                                <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                                <h3 className="mt-4 text-lg font-medium">No files shared yet</h3>
                                <p className="text-muted-foreground mt-1">
                                    Files shared in this circle will appear here
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="events" className="py-6">
                            <div className="text-center py-12">
                                <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                                <h3 className="mt-4 text-lg font-medium">No events scheduled</h3>
                                <p className="text-muted-foreground mt-1">
                                    Events created for this circle will appear here
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    {/* About Section */}
                    <div className="rounded-lg border bg-card">
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="font-semibold">About</h3>
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="p-4">
                            <p className="text-sm">{circle.description}</p>

                            <div className="mt-4">
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    {circle.isPrivate ? "Private circle" : "Public circle"}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    Created September 2023
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">Circle Rules</h4>
                                <ul className="text-sm space-y-2">
                                    {circle.rules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="font-medium text-muted-foreground">{index + 1}.</span>
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Members Section */}
                    <div className="rounded-lg border bg-card">
                        <div className="p-4 border-b flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold">Members</h3>
                                <Badge variant="outline">{members.length}</Badge>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <UserPlus className="h-4 w-4" />
                                <span>Invite</span>
                            </Button>
                        </div>
                        <div className="p-4">
                            <div className="space-y-3">
                                {members.slice(0, 5).map((member) => (
                                    <CircleMember key={member.id} member={member} />
                                ))}
                            </div>

                            {members.length > 5 && (
                                <Button variant="ghost" className="w-full mt-3" asChild>
                                    <Link href={`/circles/${circle.id}/members`}>
                                        View all members
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
