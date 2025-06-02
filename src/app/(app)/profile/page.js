"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfileMutable, useUserAchievements, useUserStats, useUserActivity } from "@/hooks/useSWR";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    User,
    Edit3,
    Settings,
    Trophy,
    Star,
    Calendar,
    MapPin,
    BookOpen,
    Heart,
    MessageCircle,
    Share2,
    Users,
    Zap,
    Target,
    TrendingUp,
    Clock,
    Coffee,
    Brain,
    Award,
    Mail,
    Phone,
    Globe,
    Instagram,
    Twitter,
    Github,
    Linkedin,
    Camera,
    Eye,
    Lock,
    Bell,
    Shield,
    Smile,
    Activity,
    BarChart3
} from "lucide-react";

// Mock data for features not yet implemented in the backend
const mockTrendingHashtags = ["#StudyTime", "#CampusLife", "#Finals", "#STEM"];
const achievementCategories = ["All", "Study", "Social", "Wellness", "Events"];

const StatCard = ({ icon, title, value, subtitle, trend }) => (
    <Card>
        <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">{value}</div>
                        {trend && (
                            <Badge variant="secondary" className="text-xs">
                                {trend > 0 ? "+" : ""}{trend}%
                            </Badge>
                        )}
                    </div>
                    <div className="text-sm font-medium">{title}</div>
                    {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
                </div>
            </div>
        </CardContent>
    </Card>
);

const AchievementCard = ({ achievement }) => (
    <Card className={`relative ${!achievement.unlocked ? "opacity-60" : ""}`}>
        <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{achievement.name}</h4>
                        {achievement.unlocked && (
                            <Badge variant="secondary" className="text-xs">Unlocked</Badge>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {achievement.description}
                    </p>
                    {achievement.unlocked ? (
                        <div className="text-xs text-gray-500 mt-2">
                            Earned on {achievement.date}
                        </div>
                    ) : (
                        <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                        </div>
                    )}
                </div>
            </div>
        </CardContent>
    </Card>
);

const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
        switch (type) {
            case "post": return <MessageCircle className="w-4 h-4 text-blue-500" />;
            case "study": return <BookOpen className="w-4 h-4 text-green-500" />;
            case "connection": return <Users className="w-4 h-4 text-purple-500" />;
            case "event": return <Calendar className="w-4 h-4 text-orange-500" />;
            case "achievement": return <Trophy className="w-4 h-4 text-yellow-500" />;
            default: return <Activity className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="p-1">
                {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
                <p className="text-sm">{activity.content}</p>
                <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    {activity.likes && (
                        <Badge variant="outline" className="text-xs">
                            {activity.likes} likes
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ProfilePage() {
    const { user: currentUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAchievementCategory, setSelectedAchievementCategory] = useState("All");

    // Get user ID (for now, using current user's profile)
    const userId = currentUser?.id;

    // SWR hooks for profile data
    const { data: user, error: userError, isLoading: userLoading, updateProfile } = useUserProfileMutable(userId);
    const { data: achievements = [], error: achievementsError, isLoading: achievementsLoading } = useUserAchievements(userId);
    const { data: stats = {}, error: statsError, isLoading: statsLoading } = useUserStats(userId);
    const { data: recentActivity = [], error: activityError, isLoading: activityLoading } = useUserActivity(userId, 5);

    // Loading state
    const isLoading = userLoading || achievementsLoading || statsLoading || activityLoading;

    // Error handling
    if (userError || achievementsError || statsError || activityError) {
        const errorMessage = userError?.message || achievementsError?.message || statsError?.message || activityError?.message || 'Failed to load profile data';
        toast.error(errorMessage);
    }

    // Filtered achievements based on category
    const filteredAchievements = useMemo(() => {
        if (!achievements) return [];
        if (selectedAchievementCategory === "All") return achievements;
        return achievements.filter(achievement =>
            achievement.category?.toLowerCase().includes(selectedAchievementCategory.toLowerCase())
        );
    }, [achievements, selectedAchievementCategory]);

    const unlockedAchievements = achievements?.filter(a => a.unlocked) || [];
    const totalScore = stats?.studyScore || 0;
    const level = Math.floor(totalScore / 500) + 1;
    const progressToNextLevel = (totalScore % 500) / 500 * 100;

    // Mock mood data (to be replaced with real API later)
    const mockMood = {
        current: "😊",
        streak: 7,
        weekly: ["😊", "😴", "🤔", "😆", "😊", "🎉", "😊"]
    };

    const handleProfileUpdate = async (updates) => {
        try {
            await updateProfile(updates);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile: ' + error.message);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Profile not found</p>
                    <Button onClick={() => window.location.reload()}>Reload</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            <div className="max-w-7xl mx-auto  ">
                {/* Profile Header */}
                <div className="mb-8">
                    <Card>
                        <div className="relative">
                            {/* Cover Image */}
                            <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg relative">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute top-4 right-4"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Profile Info */}
                            <div className="relative px-6 pb-6">
                                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                                    {/* Avatar */}
                                    <div className="relative -mt-16 sm:-mt-20">
                                        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white dark:border-gray-900">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="bg-blue-500 text-white text-2xl">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="absolute bottom-0 right-0 w-8 h-8"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1 mt-4 sm:mt-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h1 className="text-2xl font-bold">{user.name}</h1>
                                                    {user.isVerified && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            ✓ Verified
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">{user.username}</p>
                                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                    <span>{user.major}</span>
                                                    <span>•</span>
                                                    <span>{user.year}</span>
                                                    <span>•</span>
                                                    <span>{user.university}</span>
                                                </div>
                                            </div>

                                            <div className="flex space-x-2 mt-4 sm:mt-0">
                                                <Button variant="outline">
                                                    <MessageCircle className="w-4 h-4 mr-2" />
                                                    Message
                                                </Button>
                                                <Button onClick={() => setIsEditing(true)}>
                                                    <Edit3 className="w-4 h-4 mr-2" />
                                                    Edit Profile
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>

                                        {/* Quick Info */}
                                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{user.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>Joined {user.joinedDate}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4" />
                                                <span>Level {level}</span>
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex space-x-3 mt-4">
                                            {user.instagram && (
                                                <Button variant="ghost" size="icon">
                                                    <Instagram className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {user.twitter && (
                                                <Button variant="ghost" size="icon">
                                                    <Twitter className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {user.github && (
                                                <Button variant="ghost" size="icon">
                                                    <Github className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {user.linkedin && (
                                                <Button variant="ghost" size="icon">
                                                    <Linkedin className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {user.website && (
                                                <Button variant="ghost" size="icon">
                                                    <Globe className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="stats">Stats</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Current Level */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-500" />
                                            <span>Level Progress</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-2xl font-bold">Level {level}</div>
                                                    <div className="text-sm text-gray-600">Study Scholar</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold">{totalScore} pts</div>
                                                    <div className="text-sm text-gray-600">
                                                        {500 - (totalScore % 500)} to next level
                                                    </div>
                                                </div>
                                            </div>
                                            <Progress value={progressToNextLevel} className="h-3" />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <StatCard
                                        icon={<MessageCircle className="w-5 h-5 text-blue-500" />}
                                        title="Posts"
                                        value={stats.posts || 0}
                                        trend={12}
                                    />
                                    <StatCard
                                        icon={<Users className="w-5 h-5 text-purple-500" />}
                                        title="Connections"
                                        value={stats.connections || 0}
                                        trend={8}
                                    />
                                    <StatCard
                                        icon={<Zap className="w-5 h-5 text-yellow-500" />}
                                        title="Study Streak"
                                        value={`${stats.studyStreak || 0}d`}
                                        subtitle="Current"
                                    />
                                    <StatCard
                                        icon={<Calendar className="w-5 h-5 text-green-500" />}
                                        title="Events"
                                        value={stats.eventsAttended || 0}
                                        subtitle="Attended"
                                    />
                                </div>

                                {/* Recent Achievements */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Trophy className="w-5 h-5 text-yellow-500" />
                                                <span>Recent Achievements</span>
                                            </div>
                                            <Button variant="ghost" size="sm">View All</Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {unlockedAchievements.slice(0, 4).map((achievement) => (
                                                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                    <div className="text-2xl">{achievement.icon}</div>
                                                    <div>
                                                        <div className="font-medium">{achievement.name}</div>
                                                        <div className="text-xs text-gray-500">{achievement.date}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                {/* Current Mood */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Smile className="w-5 h-5 text-orange-500" />
                                            <span>Mood Tracker</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center mb-4">
                                            <div className="text-4xl mb-2">{mockMood.current}</div>
                                            <div className="text-sm text-gray-600">
                                                {mockMood.streak} day streak
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                                                <div key={day} className="text-center">
                                                    <div className="text-xs text-gray-500 mb-1">{day}</div>
                                                    <div className="text-lg">{mockMood.weekly[index]}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Study Session Stats */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Coffee className="w-5 h-5 text-green-500" />
                                            <span>Study Stats</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">This Week</span>
                                            <span className="font-bold">24h 30m</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Average/Day</span>
                                            <span className="font-bold">3h 30m</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Focus Score</span>
                                            <Badge variant="secondary">Excellent</Badge>
                                        </div>
                                        <Progress value={85} className="h-2" />
                                    </CardContent>
                                </Card>

                                {/* Clubs & Organizations */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Users className="w-5 h-5 text-blue-500" />
                                            <span>My Clubs</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="text-lg">🤖</div>
                                            <span className="text-sm">Robotics Society</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-lg">📸</div>
                                            <span className="text-sm">Photography Club</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-lg">💙</div>
                                            <span className="text-sm">Mental Health Awareness</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-lg">🎮</div>
                                            <span className="text-sm">Gaming Community</span>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full mt-3">
                                            Explore More Clubs
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
                                title="Study Score"
                                value={stats.studyScore || 0}
                                subtitle="Total Points"
                                trend={15}
                            />
                            <StatCard
                                icon={<MessageCircle className="w-5 h-5 text-green-500" />}
                                title="Posts Created"
                                value={stats.posts || 0}
                                subtitle="All Time"
                                trend={12}
                            />
                            <StatCard
                                icon={<Shield className="w-5 h-5 text-purple-500" />}
                                title="Confessions"
                                value={stats.confessionsSent || 0}
                                subtitle="Anonymous Posts"
                            />
                            <StatCard
                                icon={<Heart className="w-5 h-5 text-pink-500" />}
                                title="Secret Crushes"
                                value={stats.crushesSent || 0}
                                subtitle="Sent"
                            />
                            <StatCard
                                icon={<Users className="w-5 h-5 text-orange-500" />}
                                title="Connections"
                                value={stats.connections || 0}
                                subtitle="Friends & Peers"
                                trend={8}
                            />
                            <StatCard
                                icon={<Calendar className="w-5 h-5 text-red-500" />}
                                title="Events Attended"
                                value={stats.eventsAttended || 0}
                                subtitle="Campus Activities"
                            />
                            <StatCard
                                icon={<Zap className="w-5 h-5 text-yellow-500" />}
                                title="Study Streak"
                                value={stats.studyStreak || 0}
                                subtitle="Days"
                            />
                            <StatCard
                                icon={<Trophy className="w-5 h-5 text-indigo-500" />}
                                title="Club Memberships"
                                value={stats.clubsMember || 0}
                                subtitle="Active"
                            />
                        </div>

                        {/* Detailed Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Study Time This Month</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-center text-gray-500">
                                            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                                            <p>Study time chart would go here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Mood Trends</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-center text-gray-500">
                                            <Activity className="w-12 h-12 mx-auto mb-2" />
                                            <p>Mood trend chart would go here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Achievements</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {unlockedAchievements.length} of {achievements.length} unlocked
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                {achievementCategories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedAchievementCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedAchievementCategory(category)}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAchievements.map((achievement) => (
                                <AchievementCard key={achievement.id} achievement={achievement} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your latest actions and interactions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {recentActivity.length > 0 ? (
                                        recentActivity.map((activity, index) => (
                                            <ActivityItem key={activity.id || index} activity={activity} />
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p>No recent activity to show</p>
                                        </div>
                                    )}
                                </div>
                                {recentActivity.length > 0 && (
                                    <div className="text-center mt-6">
                                        <Button variant="outline">Load More</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Lock className="w-5 h-5" />
                                        <span>Privacy Settings</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Profile Visibility</div>
                                            <div className="text-sm text-gray-600">Who can see your profile</div>
                                        </div>
                                        <Badge variant="outline">{user.profileVisibility || 'Public'}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Show Email</div>
                                            <div className="text-sm text-gray-600">Display email on profile</div>
                                        </div>
                                        <Badge variant="outline">{user.showEmail ? 'Visible' : 'Hidden'}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Allow Messages</div>
                                            <div className="text-sm text-gray-600">Receive direct messages</div>
                                        </div>
                                        <Badge variant="outline">{user.allowMessages ? 'Enabled' : 'Disabled'}</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Bell className="w-5 h-5" />
                                        <span>Notifications</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">New Messages</div>
                                            <div className="text-sm text-gray-600">Direct message notifications</div>
                                        </div>
                                        <Badge variant="outline">On</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Study Reminders</div>
                                            <div className="text-sm text-gray-600">Daily study session alerts</div>
                                        </div>
                                        <Badge variant="outline">On</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Achievement Unlocks</div>
                                            <div className="text-sm text-gray-600">New badge notifications</div>
                                        </div>
                                        <Badge variant="outline">On</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="w-5 h-5" />
                                    <span>Account Settings</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button variant="outline" className="w-full justify-start">
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Personal Information
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Lock className="w-4 h-4 mr-2" />
                                    Change Password
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Update Email Preferences
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Manage Social Links
                                </Button>
                                <Button variant="destructive" className="w-full justify-start">
                                    <User className="w-4 h-4 mr-2" />
                                    Deactivate Account
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <BottomNavigation />
        </div>
    );
}
