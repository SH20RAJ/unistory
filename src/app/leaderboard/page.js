'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Trophy,
    Star,
    Crown,
    Zap,
    BookOpen,
    Heart,
    MessageCircle,
    Users,
    Target,
    TrendingUp,
    Award,
    Medal,
    Flame,
    Calendar,
    Clock,
    ArrowUp,
    ArrowDown,
    Minus,
    Gift,
    Sparkles
} from "lucide-react";

const mockLeaderboards = {
    study: [
        {
            rank: 1,
            userId: 'SK',
            name: 'Sarah Kim',
            major: 'Data Science',
            score: 2847,
            change: '+15',
            streak: 28,
            badges: ['📚', '🔥', '🎯'],
            level: 'Study Master',
            avatar: 'SK'
        },
        {
            rank: 2,
            userId: 'AC',
            name: 'Alex Chen',
            major: 'Computer Science',
            score: 2691,
            change: '+8',
            streak: 21,
            badges: ['💻', '🚀', '⭐'],
            level: 'Code Ninja',
            avatar: 'AC'
        },
        {
            rank: 3,
            userId: 'MR',
            name: 'Maya Rodriguez',
            major: 'Psychology',
            score: 2534,
            change: '+12',
            streak: 19,
            badges: ['🧠', '💡', '📈'],
            level: 'Mind Reader',
            avatar: 'MR'
        },
        {
            rank: 4,
            userId: 'JL',
            name: 'Jordan Lee',
            major: 'Engineering',
            score: 2398,
            change: '-3',
            streak: 15,
            badges: ['⚙️', '🔧', '🏗️'],
            level: 'Problem Solver',
            avatar: 'JL'
        },
        {
            rank: 5,
            userId: 'ME',
            name: 'You',
            major: 'Business',
            score: 2201,
            change: '+24',
            streak: 7,
            badges: ['📊', '💼', '🎯'],
            level: 'Rising Star',
            avatar: 'JD',
            isCurrentUser: true
        }
    ],
    social: [
        {
            rank: 1,
            userId: 'MR',
            name: 'Maya Rodriguez',
            major: 'Psychology',
            score: 1876,
            change: '+22',
            connections: 89,
            posts: 156,
            badges: ['🌟', '💬', '🤝'],
            level: 'Social Butterfly',
            avatar: 'MR'
        },
        {
            rank: 2,
            userId: 'AC',
            name: 'Alex Chen',
            major: 'Computer Science',
            score: 1654,
            change: '+18',
            connections: 72,
            posts: 134,
            badges: ['🎉', '📱', '🔥'],
            level: 'Community Leader',
            avatar: 'AC'
        },
        {
            rank: 3,
            userId: 'ME',
            name: 'You',
            major: 'Business',
            score: 1432,
            change: '+31',
            connections: 48,
            posts: 89,
            badges: ['🚀', '💫', '🎊'],
            level: 'Connector',
            avatar: 'JD',
            isCurrentUser: true
        }
    ],
    wellness: [
        {
            rank: 1,
            userId: 'SK',
            name: 'Sarah Kim',
            major: 'Data Science',
            score: 1987,
            change: '+9',
            streak: 45,
            checkIns: 142,
            badges: ['🧘', '🌱', '💚'],
            level: 'Zen Master',
            avatar: 'SK'
        },
        {
            rank: 2,
            userId: 'ME',
            name: 'You',
            major: 'Business',
            score: 1756,
            change: '+16',
            streak: 7,
            checkIns: 89,
            badges: ['🌈', '☀️', '🎯'],
            level: 'Wellness Warrior',
            avatar: 'JD',
            isCurrentUser: true
        }
    ]
};

const mockChallenges = [
    {
        id: 1,
        title: 'Study Streak Champion',
        description: 'Study for 30 consecutive days',
        progress: 7,
        target: 30,
        reward: '500 points + 🔥 Badge',
        category: 'study',
        timeLeft: '23 days',
        participants: 234,
        difficulty: 'Hard'
    },
    {
        id: 2,
        title: 'Social Connector',
        description: 'Make 10 new connections this week',
        progress: 3,
        target: 10,
        reward: '200 points + 🤝 Badge',
        category: 'social',
        timeLeft: '4 days',
        participants: 156,
        difficulty: 'Medium'
    },
    {
        id: 3,
        title: 'Wellness Week',
        description: 'Check in your mood daily for 7 days',
        progress: 5,
        target: 7,
        reward: '150 points + 🌱 Badge',
        category: 'wellness',
        timeLeft: '2 days',
        participants: 189,
        difficulty: 'Easy'
    },
    {
        id: 4,
        title: 'Knowledge Sharer',
        description: 'Help 5 people in study groups',
        progress: 2,
        target: 5,
        reward: '300 points + 📚 Badge',
        category: 'study',
        timeLeft: '1 week',
        participants: 78,
        difficulty: 'Medium'
    }
];

