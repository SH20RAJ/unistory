"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Flame,
    Heart,
    X,
    Star,
    Filter,
    Settings,
    Users,
    TrendingUp,
    Eye,
    MessageSquare,
    Zap,
    Target,
    Clock,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    ThumbsUp,
    ThumbsDown,
    MapPin,
    BookOpen,
    Coffee,
    Music,
    Camera,
    GameController2,
    Palette,
    Search,
    Trophy
} from "lucide-react";

// Mock profiles data for swiping
const swipeProfiles = [
    {
        id: 1,
        name: "Jessica Wang",
        age: 21,
        branch: "Computer Science",
        year: "3rd Year",
        image: "/api/placeholder/300/400",
        images: ["/api/placeholder/300/400", "/api/placeholder/300/400", "/api/placeholder/300/400"],
        interests: ["Photography", "Coding", "Coffee", "Indie Music", "Reading"],
        bio: "Love capturing moments and building cool apps. Coffee enthusiast ☕",
        isVerified: true,
        distance: "0.5km away",
        hotScore: 9.2,
        totalVotes: 1248,
        recentActivity: "Active 2 hours ago"
    },
    {
        id: 2,
        name: "Ryan Cooper",
        age: 22,
        branch: "Business Administration",
        year: "4th Year",
        image: "/api/placeholder/300/400",
        images: ["/api/placeholder/300/400", "/api/placeholder/300/400"],
        interests: ["Basketball", "Entrepreneurship", "Travel", "Fitness"],
        bio: "Future entrepreneur | Basketball player | Always ready for an adventure 🏀",
        isVerified: true,
        distance: "1.2km away",
        hotScore: 8.7,
        totalVotes: 892,
        recentActivity: "Online now"
    },
    {
        id: 3,
        name: "Maya Patel",
        age: 20,
        branch: "Psychology",
        year: "2nd Year",
        image: "/api/placeholder/300/400",
        images: ["/api/placeholder/300/400", "/api/placeholder/300/400", "/api/placeholder/300/400", "/api/placeholder/300/400"],
        interests: ["Art Therapy", "Yoga", "Psychology", "Nature", "Meditation"],
        bio: "Psychology student passionate about mental health and creativity 🎨",
        isVerified: false,
        distance: "2.1km away",
        hotScore: 8.9,
        totalVotes: 567,
        recentActivity: "Active 1 hour ago"
    },
    {
        id: 4,
        name: "Daniel Kim",
        age: 23,
        branch: "Engineering",
        year: "4th Year",
        image: "/api/placeholder/300/400",
        images: ["/api/placeholder/300/400", "/api/placeholder/300/400"],
        interests: ["Robotics", "Gaming", "Tech", "Sci-Fi", "Innovation"],
        bio: "Building the future one robot at a time 🤖 Sci-fi lover",
        isVerified: true,
        distance: "0.8km away",
        hotScore: 8.4,
        totalVotes: 723,
        recentActivity: "Active 30 minutes ago"
    },
    {
        id: 5,
        name: "Sophie Chen",
        age: 19,
        branch: "Art & Design",
        year: "1st Year",
        image: "/api/placeholder/300/400",
        images: ["/api/placeholder/300/400", "/api/placeholder/300/400", "/api/placeholder/300/400"],
        interests: ["Digital Art", "Fashion", "Music Production", "Design"],
        bio: "Digital artist and music producer. Creating beauty in pixels and beats 🎵",
        isVerified: false,
        distance: "1.7km away",
        hotScore: 9.1,
        totalVotes: 434,
        recentActivity: "Online now"
    }
];

const hotLeaderboard = [
    { rank: 1, name: "Alex Rivera", score: 9.6, votes: 2145, branch: "Computer Science", change: "+0.2" },
    { rank: 2, name: "Emma Stone", score: 9.4, votes: 1987, branch: "Business", change: "-0.1" },
    { rank: 3, name: "Michael Chen", score: 9.3, votes: 1854, branch: "Engineering", change: "+0.3" },
    { rank: 4, name: "Sarah Johnson", score: 9.2, votes: 1763, branch: "Psychology", change: "0.0" },
    { rank: 5, name: "David Kim", score: 9.1, votes: 1625, branch: "Art & Design", change: "+0.1" }
];

