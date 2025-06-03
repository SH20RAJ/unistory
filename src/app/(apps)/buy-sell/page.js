"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ShoppingBag,
    Search,
    Filter,
    Heart,
    MessageCircle,
    Share2,
    MapPin,
    Clock,
    Star,
    DollarSign,
    BookOpen,
    Laptop,
    Smartphone,
    Shirt,
    Home,
    Car,
    Plus,
    Grid3X3,
    List,
    TrendingUp,
    Eye,
    Users,
    Package,
    AlertCircle,
    CheckCircle
} from "lucide-react";

// Mock data for marketplace items
const mockItems = [
    {
        id: 1,
        title: "MacBook Pro 13-inch M2 (2022)",
        description: "Excellent condition MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Used for light coding and design work. Includes original charger and box.",
        price: 1200,
        originalPrice: 1599,
        category: "Electronics",
        condition: "Like New",
        seller: {
            name: "Sarah Chen",
            avatar: "/api/placeholder/40/40",
            rating: 4.9,
            verified: true
        },
        images: ["/api/placeholder/300/200"],
        location: "East Dorm",
        postedAt: "2 hours ago",
        views: 87,
        likes: 23,
        saved: false,
        featured: true,
        tags: ["MacBook", "Apple", "M2", "Laptop"]
    },
    {
        id: 2,
        title: "Calculus & Linear Algebra Textbook Bundle",
        description: "Complete set of math textbooks for first-year engineering. Includes solutions manual. Some highlighting but all pages intact.",
        price: 120,
        originalPrice: 280,
        category: "Books",
        condition: "Good",
        seller: {
            name: "Mike Johnson",
            avatar: "/api/placeholder/40/40",
            rating: 4.7,
            verified: true
        },
        images: ["/api/placeholder/300/200"],
        location: "Science Building",
        postedAt: "5 hours ago",
        views: 45,
        likes: 12,
        saved: false,
        featured: false,
        tags: ["Textbook", "Math", "Engineering", "Calculus"]
    },
    {
        id: 3,
        title: "iPhone 14 Pro - Space Black 128GB",
        description: "Mint condition iPhone 14 Pro with screen protector and case since day one. Battery health 98%. Upgrading to iPhone 15.",
        price: 850,
        originalPrice: 999,
        category: "Electronics",
        condition: "Excellent",
        seller: {
            name: "Alex Rodriguez",
            avatar: "/api/placeholder/40/40",
            rating: 4.8,
            verified: true
        },
        images: ["/api/placeholder/300/200"],
        location: "West Campus",
        postedAt: "1 day ago",
        views: 156,
        likes: 34,
        saved: false,
        featured: true,
        tags: ["iPhone", "Apple", "Smartphone", "Pro"]
    },
    {
        id: 4,
        title: "Mini Fridge - Perfect for Dorm Room",
        description: "Compact refrigerator ideal for dorm life. Energy efficient, quiet operation. Great for drinks and snacks. Moving out sale!",
        price: 80,
        originalPrice: 150,
        category: "Furniture",
        condition: "Good",
        seller: {
            name: "Emma Davis",
            avatar: "/api/placeholder/40/40",
            rating: 4.6,
            verified: false
        },
        images: ["/api/placeholder/300/200"],
        location: "North Dorm",
        postedAt: "2 days ago",
        views: 78,
        likes: 15,
        saved: false,
        featured: false,
        tags: ["Fridge", "Dorm", "Appliance", "Compact"]
    },
    {
        id: 5,
        title: "Nike Air Force 1 - Size 10.5 White",
        description: "Classic white Air Force 1s in great condition. Worn only a few times. Perfect for campus life. No box but authentic.",
        price: 65,
        originalPrice: 110,
        category: "Clothing",
        condition: "Very Good",
        seller: {
            name: "Jordan Lee",
            avatar: "/api/placeholder/40/40",
            rating: 4.5,
            verified: true
        },
        images: ["/api/placeholder/300/200"],
        location: "Sports Center",
        postedAt: "3 days ago",
        views: 92,
        likes: 28,
        saved: false,
        featured: false,
        tags: ["Nike", "Shoes", "Sneakers", "White"]
    },
    {
        id: 6,
        title: "Gaming Setup: Monitor + Keyboard + Mouse",
        description: "Complete gaming peripherals bundle. 24-inch 144Hz monitor, mechanical keyboard (Cherry MX Blue), gaming mouse. Great for CS students!",
        price: 320,
        originalPrice: 450,
        category: "Electronics",
        condition: "Very Good",
        seller: {
            name: "Ryan Patel",
            avatar: "/api/placeholder/40/40",
            rating: 4.9,
            verified: true
        },
        images: ["/api/placeholder/300/200"],
        location: "Tech Building",
        postedAt: "4 days ago",
        views: 203,
        likes: 56,
        saved: false,
        featured: true,
        tags: ["Gaming", "Monitor", "Keyboard", "Mouse", "Setup"]
    }
];

const categories = [
    { name: "All", icon: Grid3X3, count: mockItems.length },
    { name: "Electronics", icon: Laptop, count: 3 },
    { name: "Books", icon: BookOpen, count: 1 },
    { name: "Clothing", icon: Shirt, count: 1 },
    { name: "Furniture", icon: Home, count: 1 },
    { name: "Other", icon: Package, count: 0 }
];

