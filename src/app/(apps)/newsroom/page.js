"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Newspaper,
    TrendingUp,
    Bell,
    Calendar,
    MapPin,
    Search,
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Flame,
    Clock,
    Users,
    Eye,
    ChevronRight,
    Filter,
    AlertCircle,
    Star,
    Zap
} from "lucide-react";

// Mock data for news and announcements
const mockNews = [
    {
        id: 1,
        title: "Campus WiFi Upgrade Complete - Faster Speeds Now Available",
        content: "The IT department has successfully upgraded the campus-wide WiFi infrastructure. Students can now enjoy speeds up to 1Gbps in all academic buildings and dormitories.",
        category: "Technology",
        author: "IT Department",
        timestamp: "2 hours ago",
        trending: true,
        likes: 234,
        comments: 45,
        views: 1250,
        image: null,
        priority: "high",
        tags: ["WiFi", "Technology", "Campus"]
    },
    {
        id: 2,
        title: "New Food Truck Festival Coming to Campus Next Week",
        content: "Get ready for the ultimate food experience! 15 local food trucks will be setting up on the main quad from March 15-17. From Korean BBQ to artisanal ice cream, there's something for everyone.",
        category: "Events",
        author: "Student Life Office",
        timestamp: "4 hours ago",
        trending: true,
        likes: 189,
        comments: 67,
        views: 892,
        image: "/api/placeholder/400/200",
        priority: "medium",
        tags: ["Food", "Festival", "Events"]
    },
    {
        id: 3,
        title: "Library Hours Extended During Finals Week",
        content: "The main library will be open 24/7 starting next Monday through the end of finals week. Additional study spaces and charging stations have been added to accommodate increased demand.",
        category: "Academic",
        author: "Library Services",
        timestamp: "6 hours ago",
        trending: false,
        likes: 156,
        comments: 23,
        views: 567,
        image: null,
        priority: "medium",
        tags: ["Library", "Finals", "Study"]
    },
    {
        id: 4,
        title: "Climate Action Club Organizes Campus Sustainability Fair",
        content: "Join us this Saturday for workshops on renewable energy, sustainable living, and eco-friendly campus initiatives. Free reusable water bottles for the first 100 attendees!",
        category: "Clubs",
        author: "Climate Action Club",
        timestamp: "1 day ago",
        trending: false,
        likes: 98,
        comments: 34,
        views: 445,
        image: "/api/placeholder/400/200",
        priority: "low",
        tags: ["Environment", "Sustainability", "Workshop"]
    },
    {
        id: 5,
        title: "Campus Security Alert: Bike Theft Prevention Tips",
        content: "Recent increase in bike thefts reported near the science building. Security reminds all students to use proper locks and register bikes with campus safety.",
        category: "Safety",
        author: "Campus Security",
        timestamp: "1 day ago",
        trending: false,
        likes: 67,
        comments: 12,
        views: 789,
        image: null,
        priority: "high",
        tags: ["Security", "Safety", "Bikes"]
    }
];

const mockAnnouncements = [
    {
        id: 1,
        title: "Spring Break Schedule Changes",
        content: "Dining halls will operate on limited hours during spring break. Check the updated schedule on the dining services website.",
        department: "Dining Services",
        timestamp: "3 hours ago",
        urgent: false
    },
    {
        id: 2,
        title: "Career Fair Registration Now Open",
        content: "The annual spring career fair will be held on April 10th. Registration is now open for students in all majors.",
        department: "Career Services",
        timestamp: "1 day ago",
        urgent: true
    },
    {
        id: 3,
        title: "Parking Permit Renewal Deadline",
        content: "Student parking permits expire on March 31st. Renew online through the student portal to avoid late fees.",
        department: "Parking Services",
        timestamp: "2 days ago",
        urgent: true
    }
];

const categories = ["All", "Academic", "Events", "Technology", "Safety", "Clubs", "Sports"];

