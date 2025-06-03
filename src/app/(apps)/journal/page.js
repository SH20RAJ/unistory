"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    NotebookPen,
    Plus,
    Search,
    Calendar,
    Heart,
    Brain,
    Target,
    TrendingUp,
    Star,
    Filter,
    Download,
    Lock,
    Unlock,
    Edit,
    Trash2,
    Bookmark,
    Share2,
    Eye,
    EyeOff,
    Smile,
    Meh,
    Frown,
    Sun,
    Cloud,
    CloudRain,
    Zap,
    Coffee,
    Book,
    Users,
    Trophy,
    Timer,
    ChevronRight,
    Sparkles,
    Settings,
    Archive,
    BarChart3
} from "lucide-react";

// Mock data for journal entries
const mockEntries = [
    {
        id: 1,
        title: "First Week of Semester Reflections",
        content: "Starting the new semester with so much excitement! My classes look challenging but interesting. Data Structures with Prof. Chen seems like it'll be tough but rewarding. I'm setting a goal to stay organized this semester and actually keep up with readings. \n\nMet some new people in my dorm - Sarah from down the hall seems really cool and we both love coding. Planning to study together for CS classes.\n\nFeeling optimistic about this semester!",
        mood: "happy",
        date: "2024-01-15",
        time: "10:30 PM",
        tags: ["semester", "goals", "optimistic", "new friends"],
        isPrivate: true,
        wordCount: 87,
        readTime: "1 min",
        goals: ["Stay organized", "Make study friends", "Keep up with readings"]
    },
    {
        id: 2,
        title: "Midterm Stress and Study Strategies",
        content: "Midterms are approaching fast and I'm feeling the pressure. Calculus is proving more challenging than expected, but I've found that working problems with my study group really helps.\n\nDiscovered the library's 24-hour study rooms - they're a game changer for late-night cramming sessions. The quiet environment really helps me focus.\n\nReminding myself that it's okay to ask for help. Booked office hours with Dr. Wilson for tomorrow.",
        mood: "neutral",
        date: "2024-02-28",
        time: "11:45 PM",
        tags: ["midterms", "study strategies", "stress", "help-seeking"],
        isPrivate: true,
        wordCount: 76,
        readTime: "1 min",
        goals: ["Attend office hours", "Use study groups", "Manage stress"]
    },
    {
        id: 3,
        title: "Spring Break Adventures",
        content: "Just got back from an amazing spring break road trip with roommates! We drove down to the coast and spent a week just relaxing, playing beach volleyball, and having deep conversations about life and our futures.\n\nIt was exactly what I needed after the intensity of midterms. Sometimes stepping away from campus life gives you perspective on what really matters.\n\nFeeling refreshed and ready to tackle the rest of the semester with renewed energy!",
        mood: "happy",
        date: "2024-03-15",
        time: "2:15 PM",
        tags: ["spring break", "friendship", "perspective", "refreshed"],
        isPrivate: false,
        wordCount: 94,
        readTime: "1 min",
        goals: ["Maintain friendships", "Balance work and rest", "Stay positive"]
    },
    {
        id: 4,
        title: "Career Fair Preparation Thoughts",
        content: "The career fair is next week and I'm feeling a mix of excitement and nervousness. Spent today updating my resume and researching companies that will be there.\n\nReally interested in the software development positions at TechCorp and StartupXYZ. Need to prepare good questions to ask recruiters and practice my elevator pitch.\n\nReminder to myself: be confident, be curious, and remember that it's okay if not everything goes perfectly. This is all part of learning and growing.",
        mood: "neutral",
        date: "2024-04-02",
        time: "7:20 PM",
        tags: ["career fair", "preparation", "nervous", "growth"],
        isPrivate: true,
        wordCount: 89,
        readTime: "1 min",
        goals: ["Practice elevator pitch", "Research companies", "Be confident"]
    },
    {
        id: 5,
        title: "Late Night Coding Session Success",
        content: "Finally cracked that binary tree implementation that's been giving me trouble for days! There's something magical about those late-night breakthrough moments when everything suddenly clicks.\n\nThe campus is so quiet at 2 AM, just me and the glow of my laptop screen. These are the moments that remind me why I love computer science - the satisfaction of solving complex problems.\n\nFeeling accomplished and ready for a well-deserved sleep!",
        mood: "happy",
        date: "2024-04-10",
        time: "2:30 AM",
        tags: ["coding", "breakthrough", "late night", "satisfaction"],
        isPrivate: false,
        wordCount: 78,
        readTime: "1 min",
        goals: ["Master data structures", "Enjoy the process", "Celebrate wins"]
    }
];

