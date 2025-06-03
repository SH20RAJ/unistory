"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    BookOpen,
    Search,
    Filter,
    Download,
    Eye,
    Star,
    Clock,
    FileText,
    Video,
    Image,
    FileSpreadsheet,
    File,
    Users,
    Calendar,
    GraduationCap,
    Building,
    Layers,
    ChevronDown,
    ChevronRight,
    Heart,
    Share2,
    Bookmark
} from "lucide-react";
import { useRouter } from "next/navigation";

// Sample resource data with comprehensive academic content
const resourcesData = [
    {
        id: 1,
        title: "Engineering Mathematics - Differential Equations",
        type: "PDF",
        subject: "Mathematics",
        year: "2",
        branch: "Computer Science",
        stream: "Engineering",
        semester: "3",
        size: "2.4 MB",
        downloads: 1248,
        rating: 4.8,
        uploadDate: "2024-01-15",
        description: "Comprehensive notes on differential equations with solved examples and practice problems.",
        tags: ["calculus", "equations", "engineering-math"],
        author: "Prof. Sarah Johnson",
        university: "MIT",
        isFree: true,
        isPremium: false,
        views: 3200
    },
    {
        id: 2,
        title: "Data Structures & Algorithms - Complete Course",
        type: "Video",
        subject: "Computer Science",
        year: "2",
        branch: "Computer Science",
        stream: "Engineering",
        semester: "4",
        size: "1.2 GB",
        downloads: 2156,
        rating: 4.9,
        uploadDate: "2024-02-10",
        description: "Full video course covering all major data structures and algorithms with coding examples.",
        tags: ["dsa", "programming", "algorithms"],
        author: "Dr. Mike Chen",
        university: "Stanford",
        isFree: false,
        isPremium: true,
        views: 5600
    },
    {
        id: 3,
        title: "Organic Chemistry Lab Manual",
        type: "PDF",
        subject: "Chemistry",
        year: "1",
        branch: "Chemical Engineering",
        stream: "Engineering",
        semester: "2",
        size: "8.7 MB",
        downloads: 892,
        rating: 4.6,
        uploadDate: "2024-01-28",
        description: "Detailed lab manual with procedures, safety guidelines, and result analysis.",
        tags: ["chemistry", "lab", "organic"],
        author: "Dr. Emily Watson",
        university: "Harvard",
        isFree: true,
        isPremium: false,
        views: 1890
    },
    {
        id: 4,
        title: "Business Management Case Studies",
        type: "PDF",
        subject: "Management",
        year: "3",
        branch: "Business Administration",
        stream: "Management",
        semester: "5",
        size: "4.1 MB",
        downloads: 756,
        rating: 4.7,
        uploadDate: "2024-02-05",
        description: "Collection of real-world business case studies with detailed analysis and solutions.",
        tags: ["business", "case-study", "management"],
        author: "Prof. David Lee",
        university: "Wharton",
        isFree: true,
        isPremium: false,
        views: 2100
    },
    {
        id: 5,
        title: "Physics - Quantum Mechanics Lectures",
        type: "Video",
        subject: "Physics",
        year: "3",
        branch: "Physics",
        stream: "Science",
        semester: "5",
        size: "850 MB",
        downloads: 634,
        rating: 4.9,
        uploadDate: "2024-01-20",
        description: "Advanced quantum mechanics lectures with mathematical derivations and real-world applications.",
        tags: ["quantum", "physics", "advanced"],
        author: "Prof. Lisa Zhang",
        university: "Caltech",
        isFree: false,
        isPremium: true,
        views: 1450
    },
    {
        id: 6,
        title: "Financial Accounting Spreadsheet Templates",
        type: "Excel",
        subject: "Accounting",
        year: "2",
        branch: "Commerce",
        stream: "Commerce",
        semester: "3",
        size: "1.8 MB",
        downloads: 1089,
        rating: 4.5,
        uploadDate: "2024-02-12",
        description: "Ready-to-use Excel templates for financial statements, budgeting, and analysis.",
        tags: ["accounting", "finance", "excel"],
        author: "CA Jennifer Brown",
        university: "NYU Stern",
        isFree: true,
        isPremium: false,
        views: 2800
    },
    {
        id: 7,
        title: "Human Anatomy Atlas - 3D Models",
        type: "Image",
        subject: "Biology",
        year: "1",
        branch: "Medical",
        stream: "Medical",
        semester: "1",
        size: "156 MB",
        downloads: 1876,
        rating: 4.8,
        uploadDate: "2024-01-08",
        description: "High-resolution 3D anatomical models with detailed labeling and explanations.",
        tags: ["anatomy", "medical", "3d-models"],
        author: "Dr. Robert Kim",
        university: "Johns Hopkins",
        isFree: false,
        isPremium: true,
        views: 4200
    },
    {
        id: 8,
        title: "Machine Learning Python Code Examples",
        type: "PDF",
        subject: "Computer Science",
        year: "4",
        branch: "Computer Science",
        stream: "Engineering",
        semester: "7",
        size: "3.2 MB",
        downloads: 1567,
        rating: 4.7,
        uploadDate: "2024-02-08",
        description: "Practical Python implementations of popular ML algorithms with detailed explanations.",
        tags: ["machine-learning", "python", "ai"],
        author: "Dr. Alex Turner",
        university: "Carnegie Mellon",
        isFree: true,
        isPremium: false,
        views: 3800
    }
];

