"use client";

import { useState } from "react";
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
    PlusCircle
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

const AppCard = ({ icon: Icon, name, description, status, popular, comingSoon, trending, onClick, onAppClick, isClicked }) => {
    const handleClick = () => {
        if (onAppClick && onClick) {
            onAppClick(name, onClick);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <Card className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105 border-2 ${isClicked ? 'ring-2 ring-purple-300 dark:ring-purple-600' : ''}`} onClick={handleClick}>
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 dark:group-hover:from-purple-800/50 dark:group-hover:to-pink-800/50 transition-all">
                            <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold">{name}</CardTitle>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        {popular && <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">🔥 Popular</Badge>}
                        {trending && <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">📈 Trending</Badge>}
                        {comingSoon && <Badge variant="outline" className="text-xs">⏳ Coming Soon</Badge>}
                        {status && <Badge className="text-xs bg-purple-600 hover:bg-purple-600">{status}</Badge>}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</CardDescription>
            </CardContent>
            {comingSoon && (
                <div className="absolute inset-0 bg-gray-50/90 dark:bg-gray-900/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                        <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coming Soon</p>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default function AppsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [clickedApps, setClickedApps] = useState(new Set());

    const router = useRouter();

    const handleAppClick = (appName, onClick) => {
        // Track app interactions
        setClickedApps(prev => new Set(prev).add(appName));

        // Add a small delay for visual feedback
        setTimeout(() => {
            onClick();
        }, 100);
    };

    // Essential Apps - Top Priority
    const essentialApps = [
        {
            icon: Newspaper,
            name: "Newsroom",
            description: "Campus news, announcements, and trending topics. Stay updated with everything happening around you",
            popular: true,
            onClick: () => router.push("/newsroom")
        },
        {
            icon: ShoppingBag,
            name: "Buy & Sell",
            description: "Marketplace for students to buy, sell, and exchange textbooks, electronics, and more",
            popular: true,
            onClick: () => router.push("/buy-sell")
        },
        {
            icon: CalendarDays,
            name: "Class Routine",
            description: "Smart timetable management with room notifications, reminders, and schedule sharing",
            onClick: () => router.push("/class-routine")
        },
        {
            icon: NotebookPen,
            name: "Journal",
            description: "Private journaling with mood tracking, goal setting, and reflection prompts",
            onClick: () => router.push("/journal")
        },
        {
            icon: Gift,
            name: "Referrals",
            description: "Invite friends and earn rewards together. Build your campus network",
            popular: true,
            onClick: () => router.push("/referrals")
        },
        {
            icon: Car,
            name: "Campus Rides",
            description: "Share rides with fellow students. Split costs and reduce carbon footprint",
            onClick: () => router.push("/rides")
        },
        {
            icon: Utensils,
            name: "Food Reviews",
            description: "Rate and review campus cafeterias, nearby restaurants, and food spots",
            onClick: () => router.push("/food-reviews")
        }
    ];

    const datingApps = [
        {
            icon: Heart,
            name: "Secret Crush",
            description: "Choose up to 5 people anonymously. Get notified when there's a mutual match!",
            popular: true,
            onClick: () => router.push("/matches")
        },
        {
            icon: Sparkles,
            name: "MatchMe AI",
            description: "AI-powered matches based on interests, classes, and campus activities",
            status: "Beta",
            onClick: () => router.push("/matchme-ai")
        },
        {
            icon: Zap,
            name: "Hot/Not Swiping",
            description: "Anonymous swipe feature. Filter by interests, branch, or year",
            popular: true,
            onClick: () => router.push("/hot-not-swiping")
        },
        {
            icon: MessageSquare,
            name: "Flirt Zone",
            description: "Time-limited anonymous flirting. Messages disappear after 24hrs unless matched",
            onClick: () => router.push("/flirt-zone")
        },
        {
            icon: Target,
            name: "Virtual Date Ideas",
            description: "Fun conversation starters and date prompts for easier first conversations",
            onClick: () => router.push("/virtual-date-ideas")
        },
        {
            icon: Star,
            name: "Couple of the Week",
            description: "Campus couples voted by the community. Share your love story!",
            onClick: () => router.push("/couple-of-the-week")
        }
    ];

    const studyApps = [
        {
            icon: BookOpen,
            name: "Academic Resources",
            description: "Access PDFs, videos, assignments, and study materials for all subjects",
            popular: true,
            onClick: () => router.push("/apps/resources")
        },
        {
            icon: Users,
            name: "Study Rooms",
            description: "Join real-time Pomodoro-based study sessions with classmates",
            popular: true,
            onClick: () => console.log("Navigate to Study Rooms")
        },
        {
            icon: Bookmark,
            name: "Notes Exchange",
            description: "Share and discover study materials with smart recommendations",
            onClick: () => console.log("Navigate to Notes")
        },
        {
            icon: Coffee,
            name: "Cram Zone",
            description: "Last-minute study rooms for those late-night exam prep sessions",
            onClick: () => console.log("Navigate to Cram Zone")
        },
        {
            icon: Brain,
            name: "Mini Courses",
            description: "Bite-sized courses and quizzes with certificates and badges",
            comingSoon: true,
            onClick: () => console.log("Navigate to Mini Courses")
        },
        {
            icon: Trophy,
            name: "Class Leaderboards",
            description: "Rankings based on participation, help given, and notes shared",
            onClick: () => console.log("Navigate to Leaderboards")
        },
        {
            icon: Target,
            name: "Study Buddy AI",
            description: "Get matched with peers studying similar topics",
            comingSoon: true,
            onClick: () => console.log("Navigate to Study Buddy")
        }
    ];

    const socialApps = [
        {
            icon: MessageSquare,
            name: "Campus Chat",
            description: "Join themed chat rooms and connect with students across campus",
            popular: true,
            onClick: () => console.log("Navigate to Chat")
        },
        {
            icon: Calendar,
            name: "Events",
            description: "Discover and create campus events. Auto-sync with your calendar",
            onClick: () => console.log("Navigate to Events")
        },
        {
            icon: Camera,
            name: "Memory Wall",
            description: "Upload group photos and moments. Create time capsule albums",
            onClick: () => console.log("Navigate to Memory Wall")
        },
        {
            icon: Users,
            name: "Clubs & Circles",
            description: "Join hobby-based groups: gaming, anime, dance, startups, and more",
            onClick: () => console.log("Navigate to Clubs")
        },
        {
            icon: Shield,
            name: "Confessions",
            description: "Share anonymous thoughts. Filter by hostel, year, or branch",
            popular: true,
            onClick: () => console.log("Navigate to Confessions")
        },
        {
            icon: Music,
            name: "Daily Vibe Check",
            description: "Share how you're really feeling today with GIFs and mood tracking",
            onClick: () => console.log("Navigate to Vibe Check")
        }
    ];

    const gameApps = [
        {
            icon: Gamepad2,
            name: "Campus Games",
            description: "Multiplayer games with campus-wide leaderboards and tournaments",
            popular: true,
            onClick: () => console.log("Navigate to Games")
        },
        {
            icon: Trophy,
            name: "Weekly Hackathons",
            description: "Build projects, compete with peers, and win amazing prizes",
            status: "Live",
            onClick: () => console.log("Navigate to Hackathons")
        },
        {
            icon: Zap,
            name: "Social Karma",
            description: "Earn points by helping others and being an awesome community member",
            onClick: () => console.log("Navigate to Karma")
        },
        {
            icon: Gift,
            name: "Streak Challenges",
            description: "Maintain study, friendship, and login streaks for rewards",
            onClick: () => console.log("Navigate to Streaks")
        },
        {
            icon: Star,
            name: "Badge Collection",
            description: "Unlock achievements for academics, social interactions, and events",
            onClick: () => console.log("Navigate to Badges")
        },
        {
            icon: TrendingUp,
            name: "Campus Rankings",
            description: "Leaderboards for top coders, helpers, and community champions",
            onClick: () => console.log("Navigate to Rankings")
        }
    ];

    const startupApps = [
        {
            icon: Lightbulb,
            name: "Startup Showcase",
            description: "Share your startup ideas and get feedback from the campus community",
            onClick: () => console.log("Navigate to Startup Showcase")
        },
        {
            icon: Users,
            name: "Co-founder Match",
            description: "Find teammates based on skills, interests, and availability",
            onClick: () => console.log("Navigate to Co-founder Match")
        },
        {
            icon: Brain,
            name: "Learning Path AI",
            description: "Personalized skill recommendations: 'You liked React → Try Next.js'",
            comingSoon: true,
            onClick: () => console.log("Navigate to Learning Path")
        },
        {
            icon: Trophy,
            name: "Builder Streaks",
            description: "Track your building habits and get rewards for consistency",
            onClick: () => console.log("Navigate to Builder Streaks")
        }
    ];

    const wellnessApps = [
        {
            icon: Heart,
            name: "Mood Tracker",
            description: "Daily mood check-ins with campus-wide anonymous heatmaps",
            onClick: () => console.log("Navigate to Mood Tracker")
        },
        {
            icon: Star,
            name: "Emotion Leaderboard",
            description: "Celebrate the most positive, helpful, and empathetic students",
            onClick: () => console.log("Navigate to Emotion Leaderboard")
        },
        {
            icon: Shield,
            name: "Anonymous Support",
            description: "Get help and support from peers in a safe, anonymous environment",
            onClick: () => console.log("Navigate to Support")
        },
        {
            icon: Target,
            name: "Wellness Goals",
            description: "Set and track personal wellness and mental health goals",
            comingSoon: true,
            onClick: () => console.log("Navigate to Wellness Goals")
        }
    ];

    const campusLifeApps = [
        {
            icon: MapPin,
            name: "Lost & Found",
            description: "Report lost items and help others find their belongings on campus",
            onClick: () => console.log("Navigate to Lost & Found")
        },
        {
            icon: PlusCircle,
            name: "Random Roommate",
            description: "Get matched with random roommates for study sessions or hangouts",
            onClick: () => console.log("Navigate to Random Roommate")
        },
        {
            icon: Coffee,
            name: "Coffee Dates",
            description: "Schedule casual coffee meetups with students from different branches",
            onClick: () => console.log("Navigate to Coffee Dates")
        },
        {
            icon: DollarSign,
            name: "Split Bills",
            description: "Easy bill splitting for group orders, trips, and shared expenses",
            onClick: () => console.log("Navigate to Split Bills")
        },
        {
            icon: Gift,
            name: "Secret Santa",
            description: "Organize gift exchanges and surprise celebrations on campus",
            onClick: () => console.log("Navigate to Secret Santa")
        },
        {
            icon: Camera,
            name: "Campus Snapshots",
            description: "Daily photo challenges and campus photography competitions",
            onClick: () => console.log("Navigate to Campus Snapshots")
        }
    ];

    const allApps = [...essentialApps, ...datingApps, ...studyApps, ...socialApps, ...gameApps, ...startupApps, ...wellnessApps, ...campusLifeApps];

    const filteredApps = searchQuery
        ? allApps.filter(app =>
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : null;

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📱</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Campus Apps
                    </h1>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed">
                    Discover all the amazing features that make campus life more connected,
                    fun, and productive. From dating to studying, we've got you covered!
                </p>

                {/* Quick Stats */}
                <div className="flex justify-center space-x-8 mb-8">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{allApps.length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Apps</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">7</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{allApps.filter(app => app.popular).length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Popular</div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search apps..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                </div>
            </div>

            {/* Search Results */}
            {filteredApps && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Search Results ({filteredApps.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredApps.map((app, index) => (
                            <AppCard key={index} {...app} onAppClick={handleAppClick} isClicked={clickedApps.has(app.name)} />
                        ))}
                    </div>
                </div>
            )}

            {/* Recently Viewed Apps */}
            {!searchQuery && clickedApps.size > 0 && (
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Viewed</h2>
                            <p className="text-gray-600 dark:text-gray-400">Apps you've recently interacted with</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {allApps
                            .filter(app => clickedApps.has(app.name))
                            .slice(0, 4)
                            .map((app, index) => (
                                <AppCard key={index} {...app} onAppClick={handleAppClick} isClicked={true} />
                            ))
                        }
                    </div>
                </div>
            )}

            {/* App Sections */}
            {!searchQuery && (
                <div className="space-y-8">
                    <AppSection
                        icon={Heart}
                        title="Dating & Connections"
                        description="Find your campus crush, make meaningful connections, and explore romantic possibilities"
                        apps={datingApps}
                        color="pink"
                        onAppClick={handleAppClick}
                        clickedApps={clickedApps}
                    />

                    {/* Essential Apps Section */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Essential Apps</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Your daily campus essentials in one place</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {essentialApps.map((app, index) => (
                                <Card
                                    key={index}
                                    className="relative hover:shadow-md transition-all duration-300 cursor-pointer group border-2 hover:border-blue-200 dark:hover:border-blue-700"
                                    onClick={app.onClick}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                                <app.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                            </div>
                                            {app.popular && (
                                                <Badge variant="secondary" className="text-xs">
                                                    🔥 Popular
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-base font-semibold">{app.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <CardDescription className="text-sm leading-relaxed">
                                            {app.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>



                    <AppSection
                        icon={BookOpen}
                        title="Study & Learning"
                        description="Enhance your academic journey with collaborative learning tools and study resources"
                        apps={studyApps}
                        color="blue"
                        onAppClick={handleAppClick}
                        clickedApps={clickedApps}
                    />

                    <AppSection
                        icon={Users}
                        title="Social & Community"
                        description="Connect with your campus community, join events, and share memorable moments"
                        apps={socialApps}
                        color="green"
                        onAppClick={handleAppClick}
                        clickedApps={clickedApps}
                    />

                    <AppSection
                        icon={Gamepad2}
                        title="Games & Competition"
                        description="Compete, have fun, and earn rewards through campus-wide games and challenges"
                        apps={gameApps}
                        color="purple"
                        onAppClick={handleAppClick}
                        clickedApps={clickedApps}
                    />

                    <AppSection
                        icon={Lightbulb}
                        title="Startups & Innovation"
                        description="Build the next big thing with fellow student entrepreneurs and innovators"
                        apps={startupApps}
                        color="orange"
                        onAppClick={handleAppClick}
                        clickedApps={clickedApps}
                    />

                    <AppSection
                        icon={Heart}
                        title="Wellness & Growth"
                        description="Take care of your mental health and track your personal growth journey"
                        apps={wellnessApps}
                        color="indigo"
                        onAppClick={handleAppClick}
                        clickedApps={clickedApps}
                    />

                    <AppSection
                        icon={MapPin}
                        title="Campus Life"
                        description="Navigate daily campus life with practical tools and fun social features"
                        apps={campusLifeApps}
                        color="pink"
                        onAppClick={handleAppClick}
                        clickedApps={clickedApps}
                    />
                </div>
            )}

            {/* Footer CTA */}
            <div className="mt-12 text-center bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Missing something? 🤔
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We're always adding new features! Let us know what you'd love to see on campus.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    Suggest a Feature
                </Button>
            </div>
        </div>
    );
}
