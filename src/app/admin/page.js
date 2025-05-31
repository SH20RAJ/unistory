"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    Shield,
    AlertTriangle,
    Users,
    MessageCircle,
    Eye,
    EyeOff,
    Ban,
    Check,
    X,
    Search,
    Filter,
    MoreHorizontal,
    Clock,
    TrendingUp,
    BarChart3,
    Activity,
    Flag,
    UserX,
    Lock,
    Unlock,
    Mail,
    Calendar,
    Settings,
    Download,
    FileText,
    Trash2,
    Edit3,
    CheckCircle,
    XCircle,
    AlertCircle,
    Info
} from "lucide-react";

const mockReports = [
    {
        id: 1,
        type: "inappropriate_content",
        content: "This confession contains inappropriate language and offensive remarks about a specific group",
        postId: "conf_123",
        postType: "confession",
        reportedBy: "Anonymous User #1",
        reportedAt: "2024-03-10 14:30",
        status: "pending",
        priority: "high",
        category: "Hate Speech",
        moderatorNotes: "",
        originalPost: "I hate it when [inappropriate content removed for display]",
        reportReason: "Contains hate speech and discriminatory language"
    },
    {
        id: 2,
        type: "spam",
        content: "User posting repetitive promotional content for external services",
        postId: "post_456",
        postType: "social",
        reportedBy: "Sarah Kim",
        reportedAt: "2024-03-10 13:15",
        status: "pending",
        priority: "medium",
        category: "Spam",
        moderatorNotes: "",
        originalPost: "Check out this amazing service that will help you with homework! Use code SAVE50...",
        reportReason: "Repetitive promotional posts violating community guidelines"
    },
    {
        id: 3,
        type: "harassment",
        content: "User being targeted with personal attacks in study room comments",
        postId: "study_789",
        postType: "study_room",
        reportedBy: "Alex Chen",
        reportedAt: "2024-03-10 12:45",
        status: "resolved",
        priority: "high",
        category: "Harassment",
        moderatorNotes: "Warning issued to offending user. Content removed.",
        originalPost: "[Personal attack content - resolved]",
        reportReason: "Personal attacks and bullying behavior"
    },
    {
        id: 4,
        type: "false_information",
        content: "Post spreading misinformation about mental health resources",
        postId: "post_101",
        postType: "wellness",
        reportedBy: "Maya Rodriguez",
        reportedAt: "2024-03-10 11:20",
        status: "investigating",
        priority: "high",
        category: "Misinformation",
        moderatorNotes: "Consulting with mental health professionals for verification",
        originalPost: "Don't trust the campus counseling center, they report everything to administration...",
        reportReason: "Spreading false information about mental health services"
    }
];

const mockUsers = [
    {
        id: "user_001",
        name: "John Doe",
        email: "john.doe@university.edu",
        status: "active",
        joinDate: "2024-01-15",
        posts: 87,
        reports: 0,
        warnings: 0,
        lastActive: "2024-03-10 15:30",
        university: "University of Technology",
        major: "Computer Science",
        year: "Junior"
    },
    {
        id: "user_002",
        name: "Jane Smith",
        email: "jane.smith@university.edu",
        status: "warned",
        joinDate: "2024-02-01",
        posts: 45,
        reports: 2,
        warnings: 1,
        lastActive: "2024-03-10 14:20",
        university: "University of Technology",
        major: "Psychology",
        year: "Sophomore"
    },
    {
        id: "user_003",
        name: "Mike Johnson",
        email: "mike.j@university.edu",
        status: "suspended",
        joinDate: "2024-01-20",
        posts: 23,
        reports: 5,
        warnings: 3,
        lastActive: "2024-03-08 10:15",
        university: "University of Technology",
        major: "Business",
        year: "Senior"
    }
];

