"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    Star
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

const weeklyData = [
    { day: "Mon", mood: 4, energy: 3 },
    { day: "Tue", mood: 3, energy: 4 },
    { day: "Wed", mood: 5, energy: 5 },
    { day: "Thu", mood: 2, energy: 2 },
    { day: "Fri", mood: 4, energy: 4 },
    { day: "Sat", mood: 5, energy: 5 },
    { day: "Sun", mood: 4, energy: 3 },
];

export default function WellnessPage() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [journalEntry, setJournalEntry] = useState("");
    const [currentStreak, setCurrentStreak] = useState(7);

    const handleActivityToggle = (activity) => {
        setSelectedActivities(prev =>
            prev.includes(activity)
                ? prev.filter(a => a !== activity)
                : [...prev, activity]
        );
    };

    const handleSubmitCheckIn = () => {
        // Handle mood check-in submission
        console.log({
            mood: selectedMood,
            activities: selectedActivities,
            journal: journalEntry
        });

        // Reset form
        setSelectedMood(null);
        setSelectedActivities([]);
        setJournalEntry("");
    };

    return (
        <div className="space-y-6">
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
                                                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${selectedActivities.includes(activity)
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
                                            onClick={handleSubmitCheckIn}
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
                                        <div className="text-6xl font-bold text-yellow-500 mb-2">{currentStreak}</div>
                                        <p className="text-gray-600 dark:text-gray-400">days in a row!</p>
                                        <Progress value={(currentStreak / 30) * 100} className="mt-4" />
                                        <p className="text-sm text-gray-500 mt-2">
                                            {30 - currentStreak} days until your next milestone
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>This Week's Patterns</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {weeklyData.map((day, index) => (
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
                                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                                    <strong>Pattern:</strong> Your mood tends to be higher on days when you exercise!
                                                </p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                                                <p className="text-sm text-green-700 dark:text-green-300">
                                                    <strong>Tip:</strong> You've been consistent with self-care. Keep it up!
                                                </p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                                <p className="text-sm text-purple-700 dark:text-purple-300">
                                                    <strong>Suggestion:</strong> Consider scheduling social time midweek to boost your mood.
                                                </p>
                                            </div>
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
                                    <div className="text-3xl font-bold text-blue-600">4.2/5</div>
                                    <p className="text-sm text-gray-500">This week</p>
                                    <p className="text-sm text-green-600 mt-2">↗ 0.3 from last week</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Most Active Day</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-green-600">Wednesday</div>
                                    <p className="text-sm text-gray-500">Average activities: 4.2</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Longest Streak</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-yellow-600">12 days</div>
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
                                <p className="text-gray-500 text-center py-8">
                                    Your journal entries will appear here. Start by completing daily check-ins!
                                </p>
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
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                            <span className="font-medium">Check in daily for 30 days</span>
                                            <Badge variant="secondary">7/30</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                            <span className="font-medium">Exercise 3x per week</span>
                                            <Badge variant="secondary">2/3</Badge>
                                        </div>
                                    </div>
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
        </div>
    );
}
