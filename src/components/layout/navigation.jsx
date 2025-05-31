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

export function MainNavigation() {
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
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
            <div className="flex items-center justify-around py-2">
                <Link href="/dashboard" className="flex flex-col items-center p-2">
                    <MessageCircle className="w-6 h-6 text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Feed</span>
                </Link>

                <Link href="/apps" className="flex flex-col items-center p-2">
                    <Grid3X3 className="w-6 h-6 text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Apps</span>
                </Link>

                <Link href="/create" className="flex flex-col items-center p-2">
                    <PlusCircle className="w-6 h-6 text-blue-600" />
                    <span className="text-xs text-blue-600 mt-1">Create</span>
                </Link>

                <Link href="/messages" className="flex flex-col items-center p-2">
                    <MessageCircle className="w-6 h-6 text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Messages</span>
                </Link>

                <Link href="/profile" className="flex flex-col items-center p-2">
                    <User className="w-6 h-6 text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Profile</span>
                </Link>
            </div>
        </div>
    );
}
