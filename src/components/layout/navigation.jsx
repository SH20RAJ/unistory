"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    Grid3X3,
    X,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MainNavigation({ showOnlyIcons = false }) {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const { user, isAuthenticated, signOut } = useAuth();

    if (showOnlyIcons) {
        return (
            <div className="flex items-center space-x-4">
                {/* Desktop Search Bar */}
                <div className="hidden lg:block">
                    <div className={`relative transition-all duration-200 ${isSearchFocused ? "w-96" : "w-80"
                        }`}>
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${isSearchFocused ? "text-blue-500" : "text-gray-400"
                            }`} />
                        <Input
                            placeholder="Search campus, people, or topics..."
                            className={`pl-10 pr-4 bg-gray-50 dark:bg-gray-700 border rounded-full transition-all duration-200 ${isSearchFocused
                                ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md bg-white dark:bg-gray-600"
                                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                }`}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        {isSearchFocused && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Badge variant="secondary" className="text-xs px-2 py-1">
                                    ⌘K
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Icon for smaller screens */}
                <Link href="/search" className="lg:hidden">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Search className="w-5 h-5" />
                    </Button>
                </Link>

                <ThemeToggle />

                <Link href="/notifications">
                    <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Bell className="w-5 h-5" />
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-600 transition-colors">
                            3
                        </Badge>
                    </Button>
                </Link>

                <Link href="/messages">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MessageCircle className="w-5 h-5" />
                    </Button>
                </Link>

                {isAuthenticated ? (
                    <Link href="/profile">
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.image} alt={user?.name} />
                                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                        </Button>
                    </Link>
                ) : (
                    <Link href="/auth/signin">
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <User className="w-5 h-5" />
                        </Button>
                    </Link>
                )}
            </div>
        );
    }

    return (
        <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-lg">U</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white font-bold font-display tracking-tight">
                            Unistory
                        </span>
                    </Link>

                    {/* Mobile Actions */}
                    <div className="flex items-center space-x-2">
                        <Link href="/search">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Search className="w-5 h-5" />
                            </Button>
                        </Link>

                        <Link href="/notifications">
                            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Bell className="w-5 h-5" />
                                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                                    3
                                </Badge>
                            </Button>
                        </Link>

                        <Link href="/messages">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MessageCircle className="w-5 h-5" />
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
        { href: "/search", icon: Search, label: "Search" },
        { href: "/create", icon: PlusCircle, label: "Create", special: true },
        { href: "/apps", icon: Grid3X3, label: "Apps" },
        { href: "/profile", icon: User, label: "Profile" }
    ];

    const handleNavClick = (e) => {
        // Add subtle vibration on supported devices
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 md:hidden shadow-lg">
            <div className="flex items-center justify-around py-2 px-2 safe-area-pb-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isSpecial = item.special;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavClick}
                            className="flex flex-col items-center justify-center min-w-0 flex-1 py-2 group"
                        >
                            <div className={`relative p-2.5 rounded-2xl transition-all duration-300 transform group-active:scale-95 ${isSpecial
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg scale-110 shadow-blue-500/25"
                                : isActive
                                    ? "bg-blue-50 dark:bg-blue-900/50 scale-105 shadow-sm"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 group-active:bg-gray-200 dark:group-active:bg-gray-600"
                                }`}>
                                <Icon className={`w-5 h-5 transition-all duration-200 ${isSpecial
                                    ? "text-white drop-shadow-sm"
                                    : isActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                                    }`} />

                                {/* Active indicator with animation */}
                                {isActive && !isSpecial && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                                )}

                                {/* Special button glow effect */}
                                {isSpecial && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                )}
                            </div>

                            <span className={`text-xs mt-1.5 font-medium truncate transition-all duration-200 ${isSpecial
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : isActive
                                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                                    : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* iPhone-style home indicator with subtle animation */}
            <div className="flex justify-center pb-1">
                <div className="w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 hover:w-36"></div>
            </div>
        </div>
    );
}
