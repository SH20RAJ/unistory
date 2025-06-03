"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    CalendarDays,
    Clock,
    MapPin,
    Plus,
    Search,
    Filter,
    Bell,
    Share2,
    Download,
    Upload,
    Settings,
    Users,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    Calendar,
    Timer,
    Building,
    User,
    Bookmark,
    Star,
    Zap,
    Smartphone,
    Globe
} from "lucide-react";

// Mock data for class schedule
const mockSchedule = {
    monday: [
        {
            id: 1,
            subject: "Advanced Calculus",
            code: "MATH 301",
            professor: "Dr. Sarah Wilson",
            time: "09:00 - 10:30",
            location: "Math Building - Room 204",
            type: "Lecture",
            color: "blue",
            credits: 3,
            attendance: 85,
            nextAssignment: "Problem Set 5 - Due Friday"
        },
        {
            id: 2,
            subject: "Data Structures",
            code: "CS 202",
            professor: "Prof. Michael Chen",
            time: "11:00 - 12:30",
            location: "Computer Lab 1",
            type: "Lab",
            color: "green",
            credits: 4,
            attendance: 92,
            nextAssignment: "Binary Tree Implementation - Due Monday"
        },
        {
            id: 3,
            subject: "Physics Lab",
            code: "PHYS 201L",
            professor: "Dr. Elena Rodriguez",
            time: "14:00 - 17:00",
            location: "Physics Lab 3",
            type: "Lab",
            color: "purple",
            credits: 1,
            attendance: 78,
            nextAssignment: "Lab Report 3 - Due Wednesday"
        }
    ],
    tuesday: [
        {
            id: 4,
            subject: "Database Systems",
            code: "CS 301",
            professor: "Prof. James Liu",
            time: "10:00 - 11:30",
            location: "Tech Building - Room 105",
            type: "Lecture",
            color: "orange",
            credits: 3,
            attendance: 88,
            nextAssignment: "ER Diagram Project - Due Thursday"
        },
        {
            id: 5,
            subject: "Linear Algebra",
            code: "MATH 250",
            professor: "Dr. Amanda Foster",
            time: "13:00 - 14:30",
            location: "Math Building - Room 101",
            type: "Lecture",
            color: "indigo",
            credits: 3,
            attendance: 90,
            nextAssignment: "Matrix Operations Quiz - Next Tuesday"
        }
    ],
    wednesday: [
        {
            id: 1,
            subject: "Advanced Calculus",
            code: "MATH 301",
            professor: "Dr. Sarah Wilson",
            time: "09:00 - 10:30",
            location: "Math Building - Room 204",
            type: "Lecture",
            color: "blue",
            credits: 3,
            attendance: 85,
            nextAssignment: "Problem Set 5 - Due Friday"
        },
        {
            id: 2,
            subject: "Data Structures",
            code: "CS 202",
            professor: "Prof. Michael Chen",
            time: "11:00 - 12:30",
            location: "Computer Lab 1",
            type: "Lecture",
            color: "green",
            credits: 4,
            attendance: 92,
            nextAssignment: "Binary Tree Implementation - Due Monday"
        }
    ],
    thursday: [
        {
            id: 4,
            subject: "Database Systems",
            code: "CS 301",
            professor: "Prof. James Liu",
            time: "10:00 - 11:30",
            location: "Tech Building - Room 105",
            type: "Lecture",
            color: "orange",
            credits: 3,
            attendance: 88,
            nextAssignment: "ER Diagram Project - Due Thursday"
        }
    ],
    friday: [
        {
            id: 1,
            subject: "Advanced Calculus",
            code: "MATH 301",
            professor: "Dr. Sarah Wilson",
            time: "09:00 - 10:30",
            location: "Math Building - Room 204",
            type: "Lecture",
            color: "blue",
            credits: 3,
            attendance: 85,
            nextAssignment: "Problem Set 5 - Due Friday"
        },
        {
            id: 5,
            subject: "Linear Algebra",
            code: "MATH 250",
            professor: "Dr. Amanda Foster",
            time: "13:00 - 14:30",
            location: "Math Building - Room 101",
            type: "Lecture",
            color: "indigo",
            credits: 3,
            attendance: 90,
            nextAssignment: "Matrix Operations Quiz - Next Tuesday"
        }
    ]
};

