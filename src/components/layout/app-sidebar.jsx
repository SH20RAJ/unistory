"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Home,
    Grid3X3,
    MessageSquare,
    Calendar,
    Users,
    BookOpen,
    Heart,
    Shield,
    Trophy,
    Settings,
    Search,
    Bell,
    Plus
} from "lucide-react";

const sidebarItems = [
    {
        title: "Feed",
        href: "/dashboard",
        icon: Home,
        description: "Your personalized campus feed"
    },
    {
        title: "Apps",
        href: "/apps",
        icon: Grid3X3,
        description: "Discover all campus features"
    },
    {
        title: "Messages",
        href: "/messages",
        icon: MessageSquare,
        badge: "3",
        description: "Chat with friends"
    },
    {
        title: "Events",
        href: "/events",
        icon: Calendar,
        description: "Campus events and meetups"
    },
    {
        title: "Search",
        href: "/search",
        icon: Search,
        description: "Find people and content"
    },
    {
        title: "Create",
        href: "/create",
        icon: Plus,
        description: "Share your thoughts"
    }
];

const quickAccessItems = [
    {
        title: "Study Rooms",
        href: "/study",
        icon: BookOpen,
        description: "Join study sessions"
    },
    {
        title: "Confessions",
        href: "/confessions",
        icon: Shield,
        description: "Anonymous sharing"
    },
    {
        title: "Secret Crush",
        href: "/matches",
        icon: Heart,
        description: "Find your match"
    },
    {
        title: "Leaderboard",
        href: "/leaderboard",
        icon: Trophy,
        description: "Campus rankings"
    },
    {
        title: "Wellness",
        href: "/wellness",
        icon: Heart,
        description: "Mental health tracking"
    }
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            {/* Logo Section */}
            <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">U</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Unistory
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-3 py-4">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start h-10 px-3",
                                            isActive && "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                                        )}
                                    >
                                        <item.icon className="mr-3 h-4 w-4" />
                                        <span className="flex-1 text-left">{item.title}</span>
                                        {item.badge && (
                                            <Badge className="ml-auto bg-red-500 text-white text-xs">
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Quick Access Section */}
                    <div className="mt-8">
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Quick Access
                        </h3>
                        <div className="space-y-1">
                            {quickAccessItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.href} href={item.href}>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-start h-9 px-3 text-sm",
                                                isActive && "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                                            )}
                                        >
                                            <item.icon className="mr-3 h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                        <Users className="mr-3 h-4 w-4" />
                        Profile
                    </Button>
                </Link>
                <Link href="/notifications">
                    <Button variant="ghost" className="w-full justify-start">
                        <Bell className="mr-3 h-4 w-4" />
                        Notifications
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                    </Button>
                </Link>
            </div>
        </div>
    );
}