const mockAchievements = [
    {
        id: 1,
        title: 'First Steps',
        description: 'Complete your first study session',
        icon: '👶',
        earned: true,
        earnedDate: '2 weeks ago',
        points: 50
    },
    {
        id: 2,
        title: 'Social Starter',
        description: 'Make your first connection',
        icon: '🤝',
        earned: true,
        earnedDate: '1 week ago',
        points: 75
    },
    {
        id: 3,
        title: 'Study Buddy',
        description: 'Join 3 study groups',
        icon: '📚',
        earned: true,
        earnedDate: '5 days ago',
        points: 100
    },
    {
        id: 4,
        title: 'Mood Tracker',
        description: 'Check in your mood 10 times',
        icon: '😊',
        earned: true,
        earnedDate: '3 days ago',
        points: 125
    },
    {
        id: 5,
        title: 'Week Warrior',
        description: 'Study for 7 consecutive days',
        icon: '🔥',
        earned: true,
        earnedDate: 'Yesterday',
        points: 200
    },
    {
        id: 6,
        title: 'Study Master',
        description: 'Reach 2000 study points',
        icon: '🎓',
        earned: false,
        progress: 1876,
        target: 2000,
        points: 500
    },
    {
        id: 7,
        title: 'Social Butterfly',
        description: 'Make 50 connections',
        icon: '🦋',
        earned: false,
        progress: 48,
        target: 50,
        points: 300
    },
    {
        id: 8,
        title: 'Wellness Guru',
        description: 'Maintain 30-day wellness streak',
        icon: '🧘',
        earned: false,
        progress: 7,
        target: 30,
        points: 750
    }
];

