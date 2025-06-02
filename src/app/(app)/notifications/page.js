"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Heart,
    Bell,
    MessageCircle,
    Users,
    Calendar,
    BookOpen,
    Trophy,
    Shield,
    Zap,
    Settings,
    MoreHorizontal,
    Check,
    X,
    Eye,
    Clock,
    Star,
    UserPlus,
    Share2,
    Coffee,
    Smile,
    AlertCircle,
    CheckCircle,
    Info
} from "lucide-react";

const NotificationIcon = ({ type, priority }) => {
    const getIcon = () => {
        switch (type) {
            case "like":
                return <Heart className="w-4 h-4 text-red-500" />;
            case "comment":
                return <MessageCircle className="w-4 h-4 text-blue-500" />;
            case "match":
                return <Heart className="w-4 h-4 text-pink-500 fill-current" />;
            case "study_room":
                return <BookOpen className="w-4 h-4 text-green-500" />;
            case "achievement":
                return <Trophy className="w-4 h-4 text-yellow-500" />;
            case "connection":
                return <Users className="w-4 h-4 text-purple-500" />;
            case "event":
                return <Calendar className="w-4 h-4 text-orange-500" />;
            case "mood_reminder":
                return <Smile className="w-4 h-4 text-indigo-500" />;
            case "club_update":
                return <Star className="w-4 h-4 text-teal-500" />;
            case "system":
                return <Settings className="w-4 h-4 text-gray-500" />;
            default:
                return <Bell className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className={`p-2 rounded-full ${priority === "high" ? "bg-red-100 dark:bg-red-900/20" :
            priority === "medium" ? "bg-yellow-100 dark:bg-yellow-900/20" :
                "bg-gray-100 dark:bg-gray-800"
            }`}>
            {getIcon()}
        </div>
    );
};

const NotificationCard = ({ notification, onMarkAsRead, onAction }) => {
    // Format timestamp from API data
    const formatTimeAgo = (createdAt) => {
        const now = new Date();
        const notificationTime = new Date(createdAt);
        const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;

        return notificationTime.toLocaleDateString();
    };

    const timeAgo = notification.createdAt ? formatTimeAgo(notification.createdAt) : notification.timestamp;

    return (
        <Card className={`transition-all hover:shadow-md ${!notification.isRead ? "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500" : ""
            }`}>
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <div className="relative">
                        {notification.fromUser?.name ? (
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-blue-500 text-white">
                                    {notification.fromUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ) : notification.avatar ? (
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-blue-500 text-white">
                                    {notification.avatar}
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <NotificationIcon type={notification.type} priority={notification.priority} />
                        )}
                        {!notification.isRead && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className={`text-sm font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                                    {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {notification.message}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        <span>{timeAgo}</span>
                                    </div>
                                    {notification.priority === "high" && (
                                        <Badge variant="destructive" className="text-xs">
                                            High Priority
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-1 ml-2">
                                {!notification.isRead && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onMarkAsRead(notification.id)}
                                        className="w-6 h-6"
                                    >
                                        <Check className="w-3 h-3" />
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-6 h-6"
                                >
                                    <MoreHorizontal className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {notification.action && (
                            <div className="mt-3 flex space-x-2">
                                {notification.type === "connection" && (
                                    <>
                                        <Button size="sm" variant="default">Accept</Button>
                                        <Button size="sm" variant="outline">Decline</Button>
                                    </>
                                )}
                                {notification.type === "study_room" && (
                                    <Button size="sm" variant="default">Join Room</Button>
                                )}
                                {notification.type === "match" && (
                                    <Button size="sm" variant="default">View Match</Button>
                                )}
                                {notification.type === "event" && (
                                    <Button size="sm" variant="outline">View Event</Button>
                                )}
                                {(notification.type === "like" || notification.type === "comment") && (
                                    <Button size="sm" variant="outline">View Post</Button>
                                )}
                                {notification.type === "achievement" && (
                                    <Button size="sm" variant="outline">View Badge</Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function NotificationsPage() {
    const [filter, setFilter] = useState("all");

    // Fetch notifications using SWR
    const { data: notificationsData, error, mutate: mutateNotifications, isLoading } = useSWR(
        `/api/notifications?userId=1&limit=50`,
        async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            return response.json();
        }
    );

    const notifications = notificationsData?.data?.notifications || [];
    const stats = notificationsData?.data?.stats || { total: 0, unread: 0, highPriority: 0 };

    const handleMarkAsRead = async (notificationId) => {
        try {
            const response = await fetch('/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'markAsRead',
                    notificationIds: [notificationId]
                }),
            });

            if (response.ok) {
                mutateNotifications(); // Refresh the data
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            const response = await fetch('/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'markAllAsRead',
                    userId: '1'
                }),
            });

            if (response.ok) {
                mutateNotifications(); // Refresh the data
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const handleClearAll = async () => {
        try {
            const unreadNotificationIds = notifications
                .filter(n => !n.isRead)
                .map(n => n.id);

            if (unreadNotificationIds.length > 0) {
                const response = await fetch('/api/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'delete',
                        notificationIds: unreadNotificationIds
                    }),
                });

                if (response.ok) {
                    mutateNotifications(); // Refresh the data
                }
            }
        } catch (error) {
            console.error('Error clearing notifications:', error);
        }
    };

    const filteredNotifications = notifications.filter(notification => {
        switch (filter) {
            case "unread":
                return !notification.isRead;
            case "high_priority":
                return notification.priority === "high";
            case "social":
                return ["like", "comment", "connection", "match"].includes(notification.type);
            case "study":
                return ["study_room", "achievement", "mood_reminder"].includes(notification.type);
            case "events":
                return ["event", "club_update"].includes(notification.type);
            default:
                return true;
        }
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Notifications
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Loading your notifications...
                        </p>
                    </div>

                    {/* Loading skeleton for stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i}>
                                <CardContent className="pt-6">
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Loading skeleton for notifications */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-4">
                                    <div className="animate-pulse">
                                        <div className="flex space-x-4">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <BottomNavigation />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Notifications
                        </h1>
                        <p className="text-red-600 dark:text-red-400">
                            Failed to load notifications. Please try again.
                        </p>
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Unable to load notifications
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    There was a problem fetching your notifications.
                                </p>
                                <Button onClick={() => mutateNotifications()}>
                                    Try Again
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <BottomNavigation />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Notifications
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Stay updated with your campus social life
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" onClick={handleMarkAllAsRead}>
                                <Check className="w-4 h-4 mr-2" />
                                Mark All Read
                            </Button>
                            <Button variant="ghost">
                                <Settings className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Bell className="w-5 h-5 text-blue-500" />
                                <div>
                                    <div className="text-2xl font-bold">{stats.total}</div>
                                    <div className="text-sm text-gray-600">Total</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Eye className="w-5 h-5 text-green-500" />
                                <div>
                                    <div className="text-2xl font-bold">{stats.unread}</div>
                                    <div className="text-sm text-gray-600">Unread</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <div>
                                    <div className="text-2xl font-bold">{stats.highPriority}</div>
                                    <div className="text-sm text-gray-600">High Priority</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-purple-500" />
                                <div>
                                    <div className="text-2xl font-bold">2h</div>
                                    <div className="text-sm text-gray-600">Avg Response</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs value={filter} onValueChange={setFilter} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="all">
                            All ({notifications.length})
                        </TabsTrigger>
                        <TabsTrigger value="unread">
                            Unread ({stats.unread})
                        </TabsTrigger>
                        <TabsTrigger value="high_priority">
                            Priority ({stats.highPriority})
                        </TabsTrigger>
                        <TabsTrigger value="social">Social</TabsTrigger>
                        <TabsTrigger value="study">Study</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>

                    <TabsContent value={filter} className="space-y-4">
                        {filteredNotifications.length > 0 ? (
                            <ScrollArea className="h-[600px]">
                                <div className="space-y-4 pr-4">
                                    {filteredNotifications.map((notification) => (
                                        <NotificationCard
                                            key={notification.id}
                                            notification={notification}
                                            onMarkAsRead={handleMarkAsRead}
                                            onAction={() => { }}
                                        />
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-4xl mb-4">
                                    {filter === "unread" ? "✅" : "🔔"}
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    {filter === "unread" ? "All caught up!" : "No notifications"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {filter === "unread"
                                        ? "You've read all your notifications. Great job staying on top of things!"
                                        : "No notifications in this category yet."
                                    }
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Quick Actions */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <span>Quick Actions</span>
                        </CardTitle>
                        <CardDescription>
                            Manage your notifications and preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button variant="outline" className="justify-start">
                                <Settings className="w-4 h-4 mr-2" />
                                Notification Settings
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={handleClearAll}>
                                <X className="w-4 h-4 mr-2" />
                                Clear Read Notifications
                            </Button>
                            <Button variant="outline" className="justify-start">
                                <Bell className="w-4 h-4 mr-2" />
                                Configure Alerts
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                            Customize what notifications you receive
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="font-medium">Social Notifications</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">New likes</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">New comments</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">New matches</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Connection requests</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">Study & Wellness</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Study room invites</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Mood reminders</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Achievement unlocks</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Event reminders</span>
                                            <Badge variant="outline">Enabled</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button>Save Preferences</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <BottomNavigation />
        </div>
    );
}
