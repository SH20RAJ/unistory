"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Lock,
    Globe,
    UserPlus,
    Check,
    Bell,
    BellOff,
    MoreHorizontal,
    Calendar,
    FileText,
    Image,
    MessageSquare,
    Settings
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

/**
 * CircleCard Component
 * Displays a card for a circle (group) with basic information
 */
export function CircleCard({ circle, compact = false }) {
    const [joined, setJoined] = useState(circle.isMember);
    const [requesting, setRequesting] = useState(false);
    const [muted, setMuted] = useState(circle.isMuted);

    const handleJoin = (e) => {
        e.preventDefault();

        if (circle.isPrivate) {
            setRequesting(true);
        } else {
            setJoined(true);
        }
    };

    const handleToggleMute = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMuted(!muted);
    };

    if (compact) {
        return (
            <Link href={`/circles/${circle.id}`} className="block">
                <div className="circle-card flex items-center p-3 gap-3">
                    <div className="relative">
                        {circle.image ? (
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={circle.image} alt={circle.name} />
                                <AvatarFallback>{circle.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                {circle.name.charAt(0)}
                            </div>
                        )}
                        {circle.isPrivate && (
                            <div className="absolute -bottom-1 -right-1 bg-gray-100 dark:bg-gray-800 rounded-full p-0.5">
                                <Lock className="h-3 w-3 text-gray-500" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{circle.name}</div>
                        <div className="text-xs text-gray-500 truncate">
                            {circle.memberCount.toLocaleString()} members
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={handleToggleMute}
                    >
                        {muted ? (
                            <BellOff className="h-4 w-4 text-gray-500" />
                        ) : (
                            <Bell className="h-4 w-4 text-gray-500" />
                        )}
                    </Button>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/circles/${circle.id}`} className="block">
            <Card className="circle-card h-full overflow-hidden transition-all hover:shadow-md">
                {circle.coverImage && (
                    <div className="h-32 overflow-hidden">
                        <img
                            src={circle.coverImage}
                            alt={circle.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <CardHeader className={`${circle.coverImage ? 'pb-3' : 'pt-5'}`}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            {circle.image ? (
                                <Avatar className={`${circle.coverImage ? '-mt-8 border-4 border-white dark:border-gray-900' : ''} h-12 w-12`}>
                                    <AvatarImage src={circle.image} alt={circle.name} />
                                    <AvatarFallback>{circle.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className={`${circle.coverImage ? '-mt-8 border-4 border-white dark:border-gray-900' : ''} h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold`}>
                                    {circle.name.charAt(0)}
                                </div>
                            )}

                            <div>
                                <CardTitle className="text-lg">{circle.name}</CardTitle>
                                <CardDescription className="flex items-center mt-1">
                                    {circle.isPrivate ? (
                                        <Lock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                    ) : (
                                        <Globe className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                    )}
                                    {circle.memberCount.toLocaleString()} members
                                </CardDescription>
                            </div>
                        </div>

                        {joined && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={handleToggleMute}
                            >
                                {muted ? (
                                    <BellOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <Bell className="h-4 w-4 text-gray-500" />
                                )}
                            </Button>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {circle.description}
                    </p>

                    {circle.tags && (
                        <div className="mt-3 flex flex-wrap gap-1">
                            {circle.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {circle.members && circle.members.length > 0 && (
                        <div className="mt-4">
                            <div className="text-xs text-gray-500 mb-2">Members you may know</div>
                            <div className="flex -space-x-2">
                                {circle.members.slice(0, 5).map((member, index) => (
                                    <Avatar key={member.id} className="h-6 w-6 border-2 border-white dark:border-gray-900">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {circle.members.length > 5 && (
                                    <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-900">
                                        +{circle.members.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="pt-0">
                    {joined ? (
                        <div className="w-full grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="w-full">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Chat
                            </Button>
                            <Button variant="outline" size="sm" className="w-full">
                                <Settings className="h-4 w-4 mr-1" />
                                Settings
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className="w-full"
                            onClick={handleJoin}
                            disabled={requesting}
                        >
                            {requesting ? (
                                <>
                                    <Check className="h-4 w-4 mr-1.5" />
                                    Request Sent
                                </>
                            ) : (
                                <>
                                    <UserPlus className="h-4 w-4 mr-1.5" />
                                    {circle.isPrivate ? "Request to Join" : "Join Circle"}
                                </>
                            )}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
}

/**
 * CreateCircleForm Component
 * A form for creating a new circle
 */
export function CreateCircleForm({ onSubmit, onCancel, categories = [] }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [category, setCategory] = useState(categories[0] || 'Academic');
    const [coverImage, setCoverImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simple validation
        if (!name.trim() || !description.trim()) {
            alert("Please fill out all required fields");
            setIsSubmitting(false);
            return;
        }

        // In a real app, you would upload the image
        const circleData = {
            name,
            description,
            isPrivate,
            category,
            coverImage: coverImage || `https://api.dicebear.com/7.x/shapes/svg?seed=${name}`,
        };

        onSubmit(circleData);
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Circle Name*</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Computer Science Hub"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this circle about? Who is it for?"
                    required
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="privacy">Privacy</Label>
                    <Select
                        value={isPrivate ? "private" : "public"}
                        onValueChange={(val) => setIsPrivate(val === "private")}
                    >
                        <SelectTrigger id="privacy">
                            <SelectValue placeholder="Select privacy" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    <span>Public</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="private">
                                <div className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    <span>Private</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                        {isPrivate
                            ? "Only approved members can see content"
                            : "Anyone can find and join this circle"
                        }
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                <Input
                    id="coverImage"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                    Leave empty to use a generated cover image
                </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Circle"
                    )}
                </Button>
            </div>
        </form>
    );
}

