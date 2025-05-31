"use client";
 export const runtime = 'edge';
 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    MessageCircle,
    Shield,
    Heart,
    Users,
    BookOpen,
    Calendar,
    Image,
    Video,
    Smile,
    MapPin,
    Clock,
    Coffee,
    Star,
    Send,
    Eye,
    EyeOff,
    Sparkles,
    PaintRoller as Poll
} from "lucide-react";

const postTypes = [
    {
        id: 'confession',
        title: 'Anonymous Confession',
        description: 'Share your thoughts anonymously',
        icon: <Shield className="w-5 h-5" />,
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
    },
    {
        id: 'crush',
        title: 'Secret Crush',
        description: 'Send an anonymous crush notification',
        icon: <Heart className="w-5 h-5" />,
        color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300'
    },
    {
        id: 'social',
        title: 'Social Post',
        description: 'Share with your campus community',
        icon: <MessageCircle className="w-5 h-5" />,
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
        id: 'study',
        title: 'Study Group',
        description: 'Find study partners or share resources',
        icon: <BookOpen className="w-5 h-5" />,
        color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
    },
    {
        id: 'event',
        title: 'Campus Event',
        description: 'Create or promote an event',
        icon: <Calendar className="w-5 h-5" />,
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
    },
    {
        id: 'poll',
        title: 'Poll/Question',
        description: 'Ask your campus community',
        icon: <Poll className="w-5 h-5" />,
        color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
    }
];

const confessionCategories = [
    'General', 'Relationships', 'Academic', 'Social', 'Mental Health', 'Campus Life', 'Career', 'Family'
];

const moodEmojis = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😍', label: 'Excited' },
    { emoji: '🤔', label: 'Confused' },
    { emoji: '😌', label: 'Peaceful' },
    { emoji: '💪', label: 'Motivated' },
    { emoji: '😴', label: 'Tired' }
];

