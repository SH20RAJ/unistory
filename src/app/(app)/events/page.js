'use client';
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import { useEvents } from "@/hooks/useSWR";
import { useAuth } from "@/contexts/AuthContext";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { toast } from "sonner";
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Heart,
    Share2,
    Plus,
    Filter,
    Search,
    BookOpen,
    Coffee,
    Music,
    Gamepad2,
    GraduationCap,
    Briefcase,
    Dumbbell,
    Palette,
    Star,
    Ticket,
    MessageCircle,
    Bell,
    CheckCircle,
    Info,
    Camera,
    Tag,
    TrendingUp
} from "lucide-react";

const mockEvents = [
    {
        id: 1,
        title: 'Tech Career Fair 2025',
        description: 'Connect with top tech companies and explore internship and full-time opportunities. Representatives from Google, Apple, Microsoft, and 50+ other companies.',
        category: 'career',
        date: '2025-01-25',
        time: '10:00 AM - 4:00 PM',
        location: 'Main Auditorium',
        organizer: 'Career Services',
        organizerAvatar: 'CS',
        attendees: 234,
        interested: 567,
        price: 'Free',
        tags: ['networking', 'internships', 'career'],
        image: true,
        isGoing: false,
        isInterested: true,
        featured: true
    },
    {
        id: 2,
        title: 'Mental Health Awareness Workshop',
        description: 'Learn about stress management, mindfulness techniques, and campus mental health resources. Includes guided meditation and wellness activities.',
        category: 'wellness',
        date: '2025-01-22',
        time: '3:00 PM - 5:00 PM',
        location: 'Student Center, Room 201',
        organizer: 'Maya Rodriguez',
        organizerAvatar: 'MR',
        attendees: 67,
        interested: 123,
        price: 'Free',
        tags: ['mental health', 'wellness', 'meditation'],
        image: false,
        isGoing: true,
        isInterested: false,
        featured: false
    },
    {
        id: 3,
        title: 'CS Study Group - Algorithms',
        description: 'Weekly study session covering data structures and algorithms. Perfect for interview prep and understanding complex CS concepts.',
        category: 'academic',
        date: '2025-01-23',
        time: '7:00 PM - 9:00 PM',
        location: 'Library, Room 304',
        organizer: 'Alex Chen',
        organizerAvatar: 'AC',
        attendees: 12,
        interested: 28,
        price: 'Free',
        tags: ['study', 'algorithms', 'computer science'],
        image: false,
        isGoing: false,
        isInterested: false,
        featured: false,
        recurring: 'Weekly'
    },
    {
        id: 4,
        title: 'Spring Mixer - New Semester Party',
        description: 'Welcome back celebration with music, food, games, and a chance to meet new people! DJ, photo booth, and prize giveaways.',
        category: 'social',
        date: '2025-01-26',
        time: '8:00 PM - 12:00 AM',
        location: 'Campus Quad',
        organizer: 'Student Activities',
        organizerAvatar: 'SA',
        attendees: 189,
        interested: 456,
        price: '$10',
        tags: ['party', 'mixer', 'music', 'dancing'],
        image: true,
        isGoing: false,
        isInterested: true,
        featured: true
    },
    {
        id: 5,
        title: 'Startup Pitch Competition',
        description: 'Present your startup idea to a panel of judges including local entrepreneurs and VCs. Winner receives $5,000 in funding.',
        category: 'career',
        date: '2025-01-28',
        time: '1:00 PM - 5:00 PM',
        location: 'Business School Auditorium',
        organizer: 'Entrepreneurship Club',
        organizerAvatar: 'EC',
        attendees: 45,
        interested: 89,
        price: 'Free',
        tags: ['entrepreneurship', 'startups', 'competition'],
        image: true,
        isGoing: false,
        isInterested: false,
        featured: false
    },
    {
        id: 6,
        title: 'Art Exhibition Opening Night',
        description: 'Showcase of student artwork including paintings, sculptures, digital art, and photography. Wine and cheese reception included.',
        category: 'arts',
        date: '2025-01-24',
        time: '6:00 PM - 9:00 PM',
        location: 'Art Gallery',
        organizer: 'Fine Arts Department',
        organizerAvatar: 'FA',
        attendees: 78,
        interested: 134,
        price: 'Free',
        tags: ['art', 'exhibition', 'culture'],
        image: true,
        isGoing: false,
        isInterested: false,
        featured: false
    }
];

const categories = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'academic', label: 'Academic', icon: BookOpen },
    { value: 'social', label: 'Social', icon: Users },
    { value: 'career', label: 'Career', icon: Briefcase },
    { value: 'wellness', label: 'Wellness', icon: Heart },
    { value: 'arts', label: 'Arts & Culture', icon: Palette },
    { value: 'sports', label: 'Sports', icon: Dumbbell }
];