const moodStats = {
    happy: 12,
    neutral: 8,
    sad: 3
};

const streakData = {
    currentStreak: 7,
    longestStreak: 14,
    totalEntries: 23,
    thisWeekEntries: 5
};

const goalCategories = [
    { name: "Academic", count: 8, color: "blue" },
    { name: "Personal", count: 12, color: "green" },
    { name: "Social", count: 6, color: "purple" },
    { name: "Health", count: 4, color: "orange" }
];

const getMoodIcon = (mood) => {
    switch (mood) {
        case 'happy':
            return <Smile className="w-5 h-5 text-green-500" />;
        case 'neutral':
            return <Meh className="w-5 h-5 text-yellow-500" />;
        case 'sad':
            return <Frown className="w-5 h-5 text-red-500" />;
        default:
            return <Meh className="w-5 h-5 text-gray-500" />;
    }
};

const getMoodColor = (mood) => {
    switch (mood) {
        case 'happy':
            return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700';
        case 'neutral':
            return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700';
        case 'sad':
            return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700';
        default:
            return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-700';
    }
};

const JournalEntry = ({ entry, isCompact = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (isCompact) {
        return (
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                                {getMoodIcon(entry.mood)}
                                <h3 className="font-semibold text-sm line-clamp-1">{entry.title}</h3>
                                {entry.isPrivate ? (
                                    <Lock className="w-3 h-3 text-gray-500" />
                                ) : (
                                    <Unlock className="w-3 h-3 text-gray-500" />
                                )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                {entry.date} • {entry.readTime} read
                            </p>
                            <div className="flex flex-wrap gap-1 mb-2">
                                {entry.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        #{tag}
                                    </Badge>
                                ))}
                                {entry.tags.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                        +{entry.tags.length - 2}
                                    </Badge>
                                )}
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
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            {getMoodIcon(entry.mood)}
                            <div>
                                <h2 className="text-xl font-semibold">{entry.title}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {entry.date} at {entry.time} • {entry.wordCount} words • {entry.readTime} read
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {entry.isPrivate ? (
                                <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                                    <Lock className="w-3 h-3 mr-1" />
                                    Private
                                </Badge>
                            ) : (
                                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                    <Unlock className="w-3 h-3 mr-1" />
                                    Shared
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {isExpanded ? entry.content : entry.content.slice(0, 200) + (entry.content.length > 200 ? "..." : "")}
                        </p>
                        {entry.content.length > 200 && (
                            <Button
                                variant="link"
                                className="p-0 h-auto text-blue-600 hover:text-blue-800"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? "Show less" : "Read more"}
                            </Button>
                        )}
                    </div>

                    {entry.goals && entry.goals.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="font-medium text-sm mb-2 flex items-center space-x-2">
                                <Target className="w-4 h-4 text-blue-600" />
                                <span>Goals from this entry</span>
                            </h4>
                            <div className="space-y-1">
                                {entry.goals.map((goal, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-sm">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                        <span>{goal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Bookmark className="w-4 h-4 mr-1" />
                                Save
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const NewEntryForm = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("neutral");
    const [tags, setTags] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <NotebookPen className="w-5 h-5 text-purple-600" />
                    <span>New Journal Entry</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">Title</label>
                    <Input
                        placeholder="What's on your mind today?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium mb-1 block">How are you feeling?</label>
                    <div className="flex space-x-2">
                        {[
                            { value: 'happy', icon: Smile, color: 'text-green-500' },
                            { value: 'neutral', icon: Meh, color: 'text-yellow-500' },
                            { value: 'sad', icon: Frown, color: 'text-red-500' }
                        ].map(({ value, icon: Icon, color }) => (
                            <Button
                                key={value}
                                variant={mood === value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setMood(value)}
                                className={mood === value ? "" : color}
                            >
                                <Icon className="w-4 h-4 mr-1" />
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium mb-1 block">Your thoughts</label>
                    <Textarea
                        placeholder="Write about your day, thoughts, feelings, goals, or anything else..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        className="resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">{content.length} characters</p>
                </div>

                <div>
                    <label className="text-sm font-medium mb-1 block">Tags (optional)</label>
                    <Input
                        placeholder="study, friends, goals, reflection (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={isPrivate ? "text-gray-600" : "text-blue-600"}
                        >
                            {isPrivate ? <Lock className="w-4 h-4 mr-1" /> : <Unlock className="w-4 h-4 mr-1" />}
                            {isPrivate ? "Private" : "Shareable"}
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={!title.trim() || !content.trim()}>
                            Save Entry
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function JournalPage() {
    const [showNewEntry, setShowNewEntry] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMood, setSelectedMood] = useState("all");
    const [viewMode, setViewMode] = useState("full");

    const filteredEntries = mockEntries.filter(entry => {
        const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesMood = selectedMood === "all" || entry.mood === selectedMood;
        return matchesSearch && matchesMood;
    });

    const recentEntries = mockEntries.slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Writing Streak */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Sparkles className="w-5 h-5 text-orange-500" />
                                <span>Writing Streak</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600">{streakData.currentStreak}</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Days in a row</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Longest streak</span>
                                    <span className="font-semibold">{streakData.longestStreak} days</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Total entries</span>
                                    <span className="font-semibold">{streakData.totalEntries}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">This week</span>
                                    <span className="font-semibold">{streakData.thisWeekEntries}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mood Tracker */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Heart className="w-5 h-5 text-pink-500" />
                                <span>Mood Overview</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Object.entries(moodStats).map(([mood, count]) => (
                                <div key={mood} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {getMoodIcon(mood)}
                                        <span className="capitalize text-sm">{mood}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${mood === 'happy' ? 'bg-green-500' :
                                                        mood === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${(count / Math.max(...Object.values(moodStats))) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold">{count}</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Goal Categories */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Target className="w-5 h-5 text-blue-500" />
                                <span>Goal Categories</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {goalCategories.map((category) => (
                                <div key={category.name} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <span className="text-sm">{category.name}</span>
                                    <Badge variant="secondary">{category.count}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Entries */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Timer className="w-5 h-5 text-green-500" />
                                <span>Recent</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentEntries.map((entry) => (
                                <JournalEntry key={entry.id} entry={entry} isCompact={true} />
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {showNewEntry ? (
                        <NewEntryForm onClose={() => setShowNewEntry(false)} />
                    ) : (
                        <>
                            {/* Search and Filters */}
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <Input
                                                placeholder="Search your thoughts, goals, and memories..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={selectedMood}
                                                onChange={(e) => setSelectedMood(e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
                                            >
                                                <option value="all">All Moods</option>
                                                <option value="happy">Happy</option>
                                                <option value="neutral">Neutral</option>
                                                <option value="sad">Sad</option>
                                            </select>
                                            <Button
                                                variant={viewMode === "full" ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setViewMode(viewMode === "full" ? "compact" : "full")}
                                            >
                                                {viewMode === "full" ? "Compact" : "Full"}
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <BarChart3 className="w-4 h-4 mr-2" />
                                                Analytics
                                            </Button>
                                            <Button size="sm" onClick={() => setShowNewEntry(true)}>
                                                <Plus className="w-4 h-4 mr-2" />
                                                New Entry
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Journal Entries */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">
                                        {filteredEntries.length} entries found
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="w-4 h-4 mr-1" />
                                            Export
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Settings className="w-4 h-4 mr-1" />
                                            Settings
                                        </Button>
                                    </div>
                                </div>

                                {filteredEntries.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredEntries.map((entry) => (
                                            <JournalEntry
                                                key={entry.id}
                                                entry={entry}
                                                isCompact={viewMode === "compact"}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <CardContent className="p-8 text-center">
                                            <NotebookPen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                No entries found
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                Try adjusting your search or start writing your first entry
                                            </p>
                                            <Button onClick={() => setShowNewEntry(true)}>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Write your first entry
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