const mockAnalytics = {
    totalUsers: 12450,
    activeUsers: 8930,
    totalPosts: 34580,
    reportsToday: 23,
    reportsThisWeek: 156,
    resolvedReports: 1420,
    pendingReports: 47,
    communityScore: 8.6,
    topCategories: [
        { name: "Academic", posts: 12400, percentage: 35.8 },
        { name: "Social", posts: 9800, percentage: 28.3 },
        { name: "Wellness", posts: 6200, percentage: 17.9 },
        { name: "Events", posts: 4100, percentage: 11.9 },
        { name: "Confessions", posts: 2080, percentage: 6.0 }
    ]
};

const ReportCard = ({ report, onResolve, onInvestigate, onDismiss }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high": return "text-red-500 bg-red-100 dark:bg-red-900/20";
            case "medium": return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
            case "low": return "text-green-500 bg-green-100 dark:bg-green-900/20";
            default: return "text-gray-500 bg-gray-100 dark:bg-gray-800";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20";
            case "investigating": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20";
            case "resolved": return "bg-green-100 text-green-800 dark:bg-green-900/20";
            case "dismissed": return "bg-gray-100 text-gray-800 dark:bg-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${getPriorityColor(report.priority)}`}>
                            <Flag className="w-4 h-4" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Report #{report.id}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className={getStatusColor(report.status)}>
                                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                </Badge>
                                <Badge variant="secondary">{report.category}</Badge>
                                <Badge variant="outline">{report.priority} priority</Badge>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">Report Details</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{report.content}</p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Reported Content</h4>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-sm font-mono">{report.originalPost}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Report Reason</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{report.reportReason}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Reported by:</span>
                            <span className="ml-2 font-medium">{report.reportedBy}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Post type:</span>
                            <span className="ml-2 font-medium">{report.postType}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Report time:</span>
                            <span className="ml-2 font-medium">{report.reportedAt}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Post ID:</span>
                            <span className="ml-2 font-mono text-xs">{report.postId}</span>
                        </div>
                    </div>

                    {report.moderatorNotes && (
                        <div>
                            <h4 className="font-medium mb-2">Moderator Notes</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{report.moderatorNotes}</p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex space-x-2">
                {report.status === "pending" && (
                    <>
                        <Button size="sm" onClick={() => onResolve(report.id)}>
                            <Check className="w-4 h-4 mr-1" />
                            Resolve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onInvestigate(report.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Investigate
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => onDismiss(report.id)}>
                            <X className="w-4 h-4 mr-1" />
                            Dismiss
                        </Button>
                    </>
                )}
                <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    View Post
                </Button>
            </CardFooter>
        </Card>
    );
};

const UserRow = ({ user, onAction }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "active": return "bg-green-100 text-green-800 dark:bg-green-900/20";
            case "warned": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20";
            case "suspended": return "bg-red-100 text-red-800 dark:bg-red-900/20";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="p-4">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                </div>
            </td>
            <td className="p-4">
                <Badge className={getStatusColor(user.status)}>
                    {user.status}
                </Badge>
            </td>
            <td className="p-4 text-sm">
                {user.major} • {user.year}
            </td>
            <td className="p-4 text-sm">{user.posts}</td>
            <td className="p-4 text-sm">{user.reports}</td>
            <td className="p-4 text-sm">{user.warnings}</td>
            <td className="p-4 text-sm">{user.lastActive}</td>
            <td className="p-4">
                <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                        <Mail className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                        <Ban className="w-3 h-3" />
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default function AdminPage() {
    const [reports, setReports] = useState(mockReports);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredReports = reports.filter(report => {
        const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;
        const matchesSearch = report.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleResolveReport = (reportId) => {
        setReports(reports.map(r =>
            r.id === reportId ? { ...r, status: "resolved" } : r
        ));
    };

    const handleInvestigateReport = (reportId) => {
        setReports(reports.map(r =>
            r.id === reportId ? { ...r, status: "investigating" } : r
        ));
    };

    const handleDismissReport = (reportId) => {
        setReports(reports.map(r =>
            r.id === reportId ? { ...r, status: "dismissed" } : r
        ));
    };

    const pendingReports = reports.filter(r => r.status === "pending").length;
    const highPriorityReports = reports.filter(r => r.priority === "high" && r.status === "pending").length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MainNavigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                <Shield className="w-8 h-8 mr-3 text-blue-500" />
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Content moderation and community management
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Export Data
                            </Button>
                            <Button variant="outline">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Analytics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                <div>
                                    <div className="text-2xl font-bold">{mockAnalytics.totalUsers.toLocaleString()}</div>
                                    <div className="text-sm text-gray-600">Total Users</div>
                                    <div className="text-xs text-green-600">
                                        {mockAnalytics.activeUsers.toLocaleString()} active
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <MessageCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <div className="text-2xl font-bold">{mockAnalytics.totalPosts.toLocaleString()}</div>
                                    <div className="text-sm text-gray-600">Total Posts</div>
                                    <div className="text-xs text-blue-600">+234 today</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Flag className="w-5 h-5 text-yellow-500" />
                                <div>
                                    <div className="text-2xl font-bold">{pendingReports}</div>
                                    <div className="text-sm text-gray-600">Pending Reports</div>
                                    <div className="text-xs text-red-600">{highPriorityReports} high priority</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5 text-purple-500" />
                                <div>
                                    <div className="text-2xl font-bold">{mockAnalytics.communityScore}</div>
                                    <div className="text-sm text-gray-600">Community Score</div>
                                    <div className="text-xs text-green-600">+0.3 this week</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="reports" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="reports">Reports ({pendingReports})</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="reports" className="space-y-6">
                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search reports..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Reports</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="investigating">Investigating</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="dismissed">Dismissed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Reports List */}
                        <div>
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report) => (
                                    <ReportCard
                                        key={report.id}
                                        report={report}
                                        onResolve={handleResolveReport}
                                        onInvestigate={handleInvestigateReport}
                                        onDismiss={handleDismissReport}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        No reports found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {selectedStatus === "all"
                                            ? "No reports match your search criteria."
                                            : "No reports with this status found."
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">User Management</h3>
                            <div className="flex space-x-2">
                                <Input placeholder="Search users..." className="w-64" />
                                <Button variant="outline">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th className="p-4 text-left font-medium">User</th>
                                                <th className="p-4 text-left font-medium">Status</th>
                                                <th className="p-4 text-left font-medium">Details</th>
                                                <th className="p-4 text-left font-medium">Posts</th>
                                                <th className="p-4 text-left font-medium">Reports</th>
                                                <th className="p-4 text-left font-medium">Warnings</th>
                                                <th className="p-4 text-left font-medium">Last Active</th>
                                                <th className="p-4 text-left font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockUsers.map((user) => (
                                                <UserRow key={user.id} user={user} onAction={() => { }} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="content" className="space-y-6">
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Content Management
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Content moderation tools will be available here
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        {/* Content Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Categories</CardTitle>
                                <CardDescription>Distribution of posts by category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockAnalytics.topCategories.map((category) => (
                                        <div key={category.name} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="font-medium">{category.name}</div>
                                                <Badge variant="secondary">{category.posts.toLocaleString()} posts</Badge>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{ width: `${category.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600 w-12">{category.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Charts Placeholder */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>User Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-center text-gray-500">
                                            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                                            <p>User activity chart</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Report Trends</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-center text-gray-500">
                                            <Activity className="w-12 h-12 mx-auto mb-2" />
                                            <p>Report trends chart</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Moderation Settings</CardTitle>
                                    <CardDescription>Configure automatic moderation rules</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Auto-flag inappropriate content</div>
                                            <div className="text-sm text-gray-600">Use AI to detect problematic posts</div>
                                        </div>
                                        <Badge variant="outline">Enabled</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Spam detection</div>
                                            <div className="text-sm text-gray-600">Automatically detect spam posts</div>
                                        </div>
                                        <Badge variant="outline">Enabled</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">User verification required</div>
                                            <div className="text-sm text-gray-600">Require university email verification</div>
                                        </div>
                                        <Badge variant="outline">Enabled</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Community Guidelines</CardTitle>
                                    <CardDescription>Manage community standards</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Edit Community Guidelines
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Update Terms of Service
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Privacy Policy Settings
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <BottomNavigation />
        </div>
    );
}