/**
 * CircleList Component
 * Displays a list of circles with optional filters
 */
export function CircleList({
    circles,
    category = "all",
    layout = "grid",
    limit = 6,
    showDescription = true
}) {
    const filteredCircles = circles.filter(circle => {
        if (category === "all") return true;
        return circle.category.toLowerCase() === category.toLowerCase();
    }).slice(0, limit);

    if (layout === "grid") {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCircles.map(circle => (
                    <Link href={`/circles/${circle.id}`} key={circle.id}>
                        <CircleCard circle={circle} />
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {filteredCircles.map(circle => (
                <Link href={`/circles/${circle.id}`} key={circle.id}>
                    <CircleCard circle={circle} compact={!showDescription} />
                </Link>
            ))}
        </div>
    );
}

/**
 * CircleMember Component
 * Displays a single member of a circle
 */
export function CircleMember({ member, isAdmin = false, isOwner = false }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
                <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                    <div className="font-medium flex items-center">
                        {member.name}
                        {member.isVerified && (
                            <span className="ml-1 text-blue-500 text-xs">✓</span>
                        )}
                    </div>
                    <div className="text-xs text-gray-500">
                        {isOwner && "Owner"}
                        {isAdmin && !isOwner && "Admin"}
                        {!isAdmin && !isOwner && member.college}
                    </div>
                </div>
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
    );
}

/**
 * CircleContent Component
 * Display circle content (posts, events, files, etc)
 */
export function CircleContent({ activeTab = "posts", posts = [], events = [], files = [] }) {
    if (activeTab === "posts" && posts.length === 0) {
        return (
            <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700" />
                <h3 className="mt-4 text-lg font-medium">No posts yet</h3>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                    Be the first to share something with this circle!
                </p>
                <Button className="mt-4">
                    Create Post
                </Button>
            </div>
        );
    }

    if (activeTab === "events" && events.length === 0) {
        return (
            <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700" />
                <h3 className="mt-4 text-lg font-medium">No upcoming events</h3>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                    Schedule an event for this circle to get together!
                </p>
                <Button className="mt-4">
                    Create Event
                </Button>
            </div>
        );
    }

    if (activeTab === "files" && files.length === 0) {
        return (
            <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700" />
                <h3 className="mt-4 text-lg font-medium">No files shared</h3>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                    Share documents, photos, or other files with the circle.
                </p>
                <Button className="mt-4">
                    Upload Files
                </Button>
            </div>
        );
    }

    if (activeTab === "media") {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2">
                {Array(12).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden"
                    >
                        <img
                            src={`https://source.unsplash.com/random/300x300?sig=${i}`}
                            alt="Media"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        );
    }

    return null;
}
