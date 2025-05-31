"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCard, CircleList, CreateCircleForm } from "@/components/ui/circles";
import {
    Search,
    Globe,
    Compass,
    TrendingUp,
    Users,
    School,
    Plus
} from "lucide-react";

// Mock data for circles
const MOCK_CIRCLES = [
    {
        id: "circle1",
        name: "Computer Science Hub",
        description: "For CS students to discuss coursework, projects, and career opportunities.",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        memberCount: 1250,
        isPrivate: false,
        isMember: true,
        isMuted: false,
        category: "Academic",
        college: "Stanford University"
    },
    {
        id: "circle2",
        name: "Campus Photography Club",
        description: "Share your campus shots and photography techniques. Weekly challenges and contests.",
        coverImage: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
        memberCount: 743,
        isPrivate: false,
        isMember: false,
        isMuted: false,
        category: "Hobby",
        college: "Stanford University"
    },
    {
        id: "circle3",
        name: "Stanford Entrepreneurs",
        description: "For student entrepreneurs to connect, share ideas, and find co-founders.",
        coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
        memberCount: 892,
        isPrivate: true,
        isMember: true,
        isMuted: true,
        category: "Career",
        college: "Stanford University"
    },
    {
        id: "circle4",
        name: "Campus Mental Health Support",
        description: "A safe space for discussing mental health challenges and supporting each other.",
        coverImage: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=2070&auto=format&fit=crop",
        memberCount: 426,
        isPrivate: true,
        isMember: false,
        isMuted: false,
        category: "Wellness",
        college: "Stanford University"
    },
    {
        id: "circle5",
        name: "Stanford Gaming League",
        description: "For gamers to connect, organize tournaments, and discuss latest games.",
        coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1947&auto=format&fit=crop",
        memberCount: 1130,
        isPrivate: false,
        isMember: false,
        isMuted: false,
        category: "Entertainment",
        college: "Stanford University"
    },
    {
        id: "circle6",
        name: "International Students Association",
        description: "Support network for international students. Cultural events, visa help, and more.",
        coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
        memberCount: 567,
        isPrivate: false,
        isMember: true,
        isMuted: false,
        category: "Community",
        college: "Stanford University"
    },
];

// Mock data for categories
const CIRCLE_CATEGORIES = [
    "All", "Academic", "Career", "Hobby", "Entertainment", "Community", "Wellness", "Sports"
];

export default function CirclesPage() {
    const [circles, setCircles] = useState(MOCK_CIRCLES);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Filter circles based on search and category
    const filteredCircles = circles.filter(circle => {
        const matchesSearch = circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            circle.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || circle.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Split circles into my circles and discover
    const myCircles = filteredCircles.filter(circle => circle.isMember);
    const discoverCircles = filteredCircles.filter(circle => !circle.isMember);

    const handleCreateCircle = (circleData) => {
        // In a real app, you would send this to your API
        const newCircle = {
            id: `circle-${Date.now()}`,
            memberCount: 1, // Creator is the first member
            isMember: true,
            isMuted: false,
            ...circleData
        };

        setCircles([newCircle, ...circles]);
        setShowCreateForm(false);
    };

    return (
        <div className="container max-w-7xl py-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display tracking-tight">Circles</h1>
                    <p className="text-muted-foreground">Join communities of like-minded students</p>
                </div>

                <Button onClick={() => setShowCreateForm(true)} className="gap-2 self-start">
                    <Plus className="h-4 w-4" />
                    Create Circle
                </Button>
            </div>

            {showCreateForm && (
                <div className="rounded-lg border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Create a New Circle</h2>
                    <CreateCircleForm
                        onSubmit={handleCreateCircle}
                        onCancel={() => setShowCreateForm(false)}
                        categories={CIRCLE_CATEGORIES.filter(cat => cat !== "All")}
                    />
                </div>
            )}

            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search circles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            <div className="overflow-auto pb-2">
                <div className="flex gap-2">
                    {CIRCLE_CATEGORIES.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className="whitespace-nowrap"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <Tabs defaultValue="my-circles" className="space-y-6">
                <TabsList className="w-full grid grid-cols-2 max-w-md mx-auto">
                    <TabsTrigger value="my-circles" className="gap-2">
                        <Users className="h-4 w-4" />
                        <span>My Circles</span>
                        <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
                            {myCircles.length}
                        </span>
                    </TabsTrigger>
                    <TabsTrigger value="discover" className="gap-2">
                        <Compass className="h-4 w-4" />
                        <span>Discover</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="my-circles" className="space-y-6">
                    {myCircles.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                            <h3 className="mt-4 text-lg font-medium">No circles joined yet</h3>
                            <p className="text-muted-foreground mt-1">
                                Find and join circles that match your interests
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => document.querySelector('[value="discover"]').click()}
                            >
                                Discover Circles
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {myCircles.map((circle) => (
                                <Link href={`/circles/${circle.id}`} key={circle.id}>
                                    <CircleCard circle={circle} />
                                </Link>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="discover" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {discoverCircles.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <Compass className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                                <h3 className="mt-4 text-lg font-medium">No circles found</h3>
                                <p className="text-muted-foreground mt-1">
                                    Try changing your search or category filter
                                </p>
                            </div>
                        ) : (
                            discoverCircles.map((circle) => (
                                <Link href={`/circles/${circle.id}`} key={circle.id}>
                                    <CircleCard circle={circle} />
                                </Link>
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
