"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
    useWellnessCheckinsMutable,
    useWellnessStats,
    useWellnessGoalsMutable
} from "@/hooks/useSWR";
import { toast } from "sonner";
import {
    Smile,
    Frown,
    Meh,
    Heart,
    Brain,
    Sun,
    Moon,
    Coffee,
    Book,
    Users,
    TrendingUp,
    Calendar,
    Target,
    Zap,
    Star,
    Loader2
} from "lucide-react";

const moods = [
    { emoji: "😊", label: "Great", value: 5, color: "bg-green-500" },
    { emoji: "🙂", label: "Good", value: 4, color: "bg-blue-500" },
    { emoji: "😐", label: "Okay", value: 3, color: "bg-yellow-500" },
    { emoji: "😔", label: "Low", value: 2, color: "bg-orange-500" },
    { emoji: "😢", label: "Rough", value: 1, color: "bg-red-500" },
];

const activities = [
    { icon: <Book className="w-5 h-5" />, label: "Studied", color: "bg-blue-100 text-blue-700" },
    { icon: <Users className="w-5 h-5" />, label: "Socializing", color: "bg-green-100 text-green-700" },
    { icon: <Coffee className="w-5 h-5" />, label: "Coffee Break", color: "bg-orange-100 text-orange-700" },
    { icon: <Heart className="w-5 h-5" />, label: "Self-care", color: "bg-pink-100 text-pink-700" },
    { icon: <Sun className="w-5 h-5" />, label: "Outdoors", color: "bg-yellow-100 text-yellow-700" },
    { icon: <Zap className="w-5 h-5" />, label: "Exercise", color: "bg-purple-100 text-purple-700" },
];

