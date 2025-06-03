"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    MessageSquare,
    Clock,
    Flame,
    Heart,
    Send,
    Filter,
    Users,
    Timer,
    Zap,
    Eye,
    EyeOff,
    Sparkles,
    ArrowRight,
    CheckCircle,
    X
} from "lucide-react";

const FlirtCard = ({ message, timeLeft, isAnonymous, gender, year, interests, onReply, onPass, onLike }) => {
    const formatTimeLeft = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m left`;
        }
        return `${mins}m left`;
    };

    const getTimeColor = (minutes) => {
        if (minutes < 60) return "text-red-500";
        if (minutes < 180) return "text-orange-500";
        return "text-green-500";
    };

    return (
        <Card className="relative overflow-hidden border-2 hover:border-pink-200 dark:hover:border-pink-700 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100 to-transparent dark:from-pink-900/20 rounded-bl-full"></div>

            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {isAnonymous ? "Anonymous Flirt" : "Secret Admirer"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {gender} • {year} Year • {interests.join(", ")}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Timer className={`w-4 h-4 ${getTimeColor(timeLeft)}`} />
                        <span className={`text-xs font-medium ${getTimeColor(timeLeft)}`}>
                            {formatTimeLeft(timeLeft)}
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{message}</p>
                </div>

                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onPass}
                        className="flex-1 border-gray-300 hover:border-gray-400"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Pass
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onLike}
                        className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    >
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                    </Button>
                    <Button
                        size="sm"
                        onClick={onReply}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                        <Send className="w-4 h-4 mr-1" />
                        Flirt Back
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const ActiveFlirtChat = ({ chat, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(chat.id, newMessage);
            setNewMessage("");
        }
    };

    return (
        <Card className="h-96 flex flex-col">
            <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Flame className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{chat.name}</h3>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Timer className="w-3 h-3" />
                                <span>{chat.timeLeft}</span>
                            </div>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700 dark:bg-pink-900/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Active
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {chat.messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs px-3 py-2 rounded-lg ${message.isMe
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <span className="text-xs opacity-70">{message.time}</span>
                        </div>
                    </div>
                ))}
            </CardContent>

            <div className="p-4 border-t">
                <div className="flex space-x-2">
                    <Input
                        placeholder="Type your flirty message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1"
                    />
                    <Button onClick={handleSend} size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const FlirtPrompt = ({ prompt, onUse }) => (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border hover:border-pink-200 dark:hover:border-pink-700" onClick={onUse}>
        <CardContent className="p-4">
            <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{prompt}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
        </CardContent>
    </Card>
);

export default function FlirtZonePage() {
    const [activeTab, setActiveTab] = useState("discover");
    const [showPrompts, setShowPrompts] = useState(false);
    const [selectedFlirt, setSelectedFlirt] = useState(null);

    // Mock data
    const flirtMessages = [
        {
            id: 1,
            message: "Hey there! I've been noticing you around campus and you seem really interesting. Want to grab coffee sometime? ☕",
            timeLeft: 1320, // 22 hours
            isAnonymous: false,
            gender: "Female",
            year: "3rd",
            interests: ["Photography", "Books", "Coffee"]
        },
        {
            id: 2,
            message: "Your smile in yesterday's lecture totally made my day! Hope you're having a great week 😊",
            timeLeft: 45,
            isAnonymous: true,
            gender: "Male",
            year: "2nd",
            interests: ["Music", "Gaming", "Movies"]
        },
        {
            id: 3,
            message: "I love your style! You always look so put together. Would love to chat and get to know you better 💫",
            timeLeft: 780, // 13 hours
            isAnonymous: false,
            gender: "Female",
            year: "4th",
            interests: ["Fashion", "Dance", "Travel"]
        }
    ];

    const activeChats = [
        {
            id: 1,
            name: "Mysterious_Artist",
            timeLeft: "18h 23m",
            messages: [
                { text: "Hey! Thanks for flirting back 😊", isMe: false, time: "2:30 PM" },
                { text: "Your message made my day! Tell me about yourself", isMe: true, time: "2:32 PM" },
                { text: "I'm actually in your Computer Science class! But I'm too shy to talk in person 🙈", isMe: false, time: "2:35 PM" }
            ]
        }
    ];

    const flirtPrompts = [
        "I've been admiring your confidence in class discussions. Want to grab a study session together?",
        "Your laugh is absolutely contagious! Hope you're having an amazing day ✨",
        "I noticed we have similar taste in books/music. Would love to chat about it!",
        "You seem like someone who has great stories. Care to share one over coffee?",
        "Your positive energy is magnetic! Want to be friends and see where it goes?",
        "I love how passionate you are about [subject]. Mind if I pick your brain about it?"
    ];

    const handleSendMessage = (chatId, message) => {
        // Handle sending message
        console.log("Sending message:", message, "to chat:", chatId);
    };

    const stats = [
        { label: "Active Flirts", value: "12", icon: Flame, color: "text-red-500" },
        { label: "Matches Today", value: "3", icon: Heart, color: "text-pink-500" },
        { label: "Response Rate", value: "87%", icon: CheckCircle, color: "text-green-500" },
        { label: "Time Left Avg", value: "14h", icon: Timer, color: "text-blue-500" }
    ];

    return (
        <div className="space-y-6">
            {/* App Description */}
            <div className="text-center space-y-2">
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Send and receive anonymous flirty messages that disappear after 24 hours.
                    Build connections before they vanish! ⏰
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
                    variant={activeTab === "discover" ? "default" : "ghost"}
                    onClick={() => setActiveTab("discover")}
                    className="flex-1"
                >
                    <Eye className="w-4 h-4 mr-2" />
                    Discover Flirts
                </Button>
                <Button
                    variant={activeTab === "active" ? "default" : "ghost"}
                    onClick={() => setActiveTab("active")}
                    className="flex-1"
                >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Active Chats
                </Button>
                <Button
                    variant={activeTab === "send" ? "default" : "ghost"}
                    onClick={() => setActiveTab("send")}
                    className="flex-1"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send Flirt
                </Button>
            </div>

            {/* Content */}
            {activeTab === "discover" && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Flirts</h2>
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {flirtMessages.map((flirt) => (
                            <FlirtCard
                                key={flirt.id}
                                {...flirt}
                                onReply={() => setSelectedFlirt(flirt)}
                                onPass={() => console.log("Passed on flirt", flirt.id)}
                                onLike={() => console.log("Liked flirt", flirt.id)}
                            />
                        ))}
                    </div>

                    {flirtMessages.length === 0 && (
                        <div className="text-center py-12">
                            <Flame className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No new flirts</h3>
                            <p className="text-gray-600 dark:text-gray-400">Check back later for new messages!</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "active" && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Conversations</h2>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {activeChats.map((chat) => (
                            <ActiveFlirtChat
                                key={chat.id}
                                chat={chat}
                                onSendMessage={handleSendMessage}
                            />
                        ))}
                    </div>

                    {activeChats.length === 0 && (
                        <div className="text-center py-12">
                            <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No active chats</h3>
                            <p className="text-gray-600 dark:text-gray-400">Start flirting to begin conversations!</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "send" && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Send a Flirt</h2>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Send className="w-5 h-5" />
                                <span>Compose Message</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Target Year
                                    </label>
                                    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                                        <option>Any Year</option>
                                        <option>1st Year</option>
                                        <option>2nd Year</option>
                                        <option>3rd Year</option>
                                        <option>4th Year</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Gender Preference
                                    </label>
                                    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                                        <option>Any Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Non-binary</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Your Message
                                    </label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowPrompts(!showPrompts)}
                                    >
                                        <Sparkles className="w-4 h-4 mr-1" />
                                        Use Prompt
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Write a charming, respectful message..."
                                    className="min-h-24"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Your message will disappear after 24 hours if no response is received.
                                </p>
                            </div>

                            {showPrompts && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Flirt Prompts</h4>
                                    <div className="grid gap-2 max-h-48 overflow-y-auto">
                                        {flirtPrompts.map((prompt, index) => (
                                            <FlirtPrompt
                                                key={index}
                                                prompt={prompt}
                                                onUse={() => {
                                                    // Set prompt in textarea
                                                    setShowPrompts(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="anonymous" className="rounded" />
                                <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
                                    Send anonymously
                                </label>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                <Send className="w-4 h-4 mr-2" />
                                Send Flirt
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* How it Works */}
            <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-800">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-pink-800 dark:text-pink-300">
                        <Timer className="w-5 h-5" />
                        <span>How Flirt Zone Works</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto">
                                <Send className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h4 className="font-medium text-pink-800 dark:text-pink-300">Send Flirts</h4>
                            <p className="text-sm text-pink-700 dark:text-pink-400">Send anonymous or semi-anonymous flirty messages</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                                <Timer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-medium text-purple-800 dark:text-purple-300">24 Hour Timer</h4>
                            <p className="text-sm text-purple-700 dark:text-purple-400">Messages disappear unless there's mutual interest</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto">
                                <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h4 className="font-medium text-pink-800 dark:text-pink-300">Match & Chat</h4>
                            <p className="text-sm text-pink-700 dark:text-pink-400">When both parties show interest, start chatting!</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
