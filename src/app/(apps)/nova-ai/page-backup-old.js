'use client';
import { useState, useEffect, useRef } from 'react';
import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Bot,
    Mic,
    MicOff,
    Send,
    Brain,
    Heart,
    TrendingUp,
    Eye,
    Clock,
    Star,
    Zap,
    Crown,
    Lock,
    Loader2,
    MessageCircle,
    Users,
    Calendar,
    BookOpen,
    Trophy,
    Target,
    Sparkles,
    ChevronRight,
    Flame,
    Activity,
    AlertCircle
} from 'lucide-react';

export default function NovaAI() {
    const { hasAccess } = useAppAccess('Nova AI');
    
    // User State
    const [userCredits, setUserCredits] = useState(1250);
    const [isPremium, setIsPremium] = useState(false);
    const [userLevel, setUserLevel] = useState(7);
    const [streakDays, setStreakDays] = useState(12);
    
    // Chat State
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'nova',
            content: "Hey! I'm Nova, your personal campus AI. I've been analyzing your activity and have some insights to share! 🚀",
            timestamp: new Date(),
            premium: false
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    
    // Live data simulation
    const [liveInsights, setLiveInsights] = useState({
        profileViews: 7,
        newCrushNotifications: 2,
        socialScore: 1847,
        campusRank: 234
    });
    
    // Quick prompts with psychological hooks
    const quickPrompts = [
        { icon: Heart, text: "Any crush notifications?", category: "romantic" },
        { icon: Users, text: "What's happening today?", category: "social" },
        { icon: BookOpen, text: "Find study buddy", category: "academic" },
        { icon: Eye, text: "Who viewed my profile?", category: "social" }
    ];
    
    // Nova responses with dark psychology
    const responses = [
        "I noticed someone's been checking your profile repeatedly... 👀 Want me to reveal who?",
        "Your social energy is 89% today - that's higher than usual! Something good happened?",
        "There's unusual activity around your posts today. Someone's definitely interested... 😏",
        "Based on your study pattern, I've found perfect study materials for tomorrow's exam",
        "I can predict with 87% accuracy who you'll be attracted to next. Interested?",
        "Your behavioral patterns match someone famous. Want to know who?",
        "Something significant is going to happen to you this weekend. The signs are all there...",
        "I've detected 3 potential romantic interests based on interaction patterns. Curious?"
    ];

    const sendMessage = async (text = currentMessage, isQuickPrompt = false) => {
        if (!text.trim() && !isQuickPrompt) return;
        
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: text,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setCurrentMessage("");
        setIsTyping(true);
        
        // Simulate AI processing with psychological tension
        setTimeout(() => {
            const response = responses[Math.floor(Math.random() * responses.length)];
            
            const novaMessage = {
                id: Date.now() + 1,
                type: 'nova',
                content: response,
                timestamp: new Date(),
                premium: Math.random() > 0.7 // 30% chance of premium content
            };
            
            setMessages(prev => [...prev, novaMessage]);
            setIsTyping(false);
            
            // Update insights occasionally
            if (Math.random() > 0.6) {
                setLiveInsights(prev => ({
                    ...prev,
                    profileViews: prev.profileViews + Math.floor(Math.random() * 3),
                    socialScore: prev.socialScore + Math.floor(Math.random() * 20 - 5)
                }));
            }
        }, 1500 + Math.random() * 1000);
    };
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    return (
        <>
            {!hasAccess && <PremiumGate appName="Nova AI" />}
            {hasAccess && (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto p-4">
                {/* Clean Header */}
                <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nova AI</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Your Personal Campus Intelligence</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                <Activity className="w-3 h-3 mr-1" />
                                Online
                            </Badge>
                            {!isPremium && (
                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Free User
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Chat Area */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Chat Messages */}
                        <Card className="h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4 h-full flex flex-col">
                                <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${
                                                    message.type === 'user'
                                                        ? 'bg-blue-500 text-white'
                                                        : message.premium && !isPremium
                                                        ? 'bg-yellow-50 border border-yellow-200 text-gray-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200'
                                                        : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                                }`}
                                            >
                                                {message.premium && !isPremium ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <Lock className="w-4 h-4 text-yellow-600" />
                                                            <span className="text-sm font-medium">Premium Content</span>
                                                        </div>
                                                        <p className="text-sm">Upgrade to see this insight...</p>
                                                        <Button size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                                                            Unlock Now
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm">{message.content}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                                
                                {/* Input Area */}
                                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                                    <div className="flex space-x-2">
                                        <Input
                                            value={currentMessage}
                                            onChange={(e) => setCurrentMessage(e.target.value)}
                                            placeholder="Ask Nova anything..."
                                            className="flex-1"
                                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        />
                                        <Button
                                            onClick={() => sendMessage()}
                                            size="icon"
                                            className="bg-blue-500 hover:bg-blue-600"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            onClick={() => setIsListening(!isListening)}
                                            size="icon"
                                            variant="outline"
                                            className={isListening ? "bg-red-50 border-red-200" : ""}
                                        >
                                            {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Prompts */}
                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {quickPrompts.map((prompt, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="justify-start h-auto p-3 text-left"
                                            onClick={() => sendMessage(prompt.text, true)}
                                        >
                                            <prompt.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="text-sm">{prompt.text}</span>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Live Insights */}
                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center">
                                    <Activity className="w-5 h-5 mr-2 text-green-500" />
                                    Live Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Profile Views</span>
                                    <span className="font-semibold text-blue-600">{liveInsights.profileViews}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">New Notifications</span>
                                    <Badge className="bg-red-100 text-red-700 text-xs">
                                        {liveInsights.newCrushNotifications}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Social Score</span>
                                    <span className="font-semibold text-green-600">{liveInsights.socialScore}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Campus Rank</span>
                                    <span className="font-semibold">#{liveInsights.campusRank}</span>
                                </div>
                                
                                {/* Psychological Hook */}
                                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                    <div className="flex items-start space-x-2">
                                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                                Someone's been checking your profile repeatedly...
                                            </p>
                                            <Button size="sm" variant="link" className="p-0 h-auto text-xs text-yellow-700 hover:text-yellow-800">
                                                Reveal who →
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Nova Powers */}
                        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center">
                                    <Brain className="w-5 h-5 mr-2 text-purple-500" />
                                    Nova Powers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[
                                    { name: "Behavioral Analysis", level: 89 },
                                    { name: "Social Prediction", level: 76 },
                                    { name: "Compatibility Match", level: 92 },
                                    { name: "Trend Forecasting", level: 67 }
                                ].map((power, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">{power.name}</span>
                                            <span className="text-gray-900 dark:text-white">{power.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-1000"
                                                style={{ width: `${power.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Premium Upgrade - Clean minimal design */}
                        {!isPremium && (
                            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                                <CardContent className="p-4 text-center">
                                    <Crown className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Unlock Full Nova</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        Get unlimited insights, voice chat, and exclusive predictions
                                    </p>
                                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                                        Upgrade Now
                                    </Button>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        {2500 - userCredits} credits needed for free unlock
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
                </div>
            )}
        </>
    );
}
