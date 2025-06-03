"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    BarChart3,
    TrendingUp,
    Users,
    Gift,
    Trophy,
    RefreshCw,
    Download,
    Calendar,
    Target,
    Zap
} from "lucide-react";

export default function ReferralAnalytics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [seeding, setSeeding] = useState(false);

    const loadStats = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/referrals/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_demo_stats' })
            });
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const seedDemoData = async () => {
        setSeeding(true);
        try {
            const response = await fetch('/api/referrals/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'seed_demo_data' })
            });
            const data = await response.json();
            if (data.success) {
                await loadStats();
                alert('Demo data seeded successfully!');
            }
        } catch (error) {
            console.error('Failed to seed demo data:', error);
            alert('Failed to seed demo data');
        } finally {
            setSeeding(false);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    return (
        <div className="container mx-auto px-6 py-8 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Referral Analytics
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Monitor and analyze referral system performance
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button
                        onClick={seedDemoData}
                        disabled={seeding}
                        variant="outline"
                        className="flex items-center space-x-2"
                    >
                        {seeding ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                        <span>{seeding ? 'Seeding...' : 'Seed Demo Data'}</span>
                    </Button>
                    <Button
                        onClick={loadStats}
                        disabled={loading}
                        variant="outline"
                        className="flex items-center space-x-2"
                    >
                        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        <span>Refresh</span>
                    </Button>
                    <Button className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Users
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats?.totalUsers || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Badge variant="secondary" className="text-green-600">
                                +12% this month
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Referrals
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats?.totalReferrals || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Badge variant="secondary" className="text-green-600">
                                +8% this week
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Rewards
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats?.totalRewards || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                                <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Badge variant="secondary" className="text-purple-600">
                                Points distributed
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Conversion Rate
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    85%
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Progress value={85} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="top-referrers">Top Referrers</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="rewards">Rewards</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BarChart3 className="w-5 h-5" />
                                    <span>Referral Performance</span>
                                </CardTitle>
                                <CardDescription>
                                    Daily referral signups over the last 30 days
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                    <div className="text-center">
                                        <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>Chart visualization would go here</p>
                                        <p className="text-sm">Connect to your analytics provider</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>Recent Activity</span>
                                </CardTitle>
                                <CardDescription>
                                    Latest referral activities
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Sarah referred Emma Wilson</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                                        </div>
                                        <Badge variant="secondary">+100 pts</Badge>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Alex reached milestone: 5 referrals</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">1 day ago</p>
                                        </div>
                                        <Badge variant="secondary">+250 pts</Badge>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Mike joined via referral</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">3 days ago</p>
                                        </div>
                                        <Badge variant="secondary">+50 pts</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="top-referrers" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Trophy className="w-5 h-5" />
                                <span>Top Referrers</span>
                            </CardTitle>
                            <CardDescription>
                                Users with the most successful referrals
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats?.topReferrers?.map((user, index) => (
                                    <div key={user.userId} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {user.fullName}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {user.email} • Code: {user.referralCode}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-gray-900 dark:text-white">
                                                {user.totalReferrals}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {user.totalRewards} points
                                            </p>
                                        </div>
                                    </div>
                                )) || (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p>No referrers yet</p>
                                            <Button onClick={seedDemoData} className="mt-4">
                                                Seed Demo Data
                                            </Button>
                                        </div>
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="trends">
                    <Alert>
                        <BarChart3 className="h-4 w-4" />
                        <AlertDescription>
                            Trends analysis coming soon. This will show referral growth patterns,
                            seasonal trends, and predictive analytics.
                        </AlertDescription>
                    </Alert>
                </TabsContent>

                <TabsContent value="rewards">
                    <Alert>
                        <Gift className="h-4 w-4" />
                        <AlertDescription>
                            Rewards analytics coming soon. This will show reward distribution,
                            redemption rates, and cost analysis.
                        </AlertDescription>
                    </Alert>
                </TabsContent>
            </Tabs>
        </div>
    );
}
