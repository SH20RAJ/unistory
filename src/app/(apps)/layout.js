"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Menu,
    X,
    Home,
    MessageSquare,
    Heart,
    Calendar,
    Users,
    BookOpen,
    ShoppingBag,
    Newspaper,
    Coffee,
    Gamepad2,
    Sparkles,
    Shield,
    NotebookPen,
    Car,
    MapPin,
    Gift,
    Search
} from "lucide-react";

// App definitions with their routes and metadata
const appRoutes = {
    "/flirt-zone": {
        name: "Flirt Zone",
        icon: Heart,
        color: "from-pink-500 to-red-500",
        category: "Dating"
    },
    "/hot-not-swiping": {
        name: "Hot/Not Swiping",
        icon: Sparkles,
        color: "from-purple-500 to-pink-500",
        category: "Dating"
    },
    "/matchme-ai": {
        name: "MatchMe AI",
        icon: Heart,
        color: "from-blue-500 to-purple-500",
        category: "Dating"
    },
    "/virtual-date-ideas": {
        name: "Virtual Date Ideas",
        icon: Coffee,
        color: "from-orange-500 to-red-500",
        category: "Dating"
    },
    "/couple-of-the-week": {
        name: "Couple of the Week",
        icon: Heart,
        color: "from-pink-500 to-purple-500",
        category: "Dating"
    },
    "/buy-sell": {
        name: "Buy & Sell",
        icon: ShoppingBag,
        color: "from-green-500 to-blue-500",
        category: "Marketplace"
    },
    "/newsroom": {
        name: "Newsroom",
        icon: Newspaper,
        color: "from-blue-500 to-indigo-500",
        category: "News"
    },
    "/class-routine": {
        name: "Class Routine",
        icon: Calendar,
        color: "from-indigo-500 to-purple-500",
        category: "Academic"
    },
    "/journal": {
        name: "Journal",
        icon: NotebookPen,
        color: "from-purple-500 to-pink-500",
        category: "Wellness"
    },
    "/confessions": {
        name: "Confessions",
        icon: Shield,
        color: "from-gray-600 to-gray-800",
        category: "Social"
    },
    "/resources": {
        name: "Resources",
        icon: BookOpen,
        color: "from-blue-500 to-green-500",
        category: "Academic"
    },
    "/wellness": {
        name: "Wellness",
        icon: Heart,
        color: "from-green-500 to-teal-500",
        category: "Wellness"
    }
};

const AppHeader = ({ currentApp, onMenuToggle, isMenuOpen }) => {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                {/* Left: Back button */}
                <div className="flex items-center space-x-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>

                    {currentApp && (
                        <div className="hidden sm:flex items-center space-x-2">
                            <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                            <Badge variant="secondary" className="text-xs">
                                {currentApp.category}
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Center: App title with icon */}
                {currentApp && (
                    <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${currentApp.color} flex items-center justify-center`}>
                            <currentApp.icon className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {currentApp.name}
                        </h1>
                    </div>
                )}

                {/* Right: Menu button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMenuToggle}
                    className="flex items-center space-x-2"
                >
                    {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    <span className="hidden sm:inline">
                        {isMenuOpen ? "Close" : "Apps"}
                    </span>
                </Button>
            </div>
        </header>
    );
};

const AppMenu = ({ isOpen, onClose, currentPath }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const categories = {
        "Dating": ["flirt-zone", "hot-not-swiping", "matchme-ai", "virtual-date-ideas", "couple-of-the-week"],
        "Academic": ["class-routine", "resources"],
        "Social": ["confessions"],
        "Marketplace": ["buy-sell"],
        "News": ["newsroom"],
        "Wellness": ["journal", "wellness"]
    };

    const handleAppClick = (route) => {
        router.push(route);
        onClose();
    };

    // Filter apps based on search
    const filteredCategories = Object.entries(categories).reduce((acc, [category, apps]) => {
        const filteredApps = apps.filter(appKey => {
            const route = `/${appKey}`;
            const app = appRoutes[route];
            if (!app) return false;

            return app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.toLowerCase().includes(searchQuery.toLowerCase());
        });

        if (filteredApps.length > 0) {
            acc[category] = filteredApps;
        }
        return acc;
    }, {});

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 lg:relative lg:inset-auto">
            {/* Mobile overlay */}
            <div
                className="fixed inset-0 bg-black/50 lg:hidden"
                onClick={onClose}
            />

            {/* Menu content */}
            <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 lg:relative lg:w-full lg:h-auto lg:border-0 lg:bg-transparent lg:dark:bg-transparent">
                <div className="p-6 space-y-6 lg:p-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 text-sm"
                        />
                    </div>

                    {/* Quick actions */}
                    <div className="lg:hidden">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.push("/apps");
                                    onClose();
                                }}
                                className="flex items-center space-x-2"
                            >
                                <Home className="w-4 h-4" />
                                <span>All Apps</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.push("/dashboard");
                                    onClose();
                                }}
                                className="flex items-center space-x-2"
                            >
                                <Users className="w-4 h-4" />
                                <span>Dashboard</span>
                            </Button>
                        </div>
                    </div>                    {/* App categories */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {searchQuery ? "Search Results" : "Other Apps"}
                        </h3>
                        {Object.keys(filteredCategories).length > 0 ? (
                            Object.entries(filteredCategories).map(([category, apps]) => (
                                <div key={category} className="space-y-2">
                                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        {category}
                                    </h4>
                                    <div className="space-y-1">
                                        {apps.map((appKey) => {
                                            const route = `/${appKey}`;
                                            const app = appRoutes[route];
                                            const isActive = currentPath === route;

                                            if (!app) return null;

                                            return (
                                                <button
                                                    key={appKey}
                                                    onClick={() => handleAppClick(route)}
                                                    className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors ${isActive
                                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                        }`}
                                                >
                                                    <div className={`w-6 h-6 rounded-md bg-gradient-to-r ${app.color} flex items-center justify-center flex-shrink-0`}>
                                                        <app.icon className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-sm font-medium">{app.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : searchQuery ? (
                            <div className="text-center py-8">
                                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">No apps found</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AppBreadcrumb = ({ currentApp }) => {
    const router = useRouter();

    if (!currentApp) return null;

    return (
        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center space-x-2 text-sm">
                    <button
                        onClick={() => router.push("/apps")}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                        Apps
                    </button>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-500 dark:text-gray-400">{currentApp.category}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 dark:text-white font-medium">{currentApp.name}</span>
                </nav>
            </div>
        </div>
    );
};

export default function AppsLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    // Get current app info
    const currentApp = appRoutes[pathname] || null;

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* App Header */}
            <AppHeader
                currentApp={currentApp}
                onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}
            />

            {/* Breadcrumb (Desktop only) */}
            <div className="hidden lg:block">
                <AppBreadcrumb currentApp={currentApp} />
            </div>

            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 h-[calc(100vh-64px)] sticky top-16 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
                    <AppMenu
                        isOpen={true}
                        onClose={() => { }}
                        currentPath={pathname}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <main className="p-2 lg:p-0 max-w-7xl mx-auto">
                        <div className="space-y-6">
                            {children}
                        </div>
                    </main>
                </div>

                {/* Mobile Menu */}
                <AppMenu
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    currentPath={pathname}
                />
            </div>
        </div>
    );
}
