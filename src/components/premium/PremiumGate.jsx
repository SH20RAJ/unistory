"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Crown,
    Lock,
    Star,
    Zap,
    TrendingUp,
    Users,
    Gift,
    Sparkles,
    Heart,
    Timer,
    CreditCard,
    ArrowRight,
    Shield,
    Trophy,
    Flame
} from "lucide-react";

const PremiumGate = ({ 
    appName, 
    appDescription, 
    appIcon: Icon, 
    requiredCredits = 2500, 
    userCredits = 1847,
    children,
    isPremium = false,
    showPreview = false
}) => {
    const [previewTime, setPreviewTime] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [socialCreditProgress, setSocialCreditProgress] = useState(userCredits);
    
    const creditProgress = (userCredits / requiredCredits) * 100;
    const creditsNeeded = requiredCredits - userCredits;
    
    // FOMO and psychological triggers
    const triggerMessages = [
        "🔥 3 people from your dorm just unlocked this app",
        "💫 Someone's been checking your profile repeatedly...",
        "⚡ Your compatibility score jumped to 94% - see who!",
        "🎯 You're missing exclusive campus insights right now",
        "👀 2 secret crushes revealed while you were away",
        "🌟 Your social rank could increase by 40% with premium"
    ];
    
    const [currentTrigger, setCurrentTrigger] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTrigger(prev => (prev + 1) % triggerMessages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    if (isPremium) {
        return children;
    }

    if (showPreview && previewTime < 60) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
                    <Card className="w-96 border-2 border-yellow-500 shadow-2xl">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Timer className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle>Preview Ending Soon!</CardTitle>
                            <CardDescription>
                                Unlock unlimited access to continue your journey
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <Button 
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                onClick={() => setShowPaymentModal(true)}
                            >
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade to Premium
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
            <div className="max-w-4xl mx-auto p-6 pt-24">
                {/* Premium Lock Header */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        {Icon ? <Icon className="w-12 h-12 text-white" /> : <Crown className="w-12 h-12 text-white" />}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Lock className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {appName}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                        {appDescription}
                    </p>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 text-lg">
                        👑 Premium Only
                    </Badge>
                </div>

                {/* FOMO Trigger */}
                <Card className="mb-8 border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <Flame className="w-6 h-6 text-red-500" />
                            <p className="text-red-700 dark:text-red-300 font-medium">
                                {triggerMessages[currentTrigger]}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Social Credit Path */}
                    <Card className="border-2 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                                <Trophy className="w-6 h-6 mr-2" />
                                Unlock with Social Credits
                            </CardTitle>
                            <CardDescription>
                                Build your reputation and earn premium access
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Social Credit Progress</span>
                                    <span className="text-sm text-gray-500">
                                        {userCredits.toLocaleString()} / {requiredCredits.toLocaleString()}
                                    </span>
                                </div>
                                <Progress value={creditProgress} className="h-3" />
                                <p className="text-xs text-gray-500 mt-1">
                                    {creditsNeeded > 0 ? `${creditsNeeded.toLocaleString()} credits needed` : 'Unlocked!'}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Quick Ways to Earn Credits:</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Users className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm">Refer 5 friends</span>
                                        </div>
                                        <Badge className="bg-blue-500">+500</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Heart className="w-4 h-4 text-green-500" />
                                            <span className="text-sm">Get 10 post likes</span>
                                        </div>
                                        <Badge className="bg-green-500">+200</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm">Join 3 study groups</span>
                                        </div>
                                        <Badge className="bg-purple-500">+300</Badge>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full" variant="outline">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                View All Credit Opportunities
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Premium Purchase Path */}
                    <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <CardHeader>
                            <CardTitle className="flex items-center text-purple-600 dark:text-purple-400">
                                <Crown className="w-6 h-6 mr-2" />
                                Instant Premium Access
                            </CardTitle>
                            <CardDescription>
                                Unlock everything immediately
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                    $9.99<span className="text-lg font-normal">/month</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    or $99/year (2 months free!)
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Premium Includes:</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Sparkles className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm">All 24 premium apps unlocked</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Zap className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm">Nova AI personal assistant</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Shield className="w-4 h-4 text-green-500" />
                                        <span className="text-sm">Advanced privacy controls</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Gift className="w-4 h-4 text-purple-500" />
                                        <span className="text-sm">Exclusive events & rewards</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button 
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                                    onClick={() => setShowPaymentModal(true)}
                                >
                                    <Crown className="w-5 h-5 mr-2" />
                                    Upgrade Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Timer className="w-4 h-4 mr-2" />
                                    Try 7-Day Free Trial
                                </Button>
                            </div>

                            <p className="text-xs text-center text-gray-500">
                                Cancel anytime. No questions asked.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Social Proof Section */}
                <Card className="mt-8 border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-6">
                        <div className="text-center space-y-4">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300">
                                Join 2,847+ Premium Students
                            </h3>
                            <div className="flex justify-center space-x-8 text-sm">
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-green-600">94%</div>
                                    <div className="text-gray-600">Higher GPA</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-green-600">3.2x</div>
                                    <div className="text-gray-600">More Connections</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl text-green-600">89%</div>
                                    <div className="text-gray-600">Better Mood</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Modal */}
                {showPaymentModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CreditCard className="w-6 h-6 mr-2" />
                                    Choose Your Plan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <Button className="w-full h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                        <div className="text-left">
                                            <div className="font-bold">Annual Plan - $99/year</div>
                                            <div className="text-sm opacity-90">Save $20! (2 months free)</div>
                                        </div>
                                    </Button>
                                    <Button variant="outline" className="w-full h-16">
                                        <div className="text-left">
                                            <div className="font-bold">Monthly Plan - $9.99/month</div>
                                            <div className="text-sm text-gray-500">Cancel anytime</div>
                                        </div>
                                    </Button>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="flex-1">
                                        Continue
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PremiumGate;
