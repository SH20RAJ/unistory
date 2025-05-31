"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share,
  FileText,
  Calculator,
  Atom,
  Code,
  Palette,
  Globe,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Search
} from "lucide-react";

const studyRooms = [
  {
    id: 1,
    title: "Calc II Problem Solving",
    subject: "Mathematics",
    participants: 8,
    maxParticipants: 12,
    duration: "2h 15m",
    status: "active",
    host: "Sarah Chen",
    type: "focus",
    icon: <Calculator className="w-5 h-5" />
  },
  {
    id: 2,
    title: "React Study Group",
    subject: "Computer Science",
    participants: 5,
    maxParticipants: 8,
    duration: "1h 30m",
    status: "active",
    host: "Alex Park",
    type: "collaborative",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Organic Chemistry Review",
    subject: "Chemistry",
    participants: 6,
    maxParticipants: 10,
    duration: "45m",
    status: "active",
    host: "Maria Rodriguez",
    type: "review",
    icon: <Atom className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Art History Final Prep",
    subject: "Art History",
    participants: 4,
    maxParticipants: 6,
    duration: "1h",
    status: "starting_soon",
    host: "David Kim",
    type: "exam_prep",
    icon: <Palette className="w-5 h-5" />
  }
];

const subjects = [
  "Mathematics", "Computer Science", "Chemistry", "Physics", "Biology",
  "Art History", "Psychology", "Economics", "Literature", "History"
];

const roomTypes = [
  { value: "focus", label: "Silent Focus", description: "Pomodoro sessions with minimal chat" },
  { value: "collaborative", label: "Collaborative", description: "Active discussion and problem-solving" },
  { value: "review", label: "Review Session", description: "Going over notes and materials" },
  { value: "exam_prep", label: "Exam Prep", description: "Intensive preparation for upcoming exams" }
];

export default function StudyRoomsPage() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const joinRoom = (room) => {
    setActiveRoom(room);
  };

  const leaveRoom = () => {
    setActiveRoom(null);
    setIsTimerRunning(false);
    setPomodoroTime(25 * 60);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        {!activeRoom ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study Rooms</h1>
                <p className="text-gray-600 dark:text-gray-400">Join virtual study sessions with your classmates</p>
              </div>
              
              <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Room
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Study Room</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Room title (e.g., Calculus Problem Set 5)" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject.toLowerCase()}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Create Room</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search study rooms..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active">Active Rooms</TabsTrigger>
                <TabsTrigger value="my-rooms">My Rooms</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studyRooms.map((room) => (
                    <Card key={room.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                              {room.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{room.title}</CardTitle>
                              <p className="text-sm text-gray-500">{room.subject}</p>
                            </div>
                          </div>
                          <Badge 
                            variant={room.status === 'active' ? 'default' : 'secondary'}
                            className={room.status === 'active' ? 'bg-green-500' : ''}
                          >
                            {room.status === 'active' ? 'Live' : 'Starting Soon'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span>{room.participants}/{room.maxParticipants}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>{room.duration}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Hosted by</span>
                            <span className="font-medium">{room.host}</span>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => joinRoom(room)}
                            disabled={room.participants >= room.maxParticipants}
                          >
                            {room.participants >= room.maxParticipants ? 'Room Full' : 'Join Room'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="my-rooms" className="mt-6">
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't created any study rooms yet.</p>
                  <Button className="mt-4" onClick={() => setShowCreateRoom(true)}>
                    Create Your First Room
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled" className="mt-6">
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No scheduled study sessions.</p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          /* Active Room View */
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Study Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Room Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {activeRoom.icon}
                        <span>{activeRoom.title}</span>
                      </CardTitle>
                      <p className="text-gray-500">Hosted by {activeRoom.host}</p>
                    </div>
                    <Button variant="outline" onClick={leaveRoom}>
                      Leave Room
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Pomodoro Timer */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Focus Timer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-mono font-bold text-blue-600">
                      {formatTime(pomodoroTime)}
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="w-16 h-16 rounded-full"
                      >
                        {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPomodoroTime(25 * 60);
                          setIsTimerRunning(false);
                        }}
                        className="w-16 h-16 rounded-full"
                      >
                        <RotateCcw className="w-6 h-6" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {isTimerRunning ? 'Focus time! Keep going.' : 'Click play to start your focus session.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Study Tools */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <FileText className="w-6 h-6" />
                      <span className="text-xs">Notes</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Calculator className="w-6 h-6" />
                      <span className="text-xs">Calculator</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Share className="w-6 h-6" />
                      <span className="text-xs">Share Screen</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Globe className="w-6 h-6" />
                      <span className="text-xs">Whiteboard</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Participants ({activeRoom.participants})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: activeRoom.participants }, (_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {String.fromCharCode(65 + i)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {i === 0 ? activeRoom.host : `Student ${i + 1}`}
                          </p>
                          {i === 0 && (
                            <Badge variant="secondary" className="text-xs">Host</Badge>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat */}
              <Card>
                <CardHeader>
                  <CardTitle>Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4 h-48 overflow-y-auto">
                    <div className="text-xs text-gray-500 text-center">
                      Welcome to the study room! 👋
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <p className="text-sm"><strong>Sarah:</strong> Let's start with problem #3</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                      <p className="text-sm"><strong>Alex:</strong> I'm having trouble with the derivative</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button size="sm">Send</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Room Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Mic className="w-4 h-4 mr-2" />
                      Mute
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
}
