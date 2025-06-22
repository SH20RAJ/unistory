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
    Plus,
    Gift,
    GraduationCap,
    UserCheck,
    Presentation
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
        title: "Create",
        href: "/create",
        icon: Plus,
        description: "Share your thoughts"
    }
];

const quickAccessItems = [
    {
        title: "Alumni Connect",
        href: "/alumni",
        icon: Users,
        description: "Anonymous sharing"
    }, 
    {
        title: "Courses",
        href: "/learning",
        icon: GraduationCap,
        description: "Educational courses"
    },{
        title: "Study Rooms",
        href: "/study",
        icon: BookOpen,
        description: "Join study sessions"
    },

    {
        title: "Secret Crush",
        href: "/matches",
        icon: Heart,
        description: "Find your match"
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
                    <span className="text-xl text-gray-900 dark:text-white font-bold font-display tracking-tight">
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
                                        variant={item.title === "Create" ? "default" : "ghost"}
                                        className={cn(
                                            "w-full justify-start h-10 px-3",
                                            item.title === "Create"
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : isActive && "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "mr-3 h-4 w-4",
                                            item.title === "Create" && "animate-pulse"
                                        )} />
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
                <Link href="/pitch">
                    <Button variant="ghost" className="w-full justify-start">
                        <Presentation className="mr-3 h-4 w-4" />
                        Investor Pitch
                    </Button>
                </Link>
                <a
                    href="https://discord.gg/sg9fGbD9"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="ghost" className="w-full justify-start">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                        </svg>
                        Discord Community
                    </Button>
                </a>
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
