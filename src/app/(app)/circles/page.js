"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCard, CircleList, CreateCircleForm } from "@/components/circles";
import { useCircles } from "@/hooks/useSWR";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
    Search,
    Globe,
    Compass,
    TrendingUp,
    Users,
    School,
    Plus
} from "lucide-react";

// Mock data for categories
const CIRCLE_CATEGORIES = [
    "All", "Academic", "Career", "Hobby", "Entertainment", "Community", "Wellness", "Sports"
];

export default function CirclesPage() {
    const { user } = useAuth();
    const [circles, setCircles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Use SWR to fetch circles data
    const { data: circlesData, error: circlesError, isLoading: circlesLoading, mutate: mutateCircles } = useCircles();

    // Transform circles data when it changes
    useEffect(() => {
        if (circlesData) {
            // Transform API data to match component expectations
            const transformedCircles = circlesData.map(circle => ({
                id: circle.id,
                name: circle.name,
                description: circle.description || "No description available",
                coverImage: circle.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
                memberCount: parseInt(circle.memberCount) || 0,
                isPrivate: circle.isPrivate || false,
                isMember: false, // Could be enhanced with user-specific data
                isMuted: false,
                category: circle.category || "Academic",
                college: circle.college || "University",
                creator: circle.creator
            }));
            setCircles(transformedCircles);
        }
    }, [circlesData]);

    // Show error toast if circles fetch fails
    useEffect(() => {
        if (circlesError) {
            console.error('Error fetching circles:', circlesError);
            toast.error("Failed to load circles. Please try again later.");
        }
    }, [circlesError]);

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

    const handleCreateCircle = async (circleData) => {
        if (!user) {
            toast.error("You must be logged in to create a circle.");
            return;
        }

        try {
            const response = await fetch('/api/circles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...circleData,
                    creatorId: user.id,
                    university: user.university
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success("Circle created successfully!");
                setShowCreateForm(false);

                // Update the circles list with the new circle using SWR mutate
                mutateCircles();
            } else {
                toast.error(result.error || "Failed to create circle. Please try again.");
            }
        } catch (error) {
            console.error('Error creating circle:', error);
            toast.error("Something went wrong. Please try again.");
        }
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
                    {circlesLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-2 text-gray-500">Loading your circles...</p>
                        </div>
                    ) : myCircles.length === 0 ? (
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
                    {circlesLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-2 text-gray-500">Loading circles...</p>
                        </div>
                    ) : (
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
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