const upcomingClasses = [
    {
        subject: "Database Systems",
        code: "CS 301",
        time: "10:00 AM",
        location: "Tech Building - Room 105",
        professor: "Prof. James Liu",
        minutesUntil: 45,
        color: "orange"
    },
    {
        subject: "Linear Algebra",
        code: "MATH 250",
        time: "1:00 PM",
        location: "Math Building - Room 101",
        professor: "Dr. Amanda Foster",
        minutesUntil: 225,
        color: "indigo"
    }
];

const recentNotifications = [
    {
        id: 1,
        type: "room_change",
        title: "Room Change Alert",
        message: "CS 301 Database Systems has been moved to Tech Building Room 107",
        time: "2 hours ago",
        urgent: true
    },
    {
        id: 2,
        type: "assignment",
        title: "Assignment Reminder",
        message: "Binary Tree Implementation due in 2 days",
        time: "4 hours ago",
        urgent: false
    },
    {
        id: 3,
        type: "schedule",
        title: "Schedule Update",
        message: "Physics Lab cancelled for this Friday",
        time: "1 day ago",
        urgent: true
    }
];

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getColorClasses = (color) => {
    const colors = {
        blue: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200",
        green: "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200",
        purple: "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-200",
        orange: "bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-200",
        indigo: "bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-200"
    };
    return colors[color] || colors.blue;
};