const SwipeCard = ({ profile, onSwipe, isTopCard }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % profile.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + profile.images.length) % profile.images.length);
    };

    return (
        <div className={`absolute inset-0 ${isTopCard ? 'z-10' : 'z-0'}`}>
            <Card className="h-full overflow-hidden bg-white dark:bg-gray-900 shadow-2xl">
                <div className="relative h-2/3">
                    <img
                        src={profile.images[currentImageIndex]}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Image Navigation */}
                    <div className="absolute top-4 left-4 right-4 flex justify-center space-x-1">
                        {profile.images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all ${
                                    index === currentImageIndex 
                                        ? 'bg-white w-8' 
                                        : 'bg-white/50 w-4'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    {profile.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Hot Score Badge */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        <Flame className="w-4 h-4" />
                        <span>{profile.hotScore}</span>
                    </div>

                    {/* Verification Badge */}
                    {profile.isVerified && (
                        <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ✓ Verified
                        </div>
                    )}
                </div>

                <CardContent className="h-1/3 p-4 space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {profile.branch} • {profile.year}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                <span>{profile.distance}</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4 text-green-600" />
                                <span>{profile.totalVotes} votes</span>
                            </p>
                            <p className="text-xs text-gray-500">{profile.recentActivity}</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {profile.bio}
                    </p>

                    <div className="flex flex-wrap gap-1">
                        {profile.interests.slice(0, 4).map((interest, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                            </Badge>
                        ))}
                        {profile.interests.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                                +{profile.interests.length - 4}
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default function HotNotSwipingPage() {
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("swipe");
    const [filterBranch, setFilterBranch] = useState("all");
    const [filterYear, setFilterYear] = useState("all");
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const currentProfile = swipeProfiles[currentProfileIndex];
    const nextProfile = swipeProfiles[currentProfileIndex + 1];

    const handleSwipe = (direction) => {
        setSwipeDirection(direction);
        setShowResult(true);
        
        setTimeout(() => {
            setCurrentProfileIndex((prev) => (prev + 1) % swipeProfiles.length);
            setSwipeDirection(null);
            setShowResult(false);
        }, 1000);
    };

    const handleHot = () => handleSwipe("hot");
    const handleNot = () => handleSwipe("not");

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20 p-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <Flame className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                Hot/Not Swiping
                            </h1>
                            <div className="flex items-center justify-center space-x-2">
                                <Badge variant="destructive" className="bg-orange-500">🔥 Popular</Badge>
                                <p className="text-gray-600 dark:text-gray-400">Anonymous swipe feature. Filter by interests, branch, or year</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">{swipeProfiles.length}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Active Profiles</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">2.4k</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Daily Views</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <ThumbsUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">73%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Hot Rate</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">156</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Matches Today</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="swipe">Swipe Mode</TabsTrigger>
                        <TabsTrigger value="leaderboard">Hot Leaderboard</TabsTrigger>
                        <TabsTrigger value="settings">Preferences</TabsTrigger>
                    </TabsList>

                    <TabsContent value="swipe" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Swiping Interface */}
                            <div className="lg:col-span-2">
                                <div className="relative h-[600px] mx-auto max-w-sm">
                                    {currentProfile && (
                                        <SwipeCard 
                                            profile={currentProfile} 
                                            onSwipe={handleSwipe}
                                            isTopCard={true}
                                        />
                                    )}
                                    {nextProfile && (
                                        <SwipeCard 
                                            profile={nextProfile} 
                                            onSwipe={handleSwipe}
                                            isTopCard={false}
                                        />
                                    )}

                                    {/* Swipe Result Overlay */}
                                    {showResult && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-lg">
                                            <div className={`text-6xl font-bold ${
                                                swipeDirection === 'hot' ? 'text-orange-500' : 'text-gray-500'
                                            }`}>
                                                {swipeDirection === 'hot' ? '🔥' : '❄️'}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Swipe Buttons */}
                                <div className="flex justify-center space-x-8 mt-6">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={handleNot}
                                        className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                        disabled={showResult}
                                    >
                                        <X className="w-8 h-8 text-gray-600" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        onClick={handleHot}
                                        className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                        disabled={showResult}
                                    >
                                        <Flame className="w-8 h-8 text-white" />
                                    </Button>
                                </div>

                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {currentProfileIndex + 1} of {swipeProfiles.length} profiles
                                    </p>
                                </div>
                            </div>

                            {/* Filters and Info */}
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Filter className="w-5 h-5" />
                                            <span>Filters</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">Branch</label>
                                            <select
                                                value={filterBranch}
                                                onChange={(e) => setFilterBranch(e.target.value)}
                                                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                                            >
                                                <option value="all">All Branches</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Business Administration">Business</option>
                                                <option value="Psychology">Psychology</option>
                                                <option value="Engineering">Engineering</option>
                                                <option value="Art & Design">Art & Design</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Year</label>
                                            <select
                                                value={filterYear}
                                                onChange={(e) => setFilterYear(e.target.value)}
                                                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                                            >
                                                <option value="all">All Years</option>
                                                <option value="1st Year">1st Year</option>
                                                <option value="2nd Year">2nd Year</option>
                                                <option value="3rd Year">3rd Year</option>
                                                <option value="4th Year">4th Year</option>
                                            </select>
                                        </div>
                                        <Button className="w-full" variant="outline">
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Reset Filters
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <TrendingUp className="w-5 h-5" />
                                            <span>Your Stats</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Hot votes given</span>
                                            <span className="font-bold">247</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Not votes given</span>
                                            <span className="font-bold">89</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Your hot score</span>
                                            <span className="font-bold text-orange-600">8.6</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Your rank</span>
                                            <span className="font-bold">#42</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="leaderboard" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <span>Campus Hot Leaderboard</span>
                                </CardTitle>
                                <CardDescription>
                                    Top-rated profiles based on community votes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {hotLeaderboard.map((person) => (
                                        <div key={person.rank} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                                person.rank === 1 ? 'bg-yellow-500 text-white' :
                                                person.rank === 2 ? 'bg-gray-400 text-white' :
                                                person.rank === 3 ? 'bg-orange-600 text-white' :
                                                'bg-gray-200 text-gray-700'
                                            }`}>
                                                {person.rank}
                                            </div>
                                            
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={`/api/placeholder/50/50`} />
                                                <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{person.name}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{person.branch}</p>
                                            </div>
                                            
                                            <div className="text-right">
                                                <div className="flex items-center space-x-1">
                                                    <Flame className="w-4 h-4 text-orange-500" />
                                                    <span className="font-bold text-lg">{person.score}</span>
                                                </div>
                                                <p className="text-sm text-gray-500">{person.votes} votes</p>
                                            </div>
                                            
                                            <div className={`text-sm font-medium ${
                                                person.change.startsWith('+') ? 'text-green-600' :
                                                person.change.startsWith('-') ? 'text-red-600' :
                                                'text-gray-500'
                                            }`}>
                                                {person.change}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                        <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">+12%</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">More Hot votes</p>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">1.2k</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">New participants</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold">8.4</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg hot score</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Settings className="w-5 h-5" />
                                    <span>Swipe Preferences</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Privacy Settings</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span>Show me in Hot/Not</span>
                                            <Button variant="outline" size="sm">Enabled</Button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Anonymous voting</span>
                                            <Button variant="outline" size="sm">Enabled</Button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Show my hot score publicly</span>
                                            <Button variant="outline" size="sm">Disabled</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium">Notification Preferences</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span>When someone votes me hot</span>
                                            <Button variant="outline" size="sm">Enabled</Button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Daily summary</span>
                                            <Button variant="outline" size="sm">Enabled</Button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Leaderboard updates</span>
                                            <Button variant="outline" size="sm">Disabled</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium">Display Preferences</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span>Auto-advance after vote</span>
                                            <select className="px-3 py-1 border rounded text-sm">
                                                <option>Immediately</option>
                                                <option>After 1 second</option>
                                                <option>After 2 seconds</option>
                                                <option>Manual</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Show compatibility scores</span>
                                            <Button variant="outline" size="sm">Enabled</Button>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                                    Save Preferences
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