export default function WellnessPage() {
    const { user } = useAuth();
    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [journalEntry, setJournalEntry] = useState("");

    // SWR hooks for data fetching
    const {
        data: checkins,
        isLoading: checkinsLoading,
        submitCheckin
    } = useWellnessCheckinsMutable(user?.id);

    const {
        data: stats,
        isLoading: statsLoading,
        error: statsError
    } = useWellnessStats(user?.id);

    const {
        data: goals,
        isLoading: goalsLoading
    } = useWellnessGoalsMutable(user?.id);

    // Loading state for any data fetching
    const isLoading = checkinsLoading || statsLoading || goalsLoading;

    const handleActivityToggle = (activity) => {
        setSelectedActivities(prev =>
            prev.includes(activity.label)
                ? prev.filter(a => a !== activity.label)
                : [...prev, activity.label]
        );
    };

    const handleSubmitCheckin = async () => {
        if (!selectedMood || !user?.id) {
            toast.error("Please select a mood to continue");
            return;
        }

        try {
            await submitCheckin({
                mood: selectedMood.value,
                moodLabel: selectedMood.label,
                activities: selectedActivities,
                journalEntry: journalEntry
            });

            toast.success("Check-in submitted successfully! 🎉");

            // Reset form
            setSelectedMood(null);
            setSelectedActivities([]);
            setJournalEntry("");
        } catch (error) {
            console.error('Error submitting check-in:', error);
            toast.error("Failed to submit check-in. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            <div className="max-w-6xl mx-auto px-4 py-6 pb-20 md:pb-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wellness Hub</h1>
                    <p className="text-gray-600 dark:text-gray-400">Track your mood, reflect, and grow through your college journey</p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading your wellness data...</span>
                    </div>
                ) : (
                    <Tabs defaultValue="checkin" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="checkin">Daily Check-in</TabsTrigger>
                            <TabsTrigger value="insights">Insights</TabsTrigger>
                            <TabsTrigger value="journal">Journal</TabsTrigger>
                            <TabsTrigger value="goals">Goals</TabsTrigger>
                        </TabsList>

                        <TabsContent value="checkin" className="mt-6">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Daily Check-in */}
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-2">
                                                <Smile className="w-5 h-5 text-blue-600" />
                                                <span>How are you feeling today?</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-5 gap-3">
                                                {moods.map((mood) => (
                                                    <button
                                                        key={mood.value}
                                                        onClick={() => setSelectedMood(mood)}
                                                        className={`p-4 rounded-lg border-2 transition-all text-center ${selectedMood?.value === mood.value
                                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <div className="text-2xl mb-1">{mood.emoji}</div>
                                                        <div className="text-xs font-medium">{mood.label}</div>
                                                    </button>
                                                ))}
                                            </div>
                                            {selectedMood && (
                                                <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                                        You're feeling <strong>{selectedMood.label.toLowerCase()}</strong> today.
                                                        That's perfectly valid! 💙
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>What did you do today?</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-3">
                                                {activities.map((activity, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleActivityToggle(activity)}
                                                        className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${selectedActivities.includes(activity.label)
                                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <div className={`p-2 rounded-lg ${activity.color}`}>
                                                            {activity.icon}
                                                        </div>
                                                        <span className="text-sm font-medium">{activity.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Quick Reflection</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Textarea
                                                placeholder="What's on your mind? Any wins, challenges, or thoughts you'd like to capture?"
                                                value={journalEntry}
                                                onChange={(e) => setJournalEntry(e.target.value)}
                                                className="min-h-[100px]"
                                            />
                                            <Button
                                                onClick={handleSubmitCheckin}
                                                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600"
                                                disabled={!selectedMood}
                                            >
                                                Complete Check-in
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Streak & Stats */}
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-2">
                                                <Star className="w-5 h-5 text-yellow-500" />
                                                <span>Your Wellness Streak</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <div className="text-6xl font-bold text-yellow-500 mb-2">
                                                {stats?.currentStreak || 0}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">days in a row!</p>
                                            <Progress value={((stats?.currentStreak || 0) / 30) * 100} className="mt-4" />
                                            <p className="text-sm text-gray-500 mt-2">
                                                {30 - (stats?.currentStreak || 0)} days until your next milestone
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>This Week's Patterns</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {(stats?.weeklyData || []).map((day, index) => (
                                                    <div key={index} className="flex items-center space-x-4">
                                                        <div className="w-12 text-sm font-medium">{day.day}</div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2 mb-1">
                                                                <Smile className="w-4 h-4 text-blue-500" />
                                                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                    <div
                                                                        className="bg-blue-500 h-2 rounded-full"
                                                                        style={{ width: `${(day.mood / 5) * 100}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Zap className="w-4 h-4 text-green-500" />
                                                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                    <div
                                                                        className="bg-green-500 h-2 rounded-full"
                                                                        style={{ width: `${(day.energy / 5) * 100}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>AI Insights</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {(stats?.insights || []).map((insight, index) => (
                                                    <div
                                                        key={index}
                                                        className={`p-3 rounded-lg ${insight.type === 'positive' ? 'bg-green-50 dark:bg-green-900/20' :
                                                                insight.type === 'pattern' ? 'bg-blue-50 dark:bg-blue-900/20' :
                                                                    insight.type === 'suggestion' ? 'bg-purple-50 dark:bg-purple-900/20' :
                                                                        'bg-gray-50 dark:bg-gray-800'
                                                            }`}
                                                    >
                                                        <p className={`text-sm ${insight.type === 'positive' ? 'text-green-700 dark:text-green-300' :
                                                                insight.type === 'pattern' ? 'text-blue-700 dark:text-blue-300' :
                                                                    insight.type === 'suggestion' ? 'text-purple-700 dark:text-purple-300' :
                                                                        'text-gray-700 dark:text-gray-300'
                                                            }`}>
                                                            <strong>{insight.title}:</strong> {insight.message}
                                                        </p>
                                                    </div>
                                                ))}

                                                {(!stats?.insights || stats.insights.length === 0) && (
                                                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                                            Complete a few more check-ins to unlock personalized insights! 🔮
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="insights" className="mt-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Mood Average</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-blue-600">
                                            {stats?.averageMood ? `${stats.averageMood}/5` : '--'}
                                        </div>
                                        <p className="text-sm text-gray-500">This week</p>
                                        {stats?.averageMood && (
                                            <p className={`text-sm mt-2 ${stats.averageMood >= 4 ? 'text-green-600' : stats.averageMood >= 3 ? 'text-yellow-600' : 'text-orange-600'}`}>
                                                {stats.averageMood >= 4 ? '😊 Feeling great!' : stats.averageMood >= 3 ? '😐 Doing okay' : '💪 Keep going!'}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Total Check-ins</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-green-600">
                                            {stats?.totalCheckins || 0}
                                        </div>
                                        <p className="text-sm text-gray-500">All time</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Longest Streak</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-yellow-600">
                                            {stats?.longestStreak || 0} days
                                        </div>
                                        <p className="text-sm text-gray-500">Your best streak yet!</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="journal" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Reflection Journal</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {checkins && checkins.length > 0 ? (
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {checkins
                                                .filter(checkin => checkin.journalEntry && checkin.journalEntry.trim())
                                                .map((checkin) => (
                                                    <div key={checkin.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-2xl">
                                                                    {moods.find(m => m.value === checkin.mood)?.emoji || '😐'}
                                                                </span>
                                                                <span className="font-medium text-sm">
                                                                    {checkin.moodLabel}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                {new Date(checkin.date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                            {checkin.journalEntry}
                                                        </p>
                                                        {checkin.activities && checkin.activities.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-3">
                                                                {checkin.activities.map((activity, idx) => (
                                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                                        {activity}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-8">
                                            Your journal entries will appear here. Start by completing daily check-ins with reflections!
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="goals" className="mt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Goals</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {goals && goals.length > 0 ? (
                                            <div className="space-y-4">
                                                {goals.map((goal) => (
                                                    <div key={goal.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-medium">{goal.title}</span>
                                                            <Badge variant={goal.isCompleted ? "default" : "secondary"}>
                                                                {goal.current}/{goal.target}
                                                            </Badge>
                                                        </div>
                                                        {goal.description && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                                {goal.description}
                                                            </p>
                                                        )}
                                                        <Progress value={goal.progress} className="h-2" />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {Math.round(goal.progress)}% complete
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-center py-8">
                                                No goals set yet. Create your first wellness goal!
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Set New Goal</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-500 text-center py-8">
                                            Goal setting feature coming soon!
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </div>

            <BottomNavigation />
        </div>
    );
}
