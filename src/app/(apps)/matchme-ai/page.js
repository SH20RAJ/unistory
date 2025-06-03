"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Brain,
    Sparkles,
    Heart,
    MessageSquare,
    Settings,
    Filter,
    Zap,
    Star,
    MapPin,
    BookOpen,
    Music,
    Camera,
    Coffee,
    GameController2,
    Palette,
    Code,
    Dumbbell,
    Plane,
    Clock,
    TrendingUp,
    Users,
    Target,
    Search,
    ChevronRight,
    RotateCcw,
    X,
    Check
} from "lucide-react";

// Mock AI matches data
const aiMatches = [
    {
        id: 1,
        name: "Sarah Chen",
        age: 20,
        branch: "Computer Science",
        year: "3rd Year",
        image: "/api/placeholder/150/150",
        compatibilityScore: 95,
        matchReason: "AI found 12 common interests including coding, photography, and indie music",
        interests: ["Coding", "Photography", "Indie Music", "Coffee", "Reading"],
        classes: ["Data Structures", "Machine Learning"],
        activities: ["Photography Club", "Coding Bootcamp"],
        personality: ["Creative", "Analytical", "Adventurous"],
        isOnline: true,
        lastSeen: "2 minutes ago",
        verified: true
    },
    {
        id: 2,
        name: "Marcus Johnson",
        age: 21,
        branch: "Business Administration",
        year: "4th Year",
        image: "/api/placeholder/150/150",
        compatibilityScore: 88,
        matchReason: "Similar extroverted personality and shared love for entrepreneurship",
        interests: ["Entrepreneurship", "Basketball", "Public Speaking", "Travel"],
        classes: ["Strategic Management", "Marketing Analytics"],
        activities: ["Debate Club", "Student Government"],
        personality: ["Outgoing", "Leadership", "Ambitious"],
        isOnline: false,
        lastSeen: "1 hour ago",
        verified: true
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        age: 19,
        branch: "Psychology",
        year: "2nd Year",
        image: "/api/placeholder/150/150",
        compatibilityScore: 82,
        matchReason: "Perfect study buddy match with complementary schedules",
        interests: ["Psychology", "Yoga", "Meditation", "Art Therapy"],
        classes: ["Cognitive Psychology", "Research Methods"],
        activities: ["Wellness Club", "Art Therapy Group"],
        personality: ["Empathetic", "Thoughtful", "Calm"],
        isOnline: true,
        lastSeen: "Just now",
        verified: false
    },
    {
        id: 4,
        name: "Alex Kim",
        age: 22,
        branch: "Engineering",
        year: "4th Year",
        image: "/api/placeholder/150/150",
        compatibilityScore: 79,
        matchReason: "AI detected similar problem-solving approaches and tech interests",
        interests: ["Robotics", "Gaming", "Tech Innovation", "Sci-Fi"],
        classes: ["Advanced Robotics", "AI Systems"],
        activities: ["Robotics Club", "Gaming Society"],
        personality: ["Innovative", "Logical", "Curious"],
        isOnline: true,
        lastSeen: "5 minutes ago",
        verified: true
    }
];

const compatibilityInsights = [
    {
        category: "Interests",
        score: 92,
        details: ["12 shared interests", "High compatibility in hobbies", "Similar entertainment preferences"]
    },
    {
        category: "Academic",
        score: 78,
        details: ["Complementary study schedules", "Similar GPA range", "Common academic goals"]
    },
    {
        category: "Personality",
        score: 85,
        details: ["Compatible personality types", "Balanced extroversion levels", "Shared values"]
    },
    {
        category: "Campus Life",
        score: 88,
        details: ["Active in similar clubs", "Overlapping friend circles", "Same campus hangout spots"]
    }
];