const NewsCard = ({ news, isCompact = false }) => {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-500 bg-red-50 border-red-200';
            case 'medium': return 'text-orange-500 bg-orange-50 border-orange-200';
            case 'low': return 'text-green-500 bg-green-50 border-green-200';
            default: return 'text-gray-500 bg-gray-50 border-gray-200';
        }
    };

    if (isCompact) {
        return (
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                                {news.trending && <Flame className="w-4 h-4 text-orange-500" />}
                                <Badge variant="secondary" className="text-xs">{news.category}</Badge>
                                {news.priority === 'high' && (
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                )}
                            </div>
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{news.title}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{news.author} • {news.timestamp}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Eye className="w-3 h-3" />
                                    <span>{news.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Heart className="w-3 h-3" />
                                    <span>{news.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MessageCircle className="w-3 h-3" />
                                    <span>{news.comments}</span>
                                </div>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        {news.trending && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                <Flame className="w-3 h-3 mr-1" />
                                Trending
                            </Badge>
                        )}
                        <Badge variant="outline">{news.category}</Badge>
                        {news.priority === 'high' && (
                            <Badge className={getPriorityColor(news.priority)}>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Urgent
                            </Badge>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBookmarked(!bookmarked)}
                        className={bookmarked ? "text-blue-600" : "text-gray-400"}
                    >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                    </Button>
                </div>

                <h2 className="text-xl font-bold mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                    {news.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {news.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                                {news.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{news.author}</p>
                            <p className="text-xs text-gray-500">{news.timestamp}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Eye className="w-4 h-4" />
                            <span>{news.views}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLiked(!liked)}
                                className={`${liked ? "text-red-600" : "text-gray-500"} hover:text-red-600`}
                            >
                                <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`} />
                                {news.likes + (liked ? 1 : 0)}
                            </Button>

                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {news.comments}
                            </Button>

                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const AnnouncementCard = ({ announcement }) => {
    return (
        <Card className={`border-l-4 ${announcement.urgent ? 'border-l-red-500 bg-red-50/30' : 'border-l-blue-500'}`}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            {announcement.urgent && (
                                <Badge className="bg-red-100 text-red-700 border-red-200">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Urgent
                                </Badge>
                            )}
                            <Badge variant="outline">{announcement.department}</Badge>
                        </div>
                        <h3 className="font-semibold mb-2">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {announcement.content}
                        </p>
                        <p className="text-xs text-gray-500">{announcement.timestamp}</p>
                    </div>
                    <Bell className={`w-5 h-5 ${announcement.urgent ? 'text-red-500' : 'text-blue-500'} flex-shrink-0`} />
                </div>
            </CardContent>
        </Card>
    );
};

export default function NewsroomPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showCompact, setShowCompact] = useState(false);

    const filteredNews = mockNews.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            news.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const trendingNews = mockNews.filter(news => news.trending).slice(0, 3);

    return (
        <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search and Filters */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="Search news and announcements..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Filter className="w-4 h-4 text-gray-500" />
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                        <Button variant="outline" size="sm">
                                            <Bell className="w-4 h-4 mr-2" />
                                            Subscribe
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Tabs defaultValue="news" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="news" className="flex items-center space-x-2">
                                    <Newspaper className="w-4 h-4" />
                                    <span>Campus News</span>
                                </TabsTrigger>
                                <TabsTrigger value="announcements" className="flex items-center space-x-2">
                                    <Bell className="w-4 h-4" />
                                    <span>Announcements</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="news" className="space-y-6 mt-6">
                                {filteredNews.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredNews.map((news) => (
                                            <NewsCard key={news.id} news={news} isCompact={showCompact} />
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <CardContent className="p-8 text-center">
                                            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                No news found
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Try adjusting your search or filter criteria
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>

                            <TabsContent value="announcements" className="space-y-4 mt-6">
                                {mockAnnouncements.map((announcement) => (
                                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                                ))}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Trending News */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                    <span>Trending Now</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {trendingNews.map((news) => (
                                    <NewsCard key={news.id} news={news} isCompact={true} />
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Zap className="w-5 h-5 text-blue-500" />
                                    <span>Quick Stats</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Today's Posts</span>
                                    <span className="font-semibold">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                                    <span className="font-semibold">47</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Most Active</span>
                                    <span className="font-semibold text-blue-600">Events</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Views</span>
                                    <span className="font-semibold">12.5K</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {categories.slice(1).map((category) => (
                                        <Button
                                            key={category}
                                            variant={selectedCategory === category ? "default" : "ghost"}
                                            className="w-full justify-start"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
        </div>
    );
}
