import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus,
  BookOpen,
  Users,
  Zap,
  Calendar,
  TrendingUp,
  Shield,
  MoreHorizontal,
  ThumbsUp,
  Eye,
  Clock,
  Star,
  Coffee,
  Smile,
  ArrowUp
} from "lucide-react";

const mockPosts = [
  {
    id: 1,
    type: 'confession',
    content: "Sometimes I feel like I'm the only one struggling with calculus. Everyone else seems to get it so easily, but I spend hours on homework and still feel lost. Anyone else feeling this way?",
    anonymous: true,
    mood: '😔',
    category: 'Academic',
    timestamp: '2 hours ago',
    likes: 23,
    comments: 8,
    trending: true,
    isLiked: false,
    authorInitials: 'AN'
  },
  {
    id: 2,
    type: 'social',
    content: "Just finished my first hackathon! 36 hours of coding, pizza, and very little sleep. Built an app to help students find study groups. Thanks to everyone who supported me! 🚀",
    author: 'Alex Chen',
    major: 'Computer Science',
    mood: '🎉',
    timestamp: '4 hours ago',
    likes: 45,
    comments: 12,
    image: true,
    isLiked: true,
    authorInitials: 'AC'
  },
  {
    id: 3,
    type: 'study',
    content: "Looking for people to join a machine learning study group! We'll meet twice a week to go through Andrew Ng's course together. DM me if interested!",
    author: 'Sarah Kim',
    major: 'Data Science',
    timestamp: '6 hours ago',
    likes: 18,
    comments: 6,
    isLiked: false,
    authorInitials: 'SK'
  },
  {
    id: 4,
    type: 'confession',
    content: "I have a crush on someone in my organic chemistry lab but I'm too shy to talk to them. They're so smart and funny. What should I do?? 😅",
    anonymous: true,
    mood: '😊',
    category: 'Relationships',
    timestamp: '8 hours ago',
    likes: 67,
    comments: 24,
    trending: true,
    isLiked: false,
    authorInitials: 'AN'
  },
  {
    id: 5,
    type: 'event',
    content: "Hosting a mental health awareness workshop this Friday at 3 PM in the student center. Free pizza and good vibes! Let's break the stigma around mental health on campus. 💙",
    author: 'Maya Rodriguez',
    major: 'Psychology',
    timestamp: '1 day ago',
    likes: 89,
    comments: 31,
    eventDate: 'Friday, 3 PM',
    location: 'Student Center',
    isLiked: true,
    authorInitials: 'MR'
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Anonymous Confession
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Study Room
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Secret Crush
                </Button>
              </CardContent>
            </Card>

            {/* Today's Mood */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Check-in</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">How are you feeling?</span>
                  <span className="text-2xl">😊</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Update Mood
                </Button>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Study Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">7</div>
                  <div className="text-sm text-gray-600">days</div>
                  <p className="text-xs text-gray-500 mt-2">Keep it up! 🔥</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JD</span>
                  </div>
                  <Input 
                    placeholder="What's on your mind, John?" 
                    className="flex-1 bg-gray-100 dark:bg-gray-700 border-0"
                  />
                  <Button>Post</Button>
                </div>
              </CardContent>
            </Card>

            {/* Sample Posts */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">SA</span>
                  </div>
                  <div>
                    <div className="font-medium">Sarah Anderson</div>
                    <div className="text-sm text-gray-500">Computer Science • 2 hours ago</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Just finished my data structures assignment! Anyone else struggling with binary trees? 🌳 
                  Would love to form a study group for next week's exam.
                </p>
                <div className="flex space-x-2">
                  <Badge variant="secondary">Computer Science</Badge>
                  <Badge variant="secondary">Study Group</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-1" />
                    12
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    5
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Anonymous Confession */}
            <Card className="border-l-4 border-purple-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Anonymous Confession</div>
                    <div className="text-sm text-gray-500">Posted 4 hours ago</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  I'm really struggling with imposter syndrome in my engineering program. 
                  Sometimes I feel like I don't belong here, even though my grades are good. 
                  Anyone else feel this way? 💙
                </p>
                <Badge variant="secondary">Mental Health</Badge>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-1" />
                    28
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    15
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Study Room Invitation */}
            <Card className="border-l-4 border-green-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Study Room: Calculus II</div>
                    <div className="text-sm text-gray-500">Starting in 30 minutes</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Join us for a focused study session on integration techniques. 
                  We'll be using the Pomodoro method (25 min study, 5 min break).
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Badge variant="secondary">Mathematics</Badge>
                    <Badge variant="secondary">3/8 joined</Badge>
                  </div>
                  <Button size="sm">Join Room</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Campus Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Campus Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="font-medium text-sm">Career Fair</div>
                  <div className="text-xs text-gray-600">Tomorrow, 10 AM</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-medium text-sm">Study Group Meetup</div>
                  <div className="text-xs text-gray-600">Friday, 2 PM</div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">#Finals2025</span>
                  <span className="text-xs text-gray-500">245 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#StudyBuddy</span>
                  <span className="text-xs text-gray-500">189 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#CampusLife</span>
                  <span className="text-xs text-gray-500">156 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">#MentalHealth</span>
                  <span className="text-xs text-gray-500">142 posts</span>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Connect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">MR</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Maya Rodriguez</div>
                      <div className="text-xs text-gray-500">Psychology</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">AK</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Alex Kim</div>
                      <div className="text-xs text-gray-500">Business</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