const ClassCard = ({ classInfo, isUpcoming = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${isUpcoming ? 'border-l-orange-500 bg-orange-50/30' : ''
                }`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <CardContent className="p-4">
                <div className="space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-lg">{classInfo.subject}</h3>
                                <Badge variant="outline" className="text-xs">{classInfo.code}</Badge>
                                <Badge
                                    className={`text-xs ${getColorClasses(classInfo.color)}`}
                                >
                                    {classInfo.type}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {classInfo.professor}
                            </p>
                        </div>
                        {isUpcoming && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                <Timer className="w-3 h-3 mr-1" />
                                {classInfo.minutesUntil}m
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{classInfo.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{classInfo.location}</span>
                        </div>
                        {classInfo.credits && (
                            <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{classInfo.credits} credits</span>
                            </div>
                        )}
                    </div>

                    {isExpanded && (
                        <div className="pt-3 border-t space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Attendance</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${classInfo.attendance >= 85 ? 'bg-green-500' :
                                                    classInfo.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${classInfo.attendance}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-medium">{classInfo.attendance}%</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-500">Next Assignment</span>
                                    <p className="font-medium text-sm">{classInfo.nextAssignment}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline">
                                    <Bell className="w-4 h-4 mr-1" />
                                    Set Reminder
                                </Button>
                                <Button size="sm" variant="outline">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    Get Directions
                                </Button>
                                <Button size="sm" variant="outline">
                                    <Share2 className="w-4 h-4 mr-1" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const WeekView = ({ schedule }) => {
    const [selectedDay, setSelectedDay] = useState('monday');

    return (
        <div className="space-y-6">
            {/* Day Selector */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {weekDays.map((day, index) => (
                    <Button
                        key={day}
                        variant={selectedDay === day ? "default" : "outline"}
                        className="whitespace-nowrap"
                        onClick={() => setSelectedDay(day)}
                    >
                        {weekDayNames[index]}
                        <Badge variant="secondary" className="ml-2">
                            {schedule[day]?.length || 0}
                        </Badge>
                    </Button>
                ))}
            </div>

            {/* Classes for Selected Day */}
            <div className="space-y-4">
                {schedule[selectedDay]?.length > 0 ? (
                    schedule[selectedDay].map((classInfo) => (
                        <ClassCard key={classInfo.id} classInfo={classInfo} />
                    ))
                ) : (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No classes scheduled
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Enjoy your free day or use this time to catch up on assignments!
                            </p>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Study Time
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

const GridView = ({ schedule }) => {
    const timeSlots = [
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[800px]">
                <div className="grid grid-cols-6 gap-2">
                    {/* Header */}
                    <div className="font-semibold p-3 text-center">Time</div>
                    {weekDayNames.map(day => (
                        <div key={day} className="font-semibold p-3 text-center">{day}</div>
                    ))}

                    {/* Time slots */}
                    {timeSlots.map(time => (
                        <React.Fragment key={time}>
                            <div className="p-3 text-center text-sm text-gray-500 border-r">
                                {time}
                            </div>
                            {weekDays.map(day => {
                                const classAtTime = schedule[day]?.find(cls =>
                                    cls.time.startsWith(time.slice(0, 2))
                                );

                                return (
                                    <div key={`${day}-${time}`} className="p-1">
                                        {classAtTime ? (
                                            <div className={`p-2 rounded text-xs ${getColorClasses(classAtTime.color)}`}>
                                                <div className="font-medium">{classAtTime.code}</div>
                                                <div className="truncate">{classAtTime.subject}</div>
                                                <div className="truncate">{classAtTime.location.split(' - ')[1]}</div>
                                            </div>
                                        ) : (
                                            <div className="h-16 border border-gray-100 dark:border-gray-800 rounded"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function ClassRoutinePage() {
    const [viewMode, setViewMode] = useState("week");
    const [searchQuery, setSearchQuery] = useState("");

    const todayClasses = mockSchedule.monday; // Simulate today being Monday

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Today's Classes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <span>Today's Classes</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {todayClasses.map((classInfo) => (
                                <div key={classInfo.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <div className={`w-3 h-12 rounded ${getColorClasses(classInfo.color)}`}></div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm">{classInfo.code}</h4>
                                        <p className="text-xs text-gray-500 truncate">{classInfo.subject}</p>
                                        <p className="text-xs text-gray-500">{classInfo.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Upcoming Classes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Timer className="w-5 h-5 text-orange-500" />
                                <span>Up Next</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingClasses.map((classInfo, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-semibold text-orange-600">{classInfo.minutesUntil}m</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm">{classInfo.code}</h4>
                                        <p className="text-xs text-gray-500">{classInfo.time} • {classInfo.location.split(' - ')[1]}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Bell className="w-4 h-4 mr-2" />
                                Set Study Reminder
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Schedule
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Smartphone className="w-4 h-4 mr-2" />
                                Sync to Phone
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Settings className="w-4 h-4 mr-2" />
                                Notification Settings
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Bell className="w-5 h-5 text-red-500" />
                                <span>Recent Alerts</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentNotifications.map((notification) => (
                                <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${notification.urgent
                                    ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20'
                                    : 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    }`}>
                                    <div className="flex items-start space-x-2">
                                        {notification.urgent ? (
                                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                                        ) : (
                                            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm">{notification.title}</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500">{notification.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Controls */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search classes, professors, or locations..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1 border border-gray-300 rounded-md">
                                        <Button
                                            variant={viewMode === "week" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("week")}
                                            className="rounded-r-none"
                                        >
                                            Week
                                        </Button>
                                        <Button
                                            variant={viewMode === "grid" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("grid")}
                                            className="rounded-l-none"
                                        >
                                            Grid
                                        </Button>
                                    </div>
                                    <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Class
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Schedule View */}
                    {viewMode === "week" ? (
                        <WeekView schedule={mockSchedule} />
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Schedule Grid</CardTitle>
                                <CardDescription>
                                    Complete overview of your class schedule
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <GridView schedule={mockSchedule} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
