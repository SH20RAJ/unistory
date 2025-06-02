"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Heart,
    Crown,
    Star,
    Trophy,
    Calendar,
    Camera,
    ThumbsUp,
    MessageSquare,
    Share2,
    Upload,
    Award,
    Users,
    Sparkles,
    TrendingUp,
    Gift,
    Vote,
    Clock,
    Eye,
    BookOpen,
    Coffee,
    Music,
    MapPin,
    Zap,
    Target,
    Plus,
    Image as ImageIcon
} from "lucide-react";

const CoupleCard = ({ couple, rank, isCurrentWeek = false }) => {
    const [liked, setLiked] = useState(false);
    
    const rankColors = {
        1: "from-yellow-400 to-yellow-600",
        2: "from-gray-400 to-gray-600", 
        3: "from-orange-400 to-orange-600"
    };

    const rankIcons = {
        1: Crown,
        2: Award,
        3: Trophy
    };

    const RankIcon = rankIcons[rank] || Star;

    return (
        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
            isCurrentWeek ? 'ring-2 ring-pink-500 ring-opacity-50' : ''
        } ${rank <= 3 ? 'border-2 border-yellow-200 dark:border-yellow-700' : ''}`}>
            {rank <= 3 && (
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${rankColors[rank]} transform rotate-45 translate-x-6 -translate-y-6`}></div>
                    <div className="absolute top-2 right-2">
                        <RankIcon className="w-5 h-5 text-white" />
                    </div>
                </div>
            )}

            {isCurrentWeek && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            )}

            <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                    <div className="flex -space-x-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm">
                            <span className="text-white font-medium text-sm">{couple.person1.name[0]}</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm">
                            <span className="text-white font-medium text-sm">{couple.person2.name[0]}</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <CardTitle className="text-lg">{couple.person1.name} & {couple.person2.name}</CardTitle>
                            {isCurrentWeek && (
                                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                                    <Crown className="w-3 h-3 mr-1" />
                                    This Week
                                </Badge>
                            )}
                            {rank && rank <= 3 && (
                                <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:text-yellow-400">
                                    #{rank}
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {couple.person1.year} & {couple.person2.year} • Together {couple.duration}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {couple.image && (
                    <div className="relative rounded-lg overflow-hidden">
                        <img 
                            src={couple.image} 
                            alt="Couple photo" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                )}

                <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">"{couple.story.title}"</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {couple.story.content}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1">
                    {couple.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{couple.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{couple.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{couple.views}</span>
                        </div>
                    </div>
                    <span className="text-xs">{couple.submittedDate}</span>
                </div>

                <div className="flex space-x-2">
                    <Button
                        variant={liked ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLiked(!liked)}
                        className={`flex-1 ${liked ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
                    >
                        <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-white' : ''}`} />
                        {liked ? 'Loved' : 'Love This'}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const SubmissionForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        person1Name: "",
        person1Year: "",
        person1Branch: "",
        person2Name: "",
        person2Year: "",
        person2Branch: "",
        duration: "",
        storyTitle: "",
        storyContent: "",
        tags: "",
        isAnonymous: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span>Submit Your Love Story</span>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Share your beautiful journey and inspire others! Winners get featured and special campus privileges.
                </p>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900 dark:text-white">Person 1</h3>
                            <Input
                                placeholder="Name"
                                value={formData.person1Name}
                                onChange={(e) => setFormData({...formData, person1Name: e.target.value})}
                                required
                            />
                            <select 
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                                value={formData.person1Year}
                                onChange={(e) => setFormData({...formData, person1Year: e.target.value})}
                                required
                            >
                                <option value="">Select Year</option>
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            <Input
                                placeholder="Branch/Department"
                                value={formData.person1Branch}
                                onChange={(e) => setFormData({...formData, person1Branch: e.target.value})}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900 dark:text-white">Person 2</h3>
                            <Input
                                placeholder="Name"
                                value={formData.person2Name}
                                onChange={(e) => setFormData({...formData, person2Name: e.target.value})}
                                required
                            />
                            <select 
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                                value={formData.person2Year}
                                onChange={(e) => setFormData({...formData, person2Year: e.target.value})}
                                required
                            >
                                <option value="">Select Year</option>
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            <Input
                                placeholder="Branch/Department"
                                value={formData.person2Branch}
                                onChange={(e) => setFormData({...formData, person2Branch: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            How long have you been together?
                        </label>
                        <Input
                            placeholder="e.g., 6 months, 2 years"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Story Title
                        </label>
                        <Input
                            placeholder="Give your love story a catchy title"
                            value={formData.storyTitle}
                            onChange={(e) => setFormData({...formData, storyTitle: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Love Story
                        </label>
                        <Textarea
                            placeholder="Share your journey, how you met, special moments, what makes your relationship unique..."
                            className="min-h-32"
                            value={formData.storyContent}
                            onChange={(e) => setFormData({...formData, storyContent: e.target.value})}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Be authentic and heartfelt. Stories that inspire and connect get more votes!
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tags (optional)
                        </label>
                        <Input
                            placeholder="e.g., childhood friends, long distance, study partners"
                            value={formData.tags}
                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Upload a couple photo</p>
                        <Button variant="outline" size="sm">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Choose Photo
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="anonymous"
                            checked={formData.isAnonymous}
                            onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                            className="rounded"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
                            Submit anonymously (names will be hidden)
                        </label>
                    </div>

                    <div className="flex space-x-4">
                        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                            <Heart className="w-4 h-4 mr-2" />
                            Submit Story
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default function CoupleOfTheWeekPage() {
    const [activeTab, setActiveTab] = useState("current");
    const [showSubmissionForm, setShowSubmissionForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Mock data
    const currentWeekCouple = {
        person1: { name: "Arya", year: "3rd Year CSE" },
        person2: { name: "Rahul", year: "3rd Year CSE" },
        duration: "1.5 years",
        story: {
            title: "From Study Partners to Soulmates",
            content: "We met during our first data structures assignment in second year. What started as late-night coding sessions in the library turned into coffee dates, and eventually we realized we were each other's perfect algorithm. Our love grew like a well-optimized program - efficient, beautiful, and bug-free! 💻❤️"
        },
        tags: ["Study Partners", "Same Branch", "Library Love", "Tech Couple"],
        likes: 1247,
        comments: 89,
        views: 3456,
        submittedDate: "3 days ago",
        image: "/api/placeholder/400/200"
    };

    const pastWinners = [
        {
            person1: { name: "Maya", year: "4th Year ECE" },
            person2: { name: "Dev", year: "2nd Year ME" },
            duration: "8 months",
            story: {
                title: "Music Brought Us Together",
                content: "I was playing guitar at the campus fest when she came up and started singing along. Her voice was magic, and that moment I knew I wanted to make music with her for life. Now we're campus's favorite music duo! 🎵"
            },
            tags: ["Music", "Campus Fest", "Different Years", "Artists"],
            likes: 892,
            comments: 45,
            views: 2134,
            submittedDate: "1 week ago",
            image: "/api/placeholder/400/200"
        },
        {
            person1: { name: "Priya", year: "2nd Year BBA" },
            person2: { name: "Karan", year: "3rd Year CSE" },
            duration: "2 years",
            story: {
                title: "Opposites Attract: Business Meets Code",
                content: "She's all about business strategies, I'm about coding algorithms. Somehow we found the perfect balance - she handles the people stuff, I handle the tech stuff. Together we're building something beautiful! 💼💻"
            },
            tags: ["Different Branches", "Long Term", "Entrepreneurs", "Balance"],
            likes: 756,
            comments: 67,
            views: 1890,
            submittedDate: "2 weeks ago",
            image: "/api/placeholder/400/200"
        },
        {
            person1: { name: "Isha", year: "1st Year" },
            person2: { name: "Rohan", year: "1st Year" },
            duration: "6 months",
            story: {
                title: "Freshers to Forever",
                content: "We both were scared and excited on the first day of college. Got paired up for orientation activities and just clicked instantly. Six months later, we're still each other's favorite adventure! 🎓"
            },
            tags: ["Freshers", "Orientation", "New Love", "Adventure"],
            likes: 634,
            comments: 38,
            views: 1456,
            submittedDate: "3 weeks ago",
            image: "/api/placeholder/400/200"
        }
    ];

    const topCouples = [currentWeekCouple, ...pastWinners].map((couple, index) => ({
        ...couple,
        rank: index + 1
    }));

    const handleSubmitStory = (formData) => {
        console.log("Submitting story:", formData);
        setShowSubmissionForm(false);
        // Handle form submission
    };

    const stats = [
        { label: "Stories Shared", value: "342", icon: BookOpen, color: "text-blue-500" },
        { label: "Happy Couples", value: "156", icon: Heart, color: "text-pink-500" },
        { label: "Total Votes", value: "12.5k", icon: Vote, color: "text-green-500" },
        { label: "This Week's Votes", value: "1.2k", icon: TrendingUp, color: "text-purple-500" }
    ];

    if (showSubmissionForm) {
        return (
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="text-center">
                    <Button
                        variant="outline"
                        onClick={() => setShowSubmissionForm(false)}
                        className="mb-4"
                    >
                        ← Back to Couples
                    </Button>
                </div>
                <SubmissionForm
                    onSubmit={handleSubmitStory}
                    onCancel={() => setShowSubmissionForm(false)}
                />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Couple of the Week</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Campus couples voted by community</p>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Celebrate love on campus! Share your story, vote for your favorites, and get inspired by beautiful relationships around you! 💕
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

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                    onClick={() => setShowSubmissionForm(true)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Share Your Story
                </Button>
                <div className="relative flex-1">
                    <Input
                        placeholder="Search couples by name, branch, or story..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button
                    variant={activeTab === "current" ? "default" : "ghost"}
                    onClick={() => setActiveTab("current")}
                    className="flex-1"
                >
                    <Crown className="w-4 h-4 mr-2" />
                    This Week's Winner
                </Button>
                <Button
                    variant={activeTab === "all" ? "default" : "ghost"}
                    onClick={() => setActiveTab("all")}
                    className="flex-1"
                >
                    <Trophy className="w-4 h-4 mr-2" />
                    All Time Favorites
                </Button>
                <Button
                    variant={activeTab === "voting" ? "default" : "ghost"}
                    onClick={() => setActiveTab("voting")}
                    className="flex-1"
                >
                    <Vote className="w-4 h-4 mr-2" />
                    Vote Now
                </Button>
            </div>

            {/* Content */}
            {activeTab === "current" && (
                <div className="space-y-6">
                    <div className="text-center">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white mb-4">
                            <Crown className="w-4 h-4 mr-1" />
                            Current Champions
                        </Badge>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <CoupleCard couple={currentWeekCouple} rank={1} isCurrentWeek={true} />
                    </div>

                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-300">
                                <Gift className="w-5 h-5" />
                                <span>Winner Rewards</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center space-y-2">
                                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                                        <Coffee className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Free Date Package</h4>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-400">Café vouchers + movie tickets</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                                        <Camera className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Photo Shoot</h4>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-400">Professional couple photography</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                                        <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Campus Fame</h4>
                                    <p className="text-sm text-yellow-700 dark:text-yellow-400">Featured on campus social media</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === "all" && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Hall of Fame</h2>
                        <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Filter by Month
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topCouples.map((couple, index) => (
                            <CoupleCard
                                key={index}
                                couple={couple}
                                rank={couple.rank}
                                isCurrentWeek={index === 0}
                            />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "voting" && (
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Vote for Next Week's Winners</h2>
                        <p className="text-gray-600 dark:text-gray-400">Voting closes every Sunday at midnight</p>
                    </div>

                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-6 text-center">
                            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Voting Opens Monday</h3>
                            <p className="text-blue-700 dark:text-blue-400">New submissions are being reviewed. Check back Monday to vote for your favorites!</p>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Vote className="w-5 h-5" />
                                    <span>How Voting Works</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400 flex-shrink-0">1</div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Couples submit their stories throughout the week</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400 flex-shrink-0">2</div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Community votes from Monday to Sunday</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400 flex-shrink-0">3</div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Winners announced every Monday</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Target className="w-5 h-5" />
                                    <span>Voting Criteria</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Heart className="w-4 h-4 text-pink-500" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Authenticity of the story</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Inspiration factor</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Community connection</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Uniqueness</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
