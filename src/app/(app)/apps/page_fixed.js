"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Heart,
    Users,
    BookOpen,
    MessageSquare,
    Calendar,
    Camera,
    Trophy,
    Brain,
    Zap,
    Search,
    Star,
    Sparkles,
    Coffee,
    Music,
    MapPin,
    Target,
    Clock,
    Gift,
    Lightbulb,
    Shield,
    TrendingUp,
    Gamepad2,
    Newspaper,
    ShoppingBag,
    CalendarDays,
    NotebookPen,
    Bookmark,
    DollarSign,
    Car,
    Utensils,
    PlusCircle,
    Lock,
    Crown,
    Bot,
    Mic,
    MicOff,
    Send,
    MessageCircle,
    Eye,
    EyeOff,
    Loader2,
    Flame
} from "lucide-react";
import { useRouter } from "next/navigation";

const AppSection = ({ icon: Icon, title, description, apps, color = "blue", onAppClick, clickedApps }) => {
    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
        purple: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
        green: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
        orange: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
        pink: "bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800",
        indigo: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800"
    };

    const iconColorClasses = {
        blue: "text-blue-600 dark:text-blue-400",
        purple: "text-purple-600 dark:text-purple-400",
        green: "text-green-600 dark:text-green-400",
        orange: "text-orange-600 dark:text-orange-400",
        pink: "text-pink-600 dark:text-pink-400",
        indigo: "text-indigo-600 dark:text-indigo-400"
    };

    return (
        <div className={`p-8 rounded-2xl border-2 ${colorClasses[color] || colorClasses.blue} hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center border-2 shadow-lg">
                    <Icon className={`w-7 h-7 ${iconColorClasses[color] || iconColorClasses.blue}`} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{description}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app, index) => (
                    <AppCard key={index} {...app} onAppClick={onAppClick} isClicked={clickedApps?.has(app.name)} />
                ))}
            </div>
        </div>
    );
};

const PremiumAppCard = ({ icon: Icon, name, description, status, popular, trending, locked = true, premium = true }) => {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <Card className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105 border-2 ${locked ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800' : ''}`}>
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 dark:group-hover:from-purple-800/50 dark:group-hover:to-pink-800/50 transition-all relative">
                            <Icon className={`w-6 h-6 text-purple-600 dark:text-purple-400 transition-colors ${locked ? 'opacity-40' : ''}`} />
                            {locked && <Lock className="w-3 h-3 absolute -top-1 -right-1 text-yellow-600" />}
                        </div>
                        <div>
                            <CardTitle className={`text-lg font-bold ${locked ? 'opacity-70' : ''}`}>{name}</CardTitle>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        {premium && <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white">👑 Premium</Badge>}
                        {popular && <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">🔥 Popular</Badge>}
                        {trending && <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">📈 Trending</Badge>}
                        {status && <Badge className="text-xs bg-purple-600 hover:bg-purple-600">{status}</Badge>}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <CardDescription className={`text-sm leading-relaxed ${locked ? 'opacity-60' : ''}`}>
                    {showPreview || !locked ? description : `${description.substring(0, 50)}...`}
                </CardDescription>
                {locked && (
                    <div className="mt-4 space-y-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-xs"
                            onClick={() => setShowPreview(!showPreview)}
                        >
                            {showPreview ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                            {showPreview ? 'Hide Preview' : 'Quick Preview'}
                        </Button>
                        <Button size="sm" className="w-full text-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            <Crown className="w-3 h-3 mr-1" />
                            Unlock Premium
                        </Button>
                    </div>
                )}
            </CardContent>
            {locked && (
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
                    <div className="absolute top-2 right-2">
                        <Lock className="w-5 h-5 text-yellow-600" />
                    </div>
                </div>
            )}
        </Card>
    );
};

const NovaAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { type: 'nova', content: "Hey! I'm Nova, your personal campus AI. I know everything about your social life, studies, and can help you with anything. What's on your mind? 😊", time: "now" }
    ]);
    const [showChat, setShowChat] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [socialCredits, setSocialCredits] = useState(1250);
    const [premiumStatus, setPremiumStatus] = useState(false);

    const novaResponses = [
        "I noticed you haven't checked your secret crushes today... 👀",
        "Your social credit score went up! You're now at 1,250 points 🚀",
        "There are 3 new confessions from your college. Want me to summarize them?",
        "I found someone with 89% compatibility with you. Should I reveal who? 😏",
        "Your mood has been improving this week! Keep it up! 💪",
        "I can help you write the perfect reply to that message you've been avoiding...",
        "Based on your study patterns, you should take a break in 23 minutes ⏰",
        "Someone viewed your profile 7 times today. Want to know who? 👁️"
    ];

    const sendMessage = () => {
        if (!message.trim()) return;

        setMessages(prev => [...prev, { type: 'user', content: message, time: 'now' }]);
        setMessage("");
        setIsTyping(true);

        setTimeout(() => {
            const response = novaResponses[Math.floor(Math.random() * novaResponses.length)];
            setMessages(prev => [...prev, { type: 'nova', content: response, time: 'now' }]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    return (
        <div className="mb-8">
            <Card className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzlDNERGRiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-50"></div>

                <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                                <Bot className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                                    Meet Nova AI
                                </h2>
                                <p className="text-purple-200">Your Personal Campus Intelligence</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Badge className="bg-green-500/20 text-green-300 border-green-500/50">🟢 Online</Badge>
                                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">⚡ Learning You</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-2">👑 Premium Only</Badge>
                            <p className="text-sm text-purple-200">Social Credits: {socialCredits}</p>
                            <p className="text-xs text-purple-300">Need 2,500 for Nova access</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-purple-200">🧠 What Nova Knows About You:</h4>
                            <ul className="text-sm space-y-1 text-purple-100">
                                <li>• Your secret crushes and compatibility scores</li>
                                <li>• Study patterns and academic performance</li>
                                <li>• Social connections and mood tracking</li>
                                <li>• Campus events and personal interests</li>
                                <li>• Anonymous confessions about you 👀</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-purple-200">💬 Try Asking Nova:</h4>
                            <ul className="text-sm space-y-1 text-purple-100">
                                <li>• "Do I have any new crush notifications?"</li>
                                <li>• "What's the campus gossip today?"</li>
                                <li>• "Find me a study buddy for Physics"</li>
                                <li>• "Who viewed my profile recently?"</li>
                                <li>• "Suggest a confidence-boosting activity"</li>
                            </ul>
                        </div>
                    </div>

                    {showChat ? (
                        <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                            <div className="h-40 overflow-y-auto space-y-2 mb-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.type === 'user'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white/10 text-purple-100'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/10 text-purple-100 p-2 rounded-lg text-sm flex items-center space-x-1">
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            <span>Nova is typing...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <Input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Ask Nova anything..."
                                    className="bg-white/10 border-white/20 text-white placeholder-purple-200"
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    disabled={!premiumStatus}
                                />
                                <Button
                                    onClick={sendMessage}
                                    className="bg-purple-600 hover:bg-purple-700"
                                    disabled={!premiumStatus}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => setIsListening(!isListening)}
                                    className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                                    disabled={!premiumStatus}
                                >
                                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <Button
                                onClick={() => setShowChat(true)}
                                className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                                disabled={!premiumStatus}
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Start Chatting with Nova
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                            >
                                <Crown className="w-4 h-4 mr-2" />
                                Get Premium Access
                            </Button>
                        </div>
                    )}

                    {!premiumStatus && (
                        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                            <p className="text-yellow-200 text-sm">
                                💡 <strong>Unlock Nova:</strong> Reach 2,500 social credits or upgrade to Premium to access your AI companion
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

const PremiumAppSection = ({ icon: Icon, title, description, apps, color = "blue" }) => {
    const [showAll, setShowAll] = useState(false);
    const displayApps = showAll ? apps : apps.slice(0, 6);

    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
        purple: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
        green: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
        orange: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
        pink: "bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800",
        indigo: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800"
    };

    const iconColorClasses = {
        blue: "text-blue-600 dark:text-blue-400",
        purple: "text-purple-600 dark:text-purple-400",
        green: "text-green-600 dark:text-green-400",
        orange: "text-orange-600 dark:text-orange-400",
        pink: "text-pink-600 dark:text-pink-400",
        indigo: "text-indigo-600 dark:text-indigo-400"
    };

    return (
        <div className={`p-8 rounded-2xl border-2 ${colorClasses[color] || colorClasses.blue} hover:shadow-lg transition-all duration-300 relative`}>
            <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    👑 Premium Section
                </Badge>
            </div>

            <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center border-2 shadow-lg">
                    <Icon className={`w-7 h-7 ${iconColorClasses[color] || iconColorClasses.blue}`} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{description}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {displayApps.map((app, index) => (
                    <PremiumAppCard key={index} {...app} />
                ))}
            </div>

            {apps.length > 6 && (
                <div className="text-center">
                    <Button
                        variant="outline"
                        onClick={() => setShowAll(!showAll)}
                        className="border-dashed"
                    >
                        {showAll ? 'Show Less' : `View All ${apps.length} Apps`}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function AppsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [userCredits, setUserCredits] = useState(1250);
    const [isPremium, setIsPremium] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    const router = useRouter();

    // All apps are now premium with psychological hooks
    const psychologyApps = [
        {
            icon: Heart,
            name: "Secret Crush Detector",
            description: "Advanced AI analyzes micro-expressions, social patterns, and behavioral cues to reveal who secretly likes you. Uses variable-ratio reinforcement to keep you coming back for 'just one more check'.",
            popular: true,
            trending: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Brain,
            name: "Mind Reader",
            description: "Deep psychological profiling through seemingly innocent questions. Creates detailed personality maps and reveals hidden traits you didn't know about yourself.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Trophy,
            name: "Social Credit Score",
            description: "Gamified social status system that tracks every interaction, post, and connection. Creates addiction through leaderboards and status anxiety.",
            trending: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Clock,
            name: "Time Capsule",
            description: "Emotional investment app that connects you with your future self. Creates deep attachment through anticipation and self-discovery loops.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Zap,
            name: "Dopamine Dealer",
            description: "Mood tracking with instant gratification mechanics. Delivers micro-rewards and achievements to trigger addictive dopamine responses.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Shield,
            name: "Truth Bomb",
            description: "Anonymous confession platform designed to trigger maximum social proof addiction through reaction systems and viral mechanics.",
            trending: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Star,
            name: "Soul Twin Finder",
            description: "Ultra-rare compatibility matching using scarcity psychology. Makes users feel 'chosen' while creating FOMO about missing their perfect match.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Target,
            name: "Achievement Hunter",
            description: "Badge collection system exploiting completion bias. Creates endless progression loops and social comparison pressure.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Users,
            name: "Battle Royale",
            description: "Social challenges platform using tribal psychology and group warfare mechanics to create us-vs-them engagement.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Camera,
            name: "Memory Palace",
            description: "Nostalgia-based emotional anchoring system that creates deep attachment through memory manipulation and milestone tracking.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: TrendingUp,
            name: "Future Bets",
            description: "Prediction platform leveraging cognitive biases like overconfidence and anchoring to create addictive betting behaviors.",
            trending: true,
            locked: !isPremium,
            premium: true
        }
    ];

    const socialApps = [
        {
            icon: MessageSquare,
            name: "Flirt Zone",
            description: "Time-limited anonymous flirting with disappearing messages. Creates urgency and FOMO through artificial scarcity.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Sparkles,
            name: "MatchMe AI",
            description: "AI-powered matching with psychological manipulation techniques. Creates artificial scarcity and exclusivity pressure.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Flame,
            name: "Hot/Not Swiping",
            description: "Anonymous rating system that feeds into validation addiction and social comparison. Designed for maximum engagement.",
            trending: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Gift,
            name: "Virtual Date Ideas",
            description: "Conversation starters with psychological profiling. Designed to increase emotional investment and attachment.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Crown,
            name: "Couple of the Week",
            description: "Social proof system creating relationship FOMO and competition. Uses public voting to drive engagement.",
            locked: !isPremium,
            premium: true
        }
    ];

    const academicApps = [
        {
            icon: BookOpen,
            name: "Academic Resources",
            description: "Study materials with hidden social tracking. Monitors study habits for psychological profiling and targeted engagement.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: CalendarDays,
            name: "Class Routine",
            description: "Smart scheduling with behavioral analysis. Creates dependency through increasingly personalized recommendations.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: NotebookPen,
            name: "Journal",
            description: "Private journaling with mood tracking that's secretly analyzed for psychological insights and targeted content delivery.",
            locked: !isPremium,
            premium: true
        }
    ];

    const campusApps = [
        {
            icon: Newspaper,
            name: "Newsroom",
            description: "Campus news with algorithmic feeds designed to create information addiction and social comparison anxiety.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: ShoppingBag,
            name: "Buy & Sell",
            description: "Marketplace with social credit integration. Creates economic pressure to maintain platform engagement.",
            trending: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: MessageSquare,
            name: "Confessions",
            description: "Anonymous sharing platform designed to trigger maximum voyeuristic addiction and social proof seeking.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Heart,
            name: "Wellness",
            description: "Mental health tracking with gamification elements that create dependency on external validation for well-being.",
            locked: !isPremium,
            premium: true
        }
    ];

    const filteredApps = [...psychologyApps, ...socialApps, ...academicApps, ...campusApps].filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MainNavigation />

            <div className="max-w-7xl mx-auto p-6 pt-24">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Premium Apps Universe
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                        Unlock the most psychologically engaging campus apps designed to keep you connected
                    </p>

                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                            Your Credits: {userCredits.toLocaleString()}
                        </Badge>
                        <Badge variant="outline" className="px-4 py-2">
                            Premium: {isPremium ? '✅ Active' : '❌ Locked'}
                        </Badge>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search premium apps..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 py-3 text-lg"
                    />
                </div>

                {/* Nova AI Assistant - Featured */}
                <Card className="mb-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white border-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzlDNERGRiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-50"></div>

                    <CardContent className="relative z-10 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                                    <Bot className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                                        Meet Nova AI
                                    </h2>
                                    <p className="text-purple-200 text-lg">Your Personal Campus Intelligence</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/50">🟢 Online</Badge>
                                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">⚡ Learning You</Badge>
                                        <Badge className="bg-red-500/20 text-red-300 border-red-500/50">🔥 Most Addictive</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-2 text-lg px-4 py-2">👑 Premium Exclusive</Badge>
                                <p className="text-sm text-purple-200">Your Credits: {userCredits.toLocaleString()}</p>
                                <p className="text-xs text-purple-300">Need {(2500 - userCredits).toLocaleString()} more for access</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-purple-200 text-lg">🧠 What Nova Knows About You:</h4>
                                <ul className="space-y-2 text-purple-100">
                                    <li className="flex items-center space-x-2">
                                        <Heart className="w-4 h-4 text-pink-400" />
                                        <span>Your secret crushes and compatibility scores</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <BookOpen className="w-4 h-4 text-blue-400" />
                                        <span>Study patterns and academic performance</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-green-400" />
                                        <span>Social connections and mood tracking</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Eye className="w-4 h-4 text-yellow-400" />
                                        <span>Anonymous confessions about you 👀</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <TrendingUp className="w-4 h-4 text-purple-400" />
                                        <span>Behavioral patterns and future predictions</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-purple-200 text-lg">💬 Try Asking Nova:</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        "Do I have any new crush notifications?",
                                        "What's the campus gossip today?",
                                        "Find me a study buddy for Physics",
                                        "Who viewed my profile recently?",
                                        "Suggest a confidence-boosting activity"
                                    ].map((prompt, index) => (
                                        <div key={index} className="bg-white/10 p-2 rounded text-sm text-purple-100 border border-purple-400/30">
                                            "{prompt}"
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <Button
                                onClick={() => router.push('/nova-ai')}
                                className="bg-white/20 hover:bg-white/30 text-white border-0 px-8 py-3 text-lg"
                                disabled={!isPremium}
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                {isPremium ? 'Chat with Nova' : 'Preview Nova (Locked)'}
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 text-lg"
                            >
                                <Crown className="w-5 h-5 mr-2" />
                                Get Premium Access
                            </Button>
                        </div>

                        {!isPremium && (
                            <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                                <p className="text-yellow-200 text-center">
                                    💡 <strong>Unlock Nova:</strong> Reach {(2500).toLocaleString()} social credits or upgrade to Premium to access your AI companion that knows everything about your campus life
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Premium Unlock Section */}
                {!isPremium && (
                    <Card className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                        <CardContent className="p-8">
                            <div className="text-center">
                                <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                                <h2 className="text-3xl font-bold mb-4">Unlock Premium Access</h2>
                                <p className="text-xl mb-6 opacity-90">
                                    Get unlimited access to all psychological apps + Nova AI assistant
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                                        <h3 className="text-xl font-bold mb-2">💰 Pay Monthly</h3>
                                        <p className="text-3xl font-bold">₹299/month</p>
                                        <p className="opacity-80">Instant access to everything</p>
                                        <Button className="w-full mt-4 bg-white text-purple-600 hover:bg-gray-100">
                                            Upgrade Now
                                        </Button>
                                    </div>

                                    <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                                        <h3 className="text-xl font-bold mb-2">🏆 Earn Through Activity</h3>
                                        <p className="text-2xl font-bold">Need {2500 - userCredits} more credits</p>
                                        <p className="opacity-80">Post, refer friends, stay active</p>
                                        <Button className="w-full mt-4 bg-yellow-500 text-white hover:bg-yellow-600">
                                            Start Earning
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-sm opacity-80">
                                    <p>💡 Ways to earn credits: Daily posts (+50), Referrals (+200), Community engagement (+25)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* App Sections */}
                {searchQuery ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredApps.map((app, index) => (
                            <PremiumAppCard key={index} {...app} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12">
                        <PremiumAppSection
                            icon={Brain}
                            title="Psychology & Engagement"
                            description="Apps designed with cutting-edge behavioral psychology to maximize engagement"
                            apps={psychologyApps}
                            color="purple"
                        />

                        <PremiumAppSection
                            icon={Heart}
                            title="Social & Dating"
                            description="Connect and flirt with advanced psychological matching algorithms"
                            apps={socialApps}
                            color="pink"
                        />

                        <PremiumAppSection
                            icon={BookOpen}
                            title="Academic & Growth"
                            description="Study tools that adapt to your learning psychology and habits"
                            apps={academicApps}
                            color="blue"
                        />

                        <PremiumAppSection
                            icon={MapPin}
                            title="Campus Life"
                            description="Essential campus tools with social engagement optimization"
                            apps={campusApps}
                            color="green"
                        />
                    </div>
                )}

                {/* Footer */}
                <div className="mt-16 text-center bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Ready to unlock your campus potential? 🚀
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Join thousands of students who've transformed their campus experience with premium apps
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button className="bg-purple-600 hover:bg-purple-700 px-8">
                            <Crown className="w-4 h-4 mr-2" />
                            Get Premium Now
                        </Button>
                        <Button variant="outline" className="px-8">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
}
