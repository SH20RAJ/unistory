"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    Search,
    Bell,
    Settings,
    Heart,
    MessageCircle,
    Users,
    BookOpen,
    PlusCircle,
    User,
    Calendar,
    Grid3X3
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNavigation({ showOnlyIcons = false }) {
    if (showOnlyIcons) {
        return (
            <div className="flex items-center space-x-4">
                <ThemeToggle />

                <Link href="/notifications">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-5 h-5" />
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">
                            3
                        </Badge>
                    </Button>
                </Link>

                <Link href="/messages">
                    <Button variant="ghost" size="icon">
                        <MessageCircle className="w-5 h-5" />
                    </Button>
                </Link>

                <Link href="/profile">
                    <Button variant="ghost" size="icon">
                        <User className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">U</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            Unistory
                        </span>
                    </Link>

                    {/* Search */}
                    <div className="flex-1 max-w-lg mx-8">
                        <Link href="/search">
                            <div className="relative cursor-pointer">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search campus, people, or topics..."
                                    className="pl-10 bg-gray-100 dark:bg-gray-700 border-0 cursor-pointer"
                                    readOnly
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        <Link href="/notifications">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">
                                    3
                                </Badge>
                            </Button>
                        </Link>

                        <Link href="/messages">
                            <Button variant="ghost" size="icon">
                                <MessageCircle className="w-5 h-5" />
                            </Button>
                        </Link>

                        <Link href="/leaderboard">
                            <Button variant="ghost" size="icon">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </Link>

                        <Link href="/profile">
                            <Button variant="ghost" size="icon">
                                <User className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export function BottomNavigation() {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", icon: MessageCircle, label: "Feed" },
        { href: "/apps", icon: Grid3X3, label: "Apps" },
        { href: "/create", icon: PlusCircle, label: "Create", special: true },
        { href: "/messages", icon: MessageCircle, label: "Messages" },
        { href: "/profile", icon: User, label: "Profile" }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
            <div className="flex items-center justify-around py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isSpecial = item.special;

                    return (
                        <Link key={item.href} href={item.href} className="flex flex-col items-center p-2">
                            <Icon className={`w-6 h-6 ${isSpecial
                                    ? "text-blue-600"
                                    : isActive
                                        ? "text-blue-600"
                                        : "text-gray-600"
                                }`} />
                            <span className={`text-xs mt-1 ${isSpecial
                                    ? "text-blue-600"
                                    : isActive
                                        ? "text-blue-600"
                                        : "text-gray-600"
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
