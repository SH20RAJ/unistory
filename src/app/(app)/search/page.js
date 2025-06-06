"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import { usePosts, useEvents, useClubs, useUserSuggestions } from "@/hooks/useSWR";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
    Search,
    Filter,
    Users,
    BookOpen,
    Calendar,
    Shield,
    Heart,
    MessageCircle,
    Star,
    Clock,
    TrendingUp,
    MapPin,
    GraduationCap,
    Hash,
    Eye,
    ArrowRight,
    Zap,
    Coffee
} from "lucide-react";
import Link from "next/link";

// Mock trending hashtags for when no search term is provided
const mockTrendingHashtags = [
    { tag: "#StudyTogether", posts: 245, trend: "up" },
    { tag: "#MentalHealth", posts: 189, trend: "up" },
    { tag: "#Finals2024", posts: 167, trend: "stable" },
    { tag: "#CampusLife", posts: 134, trend: "up" },
    { tag: "#Hackathon", posts: 98, trend: "down" },
    { tag: "#Wellness", posts: 87, trend: "up" }
];

const SearchResultCard = ({ type, item, searchTerm }) => {
    const highlightText = (text, term) => {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <mark key={index} className="bg-yellow-200">{part}</mark> : part
        );
    };

    switch (type) {
        case 'users':
            return (
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Avatar>
                                    <AvatarFallback className="bg-blue-500 text-white">
                                        {item.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                {item.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">
                                        {highlightText(item.name, searchTerm)}
                                    </h3>
                                    <Button variant="outline" size="sm">Connect</Button>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {item.major} • {item.year}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {highlightText(item.bio, searchTerm)}
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <Badge variant="secondary" className="text-xs">
                                        <Users className="w-3 h-3 mr-1" />
                                        {item.connections}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        <Star className="w-3 h-3 mr-1" />
                                        {item.studyScore}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );

        case 'posts':
            return (
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-full bg-gray-100">
                                {item.type === 'confession' ? (
                                    <Shield className="w-4 h-4 text-purple-500" />
                                ) : item.type === 'study' ? (
                                    <BookOpen className="w-4 h-4 text-green-500" />
                                ) : (
                                    <MessageCircle className="w-4 h-4 text-blue-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-sm">
                                            {item.author}
                                        </span>
                                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                                        {item.trending && (
                                            <Badge variant="secondary" className="text-xs">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                Trending
                                            </Badge>
                                        )}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {item.category}
                                    </Badge>
                                </div>
                                <p className="text-sm mb-3">
                                    {highlightText(item.content, searchTerm)}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <span className="flex items-center text-xs text-gray-500">
                                        <Heart className="w-3 h-3 mr-1" />
                                        {item.likes}
                                    </span>
                                    <span className="flex items-center text-xs text-gray-500">
                                        <MessageCircle className="w-3 h-3 mr-1" />
                                        {item.comments}
                                    </span>
                                    <Button variant="ghost" size="sm" className="ml-auto">
                                        View Post <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );

        case 'events':
            return (
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-full bg-blue-100">
                                <Calendar className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium">
                                        {highlightText(item.title, searchTerm)}
                                    </h3>
                                    {item.isFeatured && (
                                        <Badge className="text-xs">Featured</Badge>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {highlightText(item.description, searchTerm)}
                                </p>
                                <div className="space-y-1 mb-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {item.date}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {item.location}
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Users className="w-3 h-3 mr-1" />
                                        {item.attendees} attending
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-xs">
                                        {item.category}
                                    </Badge>
                                    <Button variant="outline" size="sm">
                                        RSVP
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );

        case 'clubs':
            return (
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-full bg-green-100">
                                <Users className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium">
                                        {highlightText(item.name, searchTerm)}
                                    </h3>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                        <span className="text-xs text-gray-500">{item.rating}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {highlightText(item.description, searchTerm)}
                                </p>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <Badge variant="secondary" className="text-xs">
                                            {item.members} members
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {item.category}
                                        </Badge>
                                    </div>
                                    {item.isActive && (
                                        <Badge variant="outline" className="text-xs text-green-600">
                                            Active
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        {item.recentActivity}
                                    </span>
                                    <Button variant="outline" size="sm">
                                        Join Club
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );

        default:
            return null;
    }
};

export default function SearchPage() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [sortBy, setSortBy] = useState("relevance");
    const [filterCategory, setFilterCategory] = useState("all");
    const [isSearching, setIsSearching] = useState(false);

    // Fetch data using SWR hooks
    const { data: posts, error: postsError, isLoading: postsLoading } = usePosts();
    const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
    const { data: clubs, error: clubsError, isLoading: clubsLoading } = useClubs();
    const { data: users, error: usersError, isLoading: usersLoading } = useUserSuggestions();

    // Show error toasts if any data fetch fails
    useEffect(() => {
        if (postsError) {
            console.error('Error fetching posts:', postsError);
            toast.error("Failed to load posts data");
        }
        if (eventsError) {
            console.error('Error fetching events:', eventsError);
            toast.error("Failed to load events data");
        }
        if (clubsError) {
            console.error('Error fetching clubs:', clubsError);
            toast.error("Failed to load clubs data");
        }
        if (usersError) {
            console.error('Error fetching users:', usersError);
            toast.error("Failed to load users data");
        }
    }, [postsError, eventsError, clubsError, usersError]);

    // Perform search on actual data using useMemo for performance
    const searchResults = useMemo(() => {
        if (!searchTerm || searchTerm.length === 0) {
            return {
                users: [],
                posts: [],
                events: [],
                clubs: [],
                hashtags: []
            };
        }

        const term = searchTerm.toLowerCase();

        // Search users
        const filteredUsers = (users || []).filter(user =>
            user.name?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.university?.toLowerCase().includes(term) ||
            user.department?.toLowerCase().includes(term)
        ).map(user => ({
            id: user.id,
            name: user.name || 'Anonymous',
            major: user.department || 'N/A',
            year: 'Student',
            avatar: user.name?.split(' ').map(n => n[0]).join('') || 'U',
            bio: user.university || 'University Student',
            connections: Math.floor(Math.random() * 200) + 50, // Mock data
            studyScore: Math.floor(Math.random() * 1000) + 500, // Mock data
            isOnline: Math.random() > 0.5 // Mock data
        }));

        // Search posts
        const filteredPosts = (posts || []).filter(post =>
            post.content?.toLowerCase().includes(term) ||
            post.user?.name?.toLowerCase().includes(term) ||
            post.type?.toLowerCase().includes(term) ||
            post.mood?.toLowerCase().includes(term) ||
            (post.tags && post.tags.toLowerCase().includes(term))
        ).map(post => ({
            id: post.id,
            type: post.type || 'social',
            content: post.content || '',
            author: post.user?.name || 'Anonymous',
            avatar: post.user?.name?.split(' ').map(n => n[0]).join('') || 'A',
            timestamp: formatTimeAgo(new Date(post.createdAt)),
            likes: parseInt(post.likeCount) || 0,
            comments: parseInt(post.commentCount) || 0,
            category: post.type === 'confession' ? 'Confession' :
                post.type === 'study' ? 'Study' : 'Social',
            trending: post.likeCount > 20 // Simple trending logic
        }));

        // Search events
        const filteredEvents = (events || []).filter(event =>
            event.title?.toLowerCase().includes(term) ||
            event.description?.toLowerCase().includes(term) ||
            event.category?.toLowerCase().includes(term) ||
            event.location?.toLowerCase().includes(term)
        ).map(event => ({
            id: event.id,
            title: event.title || 'Untitled Event',
            description: event.description || 'No description',
            date: formatEventDate(event.date, event.time),
            location: event.location || 'TBA',
            organizer: event.organizer || 'Campus',
            attendees: Math.floor(Math.random() * 100) + 10, // Mock data
            category: event.category || 'General',
            isFeatured: Math.random() > 0.7 // Mock data
        }));

        // Search clubs
        const filteredClubs = (clubs || []).filter(club =>
            club.name?.toLowerCase().includes(term) ||
            club.description?.toLowerCase().includes(term) ||
            club.category?.toLowerCase().includes(term)
        ).map(club => ({
            id: club.id,
            name: club.name || 'Unnamed Club',
            description: club.description || 'No description available',
            members: Math.floor(Math.random() * 200) + 20, // Mock data
            category: club.category || 'General',
            rating: (Math.random() * 2 + 3).toFixed(1), // Mock rating 3.0-5.0
            isActive: true,
            recentActivity: 'Recent updates available'
        }));

        // Generate hashtags based on search term and content
        const hashtags = [
            { tag: `#${searchTerm}`, posts: filteredPosts.length, trend: "up" },
            { tag: "#StudyTogether", posts: filteredPosts.filter(p => p.type === 'study').length, trend: "up" },
            { tag: "#CampusLife", posts: filteredPosts.length, trend: "stable" },
            { tag: "#Events", posts: filteredEvents.length, trend: "up" }
        ].filter(hashtag => hashtag.posts > 0);

        return {
            users: filteredUsers,
            posts: filteredPosts,
            events: filteredEvents,
            clubs: filteredClubs,
            hashtags
        };
    }, [searchTerm, users, posts, events, clubs]);

    // Helper function to format time ago
    const formatTimeAgo = (date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    // Helper function to format event date
    const formatEventDate = (date, time) => {
        if (!date) return 'TBA';
        try {
            const eventDate = new Date(date);
            const now = new Date();
            const diffDays = Math.floor((eventDate - now) / (1000 * 60 * 60 * 24));

            if (diffDays === 0) return `Today${time ? `, ${time}` : ''}`;
            if (diffDays === 1) return `Tomorrow${time ? `, ${time}` : ''}`;
            if (diffDays < 7) return `${eventDate.toLocaleDateString('en-US', { weekday: 'long' })}${time ? `, ${time}` : ''}`;
            return `${eventDate.toLocaleDateString()}${time ? `, ${time}` : ''}`;
        } catch (error) {
            return date;
        }
    };

    // Simulate search loading
    useEffect(() => {
        if (searchTerm.length > 0) {
            setIsSearching(true);
            const timer = setTimeout(() => {
                setIsSearching(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [searchTerm]);

    const getTotalResults = () => {
        return Object.values(searchResults).reduce((total, category) => total + category.length, 0);
    };

    const getTabResults = (tab) => {
        if (tab === "all") return getTotalResults();
        return searchResults[tab]?.length || 0;
    };

    // Loading state
    const isLoading = postsLoading || eventsLoading || clubsLoading || usersLoading;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <MainNavigation />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading search data...</span>
                    </div>
                </div>
                <BottomNavigation />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MainNavigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Search Campus</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Find people, posts, events, clubs, and more across your university
                    </p>
                </div>

                {/* Search Bar */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search for people, posts, events, clubs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 text-lg h-12"
                            />
                            {isSearching && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                </div>
                            )}
                        </div>

                        {/* Filters */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-500">Filters:</span>
                            </div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">Relevance</SelectItem>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                    <SelectItem value="trending">Trending</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filterCategory} onValueChange={setFilterCategory}>
                                <SelectTrigger className="w-36">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="academic">Academic</SelectItem>
                                    <SelectItem value="social">Social</SelectItem>
                                    <SelectItem value="wellness">Wellness</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="career">Career</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Search Results */}
                {searchTerm.length > 0 && (
                    <>
                        {/* Results Summary */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">
                                Search Results {getTotalResults() > 0 && `(${getTotalResults()})`}
                            </h2>
                            {getTotalResults() === 0 && !isSearching && (
                                <p className="text-gray-500">No results found for "{searchTerm}". Try different keywords.</p>
                            )}
                        </div>

                        {getTotalResults() > 0 && (
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                                <TabsList className="grid w-full grid-cols-6">
                                    <TabsTrigger value="all" className="text-sm">
                                        All ({getTotalResults()})
                                    </TabsTrigger>
                                    <TabsTrigger value="users" className="text-sm">
                                        People ({getTabResults("users")})
                                    </TabsTrigger>
                                    <TabsTrigger value="posts" className="text-sm">
                                        Posts ({getTabResults("posts")})
                                    </TabsTrigger>
                                    <TabsTrigger value="events" className="text-sm">
                                        Events ({getTabResults("events")})
                                    </TabsTrigger>
                                    <TabsTrigger value="clubs" className="text-sm">
                                        Clubs ({getTabResults("clubs")})
                                    </TabsTrigger>
                                    <TabsTrigger value="hashtags" className="text-sm">
                                        Topics ({getTabResults("hashtags")})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="space-y-6 mt-6">
                                    {/* People Results */}
                                    {searchResults.users.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                                <Users className="w-5 h-5 mr-2" />
                                                People ({searchResults.users.length})
                                            </h3>
                                            <div className="space-y-3">
                                                {searchResults.users.slice(0, 3).map((user) => (
                                                    <SearchResultCard
                                                        key={user.id}
                                                        type="users"
                                                        item={user}
                                                        searchTerm={searchTerm}
                                                    />
                                                ))}
                                                {searchResults.users.length > 3 && (
                                                    <Button variant="outline" onClick={() => setActiveTab("users")}>
                                                        View all {searchResults.users.length} people
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Posts Results */}
                                    {searchResults.posts.length > 0 && (
                                        <div>
                                            <Separator className="my-6" />
                                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                                <MessageCircle className="w-5 h-5 mr-2" />
                                                Posts ({searchResults.posts.length})
                                            </h3>
                                            <div className="space-y-3">
                                                {searchResults.posts.slice(0, 3).map((post) => (
                                                    <SearchResultCard
                                                        key={post.id}
                                                        type="posts"
                                                        item={post}
                                                        searchTerm={searchTerm}
                                                    />
                                                ))}
                                                {searchResults.posts.length > 3 && (
                                                    <Button variant="outline" onClick={() => setActiveTab("posts")}>
                                                        View all {searchResults.posts.length} posts
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Events Results */}
                                    {searchResults.events.length > 0 && (
                                        <div>
                                            <Separator className="my-6" />
                                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                                <Calendar className="w-5 h-5 mr-2" />
                                                Events ({searchResults.events.length})
                                            </h3>
                                            <div className="space-y-3">
                                                {searchResults.events.slice(0, 3).map((event) => (
                                                    <SearchResultCard
                                                        key={event.id}
                                                        type="events"
                                                        item={event}
                                                        searchTerm={searchTerm}
                                                    />
                                                ))}
                                                {searchResults.events.length > 3 && (
                                                    <Button variant="outline" onClick={() => setActiveTab("events")}>
                                                        View all {searchResults.events.length} events
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Clubs Results */}
                                    {searchResults.clubs.length > 0 && (
                                        <div>
                                            <Separator className="my-6" />
                                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                                <Users className="w-5 h-5 mr-2" />
                                                Clubs ({searchResults.clubs.length})
                                            </h3>
                                            <div className="space-y-3">
                                                {searchResults.clubs.slice(0, 3).map((club) => (
                                                    <SearchResultCard
                                                        key={club.id}
                                                        type="clubs"
                                                        item={club}
                                                        searchTerm={searchTerm}
                                                    />
                                                ))}
                                                {searchResults.clubs.length > 3 && (
                                                    <Button variant="outline" onClick={() => setActiveTab("clubs")}>
                                                        View all {searchResults.clubs.length} clubs
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Hashtags Results */}
                                    {searchResults.hashtags.length > 0 && (
                                        <div>
                                            <Separator className="my-6" />
                                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                                <Hash className="w-5 h-5 mr-2" />
                                                Topics ({searchResults.hashtags.length})
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {searchResults.hashtags.map((hashtag) => (
                                                    <Card key={hashtag.tag} className="hover:shadow-md transition-shadow cursor-pointer">
                                                        <CardContent className="p-3">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <span className="font-medium text-blue-600">
                                                                        {hashtag.tag}
                                                                    </span>
                                                                    <p className="text-xs text-gray-500">
                                                                        {hashtag.posts} posts
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    {hashtag.trend === "up" && (
                                                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                                                    )}
                                                                    {hashtag.trend === "down" && (
                                                                        <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>

                                {/* Individual Tab Contents */}
                                <TabsContent value="users" className="space-y-4 mt-6">
                                    {searchResults.users.map((user) => (
                                        <SearchResultCard
                                            key={user.id}
                                            type="users"
                                            item={user}
                                            searchTerm={searchTerm}
                                        />
                                    ))}
                                </TabsContent>

                                <TabsContent value="posts" className="space-y-4 mt-6">
                                    {searchResults.posts.map((post) => (
                                        <SearchResultCard
                                            key={post.id}
                                            type="posts"
                                            item={post}
                                            searchTerm={searchTerm}
                                        />
                                    ))}
                                </TabsContent>

                                <TabsContent value="events" className="space-y-4 mt-6">
                                    {searchResults.events.map((event) => (
                                        <SearchResultCard
                                            key={event.id}
                                            type="events"
                                            item={event}
                                            searchTerm={searchTerm}
                                        />
                                    ))}
                                </TabsContent>

                                <TabsContent value="clubs" className="space-y-4 mt-6">
                                    {searchResults.clubs.map((club) => (
                                        <SearchResultCard
                                            key={club.id}
                                            type="clubs"
                                            item={club}
                                            searchTerm={searchTerm}
                                        />
                                    ))}
                                </TabsContent>

                                <TabsContent value="hashtags" className="mt-6">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {searchResults.hashtags.map((hashtag) => (
                                            <Card key={hashtag.tag} className="hover:shadow-md transition-shadow cursor-pointer">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium text-blue-600">
                                                            {hashtag.tag}
                                                        </span>
                                                        {hashtag.trend === "up" && (
                                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                                        )}
                                                        {hashtag.trend === "down" && (
                                                            <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {hashtag.posts} posts
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                    </>
                )}

                {/* Popular Searches / Suggestions */}
                {searchTerm.length === 0 && (
                    <div className="space-y-8">
                        {/* Trending Topics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span>Trending Topics</span>
                                </CardTitle>
                                <CardDescription>
                                    Popular searches on campus right now
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {mockTrendingHashtags.slice(0, 6).map((hashtag) => (
                                        <Button
                                            key={hashtag.tag}
                                            variant="outline"
                                            className="justify-start h-auto p-3"
                                            onClick={() => setSearchTerm(hashtag.tag.slice(1))}
                                        >
                                            <div className="text-left">
                                                <div className="font-medium text-blue-600">
                                                    {hashtag.tag}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {hashtag.posts} posts
                                                </div>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Zap className="w-5 h-5" />
                                    <span>Quick Find</span>
                                </CardTitle>
                                <CardDescription>
                                    Common searches to get you started
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col space-y-2"
                                        onClick={() => setSearchTerm("study group")}
                                    >
                                        <BookOpen className="w-6 h-6" />
                                        <span className="text-sm">Study Groups</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col space-y-2"
                                        onClick={() => setSearchTerm("mental health")}
                                    >
                                        <Coffee className="w-6 h-6" />
                                        <span className="text-sm">Wellness</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col space-y-2"
                                        onClick={() => setSearchTerm("hackathon")}
                                    >
                                        <Calendar className="w-6 h-6" />
                                        <span className="text-sm">Events</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col space-y-2"
                                        onClick={() => setSearchTerm("computer science")}
                                    >
                                        <GraduationCap className="w-6 h-6" />
                                        <span className="text-sm">My Major</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            <BottomNavigation />
        </div>
    );
}
