// filepath: /Users/shaswatraj/Desktop/startups/unistory/src/app/dashboard/page.js
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Coffee,
  Star,
  Clock,
  Eye
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

const PostCard = ({ post }) => {
  const getPostTypeColor = (type) => {
    switch (type) {
      case 'confession': return 'border-l-purple-500';
      case 'study': return 'border-l-green-500';
      case 'event': return 'border-l-blue-500';
      case 'social': return 'border-l-orange-500';
      default: return 'border-l-gray-500';
    }
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'confession': return <Shield className="w-5 h-5 text-purple-500" />;
      case 'study': return <BookOpen className="w-5 h-5 text-green-500" />;
      case 'event': return <Calendar className="w-5 h-5 text-blue-500" />;
      default: return <MessageCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <Card className={`border-l-4 ${getPostTypeColor(post.type)}`}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          {post.anonymous ? (
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          ) : (
            <Avatar>
              <AvatarFallback className="bg-blue-500 text-white">
                {post.authorInitials}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              {getPostTypeIcon(post.type)}
              <div className="font-medium">
                {post.anonymous ? 'Anonymous Confession' : post.author}
              </div>
              {post.mood && <span className="text-lg">{post.mood}</span>}
              {post.trending && (
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {post.major && `${post.major} • `}{post.timestamp}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>

        {post.image && (
          <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="text-gray-500">📸 Image Placeholder</div>
          </div>
        )}

        {post.eventDate && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{post.eventDate}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <span>{post.location}</span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {post.category && (
            <Badge variant="secondary">{post.category}</Badge>
          )}
          {post.type === 'study' && (
            <Badge variant="secondary">Study Group</Badge>
          )}
          {post.type === 'event' && (
            <Badge variant="secondary">Campus Event</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={post.isLiked ? "text-red-500" : ""}
          >
            <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>{Math.floor(Math.random() * 500) + 100}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-blue-500 text-white">JD</AvatarFallback>
              </Avatar>
              <Input
                placeholder="What's on your mind, John?"
                className="flex-1 bg-gray-100 dark:bg-gray-700 border-0"
              />
              <Button>Post</Button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Shield className="w-4 h-4 mr-1" />
                  Confession
                </Button>
                <Button variant="ghost" size="sm">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Study Group
                </Button>
                <Button variant="ghost" size="sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Event
                </Button>
              </div>
              <Badge variant="outline" className="text-xs">
                😊 Feeling good
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Load More Posts</Button>
        </div>
      </div>

      {/* Right Sidebar - Merged Content */}
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

        {/* Active Study Room */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Coffee className="w-5 h-5 mr-2 text-green-500" />
              Active Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">23:45</div>
              <div className="text-sm text-gray-600">Focus time</div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Join Study Room
              </Button>
            </div>
          </CardContent>
        </Card>

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
              <div className="text-xs text-gray-500">Main Hall</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium text-sm">Study Group Meetup</div>
              <div className="text-xs text-gray-600">Friday, 2 PM</div>
              <div className="text-xs text-gray-500">Library, Room 204</div>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-medium text-sm">Mental Health Workshop</div>
              <div className="text-xs text-gray-600">Saturday, 3 PM</div>
              <div className="text-xs text-gray-500">Student Center</div>
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
            <div className="flex items-center justify-between">
              <span className="text-sm">#Hackathon</span>
              <span className="text-xs text-gray-500">98 posts</span>
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
                <Avatar>
                  <AvatarFallback className="bg-pink-500 text-white">MR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Maya Rodriguez</div>
                  <div className="text-xs text-gray-500">Psychology</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback className="bg-orange-500 text-white">AK</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Alex Kim</div>
                  <div className="text-xs text-gray-500">Business</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback className="bg-green-500 text-white">JL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Jordan Lee</div>
                  <div className="text-xs text-gray-500">Engineering</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Connect</Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Study Score</span>
              <Badge variant="secondary">850 pts</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Posts This Week</span>
              <Badge variant="secondary">12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Connections</span>
              <Badge variant="secondary">48</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Confessions Sent</span>
              <Badge variant="secondary">3</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
