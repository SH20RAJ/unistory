"use client";

import { useState, useEffect } from "react";
import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    TrendingUp,
    TrendingDown,
    Crown,
    Medal,
    Star,
    Users,
    MessageSquare,
    Heart,
    ThumbsUp,
    Share2,
    Award,
    Target,
    Zap,
    Trophy,
    Gift,
    Calendar,
    Clock,
    BarChart3,
    Activity,
    Smile,
    UserPlus,
    Camera,
    MapPin,
    Coffee,
    Book,
    Music,
    Gamepad2,
    Utensils,
    ShoppingBag,
    GraduationCap,
    Briefcase,
    Home,
    Car,
    Plane,
    Phone,
    Mail,
    Bell,
    Settings,
    Info,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Plus,
    Minus,
    ArrowUp,
    ArrowDown,
    Eye,
    Lock,
    Unlock,
    Diamond,
    Gem,
    Coins,
    DollarSign,
    Percent,
    Hash,
    AtSign,
    Sparkles,
    Flame,
    Rocket,
    Magic,
    Shield,
    Sword,
    Wand2
} from "lucide-react";

const socialActions = [
    {
        action: "Posted a popular photo",
        points: 15,
        icon: <Camera className="w-4 h-4" />,
        time: "2 hours ago",
        category: "content",
        multiplier: 1.2
    },
    {
        action: "Helped someone with homework",
        points: 25,
        icon: <Book className="w-4 h-4" />,
        time: "5 hours ago",
        category: "helpful",
        multiplier: 1.5
    },
    {
        action: "Organized study group",
        points: 30,
        icon: <Users className="w-4 h-4" />,
        time: "1 day ago",
        category: "leadership",
        multiplier: 2.0
    },
    {
        action: "Attended social event",
        points: 10,
        icon: <Coffee className="w-4 h-4" />,
        time: "2 days ago",
        category: "social",
        multiplier: 1.0
    },
    {
        action: "Received compliment",
        points: 5,
        icon: <Heart className="w-4 h-4" />,
        time: "3 days ago",
        category: "popularity",
        multiplier: 1.1
    }
];

const achievements = [
    {
        id: "social_butterfly",
        name: "Social Butterfly",
        description: "Attended 10 social events this month",
        icon: <Users className="w-6 h-6" />,
        points: 100,
        rarity: "rare",
        progress: 8,
        total: 10,
        color: "bg-blue-500"
    },
    {
        id: "helpful_hero",
        name: "Campus Helper",
        description: "Helped 25 people with various tasks",
        icon: <Heart className="w-6 h-6" />,
        points: 150,
        rarity: "epic",
        progress: 23,
        total: 25,
        color: "bg-purple-500"
    },
    {
        id: "content_creator",
        name: "Content King/Queen",
        description: "Created 50 viral posts",
        icon: <Star className="w-6 h-6" />,
        points: 200,
        rarity: "legendary",
        progress: 47,
        total: 50,
        color: "bg-yellow-500"
    },
    {
        id: "study_leader",
        name: "Study Leader",
        description: "Led 15 study sessions",
        icon: <Book className="w-6 h-6" />,
        points: 120,
        rarity: "rare",
        progress: 12,
        total: 15,
        color: "bg-green-500"
    }
];

const leaderboard = [
    {
        rank: 1,
        name: "Sarah Chen",
        score: 2847,
        change: "+127",
        level: "Diamond",
        avatar: "SC",
        streak: 23,
        category: "Overall Champion"
    },
    {
        rank: 2,
        name: "Alex Rodriguez",
        score: 2691,
        change: "+89",
        level: "Diamond",
        avatar: "AR",
        streak: 18,
        category: "Social Leader"
    },
    {
        rank: 3,
        name: "Emma Johnson",
        score: 2534,
        change: "+156",
        level: "Platinum",
        avatar: "EJ",
        streak: 31,
        category: "Content Creator"
    },
    {
        rank: 4,
        name: "You",
        score: 2247,
        change: "+67",
        level: "Platinum",
        avatar: "YU",
        streak: 15,
        category: "Rising Star",
        isCurrentUser: true
    },
    {
        rank: 5,
        name: "Michael Kim",
        score: 2183,
        change: "-23",
        level: "Gold",
        avatar: "MK",
        streak: 8,
        category: "Academic Helper"
    }
];