const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" }
];

const ProductCard = ({ item, viewMode = "grid" }) => {
    const [liked, setLiked] = useState(item.saved);
    const [isHovered, setIsHovered] = useState(false);

    const discountPercent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

    if (viewMode === "list") {
        return (
            <Card 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CardContent className="p-4">
                    <div className="flex space-x-4">
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <img 
                                src={item.images[0]} 
                                alt={item.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            {item.featured && (
                                <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                                    Featured
                                </Badge>
                            )}
                            {discountPercent > 0 && (
                                <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                                    -{discountPercent}%
                                </Badge>
                            )}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLiked(!liked);
                                    }}
                                    className={liked ? "text-red-500" : "text-gray-400"}
                                >
                                    <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                                </Button>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                {item.description}
                            </p>
                            
                            <div className="flex items-center space-x-2">
                                <Badge variant="outline">{item.category}</Badge>
                                <Badge variant="secondary">{item.condition}</Badge>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl font-bold text-green-600">${item.price}</span>
                                        {item.originalPrice > item.price && (
                                            <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{item.views}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Heart className="w-4 h-4" />
                                            <span>{item.likes}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-right space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={item.seller.avatar} />
                                            <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium flex items-center space-x-1">
                                                <span>{item.seller.name}</span>
                                                {item.seller.verified && (
                                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                                )}
                                            </p>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                <span className="text-xs text-gray-500">{item.seller.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button size="sm" className="w-full">
                                        Contact Seller
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                {item.featured && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                        Featured
                    </Badge>
                )}
                {discountPercent > 0 && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                        -{discountPercent}%
                    </Badge>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked(!liked);
                    }}
                    className={`absolute bottom-3 right-3 ${liked ? "text-red-500 bg-white" : "text-gray-400 bg-white"} opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                    <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                </Button>
            </div>
            
            <CardContent className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold hover:text-blue-600 transition-colors line-clamp-1">
                        {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mt-1">
                        {item.description}
                    </p>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    <Badge variant="secondary" className="text-xs">{item.condition}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-green-600">${item.price}</span>
                            {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            )}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{item.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Heart className="w-3 h-3" />
                                <span>{item.likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={item.seller.avatar} />
                            <AvatarFallback className="text-xs">{item.seller.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xs font-medium flex items-center space-x-1">
                                <span>{item.seller.name.split(' ')[0]}</span>
                                {item.seller.verified && (
                                    <CheckCircle className="w-3 h-3 text-blue-500" />
                                )}
                            </p>
                            <div className="flex items-center space-x-1">
                                <Star className="w-2 h-2 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-500">{item.seller.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                    </div>
                </div>
                
                <Button size="sm" className="w-full mt-2">
                    Contact Seller
                </Button>
            </CardContent>
        </Card>
    );
};

export default function BuySellPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");

    const filteredItems = mockItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case "price_low":
                return a.price - b.price;
            case "price_high":
                return b.price - a.price;
            case "popular":
                return b.views - a.views;
            case "newest":
            default:
                return new Date(b.postedAt) - new Date(a.postedAt);
        }
    });

    const featuredItems = mockItems.filter(item => item.featured).slice(0, 3);

    return (
        <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {categories.map((category) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <Button
                                            key={category.name}
                                            variant={selectedCategory === category.name ? "default" : "ghost"}
                                            className="w-full justify-between"
                                            onClick={() => setSelectedCategory(category.name)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <IconComponent className="w-4 h-4" />
                                                <span>{category.name}</span>
                                            </div>
                                            <Badge variant="secondary">{category.count}</Badge>
                                        </Button>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* Featured Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                    <span>Featured</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {featuredItems.map((item) => (
                                    <div key={item.id} className="flex space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                                        <img 
                                            src={item.images[0]} 
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                                            <p className="text-green-600 font-semibold">${item.price}</p>
                                            <p className="text-xs text-gray-500">{item.seller.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Marketplace Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Listings</span>
                                    <span className="font-semibold">234</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Sold This Week</span>
                                    <span className="font-semibold">45</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Response</span>
                                    <span className="font-semibold">2.3 hrs</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Trust Score</span>
                                    <span className="font-semibold text-green-600">98.5%</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search and Filters */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="Search items, brands, or descriptions..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            {sortOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center space-x-1 border border-gray-300 rounded-md">
                                            <Button
                                                variant={viewMode === "grid" ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => setViewMode("grid")}
                                                className="rounded-r-none"
                                            >
                                                <Grid3X3 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant={viewMode === "list" ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => setViewMode("list")}
                                                className="rounded-l-none"
                                            >
                                                <List className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Sell Item
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                {filteredItems.length} items found
                                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                            </h2>
                        </div>

                        {sortedItems.length > 0 ? (
                            <div className={viewMode === "grid" 
                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" 
                                : "space-y-4"
                            }>
                                {sortedItems.map((item) => (
                                    <ProductCard key={item.id} item={item} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        No items found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Try adjusting your search or filter criteria
                                    </p>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Be the first to sell in this category
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
        </div>
    );
}
