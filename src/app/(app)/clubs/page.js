"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Users,
    Star,
    Calendar,
    MapPin,
    Search,
    Filter,
    Plus,
    Heart,
    MessageCircle,
    Share2,
    Globe,
    Instagram,
    Twitter,
    Mail,
    ExternalLink,
    Award,
    TrendingUp,
    Clock,
    UserPlus
} from "lucide-react";

const mockClubs = [
    {
        id: 1,
        name: "Robotics Society",
        description: "Building the future through innovative robotics projects and competitions",
        category: "Technology",
        members: 156,
        rating: 4.8,
        image: "🤖",
        isJoined: false,
        nextEvent: "Robot Building Workshop",
        eventDate: "March 15, 2024",
        location: "Engineering Lab B",
        tags: ["Engineering", "Innovation", "Competition"],
        president: "Alex Zhang",
        founded: "2018",
        achievements: ["1st Place Regional Competition 2023", "Best Innovation Award 2022"],
        social: {
            website: "robotics.university.edu",
            instagram: "@unirobotics",
            email: "robotics@university.edu"
        },
        recentActivity: [
            "Posted new project guidelines",
            "Announced competition team selections",
            "Shared workshop materials"
        ]
    },
    {
        id: 2,
        name: "Photography Club",
        description: "Capturing campus life and exploring creative photography techniques together",
        category: "Arts",
        members: 89,
        rating: 4.6,
        image: "📸",
        isJoined: true,
        nextEvent: "Golden Hour Campus Shoot",
        eventDate: "March 12, 2024",
        location: "Main Quad",
        tags: ["Photography", "Creative", "Social"],
        president: "Maria Santos",
        founded: "2015",
        achievements: ["Featured in Campus Magazine", "Annual Exhibition Winner"],
        social: {
            website: "photography.university.edu",
            instagram: "@uniphoto",
            email: "photo@university.edu"
        },
        recentActivity: [
            "Shared weekly photo challenge",
            "Posted event photos from last meetup",
            "Announced new member orientation"
        ]
    },
    {
        id: 3,
        name: "Debate Society",
        description: "Developing critical thinking and public speaking through competitive debate",
        category: "Academic",
        members: 67,
        rating: 4.9,
        image: "🎭",
        isJoined: false,
        nextEvent: "Inter-University Debate Tournament",
        eventDate: "March 20, 2024",
        location: "Auditorium A",
        tags: ["Public Speaking", "Critical Thinking", "Competition"],
        president: "Jordan Mitchell",
        founded: "2010",
        achievements: ["National Championship 2023", "Best Speaker Awards"],
        social: {
            website: "debate.university.edu",
            email: "debate@university.edu"
        },
        recentActivity: [
            "Announced tournament schedule",
            "Posted practice session notes",
            "Shared debate topic for next week"
        ]
    },
    {
        id: 4,
        name: "Mental Health Awareness",
        description: "Supporting student wellbeing through awareness, resources, and community",
        category: "Wellness",
        members: 234,
        rating: 4.7,
        image: "💙",
        isJoined: true,
        nextEvent: "Mindfulness Workshop",
        eventDate: "March 14, 2024",
        location: "Student Center",
        tags: ["Wellness", "Support", "Community"],
        president: "Emma Rodriguez",
        founded: "2019",
        achievements: ["Campus Wellness Award", "500+ Students Helped"],
        social: {
            website: "wellness.university.edu",
            instagram: "@uniwellness",
            email: "wellness@university.edu"
        },
        recentActivity: [
            "Shared mental health resources",
            "Posted peer support group schedule",
            "Announced new counselor partnership"
        ]
    },
    {
        id: 5,
        name: "Gaming Community",
        description: "Connecting gamers across campus for tournaments, events, and casual play",
        category: "Entertainment",
        members: 312,
        rating: 4.5,
        image: "🎮",
        isJoined: false,
        nextEvent: "Esports Tournament Finals",
        eventDate: "March 18, 2024",
        location: "Gaming Lounge",
        tags: ["Gaming", "Esports", "Social"],
        president: "Tyler Chen",
        founded: "2017",
        achievements: ["Regional Esports Champions", "Largest Club Membership"],
        social: {
            website: "gaming.university.edu",
            instagram: "@unigaming",
            twitter: "@unigaming",
            email: "gaming@university.edu"
        },
        recentActivity: [
            "Posted tournament bracket",
            "Shared new game night schedule",
            "Announced streaming setup tutorial"
        ]
    },
    {
        id: 6,
        name: "Environmental Action",
        description: "Creating sustainable change on campus and in our community",
        category: "Environment",
        members: 145,
        rating: 4.8,
        image: "🌱",
        isJoined: false,
        nextEvent: "Campus Cleanup Day",
        eventDate: "March 16, 2024",
        location: "Campus Grounds",
        tags: ["Sustainability", "Activism", "Community Service"],
        president: "Sam Green",
        founded: "2014",
        achievements: ["Reduced Campus Waste 40%", "Solar Panel Installation"],
        social: {
            website: "green.university.edu",
            instagram: "@unigreen",
            email: "green@university.edu"
        },
        recentActivity: [
            "Shared recycling program update",
            "Posted Earth Day event plans",
            "Announced partnership with local farms"
        ]
    }
];

