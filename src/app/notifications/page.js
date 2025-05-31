"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Bell,
    Heart,
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

const mockNotifications = [
    {
        id: 1,
        type: "like",
        title: "New Like",
        message: "Sarah Kim liked your post about machine learning study group",
        timestamp: "2 minutes ago",
        isRead: false,
        avatar: "SK",
        action: {
            type: "post",
            id: 123
        },
        priority: "low"
    },
    {
        id: 2,
        type: "comment",
        title: "New Comment",
        message: "Alex Chen commented on your confession: 'I totally understand this feeling!'",
        timestamp: "15 minutes ago",
        isRead: false,
        avatar: "AC",
        action: {
            type: "confession",
            id: 456
        },
        priority: "medium"
    },
    {
        id: 3,
        type: "match",
        title: "New Match! 💕",
        message: "You have a new secret crush match! Check who likes you back.",
        timestamp: "1 hour ago",
        isRead: false,
        avatar: null,
        action: {
            type: "matches",
            id: null
        },
        priority: "high"
    },
    {
        id: 4,
        type: "study_room",
        title: "Study Room Invitation",
        message: "Maya Rodriguez invited you to join 'Calculus Study Session' starting in 30 minutes",
        timestamp: "2 hours ago",
        isRead: false,
        avatar: "MR",
        action: {
            type: "study_room",
            id: 789
        },
        priority: "high"
    },
    {
        id: 5,
        type: "achievement",
        title: "Achievement Unlocked! 🏆",
        message: "Congratulations! You've earned the 'Study Streak Master' badge for maintaining a 30-day streak",
        timestamp: "3 hours ago",
        isRead: true,
        avatar: null,
        action: {
            type: "achievement",
            id: "study_streak_master"
        },
        priority: "medium"
    },
    {
        id: 6,
        type: "connection",
        title: "New Connection Request",
        message: "Jordan Mitchell wants to connect with you",
        timestamp: "4 hours ago",
        isRead: true,
        avatar: "JM",
        action: {
            type: "connection_request",
            id: 101
        },
        priority: "medium"
    },
    {
        id: 7,
        type: "event",
        title: "Event Reminder",
        message: "Mental Health Workshop starts tomorrow at 3 PM in Student Center",
        timestamp: "6 hours ago",
        isRead: true,
        avatar: null,
        action: {
            type: "event",
            id: 202
        },
        priority: "medium"
    },
    {
        id: 8,
        type: "mood_reminder",
        title: "Daily Check-in",
        message: "Don't forget to log your mood today! Keep your wellness streak going 😊",
        timestamp: "8 hours ago",
        isRead: true,
        avatar: null,
        action: {
            type: "wellness",
            id: null
        },
        priority: "low"
    },
    {
        id: 9,
        type: "club_update",
        title: "Club Activity",
        message: "Robotics Society posted new project guidelines for the upcoming competition",
        timestamp: "1 day ago",
        isRead: true,
        avatar: null,
        action: {
            type: "club",
            id: 303
        },
        priority: "low"
    },
    {
        id: 10,
        type: "system",
        title: "App Update",
        message: "New features available! Check out the enhanced study rooms and improved matching algorithm",
        timestamp: "2 days ago",
        isRead: true,
        avatar: null,
        action: {
            type: "app_update",
            id: null
        },
        priority: "low"
    }
];

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
    const timeAgo = notification.timestamp;

    return (
        <Card className={`transition-all hover:shadow-md ${!notification.isRead ? "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500" : ""
            }`}>
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <div className="relative">
                        {notification.avatar ? (
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
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState("all");

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const highPriorityCount = notifications.filter(n => n.priority === "high" && !n.isRead).length;

    const handleMarkAsRead = (notificationId) => {
        setNotifications(notifications.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const handleClearAll = () => {
        setNotifications(notifications.filter(n => !n.isRead));
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MainNavigation />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                                    <div className="text-2xl font-bold">{notifications.length}</div>
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
                                    <div className="text-2xl font-bold">{unreadCount}</div>
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
                                    <div className="text-2xl font-bold">{highPriorityCount}</div>
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
                            Unread ({unreadCount})
                        </TabsTrigger>
                        <TabsTrigger value="high_priority">
                            Priority ({highPriorityCount})
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