export default function CreatePage() {
    const [selectedType, setSelectedType] = useState('confession');
    const [postContent, setPostContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [selectedMood, setSelectedMood] = useState(null);
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [eventDetails, setEventDetails] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
    });

    const currentPostType = postTypes.find(type => type.id === selectedType);

    const addPollOption = () => {
        if (pollOptions.length < 6) {
            setPollOptions([...pollOptions, '']);
        }
    };

    const updatePollOption = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const removePollOption = (index) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };

    const handlePost = () => {
        const postData = {
            type: selectedType,
            content: postContent,
            anonymous: isAnonymous,
            mood: selectedMood,
            ...(selectedType === 'poll' && { pollOptions: pollOptions.filter(option => option.trim()) }),
            ...(selectedType === 'event' && { eventDetails })
        };

        console.log('Creating post:', postData);

        // Reset form
        setPostContent('');
        setSelectedMood(null);
        setPollOptions(['', '']);
        setEventDetails({
            title: '',
            date: '',
            time: '',
            location: '',
            description: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create & Share</h1>
                    <p className="text-gray-600 dark:text-gray-400">Express yourself, connect with others, and build your campus community</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Post Type Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle>What would you like to share?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {postTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setSelectedType(type.id)}
                                            className={`p-4 rounded-lg border-2 transition-all text-left ${selectedType === type.id
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className={`inline-flex p-2 rounded-lg mb-2 ${type.color}`}>
                                                {type.icon}
                                            </div>
                                            <h3 className="font-semibold text-sm">{type.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Creation */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    {currentPostType?.icon}
                                    <span>{currentPostType?.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {selectedType === 'confession' && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Post anonymously</span>
                                            <div className="flex items-center space-x-2">
                                                <EyeOff className="w-4 h-4 text-gray-400" />
                                                <Switch
                                                    checked={isAnonymous}
                                                    onCheckedChange={setIsAnonymous}
                                                />
                                                <Eye className="w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category (optional)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {confessionCategories.map(category => (
                                                    <SelectItem key={category} value={category.toLowerCase()}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                )}

                                {selectedType === 'crush' && (
                                    <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Sparkles className="w-4 h-4 text-pink-600" />
                                            <span className="font-medium text-pink-700 dark:text-pink-300">Secret Crush Feature</span>
                                        </div>
                                        <p className="text-sm text-pink-600 dark:text-pink-400">
                                            Your identity will only be revealed if they choose you back. Write a sweet message!
                                        </p>
                                    </div>
                                )}

                                {selectedType === 'event' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Event title"
                                            value={eventDetails.title}
                                            onChange={(e) => setEventDetails(prev => ({ ...prev, title: e.target.value }))}
                                        />
                                        <Input
                                            type="date"
                                            value={eventDetails.date}
                                            onChange={(e) => setEventDetails(prev => ({ ...prev, date: e.target.value }))}
                                        />
                                        <Input
                                            type="time"
                                            value={eventDetails.time}
                                            onChange={(e) => setEventDetails(prev => ({ ...prev, time: e.target.value }))}
                                        />
                                        <Input
                                            placeholder="Location"
                                            value={eventDetails.location}
                                            onChange={(e) => setEventDetails(prev => ({ ...prev, location: e.target.value }))}
                                        />
                                    </div>
                                )}

                                {selectedType === 'poll' && (
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium">Poll Question</label>
                                        <Input placeholder="What's your question?" />
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Options</label>
                                            {pollOptions.map((option, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <Input
                                                        placeholder={`Option ${index + 1}`}
                                                        value={option}
                                                        onChange={(e) => updatePollOption(index, e.target.value)}
                                                    />
                                                    {index > 1 && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removePollOption(index)}
                                                        >
                                                            ✕
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            {pollOptions.length < 6 && (
                                                <Button variant="outline" size="sm" onClick={addPollOption}>
                                                    + Add Option
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Textarea
                                    placeholder={
                                        selectedType === 'confession' ? "What's on your mind? Share anything that's weighing on you..." :
                                            selectedType === 'crush' ? "Write a sweet message for your crush..." :
                                                selectedType === 'social' ? "What's happening? Share your thoughts..." :
                                                    selectedType === 'study' ? "What do you need help with? Or what can you help others with?" :
                                                        selectedType === 'event' ? "Tell people about your event..." :
                                                            "Ask your question..."
                                    }
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    className="min-h-[120px]"
                                />

                                {/* Mood Selection */}
                                {(selectedType === 'confession' || selectedType === 'social') && (
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">How are you feeling? (optional)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {moodEmojis.map((mood, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedMood(selectedMood?.emoji === mood.emoji ? null : mood)}
                                                    className={`p-2 rounded-lg border transition-all ${selectedMood?.emoji === mood.emoji
                                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <span className="text-xl">{mood.emoji}</span>
                                                    <span className="text-xs block">{mood.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Media Upload */}
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                    <div className="space-y-2">
                                        <div className="flex justify-center space-x-4">
                                            <Button variant="outline" size="sm">
                                                <Image className="w-4 h-4 mr-2" />
                                                Photo
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Video className="w-4 h-4 mr-2" />
                                                Video
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500">Or drag and drop files here</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <div className="text-sm text-gray-500">
                                        {postContent.length}/500 characters
                                    </div>
                                    <Button
                                        onClick={handlePost}
                                        disabled={!postContent.trim()}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        {selectedType === 'confession' ? 'Share Anonymously' :
                                            selectedType === 'crush' ? 'Send Crush' :
                                                selectedType === 'poll' ? 'Create Poll' :
                                                    selectedType === 'event' ? 'Create Event' :
                                                        'Post'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Your Impact</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Posts this week</span>
                                        <Badge variant="secondary">12</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Helpful reactions</span>
                                        <Badge variant="secondary">48</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Study sessions hosted</span>
                                        <Badge variant="secondary">3</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Community Guidelines */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <Shield className="w-4 h-4" />
                                    <span>Community Guidelines</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <p>• Be respectful and kind</p>
                                    <p>• No hate speech or bullying</p>
                                    <p>• Keep academic content honest</p>
                                    <p>• Respect privacy and consent</p>
                                    <p>• Report inappropriate content</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trending Topics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Trending on Campus</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Badge variant="outline" className="w-full justify-start">
                                        #FinalWeek
                                    </Badge>
                                    <Badge variant="outline" className="w-full justify-start">
                                        #StudyBuddy
                                    </Badge>
                                    <Badge variant="outline" className="w-full justify-start">
                                        #CampusEvents
                                    </Badge>
                                    <Badge variant="outline" className="w-full justify-start">
                                        #MentalHealth
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Coffee className="w-4 h-4 mr-2" />
                                        Find Coffee Buddy
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Join Study Group
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Users className="w-4 h-4 mr-2" />
                                        Browse Events
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
}