const EventCard = ({ event, onRSVP, onInterested }) => {
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'academic': return <BookOpen className="w-4 h-4" />;
            case 'social': return <Users className="w-4 h-4" />;
            case 'career': return <Briefcase className="w-4 h-4" />;
            case 'wellness': return <Heart className="w-4 h-4" />;
            case 'arts': return <Palette className="w-4 h-4" />;
            case 'sports': return <Dumbbell className="w-4 h-4" />;
            default: return <Calendar className="w-4 h-4" />;
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'academic': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'social': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
            case 'career': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
            case 'wellness': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/20';
            case 'arts': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
            case 'sports': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card className={`hover:shadow-lg transition-shadow ${event.featured ? 'ring-2 ring-blue-500' : ''}`}>
            {event.featured && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 rounded-t-lg">
                    <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Featured Event</span>
                    </div>
                </div>
            )}

            <CardHeader>
                {event.image && (
                    <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                        <div className="text-gray-500 flex items-center justify-center">
                            <Camera className="w-8 h-8 mr-2" />
                            Event Image Placeholder
                        </div>
                    </div>
                )}

                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getCategoryColor(event.category)}>
                                {getCategoryIcon(event.category)}
                                <span className="ml-1 capitalize">{event.category}</span>
                            </Badge>
                            {event.recurring && (
                                <Badge variant="outline" className="text-xs">
                                    {event.recurring}
                                </Badge>
                            )}
                        </div>

                        <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {event.description}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{event.time}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Ticket className="w-4 h-4 mr-2" />
                        <span className="font-medium">{event.price}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span>{event.attendees} going</span>
                        </div>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            <span>{event.interested} interested</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-blue-500 text-white text-xs">
                                {event.organizerAvatar}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-500">by {event.organizer}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        <Button
                            size="sm"
                            variant={event.isGoing ? "default" : "outline"}
                            onClick={() => onRSVP(event.id)}
                        >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {event.isGoing ? 'Going' : 'RSVP'}
                        </Button>

                        <Button
                            size="sm"
                            variant={event.isInterested ? "default" : "outline"}
                            onClick={() => onInterested(event.id)}
                        >
                            <Star className="w-4 h-4 mr-1" />
                            {event.isInterested ? 'Interested' : 'Interested'}
                        </Button>
                    </div>

                    <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                            <MessageCircle className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Events() {
    const { user } = useAuth();
    const { data: apiEvents, error, isLoading, mutate } = useEvents();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [userEventPreferences, setUserEventPreferences] = useState({
        going: new Set(),
        interested: new Set()
    });

    // Form state for event creation
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        date: '',
        time: '',
        location: '',
        tags: ''
    });

    const { submitForm, isSubmitting } = useFormSubmit({
        onSubmit: async (url, data) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit');
            }

            return response.json();
        }
    });

    // Transform API events data
    const events = useMemo(() => {
        if (!apiEvents) return [];

        return apiEvents.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            category: event.category,
            date: event.date,
            time: event.time,
            location: event.location,
            organizer: event.organizer,
            organizerAvatar: event.organizerAvatar || event.organizer?.substring(0, 2).toUpperCase(),
            attendees: event.attendees || 0,
            interested: event.interested || 0,
            price: event.price || 'Free',
            tags: event.tags ? JSON.parse(event.tags) : [],
            image: !!event.image,
            isGoing: userEventPreferences.going.has(event.id),
            isInterested: userEventPreferences.interested.has(event.id),
            featured: event.isFeatured || false,
            club: event.club,
            organizerUser: event.organizerUser
        }));
    }, [apiEvents, userEventPreferences]);

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [events, selectedCategory, searchQuery]);

    const featuredEvents = filteredEvents.filter(event => event.featured);
    const regularEvents = filteredEvents.filter(event => !event.featured);
    const myEvents = events.filter(event => event.isGoing);
    const interestedEvents = events.filter(event => event.isInterested);

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to create events');
            return;
        }

        const eventData = {
            ...formData,
            organizer: user.displayName || user.email,
            organizerAvatar: user.displayName?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase(),
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        };

        try {
            await submitForm('/api/events', eventData);
            toast.success('Event created successfully!');
            setShowCreateDialog(false);
            setFormData({
                title: '',
                description: '',
                category: '',
                price: '',
                date: '',
                time: '',
                location: '',
                tags: ''
            });
            // Refresh events data
            mutate();
        } catch (error) {
            toast.error(error.message || 'Failed to create event');
        }
    };

    const handleRSVP = (eventId) => {
        setUserEventPreferences(prev => {
            const newGoing = new Set(prev.going);
            const newInterested = new Set(prev.interested);

            if (newGoing.has(eventId)) {
                newGoing.delete(eventId);
            } else {
                newGoing.add(eventId);
                newInterested.delete(eventId); // Remove from interested if going
            }

            return { going: newGoing, interested: newInterested };
        });
    };

    const handleInterested = (eventId) => {
        setUserEventPreferences(prev => {
            const newInterested = new Set(prev.interested);

            if (newInterested.has(eventId)) {
                newInterested.delete(eventId);
            } else {
                newInterested.add(eventId);
            }

            return { ...prev, interested: newInterested };
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* <MainNavigation /> */}

            <div className="max-w-7xl  ">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Campus Events</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Discover and participate in campus activities
                        </p>
                    </div>

                    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Event
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Event</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreateEvent} className="space-y-4 py-4">
                                <div>
                                    <label className="text-sm font-medium">Event Title</label>
                                    <Input
                                        placeholder="Enter event title..."
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Description</label>
                                    <Textarea
                                        placeholder="Describe your event..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Category</label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.slice(1).map((category) => (
                                                    <SelectItem key={category.value} value={category.value}>
                                                        {category.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Price</label>
                                        <Input
                                            placeholder="Free or $X"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Date</label>
                                        <Input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Time</label>
                                        <Input
                                            placeholder="e.g., 2:00 PM - 4:00 PM"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Location</label>
                                    <Input
                                        placeholder="Event location..."
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Tags</label>
                                    <Input
                                        placeholder="Comma-separated tags..."
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowCreateDialog(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : 'Create Event'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Search */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search events..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <Button
                                            key={category.value}
                                            variant={selectedCategory === category.value ? "default" : "ghost"}
                                            className="w-full justify-start"
                                            onClick={() => setSelectedCategory(category.value)}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {category.label}
                                        </Button>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* My Events */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">My Events</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {myEvents.length > 0 ? (
                                    <div className="space-y-3">
                                        {myEvents.slice(0, 3).map((event) => (
                                            <div key={event.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <div className="font-medium text-sm">{event.title}</div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    {new Date(event.date).toLocaleDateString()} • {event.time.split(' - ')[0]}
                                                </div>
                                            </div>
                                        ))}
                                        {myEvents.length > 3 && (
                                            <Button variant="outline" size="sm" className="w-full">
                                                View All ({myEvents.length})
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No events yet</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Your Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Events Attended</span>
                                    <Badge variant="secondary">12</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Events Created</span>
                                    <Badge variant="secondary">3</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Following</span>
                                    <Badge variant="secondary">{interestedEvents.length}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="all">All Events</TabsTrigger>
                                <TabsTrigger value="going">Going ({myEvents.length})</TabsTrigger>
                                <TabsTrigger value="interested">Interested ({interestedEvents.length})</TabsTrigger>
                            </TabsList>

                            {/* Loading State */}
                            {isLoading && (
                                <div className="flex items-center justify-center py-12">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                                        <p className="text-muted-foreground">Loading events...</p>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {error && !isLoading && (
                                <div className="flex items-center justify-center py-12">
                                    <div className="text-center">
                                        <p className="text-muted-foreground mb-4">
                                            {error.message || 'Failed to load events'}
                                        </p>
                                        <Button onClick={() => mutate()} variant="outline">
                                            Try Again
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Content - only show when not loading and no error */}
                            {!isLoading && !error && (
                                <>
                                    <TabsContent value="all" className="space-y-6 mt-6">
                                        {/* Featured Events */}
                                        {featuredEvents.length > 0 && (
                                            <div>
                                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                                    <TrendingUp className="w-5 h-5 mr-2" />
                                                    Featured Events
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    {featuredEvents.map((event) => (
                                                        <EventCard
                                                            key={event.id}
                                                            event={event}
                                                            onRSVP={handleRSVP}
                                                            onInterested={handleInterested}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* All Events */}
                                        <div>
                                            <h2 className="text-xl font-semibold mb-4">
                                                {selectedCategory === 'all' ? 'All Events' : categories.find(c => c.value === selectedCategory)?.label}
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {regularEvents.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        event={event}
                                                        onRSVP={handleRSVP}
                                                        onInterested={handleInterested}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {filteredEvents.length === 0 && (
                                            <div className="text-center py-12">
                                                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-500 mb-2">No events found</h3>
                                                <p className="text-gray-400">Try adjusting your filters or search terms</p>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="going" className="space-y-6 mt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {myEvents.map((event) => (
                                                <EventCard
                                                    key={event.id}
                                                    event={event}
                                                    onRSVP={handleRSVP}
                                                    onInterested={handleInterested}
                                                />
                                            ))}
                                        </div>
                                        {myEvents.length === 0 && (
                                            <div className="text-center py-12">
                                                <CheckCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-500 mb-2">No events yet</h3>
                                                <p className="text-gray-400">RSVP to events to see them here</p>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="interested" className="space-y-6 mt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {interestedEvents.map((event) => (
                                                <EventCard
                                                    key={event.id}
                                                    event={event}
                                                    onRSVP={handleRSVP}
                                                    onInterested={handleInterested}
                                                />
                                            ))}
                                        </div>
                                        {interestedEvents.length === 0 && (
                                            <div className="text-center py-12">
                                                <Star className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-500 mb-2">No interested events</h3>
                                                <p className="text-gray-400">Mark events as interested to see them here</p>
                                            </div>
                                        )}
                                    </TabsContent>
                                </>
                            )}
                        </Tabs>
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
}
