import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Heart,
    MessageCircle,
    Share2,
    Search,
    Shield,
    Plus,
    Filter,
    TrendingUp,
    Eye,
    ArrowLeft,
    Send
} from "lucide-react";
import Link from "next/link";

export default function ConfessionWall() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold flex items-center">
                                    <Shield className="w-7 h-7 mr-3 text-purple-600" />
                                    Confession Wall
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Share your thoughts anonymously in a safe space
                                </p>
                            </div>
                        </div>

                        {/* New Confession Button */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Confession
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center">
                                        <Shield className="w-5 h-5 mr-2 text-purple-600" />
                                        Anonymous Confession
                                    </DialogTitle>
                                    <DialogDescription>
                                        Share your thoughts safely. Your identity will remain completely anonymous.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                                        <div className="flex items-center text-purple-700 dark:text-purple-300 text-sm">
                                            <Shield className="w-4 h-4 mr-2" />
                                            Your confession is completely anonymous and moderated for safety
                                        </div>
                                    </div>

                                    <textarea
                                        className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="What's on your mind? Share your thoughts, feelings, or experiences..."
                                    />

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            0/500 characters
                                        </div>
                                        <Button className="bg-purple-600 hover:bg-purple-700">
                                            <Send className="w-4 h-4 mr-2" />
                                            Post Anonymously
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-4">
                {/* Filters and Search */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search confessions..."
                                className="pl-10 bg-white dark:bg-gray-800 w-64"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                        </Badge>
                        <Badge variant="outline">Recent</Badge>
                    </div>
                </div>

                {/* Guidelines Card */}
                <Card className="mb-4 border-l-4 border-l-blue-500">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-blue-600" />
                            Community Guidelines
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <div className="font-medium text-green-600 mb-1">✓ Be Supportive</div>
                                <p className="text-gray-600">Offer encouragement and understanding</p>
                            </div>
                            <div>
                                <div className="font-medium text-blue-600 mb-1">✓ Stay Anonymous</div>
                                <p className="text-gray-600">Respect everyone's privacy</p>
                            </div>
                            <div>
                                <div className="font-medium text-purple-600 mb-1">✓ Be Kind</div>
                                <p className="text-gray-600">No judgment, just compassion</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Confessions Feed */}
                <div className="space-y-4">
                    {/* Featured Confession */}
                    <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Anonymous • Featured</div>
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <Eye className="w-3 h-3 mr-1" />
                                            2.3k views • 6 hours ago
                                        </div>
                                    </div>
                                </div>
                                <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">
                                I wanted to share something that might help others going through a tough time.
                                Last semester, I was struggling with severe anxiety and depression. I felt completely alone
                                and like I was failing at everything. But I reached out to campus counseling services,
                                and it changed my life. You're not alone, and it's okay to ask for help. 💙
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Mental Health</Badge>
                                <Badge variant="secondary">Support</Badge>
                                <Badge variant="secondary">Inspiration</Badge>
                            </div>
                        </CardContent>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-4">
                                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                        <Heart className="w-4 h-4 mr-1" />
                                        147
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        23
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="w-4 h-4 mr-1" />
                                        Share Support
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Regular Confessions */}
                    <Card className="border-l-4 border-l-gray-300">
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium">Anonymous</div>
                                    <div className="text-sm text-gray-500">3 hours ago</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                I have a huge crush on someone in my physics class, but I'm too shy to even talk to them.
                                They seem so smart and confident, and I feel like I'd just embarrass myself.
                                How do people even start conversations with their crushes? 😅
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Dating</Badge>
                                <Badge variant="secondary">Advice</Badge>
                            </div>
                        </CardContent>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-4">
                                    <Button variant="ghost" size="sm">
                                        <Heart className="w-4 h-4 mr-1" />
                                        34
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        12
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="w-4 h-4 mr-1" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-300">
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium">Anonymous</div>
                                    <div className="text-sm text-gray-500">5 hours ago</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                Sometimes I feel like I'm not smart enough for my major. Everyone around me seems
                                to understand everything so quickly, while I have to study twice as hard just to keep up.
                                I know I shouldn't compare myself to others, but it's hard not to. 📚
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Academic Stress</Badge>
                                <Badge variant="secondary">Self Doubt</Badge>
                            </div>
                        </CardContent>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-4">
                                    <Button variant="ghost" size="sm">
                                        <Heart className="w-4 h-4 mr-1" />
                                        89
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        27
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="w-4 h-4 mr-1" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-300">
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-medium">Anonymous</div>
                                    <div className="text-sm text-gray-500">1 day ago</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                I've been thinking about starting my own tech startup, but everyone keeps telling me
                                I should focus on getting good grades and finding a stable job after graduation.
                                Part of me wants to take the risk, but part of me is scared of disappointing my family.
                                Anyone else torn between following their dreams and playing it safe? 🚀
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Career</Badge>
                                <Badge variant="secondary">Dreams</Badge>
                                <Badge variant="secondary">Family Pressure</Badge>
                            </div>
                        </CardContent>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-4">
                                    <Button variant="ghost" size="sm">
                                        <Heart className="w-4 h-4 mr-1" />
                                        76
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        18
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="w-4 h-4 mr-1" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Load More */}
                <div className="text-center mt-6">
                    <Button variant="outline" size="lg">
                        Load More Confessions
                    </Button>
                </div>
            </div>
        </div>
    );
}
