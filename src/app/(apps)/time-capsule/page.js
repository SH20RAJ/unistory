"use client";

import { useState, useEffect } from "react";
import { useAppAccess } from '@/hooks/use-premium';
import PremiumGate from '@/components/premium/PremiumGate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Clock,
    Calendar,
    Heart,
    Star,
    Gift,
    Lock,
    Unlock,
    Camera,
    Image,
    Music,
    FileText,
    Video,
    MapPin,
    Users,
    Smile,
    Sparkles,
    Timer,
    Archive,
    Mail,
    Send,
    Eye,
    EyeOff,
    Share2,
    Download,
    Upload,
    Plus,
    Minus,
    Edit,
    Trash2,
    Save,
    X,
    Check,
    AlertCircle,
    Info,
    Lightbulb,
    Target,
    Flag,
    Award,
    Trophy,
    Crown,
    Diamond,
    Gem,
    Coins,
    Zap,
    Fire,
    Rocket,
    Magic,
    Wand2,
    Hourglass,
    Sunrise,
    Sunset,
    Moon,
    Sun,
    CloudRain,
    Rainbow,
    Flower,
    Leaf,
    TreePine,
    Mountain,
    Waves,
    Coffee,
    Book,
    GraduationCap,
    Briefcase,
    Home,
    Car,
    Plane,
    Phone,
    MessageSquare,
    Mail as MailIcon,
    Bell,
    Settings,
    Search,
    Filter,
    SortAsc,
    SortDesc,
    Grid,
    List,
    Play,
    Pause,
    Volume2,
    VolumeX,
    RotateCcw,
    FastForward,
    Rewind,
    SkipBack,
    SkipForward
} from "lucide-react";

const timeFrames = [
    {
        id: "1week",
        label: "1 Week",
        description: "Quick reflection",
        icon: <Clock className="w-4 h-4" />,
        color: "bg-blue-500"
    },
    {
        id: "1month",
        label: "1 Month",
        description: "Short-term goals",
        icon: <Calendar className="w-4 h-4" />,
        color: "bg-green-500"
    },
    {
        id: "3months",
        label: "3 Months",
        description: "Semester reflection",
        icon: <GraduationCap className="w-4 h-4" />,
        color: "bg-purple-500"
    },
    {
        id: "6months",
        label: "6 Months",
        description: "Half-year milestone",
        icon: <Star className="w-4 h-4" />,
        color: "bg-orange-500"
    },
    {
        id: "1year",
        label: "1 Year",
        description: "Annual time capsule",
        icon: <Trophy className="w-4 h-4" />,
        color: "bg-red-500"
    },
    {
        id: "graduation",
        label: "Graduation",
        description: "College memories",
        icon: <Crown className="w-4 h-4" />,
        color: "bg-yellow-500"
    },
    {
        id: "5years",
        label: "5 Years",
        description: "Life milestone",
        icon: <Rocket className="w-4 h-4" />,
        color: "bg-pink-500"
    },
    {
        id: "10years",
        label: "10 Years",
        description: "Decade reflection",
        icon: <Diamond className="w-4 h-4" />,
        color: "bg-indigo-500"
    }
];

