"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Heart,
    Users,
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
    Camera,
    Bot,
    Mic,
    MicOff,
    Send,
    MessageCircle,
    Eye,
    EyeOff,
    Loader2,
    Flame,
    Bell,
    CheckCircle,
    AlertCircle,
    Gift as LucideGift,
    MessageSquare,
    BookOpen
} from "lucide-react";

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
        <Card className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-purple-300 dark:hover:border-purple-600 border-2 ${locked ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800' : ''}`}>
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

const AppCard = ({ icon: Icon, name, description, status, popular, trending, onAppClick }) => {
    return (
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-blue-300 dark:hover:border-blue-600 border-2" onClick={() => onAppClick && onAppClick(name)}>
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 dark:group-hover:from-blue-800/50 dark:group-hover:to-indigo-800/50 transition-all">
                            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-colors" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold">{name}</CardTitle>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        {popular && <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">🔥 Popular</Badge>}
                        {trending && <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">📈 Trending</Badge>}
                        {status && <Badge className="text-xs bg-blue-600 hover:bg-blue-600">{status}</Badge>}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
            </CardContent>
        </Card>
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

const RegularAppSection = ({ icon: Icon, title, description, apps, color = "blue", onAppClick, clickedApps }) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {displayApps.map((app, index) => (
                    <AppCard key={index} {...app} onAppClick={onAppClick} isClicked={clickedApps?.has(app.name)} />
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
    const [clickedApps, setClickedApps] = useState(new Set());

    const router = useRouter();

    const handleAppClick = (appName) => {
        setClickedApps(prev => {
            const newSet = new Set(prev);
            newSet.add(appName);
            return newSet;
        });
        
        // Map app names to their routes
        const appRoutes = {
            "Mind Reader": "/mind-reader",
            "Social Credit Score": "/social-credit",
            "Time Capsule": "/time-capsule",
            "Dopamine Dealer": "/dopamine-dealer",
            "Truth Bomb": "/truth-bomb",
            "Soul Twin Finder": "/soul-twin",
            "Achievement Hunter": "/achievement-hunter",
            "Battle Royale": "/battle-royale",
            "Memory Palace": "/memory-palace",
            "Future Bets": "/future-bets",
            "Flirt Zone": "/flirt-zone",
            "MatchMe AI": "/matchme-ai",
            "Hot/Not Swiping": "/hot-not-swiping",
            "Virtual Date Ideas": "/virtual-date-ideas",
            "Couple of the Week": "/couple-of-the-week",
            "Secret Crush": "/matches",
            "Academic Resources": "/academic-resources",
            "Class Routine": "/class-routine",
            "Journal": "/journal",
            "Newsroom": "/newsroom",
            "Buy & Sell": "/buy-sell",
            "Confessions": "/confessions",
            "Wellness": "/wellness",
            "Nova AI": "/nova-ai"
        };

        // Navigate to the appropriate route if it exists
        const route = appRoutes[appName];
        if (route) {
            router.push(route);
        }
    };

    // Helper function to check if an app is one of the premium apps
    const isPremiumApp = (name) => {
        // Only Stress & Mental Health category apps should be premium
        const PREMIUM_APPS = [
            'Truth Bomb',
            'Dopamine Dealer',
            'Nova AI',
            'Time Capsule',
            'Mind Reader',
            'Social Credit'
        ];
        return false; // Set all to free for now as requested
    };

    // Apps data with premium status based on the PREMIUM_APPS list
    const psychologyApps = [
        {
            icon: Heart,
            name: "Secret Crush Detector",
            description: "A fun way to discover potential connections! Our AI helps you understand subtle social cues and bring people together in meaningful ways.",
            popular: true,
            trending: true,
            locked: !isPremium,
            premium: false
        },
        {
            icon: Brain,
            name: "Mind Reader",
            description: "Discover fascinating insights about your personality through engaging questions and conversations. Learn more about yourself and grow!",
            popular: true,
            locked: !isPremium && isPremiumApp("Mind Reader"),
            premium: isPremiumApp("Mind Reader")
        },
        {
            icon: Trophy,
            name: "Social Credit Score",
            description: "Celebrate your campus involvement! Earn points for positive contributions to the community and inspire others to do the same.",
            trending: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Clock,
            name: "Time Capsule",
            description: "Create beautiful digital memories and heartfelt messages for your future self. A delightful way to track your personal growth journey.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Zap,
            name: "Dopamine Dealer",
            description: "Your daily dose of happiness! Track your mood, celebrate small wins, and discover activities that bring joy to your day.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Shield,
            name: "Truth Bomb",
            description: "Share your thoughts safely and connect with others who understand. A supportive space for honest conversations and genuine connections.",
            trending: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Star,
            name: "Soul Twin Finder",
            description: "Find amazing friends who share your interests! Connect with people who understand you through our thoughtful matching system.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Target,
            name: "Achievement Hunter",
            description: "Celebrate your personal growth with fun achievements! Set goals, track progress, and unlock cute badges along your journey.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: Users,
            name: "Battle Royale",
            description: "Friendly team challenges that bring the campus together! Participate in fun activities and make new friends along the way.",
            popular: true,
            locked: !isPremium,
            premium: true
        },
        {
            icon: Camera,
            name: "Memory Palace",
            description: "Create a beautiful collection of your cherished moments. Capture and organize your favorite memories in a delightful digital space.",
            locked: !isPremium,
            premium: true
        },
        {
            icon: TrendingUp,
            name: "Future Bets",
            description: "Make playful predictions about upcoming campus events! Share your insights and have fun guessing what the future holds.",
            trending: true,
            locked: !isPremium,
            premium: true
        }
    ];

    const socialApps = [
        {
            icon: Heart,
            name: "Secret Crush",
            description: "A fun and safe way to connect with someone special! Anonymously select up to 5 people and discover if the feeling is mutual.",
            popular: true,
            locked: false,
            premium: false
        },
        {
            icon: MessageSquare,
            name: "Flirt Zone",
            description: "Express yourself freely in a playful environment! Send fun messages that disappear after 24 hours for exciting conversations.",
            popular: true,
            locked: false,
            premium: false
        },
        {
            icon: Sparkles,
            name: "MatchMe AI",
            description: "Find meaningful connections through our smart matching system! Our AI helps you connect with people who share your interests.",
            locked: false,
            premium: false
        },
        {
            icon: Flame,
            name: "Hot/Not Swiping",
            description: "A lighthearted way to discover new friends! Swipe through profiles and find people with similar vibes and interests.",
            trending: true,
            locked: false,
            premium: false
        },
        {
            icon: Gift,
            name: "Virtual Date Ideas",
            description: "Never run out of fun things to do! Get creative date suggestions and conversation starters for memorable moments.",
            locked: false,
            premium: false
        },
        {
            icon: Crown,
            name: "Couple of the Week",
            description: "Celebrate campus love stories! Share your journey and inspire others with your romantic adventures and cute moments.",
            locked: false,
            premium: false
        }
    ];

    const academicApps = [
        {
            icon: BookOpen,
            name: "Academic Resources",
            description: "Study materials with hidden social tracking. Monitors study habits for psychological profiling and targeted engagement.",
            popular: true,
            locked: false,
            premium: false
        },
        {
            icon: CalendarDays,
            name: "Class Routine",
            description: "Smart scheduling with behavioral analysis. Creates dependency through increasingly personalized recommendations.",
            locked: false,
            premium: false
        },
        {
            icon: NotebookPen,
            name: "Journal",
            description: "Private journaling with mood tracking that's secretly analyzed for psychological insights and targeted content delivery.",
            locked: false,
            premium: false
        }
    ];

    const campusApps = [
        {
            icon: Newspaper,
            name: "Newsroom",
            description: "Campus news with algorithmic feeds designed to create information addiction and social comparison anxiety.",
            popular: true,
            locked: false,
            premium: false
        },
        {
            icon: ShoppingBag,
            name: "Buy & Sell",
            description: "Marketplace with social credit integration. Creates economic pressure to maintain platform engagement.",
            trending: true,
            locked: false,
            premium: false
        },
        {
            icon: MessageSquare,
            name: "Confessions",
            description: "Anonymous sharing platform designed to trigger maximum voyeuristic addiction and social proof seeking.",
            popular: true,
            locked: false,
            premium: false
        },
        {
            icon: Heart,
            name: "Wellness",
            description: "Mental health tracking with gamification elements that create dependency on external validation for well-being.",
            locked: false,
            premium: false
        }
    ];

    const filteredApps = [...psychologyApps, ...socialApps, ...academicApps, ...campusApps].filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            <div className="max-w-7xl mx-auto p-6 ">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Apps Universe
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                        Discover thoughtfully designed campus apps that help you stay connected and productive
                    </p>

                    {/* <div className="flex items-center justify-center space-x-4 mb-6">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                            Your Credits: {userCredits.toLocaleString()}
                        </Badge>
                        <Badge variant="outline" className="px-4 py-2">
                            Premium: {isPremium ? '✅ Active' : '❌ Locked'}
                        </Badge>
                    </div> */}
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





                {/* App Sections */}
                {searchQuery ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredApps.map((app, index) => (
                            <AppCard key={index} {...app} onAppClick={handleAppClick} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-12">


                        <AppSection
                            icon={Heart}
                            title="Social & Dating"
                            description="Connect and flirt with advanced psychological matching algorithms"
                            apps={socialApps}
                            color="pink"
                            onAppClick={handleAppClick}
                            clickedApps={clickedApps}
                        />

                        <AppSection
                            icon={BookOpen}
                            title="Academic & Growth"
                            description="Study tools that adapt to your learning psychology and habits"
                            apps={academicApps}
                            color="blue"
                            onAppClick={handleAppClick}
                            clickedApps={clickedApps}
                        />

                        <AppSection
                            icon={MapPin}
                            title="Campus Life"
                            description="Essential campus tools with social engagement optimization"
                            apps={campusApps}
                            color="green"
                            onAppClick={handleAppClick}
                            clickedApps={clickedApps}
                        />
                        <PremiumAppSection
                            icon={Brain}
                            title="Stress & Mental Health"
                            description="Apps designed with cutting-edge behavioral psychology to maximize engagement and reduce stress"
                            apps={psychologyApps}
                            color="purple"
                        />
                        {/* Regular Apps Section - Non-Premium */}
                        <RegularAppSection
                            icon={Heart}
                            title="Free Apps"
                            description="Explore our selection of free apps with essential features"
                            apps={psychologyApps.filter(app => !app.premium)}
                            color="green"
                            onAppClick={handleAppClick}
                            clickedApps={new Set()} // Pass an empty set for clickedApps
                        />
                    </div>
                )}
                {/* Premium Unlock Section */}
                {!isPremium && (
                    <Card className="my-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
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