const categories = ["All", "Technology", "Arts", "Academic", "Wellness", "Entertainment", "Environment", "Sports", "Culture"];

const ClubCard = ({ club, onJoin, onViewDetails }) => {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="text-4xl">{club.image}</div>
                        <div className="flex-1">
                            <CardTitle className="text-lg">{club.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">{club.category}</Badge>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600">{club.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant={club.isJoined ? "secondary" : "default"}
                        size="sm"
                        onClick={() => onJoin(club.id)}
                    >
                        {club.isJoined ? "Joined" : "Join"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className="mb-4">{club.description}</CardDescription>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>{club.members} members</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>Founded {club.founded}</span>
                        </div>
                    </div>

                    {club.nextEvent && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <div>
                                    <div className="font-medium">{club.nextEvent}</div>
                                    <div className="text-xs text-gray-600">{club.eventDate} • {club.location}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                        {club.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-4">
                <Button variant="outline" size="sm" onClick={() => onViewDetails(club)}>
                    View Details
                </Button>
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                        <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const ClubDetailsDialog = ({ club, isOpen, onClose, onJoin }) => {
    if (!club) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center space-x-3">
                        <div className="text-5xl">{club.image}</div>
                        <div>
                            <DialogTitle className="text-xl">{club.name}</DialogTitle>
                            <DialogDescription className="mt-1">
                                Led by {club.president} • {club.members} members
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2">About</h4>
                        <p className="text-gray-600 dark:text-gray-300">{club.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-semibold">Details</h4>
                            <div className="space-y-1 text-sm">
                                <div>Category: {club.category}</div>
                                <div>Founded: {club.founded}</div>
                                <div>Members: {club.members}</div>
                                <div>Rating: ⭐ {club.rating}/5</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold">Connect</h4>
                            <div className="space-y-2">
                                {club.social.website && (
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                        <Globe className="w-4 h-4 mr-2" />
                                        Website
                                    </Button>
                                )}
                                {club.social.instagram && (
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                        <Instagram className="w-4 h-4 mr-2" />
                                        Instagram
                                    </Button>
                                )}
                                {club.social.email && (
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {club.nextEvent && (
                        <div>
                            <h4 className="font-semibold mb-2">Upcoming Event</h4>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    <div className="font-medium">{club.nextEvent}</div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    📅 {club.eventDate}
                                </div>
                                <div className="text-sm text-gray-600">
                                    📍 {club.location}
                                </div>
                                <Button size="sm" className="mt-3">
                                    RSVP for Event
                                </Button>
                            </div>
                        </div>
                    )}

                    <div>
                        <h4 className="font-semibold mb-2">Achievements</h4>
                        <div className="space-y-2">
                            {club.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                    <Award className="w-4 h-4 text-yellow-500" />
                                    <span>{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Recent Activity</h4>
                        <div className="space-y-2">
                            {club.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>{activity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button
                            className="flex-1"
                            onClick={() => onJoin(club.id)}
                            variant={club.isJoined ? "secondary" : "default"}
                        >
                            {club.isJoined ? "✓ Joined" : "Join Club"}
                        </Button>
                        <Button variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default function ClubsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClub, setSelectedClub] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [clubs, setClubs] = useState(mockClubs);

    const filteredClubs = clubs.filter(club => {
        const matchesCategory = selectedCategory === "All" || club.category === selectedCategory;
        const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const handleJoinClub = (clubId) => {
        setClubs(clubs.map(club =>
            club.id === clubId
                ? { ...club, isJoined: !club.isJoined, members: club.isJoined ? club.members - 1 : club.members + 1 }
                : club
        ));
    };

    const handleViewDetails = (club) => {
        setSelectedClub(club);
        setIsDetailsOpen(true);
    };

    const joinedClubs = clubs.filter(club => club.isJoined);
    const recommendedClubs = clubs.filter(club => !club.isJoined).slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MainNavigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Campus Clubs & Societies
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Join communities, make friends, and pursue your passions
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search clubs, activities, or interests..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Club
                        </Button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
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

                <Tabs defaultValue="explore" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="explore">Explore</TabsTrigger>
                        <TabsTrigger value="joined">My Clubs ({joinedClubs.length})</TabsTrigger>
                        <TabsTrigger value="recommended">Recommended</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>

                    <TabsContent value="explore" className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5 text-blue-500" />
                                        <div>
                                            <div className="text-2xl font-bold">{clubs.length}</div>
                                            <div className="text-sm text-gray-600">Active Clubs</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-green-500" />
                                        <div>
                                            <div className="text-2xl font-bold">24</div>
                                            <div className="text-sm text-gray-600">Events This Week</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center space-x-2">
                                        <UserPlus className="w-5 h-5 text-purple-500" />
                                        <div>
                                            <div className="text-2xl font-bold">89</div>
                                            <div className="text-sm text-gray-600">New Members This Month</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="w-5 h-5 text-orange-500" />
                                        <div>
                                            <div className="text-2xl font-bold">12</div>
                                            <div className="text-sm text-gray-600">Growing Fast</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Clubs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredClubs.map((club) => (
                                <ClubCard
                                    key={club.id}
                                    club={club}
                                    onJoin={handleJoinClub}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>

                        {filteredClubs.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-4xl mb-4">🔍</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    No clubs found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Try adjusting your search or filters
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="joined">
                        <div className="space-y-6">
                            {joinedClubs.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {joinedClubs.map((club) => (
                                        <ClubCard
                                            key={club.id}
                                            club={club}
                                            onJoin={handleJoinClub}
                                            onViewDetails={handleViewDetails}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-4xl mb-4">👥</div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        No clubs joined yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Explore clubs and find communities that match your interests
                                    </p>
                                    <Button>Explore Clubs</Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="recommended">
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Recommended for You
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Based on your interests and activity
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommendedClubs.map((club) => (
                                    <ClubCard
                                        key={club.id}
                                        club={club}
                                        onJoin={handleJoinClub}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="events">
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Upcoming Club Events
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Don't miss out on exciting activities happening around campus
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {clubs.filter(club => club.nextEvent).map((club) => (
                                    <Card key={club.id}>
                                        <CardHeader>
                                            <div className="flex items-center space-x-3">
                                                <div className="text-3xl">{club.image}</div>
                                                <div>
                                                    <CardTitle className="text-lg">{club.nextEvent}</CardTitle>
                                                    <CardDescription>Hosted by {club.name}</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <Calendar className="w-4 h-4 text-gray-500" />
                                                    <span>{club.eventDate}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    <span>{club.location}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">RSVP</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <ClubDetailsDialog
                club={selectedClub}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                onJoin={handleJoinClub}
            />

            <BottomNavigation />
        </div>
    );
}
