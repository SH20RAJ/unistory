"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Heart,
    Coffee,
    MessageSquare,
    Star,
    Shuffle,
    Copy,
    Share2,
    BookOpen,
    Music,
    Gamepad2,
    Camera,
    MapPin,
    Clock,
    Users,
    Lightbulb,
    Zap,
    Target,
    Gift,
    Film,
    Palette,
    Utensils,
    Headphones,
    Smile,
    ThumbsUp,
    Bookmark,
    Filter,
    RefreshCw
} from "lucide-react";

const DateIdeaCard = ({ idea, category, difficulty, duration, participants, onSave, onShare, onUse }) => {
    const categoryColors = {
        conversation: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        virtual: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        campus: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        creative: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        fun: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
    };

    const difficultyColors = {
        easy: "text-green-600 dark:text-green-400",
        medium: "text-orange-600 dark:text-orange-400",
        hard: "text-red-600 dark:text-red-400"
    };

    const categoryIcons = {
        conversation: MessageSquare,
        virtual: Camera,
        campus: MapPin,
        creative: Palette,
        fun: Smile
    };

    const Icon = categoryIcons[category] || MessageSquare;

    return (
        <Card className="hover:shadow-lg transition-all duration-300 group hover:border-pink-200 dark:hover:border-pink-700">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
                            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
                        </div>
                        <div className="flex-1">
                            <Badge className={`text-xs ${categoryColors[category]} mb-2`}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Badge>
                            <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onSave}>
                        <Bookmark className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{idea.description}</p>

                {idea.prompts && (
                    <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Conversation Starters:</h4>
                        <div className="space-y-1">
                            {idea.prompts.map((prompt, index) => (
                                <div key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-pink-500 font-medium">•</span>
                                    <span>{prompt}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {idea.steps && (
                    <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">How to do it:</h4>
                        <div className="space-y-1">
                            {idea.steps.map((step, index) => (
                                <div key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-pink-500 font-medium">{index + 1}.</span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{participants}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${difficultyColors[difficulty]}`}>
                            <Target className="w-3 h-3" />
                            <span className="capitalize">{difficulty}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>94% liked this</span>
                    </div>
                </div>

                <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={onShare} className="flex-1">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                    </Button>
                    <Button onClick={onUse} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        <Zap className="w-4 h-4 mr-1" />
                        Use This
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const QuickPromptCard = ({ prompt, category, onCopy, onUse }) => {
    const categoryColors = {
        icebreaker: "border-l-blue-400",
        deep: "border-l-purple-400",
        fun: "border-l-pink-400",
        romantic: "border-l-red-400",
        casual: "border-l-green-400"
    };

    return (
        <Card className={`cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 ${categoryColors[category]}`}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <Badge variant="outline" className="text-xs mb-2 capitalize">
                            {category}
                        </Badge>
                        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{prompt}</p>
                    </div>
                    <div className="flex space-x-1 ml-3">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onCopy(); }}>
                            <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onUse(); }}>
                            <MessageSquare className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function VirtualDateIdeasPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("ideas");

    // Mock data
    const dateIdeas = [
        {
            title: "Virtual Movie Night with Commentary",
            description: "Watch the same movie together while video calling and share your thoughts in real-time. Create your own director's commentary!",
            category: "virtual",
            difficulty: "easy",
            duration: "2-3 hours",
            participants: "2 people",
            steps: [
                "Pick a movie both of you haven't seen",
                "Start a video call and sync the movie",
                "Share reactions and commentary throughout",
                "Discuss favorite scenes afterwards"
            ]
        },
        {
            title: "Campus Scavenger Hunt Date",
            description: "Create a fun scavenger hunt around campus locations meaningful to both of you. Discover new spots together!",
            category: "campus",
            difficulty: "medium",
            duration: "1-2 hours",
            participants: "2 people",
            steps: [
                "Create a list of campus locations to visit",
                "Add photo challenges at each spot",
                "Set a time limit for extra fun",
                "End at a cozy cafe to share photos"
            ]
        },
        {
            title: "Deep Conversation Starter Kit",
            description: "Skip the small talk with thoughtfully crafted questions that reveal personality, dreams, and values.",
            category: "conversation",
            difficulty: "easy",
            duration: "30-60 mins",
            participants: "2 people",
            prompts: [
                "What's a childhood memory that shaped who you are today?",
                "If you could have dinner with any historical figure, who and why?",
                "What's something you believe that most people disagree with?",
                "What's the best advice you've ever received?",
                "What would you do if you knew you couldn't fail?"
            ]
        },
        {
            title: "Collaborative Playlist Creation",
            description: "Build the perfect playlist together, sharing songs that represent your personalities and creating musical memories.",
            category: "creative",
            difficulty: "easy",
            duration: "45 mins",
            participants: "2 people",
            steps: [
                "Each person adds 5 songs that represent them",
                "Take turns explaining why you chose each song",
                "Create a shared Spotify playlist",
                "Challenge each other to guess meanings"
            ]
        },
        {
            title: "Virtual Cooking Challenge",
            description: "Cook the same recipe together over video call. Compare results and enjoy your meal 'together'!",
            category: "virtual",
            difficulty: "medium",
            duration: "1-2 hours",
            participants: "2 people",
            steps: [
                "Choose a simple recipe you both can make",
                "Shop for ingredients separately",
                "Video call and cook together",
                "Enjoy your meals while chatting"
            ]
        },
        {
            title: "Photo Story Challenge",
            description: "Create a story together using only photos taken around campus. Let creativity guide your narrative!",
            category: "creative",
            difficulty: "medium",
            duration: "1-1.5 hours",
            participants: "2 people",
            steps: [
                "Decide on a theme or story genre",
                "Take turns photographing scenes",
                "Create a narrative with your photos",
                "Share your story with friends"
            ]
        }
    ];

    const conversationPrompts = [
        { prompt: "What's the most spontaneous thing you've ever done?", category: "icebreaker" },
        { prompt: "If you could relive one day in your life, which would it be?", category: "deep" },
        { prompt: "What's your most embarrassing childhood story?", category: "fun" },
        { prompt: "What's something you've always wanted to learn but haven't yet?", category: "casual" },
        { prompt: "What's your idea of a perfect weekend?", category: "romantic" },
        { prompt: "If you could instantly become an expert in something, what would it be?", category: "icebreaker" },
        { prompt: "What's a movie that changed your perspective on life?", category: "deep" },
        { prompt: "What's the weirdest food combination you actually enjoy?", category: "fun" },
        { prompt: "What's something small that makes you really happy?", category: "romantic" },
        { prompt: "If you could have any superpower, what would it be and why?", category: "casual" }
    ];

    const categories = [
        { id: "all", label: "All Ideas", icon: Star },
        { id: "conversation", label: "Conversation", icon: MessageSquare },
        { id: "virtual", label: "Virtual", icon: Camera },
        { id: "campus", label: "Campus", icon: MapPin },
        { id: "creative", label: "Creative", icon: Palette },
        { id: "fun", label: "Fun", icon: Smile }
    ];

    const filteredIdeas = activeCategory === "all" 
        ? dateIdeas 
        : dateIdeas.filter(idea => idea.category === activeCategory);

    const searchedIdeas = searchQuery 
        ? filteredIdeas.filter(idea => 
            idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            idea.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : filteredIdeas;

    const handleUseIdea = (idea) => {
        console.log("Using idea:", idea.title);
        // Could open a share modal or copy to clipboard
    };

    const handleCopyPrompt = (prompt) => {
        navigator.clipboard.writeText(prompt);
        // Show toast notification
    };

    const stats = [
        { label: "Total Ideas", value: "150+", icon: Lightbulb, color: "text-blue-500" },
        { label: "Success Rate", value: "92%", icon: Heart, color: "text-pink-500" },
        { label: "Avg Duration", value: "1.5h", icon: Clock, color: "text-green-500" },
        { label: "Happy Couples", value: "2.3k", icon: Users, color: "text-purple-500" }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Virtual Date Ideas</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fun conversation starters & creative date prompts</p>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Break the ice and create meaningful connections with curated date ideas and conversation starters designed for campus life! 💫
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="text-center">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button
                    variant={activeTab === "ideas" ? "default" : "ghost"}
                    onClick={() => setActiveTab("ideas")}
                    className="flex-1"
                >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Date Ideas
                </Button>
                <Button
                    variant={activeTab === "prompts" ? "default" : "ghost"}
                    onClick={() => setActiveTab("prompts")}
                    className="flex-1"
                >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Quick Prompts
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                    <Input
                        placeholder="Search date ideas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-4"
                    />
                </div>
                <Button variant="outline" className="sm:w-auto">
                    <Shuffle className="w-4 h-4 mr-2" />
                    Random Idea
                </Button>
            </div>

            {activeTab === "ideas" && (
                <>
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(category.id)}
                                className="flex items-center space-x-1"
                            >
                                <category.icon className="w-4 h-4" />
                                <span>{category.label}</span>
                            </Button>
                        ))}
                    </div>

                    {/* Date Ideas Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {searchedIdeas.map((idea, index) => (
                            <DateIdeaCard
                                key={index}
                                idea={idea}
                                category={idea.category}
                                difficulty={idea.difficulty}
                                duration={idea.duration}
                                participants={idea.participants}
                                onSave={() => console.log("Saved idea:", idea.title)}
                                onShare={() => console.log("Shared idea:", idea.title)}
                                onUse={() => handleUseIdea(idea)}
                            />
                        ))}
                    </div>
                </>
            )}

            {activeTab === "prompts" && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Conversation Starters</h2>
                        <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {conversationPrompts.map((prompt, index) => (
                            <QuickPromptCard
                                key={index}
                                prompt={prompt.prompt}
                                category={prompt.category}
                                onCopy={() => handleCopyPrompt(prompt.prompt)}
                                onUse={() => console.log("Using prompt:", prompt.prompt)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Pro Tips */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
                        <Star className="w-5 h-5" />
                        <span>Pro Dating Tips</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">Before the Date:</h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                                <li>• Choose ideas that match both personalities</li>
                                <li>• Have backup conversation topics ready</li>
                                <li>• Set comfortable time expectations</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">During the Date:</h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                                <li>• Be present and engaged</li>
                                <li>• Ask follow-up questions</li>
                                <li>• Share your own stories too</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