const capsuleTemplates = [
    {
        id: "letter_to_future",
        name: "Letter to Future Me",
        description: "Write a heartfelt letter to your future self",
        prompts: [
            "Dear future me...",
            "Right now I'm feeling...",
            "My biggest dreams are...",
            "I hope by then you have...",
            "Remember to always..."
        ],
        icon: <MailIcon className="w-5 h-5" />,
        color: "from-blue-500 to-purple-500"
    },
    {
        id: "goals_and_dreams",
        name: "Goals & Dreams",
        description: "Set intentions and track your aspirations",
        prompts: [
            "My academic goals:",
            "Career aspirations:",
            "Personal growth areas:",
            "Relationships I want to build:",
            "Skills I want to develop:"
        ],
        icon: <Target className="w-5 h-5" />,
        color: "from-green-500 to-blue-500"
    },
    {
        id: "college_memories",
        name: "College Memories",
        description: "Capture your university experience",
        prompts: [
            "Best memory this semester:",
            "Funniest moment:",
            "Most challenging experience:",
            "People who made an impact:",
            "Lessons learned:"
        ],
        icon: <GraduationCap className="w-5 h-5" />,
        color: "from-purple-500 to-pink-500"
    },
    {
        id: "love_and_relationships",
        name: "Love & Relationships",
        description: "Document your relationships and feelings",
        prompts: [
            "Current relationship status:",
            "Someone special in my life:",
            "What I've learned about love:",
            "Friendships that matter:",
            "Family relationships:"
        ],
        icon: <Heart className="w-5 h-5" />,
        color: "from-red-500 to-pink-500"
    },
    {
        id: "predictions",
        name: "Future Predictions",
        description: "Make predictions about the future",
        prompts: [
            "Technology will evolve to:",
            "My career will be:",
            "I'll be living in:",
            "The world will change by:",
            "My biggest achievement will be:"
        ],
        icon: <Sparkles className="w-5 h-5" />,
        color: "from-indigo-500 to-purple-500"
    }
];

const myCapsules = [
    {
        id: 1,
        title: "Freshman Year Dreams",
        template: "letter_to_future",
        openDate: "2025-09-01",
        createdDate: "2024-09-01",
        status: "sealed",
        preview: "Dear future me, I just started college and I'm so excited about...",
        attachments: 3,
        views: 0,
        timeFrame: "1year",
        isPrivate: true
    },
    {
        id: 2,
        title: "Midterm Stress Capsule",
        template: "goals_and_dreams",
        openDate: "2025-01-15",
        createdDate: "2024-10-15",
        status: "ready", // Can be opened
        preview: "My academic goals this semester were ambitious, and now...",
        attachments: 1,
        views: 2,
        timeFrame: "3months",
        isPrivate: false
    },
    {
        id: 3,
        title: "Spring Break Predictions",
        template: "predictions",
        openDate: "2025-12-20",
        createdDate: "2024-03-20",
        status: "sealed",
        preview: "I predict that by winter 2025, the world will be...",
        attachments: 5,
        views: 0,
        timeFrame: "6months",
        isPrivate: true
    },
    {
        id: 4,
        title: "Graduation Letter",
        template: "college_memories",
        openDate: "2028-05-15",
        createdDate: "2024-05-15",
        status: "sealed",
        preview: "To the graduate version of myself - remember these amazing...",
        attachments: 12,
        views: 0,
        timeFrame: "graduation",
        isPrivate: false
    }
];