const subjects = ["All", "Mathematics", "Computer Science", "Physics", "Chemistry", "Biology", "Management", "Accounting", "English", "History"];
const years = ["All", "1", "2", "3", "4"];
const branches = ["All", "Computer Science", "Mechanical Engineering", "Chemical Engineering", "Physics", "Business Administration", "Commerce", "Medical"];
const streams = ["All", "Engineering", "Science", "Commerce", "Medical", "Management", "Arts"];
const fileTypes = ["All", "PDF", "Video", "Image", "Excel", "PowerPoint"];

const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
        case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
        case 'video': return <Video className="w-5 h-5 text-purple-500" />;
        case 'image': return <Image className="w-5 h-5 text-green-500" />;
        case 'excel': return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
        default: return <File className="w-5 h-5 text-gray-500" />;
    }
};

const ResourceCard = ({ resource }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    return (
        <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        {getFileIcon(resource.type)}
                        <div>
                            <CardTitle className="text-lg font-semibold group-hover:text-purple-600 transition-colors">
                                {resource.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {resource.description}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {resource.isPremium && (
                            <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                                Premium
                            </Badge>
                        )}
                        {resource.isFree && (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                                Free
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                            #{tag}
                        </Badge>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>Year {resource.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{resource.branch}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Layers className="w-4 h-4" />
                        <span>{resource.stream}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Sem {resource.semester}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>{resource.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{resource.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{resource.rating}</span>
                        </div>
                    </div>
                    <div className="text-xs">
                        {resource.size}
                    </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    By {resource.author} • {resource.university} • {new Date(resource.uploadDate).toLocaleDateString()}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                        </Button>
                        <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsLiked(!isLiked)}
                            className={isLiked ? "text-red-500" : "text-gray-500"}
                        >
                            <Heart className={`w-4 h-4${isLiked ? " fill-current" : ""}`} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={isBookmarked ? "text-blue-500" : "text-gray-500"}
                        >
                            <Bookmark className={`w-4 h-4${isBookmarked ? " fill-current" : ""}`} />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-500">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const FilterSection = ({ title, options, selected, onSelect, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600 transition-colors"
            >
                <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{title}</span>
                </div>
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {isOpen && (
                <div className="mt-3 space-y-2">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => onSelect(option)}
                            className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${selected === option
                                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function ResourcesPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [selectedStream, setSelectedStream] = useState("All");
    const [selectedFileType, setSelectedFileType] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    const filteredResources = useMemo(() => {
        return resourcesData.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                resource.author.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSubject = selectedSubject === "All" || resource.subject === selectedSubject;
            const matchesYear = selectedYear === "All" || resource.year === selectedYear;
            const matchesBranch = selectedBranch === "All" || resource.branch === selectedBranch;
            const matchesStream = selectedStream === "All" || resource.stream === selectedStream;
            const matchesFileType = selectedFileType === "All" || resource.type === selectedFileType;

            return matchesSearch && matchesSubject && matchesYear && matchesBranch && matchesStream && matchesFileType;
        });
    }, [searchQuery, selectedSubject, selectedYear, selectedBranch, selectedStream, selectedFileType]);

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedSubject("All");
        setSelectedYear("All");
        setSelectedBranch("All");
        setSelectedStream("All");
        setSelectedFileType("All");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
            <MainNavigation />

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white">
                            <BookOpen className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Academic Resources
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover and download high-quality academic materials, notes, videos, and study resources
                        curated by top universities and educators worldwide.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-80">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center space-x-2">
                                        <Filter className="w-5 h-5" />
                                        <span>Filters</span>
                                    </CardTitle>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={clearAllFilters}
                                        className="text-sm text-purple-600 hover:text-purple-700"
                                    >
                                        Clear All
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FilterSection
                                    title="Subject"
                                    options={subjects}
                                    selected={selectedSubject}
                                    onSelect={setSelectedSubject}
                                    icon={BookOpen}
                                />
                                <FilterSection
                                    title="Year"
                                    options={years}
                                    selected={selectedYear}
                                    onSelect={setSelectedYear}
                                    icon={GraduationCap}
                                />
                                <FilterSection
                                    title="Branch"
                                    options={branches}
                                    selected={selectedBranch}
                                    onSelect={setSelectedBranch}
                                    icon={Building}
                                />
                                <FilterSection
                                    title="Stream"
                                    options={streams}
                                    selected={selectedStream}
                                    onSelect={setSelectedStream}
                                    icon={Layers}
                                />
                                <FilterSection
                                    title="File Type"
                                    options={fileTypes}
                                    selected={selectedFileType}
                                    onSelect={setSelectedFileType}
                                    icon={File}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Search resources, subjects, authors, or keywords..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>

                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {filteredResources.length} Resources Found
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Showing results for your search and filter criteria
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="px-3 py-1">
                                    {filteredResources.filter(r => r.isFree).length} Free
                                </Badge>
                                <Badge variant="outline" className="px-3 py-1 bg-purple-100 text-purple-700 border-purple-300">
                                    {filteredResources.filter(r => r.isPremium).length} Premium
                                </Badge>
                            </div>
                        </div>

                        {/* Resources Grid */}
                        {filteredResources.length > 0 ? (
                            <div className="grid gap-6">
                                {filteredResources.map((resource) => (
                                    <ResourceCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    No resources found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Try adjusting your search terms or filters to find what you're looking for.
                                </p>
                                <Button onClick={clearAllFilters} variant="outline">
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
}