const MatchCard = ({ match, onLike, onPass, onMessage, isExpanded, onToggleExpand }) => {
    return (
        <Card className={`relative overflow-hidden transition-all duration-300 ${isExpanded ? 'md:col-span-2' : ''}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={match.image} alt={match.name} />
                                <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {match.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-lg">{match.name}</h3>
                                {match.verified && <Badge variant="secondary" className="text-xs">✓ Verified</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {match.age} • {match.branch} • {match.year}
                            </p>
                            <p className="text-xs text-gray-500">{match.lastSeen}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center space-x-1">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span className="text-lg font-bold text-purple-600">{match.compatibilityScore}%</span>
                        </div>
                        <p className="text-xs text-gray-500">AI Match</p>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                        <Brain className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium">{match.matchReason}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>Interests</span>
                        </h4>
                        <div className="flex flex-wrap gap-1">
                            {match.interests.slice(0, isExpanded ? match.interests.length : 3).map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-xs">{interest}</Badge>
                            ))}
                            {!isExpanded && match.interests.length > 3 && (
                                <Badge variant="secondary" className="text-xs">+{match.interests.length - 3} more</Badge>
                            )}
                        </div>
                    </div>

                    {isExpanded && (
                        <>
                            <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Current Classes</span>
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                    {match.classes.map((cls, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">{cls}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                                    <Users className="w-4 h-4" />
                                    <span>Campus Activities</span>
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                    {match.activities.map((activity, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">{activity}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                                    <Star className="w-4 h-4" />
                                    <span>Personality Traits</span>
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                    {match.personality.map((trait, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">{trait}</Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleExpand(match.id)}
                        className="flex items-center space-x-1"
                    >
                        <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </Button>
                    
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPass(match.id)}
                            className="text-gray-600 hover:text-red-600"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onMessage(match.id)}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => onLike(match.id)}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                        >
                            <Heart className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function MatchMeAIPage() {
    const [activeTab, setActiveTab] = useState("matches");
    const [expandedMatch, setExpandedMatch] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterBranch, setFilterBranch] = useState("all");
    const [filterYear, setFilterYear] = useState("all");

    const handleLike = (matchId) => {
        console.log("Liked match:", matchId);
        // Add like logic here
    };

    const handlePass = (matchId) => {
        console.log("Passed match:", matchId);
        // Add pass logic here
    };

    const handleMessage = (matchId) => {
        console.log("Message match:", matchId);
        // Navigate to messaging
    };

    const handleToggleExpand = (matchId) => {
        setExpandedMatch(expandedMatch === matchId ? null : matchId);
    };

    const filteredMatches = aiMatches.filter(match => {
        const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            match.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            match.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesBranch = filterBranch === "all" || match.branch === filterBranch;
        const matchesYear = filterYear === "all" || match.year === filterYear;
        
        return matchesSearch && matchesBranch && matchesYear;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                MatchMe AI
                            </h1>
                            <div className="flex items-center justify-center space-x-2">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Beta</Badge>
                                <p className="text-gray-600 dark:text-gray-400">AI-powered matches based on interests, classes, and campus activities</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">{aiMatches.length}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">AI Matches</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">87%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Compatibility</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Common Interests</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold">2min</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="matches">AI Matches</TabsTrigger>
                        <TabsTrigger value="insights">Compatibility</TabsTrigger>
                        <TabsTrigger value="settings">AI Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="matches" className="space-y-4">
                        {/* Search and Filters */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <Input
                                                placeholder="Search by name, interests, or branch..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <select
                                        value={filterBranch}
                                        onChange={(e) => setFilterBranch(e.target.value)}
                                        className="px-3 py-2 border rounded-md bg-background"
                                    >
                                        <option value="all">All Branches</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Business Administration">Business</option>
                                        <option value="Psychology">Psychology</option>
                                        <option value="Engineering">Engineering</option>
                                    </select>
                                    <select
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                        className="px-3 py-2 border rounded-md bg-background"
                                    >
                                        <option value="all">All Years</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Matches Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filteredMatches.map((match) => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    onLike={handleLike}
                                    onPass={handlePass}
                                    onMessage={handleMessage}
                                    isExpanded={expandedMatch === match.id}
                                    onToggleExpand={handleToggleExpand}
                                />
                            ))}
                        </div>

                        {filteredMatches.length === 0 && (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400">No matches found</p>
                                    <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="insights" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-purple-600" />
                                    <span>Compatibility Insights</span>
                                </CardTitle>
                                <CardDescription>
                                    AI analysis of your matching patterns and compatibility factors
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {compatibilityInsights.map((insight, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{insight.category}</span>
                                            <span className="text-lg font-bold text-purple-600">{insight.score}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${insight.score}%` }}
                                            ></div>
                                        </div>
                                        <div className="space-y-1">
                                            {insight.details.map((detail, detailIndex) => (
                                                <p key={detailIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                                                    <Check className="w-3 h-3 text-green-600" />
                                                    <span>{detail}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Settings className="w-5 h-5 text-purple-600" />
                                    <span>AI Matching Preferences</span>
                                </CardTitle>
                                <CardDescription>
                                    Customize how AI finds your perfect matches
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Matching Priorities</h3>
                                    <div className="space-y-3">
                                        {["Shared Interests", "Academic Compatibility", "Personality Match", "Campus Activities", "Study Habits", "Social Preferences"].map((priority, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                <span className="font-medium">{priority}</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-500">Weight:</span>
                                                    <select className="px-2 py-1 border rounded text-sm">
                                                        <option>High</option>
                                                        <option>Medium</option>
                                                        <option>Low</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium">AI Recommendations</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span>Daily match limit</span>
                                            <select className="px-3 py-1 border rounded">
                                                <option>5 matches</option>
                                                <option>10 matches</option>
                                                <option>15 matches</option>
                                                <option>Unlimited</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Minimum compatibility score</span>
                                            <select className="px-3 py-1 border rounded">
                                                <option>70%</option>
                                                <option>80%</option>
                                                <option>90%</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Retrain AI Model
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