const CapsuleCard = ({ capsule, onOpen, onShare, onEdit }) => {
    const [timeLeft, setTimeLeft] = useState("");
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const openDate = new Date(capsule.openDate);
            const now = new Date();
            const difference = openDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

                if (days > 0) {
                    setTimeLeft(`${days}d ${hours}h`);
                } else if (hours > 0) {
                    setTimeLeft(`${hours}h ${minutes}m`);
                } else {
                    setTimeLeft(`${minutes}m`);
                }
            } else {
                setTimeLeft("Ready to open!");
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [capsule.openDate]);

    const template = capsuleTemplates.find(t => t.id === capsule.template);
    const timeFrame = timeFrames.find(tf => tf.id === capsule.timeFrame);
    const canOpen = capsule.status === "ready" || new Date(capsule.openDate) <= new Date();

    return (
        <Card
            className={`transition-all duration-500 hover:scale-105 cursor-pointer ${canOpen ? 'border-green-500 shadow-green-200' : 'border-gray-200'
                } ${isHovering ? 'shadow-2xl' : 'shadow-lg'}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${template?.color || 'from-gray-400 to-gray-600'} rounded-lg flex items-center justify-center text-white`}>
                            {canOpen ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                        </div>
                        <div>
                            <CardTitle className="text-lg">{capsule.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className={`${timeFrame?.color} text-white border-none`}>
                                    {timeFrame?.label}
                                </Badge>
                                {capsule.isPrivate && (
                                    <Badge variant="secondary">
                                        <EyeOff className="w-3 h-3 mr-1" />
                                        Private
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-sm font-medium ${canOpen ? 'text-green-600' : 'text-orange-600'}`}>
                            {timeLeft}
                        </div>
                        <div className="text-xs text-gray-500">
                            Opens {new Date(capsule.openDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{capsule.preview}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Image className="w-3 h-3" />
                            <span>{capsule.attachments} files</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{capsule.views} views</span>
                        </div>
                    </div>
                    <div>
                        Created {new Date(capsule.createdDate).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Button
                        onClick={() => onOpen(capsule)}
                        disabled={!canOpen}
                        className={`flex-1 ${canOpen ? 'bg-gradient-to-r from-green-500 to-blue-500' : ''}`}
                    >
                        {canOpen ? (
                            <>
                                <Unlock className="w-4 h-4 mr-1" />
                                Open Capsule
                            </>
                        ) : (
                            <>
                                <Lock className="w-4 h-4 mr-1" />
                                Sealed
                            </>
                        )}
                    </Button>

                    {!capsule.isPrivate && (
                        <Button variant="outline" onClick={() => onShare(capsule)}>
                            <Share2 className="w-4 h-4" />
                        </Button>
                    )}

                    <Button variant="outline" onClick={() => onEdit(capsule)}>
                        <Edit className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const CreateCapsuleForm = ({ onSave, onCancel }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    const [attachments, setAttachments] = useState([]);

    const handleSave = () => {
        const newCapsule = {
            title,
            template: selectedTemplate?.id,
            timeFrame: selectedTimeFrame?.id,
            content,
            isPrivate,
            attachments,
            createdDate: new Date().toISOString(),
            openDate: calculateOpenDate()
        };
        onSave(newCapsule);
    };

    const calculateOpenDate = () => {
        const now = new Date();
        const timeFrame = selectedTimeFrame?.id;

        switch (timeFrame) {
            case "1week": return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            case "1month": return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            case "3months": return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
            case "6months": return new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
            case "1year": return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
            case "graduation": return new Date("2028-05-15");
            case "5years": return new Date(now.getTime() + 5 * 365 * 24 * 60 * 60 * 1000);
            case "10years": return new Date(now.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
            default: return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        }
    };

    return (
        <div className="space-y-6">
            {/* Template Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Choose a Template</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {capsuleTemplates.map((template) => (
                            <Card
                                key={template.id}
                                className={`cursor-pointer transition-all duration-300 ${selectedTemplate?.id === template.id
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'hover:border-gray-300'
                                    }`}
                                onClick={() => setSelectedTemplate(template)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center text-white`}>
                                            {template.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{template.name}</h3>
                                            <p className="text-sm text-gray-600">{template.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Time Frame Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>When should this open?</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {timeFrames.map((timeFrame) => (
                            <Button
                                key={timeFrame.id}
                                variant={selectedTimeFrame?.id === timeFrame.id ? "default" : "outline"}
                                onClick={() => setSelectedTimeFrame(timeFrame)}
                                className="h-auto p-4 flex flex-col items-center space-y-2"
                            >
                                <div className={`w-8 h-8 ${timeFrame.color} rounded-full flex items-center justify-center text-white`}>
                                    {timeFrame.icon}
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold">{timeFrame.label}</div>
                                    <div className="text-xs opacity-70">{timeFrame.description}</div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Content Creation */}
            {selectedTemplate && (
                <Card>
                    <CardHeader>
                        <CardTitle>Create Your Capsule</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Capsule Title</label>
                            <Input
                                placeholder="Give your time capsule a meaningful title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Your Message</label>
                            <Textarea
                                placeholder={selectedTemplate.prompts.join('\n\n')}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={10}
                                className="resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={isPrivate}
                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                    className="rounded"
                                />
                                <label className="text-sm">Keep this capsule private</label>
                            </div>

                            <Button variant="outline">
                                <Camera className="w-4 h-4 mr-2" />
                                Add Photos/Videos
                            </Button>
                        </div>

                        <div className="flex space-x-4">
                            <Button onClick={onCancel} variant="outline" className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={!title || !content || !selectedTimeFrame}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                            >
                                <Archive className="w-4 h-4 mr-2" />
                                Seal Time Capsule
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default function TimeCapsulePage() {
    const { hasAccess } = useAppAccess('Time Capsule');
    
    const [activeTab, setActiveTab] = useState("my-capsules");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [capsules, setCapsules] = useState(myCapsules);

    const handleCreateCapsule = (newCapsule) => {
        setCapsules([...capsules, { ...newCapsule, id: Date.now(), status: "sealed", views: 0, attachments: 0 }]);
        setShowCreateForm(false);
    };

    const handleOpenCapsule = (capsule) => {
        console.log("Opening capsule:", capsule);
        // Implement capsule opening logic
    };

    const handleShareCapsule = (capsule) => {
        console.log("Sharing capsule:", capsule);
        // Implement sharing logic
    };

    const handleEditCapsule = (capsule) => {
        console.log("Editing capsule:", capsule);
        // Implement editing logic
    };

    if (showCreateForm) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Create New Time Capsule</h2>
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                </div>
                <CreateCapsuleForm
                    onSave={handleCreateCapsule}
                    onCancel={() => setShowCreateForm(false)}
                />
            </div>
        );
    }

    return (
        <>
            {!hasAccess && <PremiumGate appName="Time Capsule" appIcon={Clock} />}
            {hasAccess && (
                <div className="space-y-6">
                    {/* Header Stats */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold">{capsules.length}</div>
                                        <p className="text-sm opacity-90">Total Capsules</p>
                                    </div>
                                    <Archive className="w-8 h-8 opacity-80" />
                                </div>
                            </CardContent>
                        </Card>

                <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">{capsules.filter(c => c.status === "ready").length}</div>
                                <p className="text-sm opacity-90">Ready to Open</p>
                            </div>
                            <Unlock className="w-8 h-8 opacity-80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">{capsules.filter(c => c.status === "sealed").length}</div>
                                <p className="text-sm opacity-90">Sealed & Waiting</p>
                            </div>
                            <Lock className="w-8 h-8 opacity-80" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">247</div>
                                <p className="text-sm opacity-90">Days Until Next</p>
                            </div>
                            <Timer className="w-8 h-8 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Create Button */}
            <div className="flex justify-center">
                <Button
                    onClick={() => setShowCreateForm(true)}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Time Capsule
                </Button>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="my-capsules">My Capsules</TabsTrigger>
                    <TabsTrigger value="community">Community</TabsTrigger>
                    <TabsTrigger value="inspiration">Get Inspired</TabsTrigger>
                </TabsList>

                <TabsContent value="my-capsules" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {capsules.map((capsule) => (
                            <CapsuleCard
                                key={capsule.id}
                                capsule={capsule}
                                onOpen={handleOpenCapsule}
                                onShare={handleShareCapsule}
                                onEdit={handleEditCapsule}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="community" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Community Time Capsules</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500 text-center py-8">
                                Discover time capsules shared by other students around the world!
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inspiration" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Lightbulb className="w-5 h-5" />
                                    <span>Popular Prompts</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    "What advice would you give to your past self?",
                                    "Describe your ideal life in 5 years",
                                    "What are you most grateful for right now?",
                                    "What fears do you want to overcome?",
                                    "What makes you happiest today?"
                                ].map((prompt, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm">{prompt}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Trophy className="w-5 h-5" />
                                    <span>Achievement Tracker</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm">First Time Capsule</span>
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm">Opened First Capsule</span>
                                    <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm">5 Capsules Created</span>
                                    <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
            )}
        </>
    );
}