const LeaderboardRow = ({ user, category }) => {
    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
            case 2: return <Medal className="w-5 h-5 text-gray-400" />;
            case 3: return <Award className="w-5 h-5 text-orange-500" />;
            default: return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
        }
    };

    const getChangeIcon = (change) => {
        const num = parseInt(change);
        if (num > 0) return <ArrowUp className="w-3 h-3 text-green-500" />;
        if (num < 0) return <ArrowDown className="w-3 h-3 text-red-500" />;
        return <Minus className="w-3 h-3 text-gray-400" />;
    };

    return (
        <div className={`flex items-center justify-between p-4 rounded-lg border ${user.isCurrentUser
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}>
            <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8">
                    {getRankIcon(user.rank)}
                </div>

                <Avatar>
                    <AvatarFallback className="bg-blue-500 text-white">
                        {user.avatar}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{user.name}</h3>
                        {user.isCurrentUser && (
                            <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">{user.major}</p>
                    <div className="flex items-center space-x-1 mt-1">
                        {user.badges.map((badge, index) => (
                            <span key={index} className="text-sm">{badge}</span>
                        ))}
                        <Badge variant="outline" className="text-xs ml-2">
                            {user.level}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">{user.score.toLocaleString()}</span>
                    <div className="flex items-center space-x-1">
                        {getChangeIcon(user.change)}
                        <span className={`text-xs ${parseInt(user.change) > 0 ? 'text-green-500' :
                                parseInt(user.change) < 0 ? 'text-red-500' : 'text-gray-400'
                            }`}>
                            {user.change}
                        </span>
                    </div>
                </div>

                <div className="text-sm text-gray-500 mt-1">
                    {category === 'study' && `${user.streak} day streak`}
                    {category === 'social' && `${user.connections} connections`}
                    {category === 'wellness' && `${user.checkIns} check-ins`}
                </div>
            </div>
        </div>
    );
};

const ChallengeCard = ({ challenge }) => {
    const progressPercentage = (challenge.progress / challenge.target) * 100;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Hard': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'study': return <BookOpen className="w-5 h-5 text-green-500" />;
            case 'social': return <Users className="w-5 h-5 text-blue-500" />;
            case 'wellness': return <Heart className="w-5 h-5 text-pink-500" />;
            default: return <Target className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {getCategoryIcon(challenge.category)}
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                    <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                        {challenge.difficulty}
                    </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {challenge.description}
                </p>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-500">
                                {challenge.progress}/{challenge.target}
                            </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-gray-500">Time Left</div>
                            <div className="font-medium flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {challenge.timeLeft}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500">Participants</div>
                            <div className="font-medium flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {challenge.participants}
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center text-sm">
                            <Gift className="w-4 h-4 mr-2 text-yellow-600" />
                            <span className="font-medium">Reward: {challenge.reward}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const AchievementCard = ({ achievement }) => {
    const progressPercentage = achievement.target
        ? (achievement.progress / achievement.target) * 100
        : 100;

    return (
        <Card className={`hover:shadow-md transition-shadow ${achievement.earned
                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                : 'border-gray-200 dark:border-gray-700'
            }`}>
            <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                    <div className={`text-3xl ${achievement.earned ? '' : 'opacity-30'}`}>
                        {achievement.icon}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{achievement.title}</h3>
                            {achievement.earned && (
                                <Badge className="bg-green-500 text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Earned
                                </Badge>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {achievement.description}
                        </p>

                        {achievement.earned ? (
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    Earned {achievement.earnedDate}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                    +{achievement.points} pts
                                </Badge>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-500">Progress</span>
                                    <span className="text-xs text-gray-500">
                                        {achievement.progress}/{achievement.target}
                                    </span>
                                </div>
                                <Progress value={progressPercentage} className="h-1" />
                                <Badge variant="outline" className="text-xs mt-1">
                                    {achievement.points} pts when earned
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Leaderboard() {
    const [activeTab, setActiveTab] = useState('study');

    const userStats = {
        totalPoints: 5289,
        rank: 5,
        level: 12,
        nextLevelPoints: 6000,
        badges: 8,
        achievements: 5,
        streak: 7
    };

    const progressToNextLevel = ((userStats.totalPoints % 500) / 500) * 100;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MainNavigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100">Total Points</p>
                                    <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
                                </div>
                                <Star className="w-8 h-8 text-blue-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100">Global Rank</p>
                                    <p className="text-2xl font-bold">#{userStats.rank}</p>
                                </div>
                                <Trophy className="w-8 h-8 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100">Current Streak</p>
                                    <p className="text-2xl font-bold">{userStats.streak} days</p>
                                </div>
                                <Flame className="w-8 h-8 text-orange-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100">Level {userStats.level}</p>
                                    <div className="mt-2">
                                        <Progress
                                            value={progressToNextLevel}
                                            className="h-2 bg-purple-300"
                                        />
                                        <p className="text-xs text-purple-100 mt-1">
                                            {500 - (userStats.totalPoints % 500)} pts to next level
                                        </p>
                                    </div>
                                </div>
                                <Zap className="w-8 h-8 text-purple-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Leaderboards */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Trophy className="w-6 h-6 mr-2" />
                                    Leaderboards
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="study">Study</TabsTrigger>
                                        <TabsTrigger value="social">Social</TabsTrigger>
                                        <TabsTrigger value="wellness">Wellness</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="study" className="space-y-4 mt-6">
                                        {mockLeaderboards.study.map((user, index) => (
                                            <LeaderboardRow key={user.userId} user={user} category="study" />
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="social" className="space-y-4 mt-6">
                                        {mockLeaderboards.social.map((user, index) => (
                                            <LeaderboardRow key={user.userId} user={user} category="social" />
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="wellness" className="space-y-4 mt-6">
                                        {mockLeaderboards.wellness.map((user, index) => (
                                            <LeaderboardRow key={user.userId} user={user} category="wellness" />
                                        ))}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Active Challenges */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Target className="w-6 h-6 mr-2" />
                                    Active Challenges
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mockChallenges.map((challenge) => (
                                        <ChallengeCard key={challenge.id} challenge={challenge} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Boost Your Score</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Start Study Session (+50 pts)
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Make New Connection (+25 pts)
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Daily Mood Check-in (+10 pts)
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Users className="w-4 h-4 mr-2" />
                                    Join Study Group (+30 pts)
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Achievements
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    {mockAchievements.slice(0, 6).map((achievement) => (
                                        <AchievementCard key={achievement.id} achievement={achievement} />
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full mt-4">
                                    View All Achievements
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Weekly Goals */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    This Week's Goals
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm">Study Hours</span>
                                        <span className="text-sm text-gray-500">15/20</span>
                                    </div>
                                    <Progress value={75} className="h-2" />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm">Social Interactions</span>
                                        <span className="text-sm text-gray-500">8/10</span>
                                    </div>
                                    <Progress value={80} className="h-2" />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm">Wellness Check-ins</span>
                                        <span className="text-sm text-gray-500">5/7</span>
                                    </div>
                                    <Progress value={71} className="h-2" />
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
