"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Heart,
    X,
    MessageCircle,
    Star,
    MapPin,
    GraduationCap,
    Coffee,
    Music,
    Camera,
    Book,
    Gamepad2,
    Sparkles
} from "lucide-react";

const mockProfiles = [
    {
        id: 1,
        name: "Alex Chen",
        age: 20,
        year: "Sophomore",
        major: "Computer Science",
        bio: "Love coding, late night coffee runs, and terrible puns. Looking for someone to explore campus with! 🚀",
        interests: ["Coding", "Coffee", "Photography", "Gaming"],
        avatar: null,
        distance: "0.2 miles away",
        mutualFriends: 3,
        images: ["https://via.placeholder.com/400x600", "https://via.placeholder.com/400x600"]
    },
    {
        id: 2,
        name: "Sarah Martinez",
        age: 19,
        year: "Freshman",
        major: "Psychology",
        bio: "Bookworm by day, stargazer by night. Always down for deep conversations and spontaneous adventures! ✨",
        interests: ["Reading", "Music", "Hiking", "Art"],
        avatar: null,
        distance: "0.5 miles away",
        mutualFriends: 7,
        images: ["https://via.placeholder.com/400x600"]
    }
];

export default function MatchesPage() {
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [matches, setMatches] = useState([]);
    const [showSecretCrush, setShowSecretCrush] = useState(false);

    const currentProfile = mockProfiles[currentProfileIndex];

    const handleSwipe = (direction) => {
        if (direction === 'right') {
            // Add to matches (simplified for demo)
            setMatches(prev => [...prev, currentProfile]);
        }

        if (currentProfileIndex < mockProfiles.length - 1) {
            setCurrentProfileIndex(currentProfileIndex + 1);
        } else {
            setCurrentProfileIndex(0); // Reset to first profile
        }
    };

    const getInterestIcon = (interest) => {
        const icons = {
            'Coding': <Gamepad2 className="w-4 h-4" />,
            'Coffee': <Coffee className="w-4 h-4" />,
            'Photography': <Camera className="w-4 h-4" />,
            'Gaming': <Gamepad2 className="w-4 h-4" />,
            'Reading': <Book className="w-4 h-4" />,
            'Music': <Music className="w-4 h-4" />,
            'Hiking': <MapPin className="w-4 h-4" />,
            'Art': <Star className="w-4 h-4" />
        };
        return icons[interest] || <Star className="w-4 h-4" />;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MainNavigation />

            <div className="max-w-6xl mx-auto px-4 py-6 pb-20 md:pb-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campus Connections</h1>
                        <p className="text-gray-600 dark:text-gray-400">Discover meaningful connections with verified students</p>
                    </div>

                    <Dialog open={showSecretCrush} onOpenChange={setShowSecretCrush}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Secret Crush
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="flex items-center space-x-2">
                                    <Sparkles className="w-5 h-5 text-pink-500" />
                                    <span>Secret Crush</span>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Choose up to 5 people secretly. If they choose you back, you'll both be notified!
                                </p>
                                <Input placeholder="Search for someone..." />
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">You have 3/5 secret crushes selected</p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Tabs defaultValue="discover" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="discover">Discover</TabsTrigger>
                        <TabsTrigger value="matches">
                            Matches
                            {matches.length > 0 && (
                                <Badge className="ml-2 bg-pink-500 text-white">{matches.length}</Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="conversations">Messages</TabsTrigger>
                    </TabsList>

                    <TabsContent value="discover" className="mt-6">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Swipe Cards */}
                            <div className="relative">
                                <Card className="max-w-sm mx-auto border-0 shadow-2xl overflow-hidden">
                                    {currentProfile && (
                                        <>
                                            <div className="relative h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                <div className="text-white text-6xl font-bold">
                                                    {currentProfile.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <Badge className="bg-white/20 text-white border-white/30">
                                                        {currentProfile.distance}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <CardContent className="p-6">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                            {currentProfile.name}, {currentProfile.age}
                                                        </h3>
                                                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                                            <GraduationCap className="w-4 h-4" />
                                                            <span>{currentProfile.year} • {currentProfile.major}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-700 dark:text-gray-300">{currentProfile.bio}</p>

                                                    <div className="flex flex-wrap gap-2">
                                                        {currentProfile.interests.map((interest, index) => (
                                                            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                                                                {getInterestIcon(interest)}
                                                                <span>{interest}</span>
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    <div className="text-sm text-gray-500">
                                                        {currentProfile.mutualFriends} mutual friends
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </>
                                    )}
                                </Card>

                                {/* Action Buttons */}
                                <div className="flex justify-center space-x-4 mt-6">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="rounded-full w-16 h-16 border-gray-300 hover:border-red-400 hover:bg-red-50"
                                        onClick={() => handleSwipe('left')}
                                    >
                                        <X className="w-6 h-6 text-gray-600 hover:text-red-500" />
                                    </Button>

                                    <Button
                                        size="lg"
                                        className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                        onClick={() => handleSwipe('right')}
                                    >
                                        <Heart className="w-6 h-6 text-white" />
                                    </Button>
                                </div>
                            </div>

                            {/* AI Recommendations */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Sparkles className="w-5 h-5 text-purple-600" />
                                            <span>AI Matchmaker</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Based on your interests and interactions, here are some perfect matches:
                                        </p>
                                        <div className="space-y-3">
                                            {mockProfiles.slice(0, 3).map((profile) => (
                                                <div key={profile.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                                    <Avatar>
                                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                                            {profile.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">{profile.name}</p>
                                                        <p className="text-xs text-gray-500">{profile.major}</p>
                                                    </div>
                                                    <Badge variant="secondary" className="text-xs">
                                                        95% match
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Campus Events</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                                <h4 className="font-semibold text-sm">Speed Dating Night</h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Tomorrow, 7:00 PM • Student Center</p>
                                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">23 students interested</p>
                                            </div>
                                            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                                                <h4 className="font-semibold text-sm">Coffee & Connections</h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">This Friday, 3:00 PM • Campus Café</p>
                                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">18 students interested</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="matches" className="mt-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {matches.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No matches yet. Keep swiping!</p>
                                </div>
                            ) : (
                                matches.map((match) => (
                                    <Card key={match.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <Avatar>
                                                    <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                                                        {match.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold">{match.name}</h3>
                                                    <p className="text-sm text-gray-500">{match.major}</p>
                                                </div>
                                            </div>
                                            <Button className="w-full" size="sm">
                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                Start Conversation
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="conversations" className="mt-6">
                        <div className="text-center py-12">
                            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No conversations yet. Start matching to begin chatting!</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <BottomNavigation />
        </div>
    );
}