const multipliers = [
    {
        name: "Weekend Warrior",
        description: "2x points for weekend activities",
        active: true,
        timeLeft: "23h 45m",
        icon: <Calendar className="w-4 h-4" />
    },
    {
        name: "Study Boost",
        description: "1.5x points for academic activities",
        active: false,
        cost: 50,
        icon: <Book className="w-4 h-4" />
    },
    {
        name: "Social Surge",
        description: "3x points for social interactions",
        active: false,
        cost: 100,
        icon: <Users className="w-4 h-4" />
    }
];

const ScoreCard = ({ title, score, change, icon, color, subtitle }) => (
    <Card className={`${color} text-white overflow-hidden relative`}>
        <div className="absolute top-0 right-0 opacity-20">
            <div className="text-6xl font-bold p-4">{icon}</div>
        </div>
        <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold opacity-90">{title}</h3>
                    <div className="text-3xl font-bold">{score.toLocaleString()}</div>
                    {subtitle && <p className="text-sm opacity-75 mt-1">{subtitle}</p>}
                </div>
                <div className="text-right">
                    <div className={`flex items-center space-x-1 ${change.startsWith('+') ? 'text-green-200' : 'text-red-200'
                        }`}>
                        {change.startsWith('+') ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        <span className="font-semibold">{change}</span>
                    </div>
                    <p className="text-xs opacity-75">Today</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const ActivityFeed = ({ activities }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Recent Activity</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {activities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {activity.icon}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center space-x-1 text-green-600">
                            <Plus className="w-3 h-3" />
                            <span className="font-semibold">{activity.points}</span>
                        </div>
                        {activity.multiplier > 1 && (
                            <Badge variant="secondary" className="text-xs">
                                {activity.multiplier}x
                            </Badge>
                        )}
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);

const AchievementCard = ({ achievement }) => {
    const progressPercent = (achievement.progress / achievement.total) * 100;
    const isCompleted = achievement.progress >= achievement.total;

    return (
        <Card className={`${isCompleted ? 'border-yellow-400 bg-yellow-50' : ''} transition-all duration-300 hover:scale-105`}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${achievement.color} rounded-lg flex items-center justify-center text-white`}>
                            {achievement.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold">{achievement.name}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                    </div>
                    <Badge variant={isCompleted ? "default" : "secondary"}>
                        {isCompleted ? "Complete!" : achievement.rarity}
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Reward: +{achievement.points} points</span>
                        {isCompleted && (
                            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                                <Gift className="w-3 h-3 mr-1" />
                                Claim
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const LeaderboardEntry = ({ entry }) => {
    const rankColors = {
        1: "bg-yellow-500",
        2: "bg-gray-400",
        3: "bg-orange-500"
    };

    const levelColors = {
        "Diamond": "text-blue-600",
        "Platinum": "text-purple-600",
        "Gold": "text-yellow-600",
        "Silver": "text-gray-600"
    };

    return (
        <Card className={`${entry.isCurrentUser ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${entry.rank <= 3 ? rankColors[entry.rank] : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold`}>
                            {entry.rank <= 3 ? (
                                <Trophy className="w-5 h-5" />
                            ) : (
                                entry.rank
                            )}
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            {entry.avatar}
                        </div>
                        <div>
                            <h3 className="font-semibold">{entry.name}</h3>
                            <div className="flex items-center space-x-2">
                                <Badge variant="outline" className={levelColors[entry.level]}>
                                    {entry.level}
                                </Badge>
                                <span className="text-sm text-gray-600">{entry.category}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold">{entry.score.toLocaleString()}</div>
                        <div className={`flex items-center space-x-1 text-sm ${entry.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {entry.change.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            <span>{entry.change}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                            <Flame className="w-3 h-3" />
                            <span>{entry.streak} day streak</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function SocialCreditPage() {
    const { hasAccess } = useAppAccess('Social Credit');
    const [activeTab, setActiveTab] = useState("overview");
    const [currentScore, setCurrentScore] = useState(2247);
    const [weeklyChange, setWeeklyChange] = useState("+67");
    const [level, setLevel] = useState("Platinum");
    const [nextLevelPoints, setNextLevelPoints] = useState(2500);

    const progressToNextLevel = ((currentScore % 500) / 500) * 100;

    return (
        <>
            {!hasAccess && <PremiumGate appName="Social Credit" appIcon={TrendingUp} />}
            {hasAccess && (
                <div className="space-y-6">
                    {/* Header Dashboard */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <ScoreCard
                            title="Social Credit Score"
                            score={currentScore}
                            change={weeklyChange}
                            icon={<TrendingUp className="w-8 h-8" />}
                            color="bg-gradient-to-r from-blue-500 to-purple-500"
                            subtitle={`${level} Level • ${nextLevelPoints - currentScore} to next level`}
                />

                <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold opacity-90">Weekly Rank</h3>
                                <div className="text-3xl font-bold">#4</div>
                                <p className="text-sm opacity-75 mt-1">Campus Wide</p>
                            </div>
                            <div className="text-right">
                                <Trophy className="w-8 h-8 mb-2" />
                                <div className="flex items-center space-x-1 text-green-200">
                                    <ArrowUp className="w-4 h-4" />
                                    <span className="font-semibold">+2</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold opacity-90">Streak</h3>
                                <div className="text-3xl font-bold">15</div>
                                <p className="text-sm opacity-75 mt-1">Days Active</p>
                            </div>
                            <div className="text-right">
                                <Flame className="w-8 h-8 mb-2" />
                                <div className="text-sm">
                                    <span className="font-semibold">1.5x</span>
                                    <br />
                                    <span className="opacity-75">Multiplier</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Level Progress */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold">Level Progress</h3>
                            <p className="text-sm text-gray-600">Current: {level} • Next: Diamond</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{nextLevelPoints - currentScore}</div>
                            <p className="text-sm text-gray-600">points to go</p>
                        </div>
                    </div>
                    <Progress value={progressToNextLevel} className="h-4" />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>{currentScore}</span>
                        <span>{nextLevelPoints}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    <TabsTrigger value="multipliers">Boosts</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <ActivityFeed activities={socialActions} />

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Target className="w-5 h-5" />
                                    <span>Daily Goals</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Social Interactions</span>
                                        <span className="text-sm font-medium">7/10</span>
                                    </div>
                                    <Progress value={70} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Help Others</span>
                                        <span className="text-sm font-medium">2/3</span>
                                    </div>
                                    <Progress value={67} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Create Content</span>
                                        <span className="text-sm font-medium">1/2</span>
                                    </div>
                                    <Progress value={50} className="h-2" />
                                </div>

                                <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Quick Action for Points
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {achievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="leaderboard" className="mt-6">
                    <div className="space-y-4">
                        {leaderboard.map((entry) => (
                            <LeaderboardEntry key={entry.rank} entry={entry} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="multipliers" className="mt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {multipliers.map((multiplier, index) => (
                            <Card key={index} className={`${multiplier.active ? 'border-green-500 bg-green-50' : ''}`}>
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className={`w-10 h-10 ${multiplier.active ? 'bg-green-500' : 'bg-gray-400'} rounded-lg flex items-center justify-center text-white`}>
                                            {multiplier.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{multiplier.name}</h3>
                                            <p className="text-sm text-gray-600">{multiplier.description}</p>
                                        </div>
                                    </div>

                                    {multiplier.active ? (
                                        <div className="flex items-center justify-between">
                                            <Badge className="bg-green-500">Active</Badge>
                                            <span className="text-sm text-gray-600">{multiplier.timeLeft}</span>
                                        </div>
                                    ) : (
                                        <Button size="sm" className="w-full">
                                            <Coins className="w-3 h-3 mr-1" />
                                            Activate ({multiplier.cost} points)
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
                </div>
            )}
        </>
    );
}
