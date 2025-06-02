"use client";

import { useState, useEffect } from "react";
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
    useAdminReportsMutable,
    useAdminUsersMutable,
    useAdminAnalyticsMutable
} from "@/hooks/useSWR";
import { toast } from "sonner";
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

    const handleStatusUpdate = async (newStatus) => {
        try {
            await onAction(user.id, newStatus, `User status updated to ${newStatus}`);
            toast.success(`User ${newStatus} successfully`);
        } catch (error) {
            toast.error("Failed to update user status");
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
                {user.major || "N/A"} • {user.year || "N/A"}
            </td>
            <td className="p-4 text-sm">{user.postCount || 0}</td>
            <td className="p-4 text-sm">{user.reportCount || 0}</td>
            <td className="p-4 text-sm">{user.warningCount || 0}</td>
            <td className="p-4 text-sm">{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "N/A"}</td>
            <td className="p-4">
                <div className="flex space-x-1">
                    <Button size="sm" variant="outline" title="View Profile">
                        <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" title="Send Message">
                        <Mail className="w-3 h-3" />
                    </Button>
                    {user.status === "active" && (
                        <Button
                            size="sm"
                            variant="outline"
                            title="Warn User"
                            onClick={() => handleStatusUpdate("warned")}
                        >
                            <AlertTriangle className="w-3 h-3" />
                        </Button>
                    )}
                    {user.status !== "suspended" && (
                        <Button
                            size="sm"
                            variant="outline"
                            title="Suspend User"
                            onClick={() => handleStatusUpdate("suspended")}
                        >
                            <Ban className="w-3 h-3" />
                        </Button>
                    )}
                    {user.status === "suspended" && (
                        <Button
                            size="sm"
                            variant="outline"
                            title="Reactivate User"
                            onClick={() => handleStatusUpdate("active")}
                        >
                            <Unlock className="w-3 h-3" />
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default function AdminPage() {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [userFilters, setUserFilters] = useState({});
    const [page, setPage] = useState(1);
    const [userPage, setUserPage] = useState(1);
    const limit = 10;

    // SWR hooks for data fetching
    const reportFilters = {
        ...(selectedStatus !== "all" && { status: selectedStatus }),
        ...(searchQuery && { search: searchQuery })
    };

    const {
        data: reportsData,
        error: reportsError,
        isLoading: reportsLoading,
        updateReportStatus
    } = useAdminReportsMutable(reportFilters, page, limit);

    const {
        data: usersData,
        error: usersError,
        isLoading: usersLoading,
        updateUserStatus
    } = useAdminUsersMutable(userFilters, userPage, limit);

    const {
        data: analyticsData,
        error: analyticsError,
        isLoading: analyticsLoading
    } = useAdminAnalyticsMutable();

    // Extract data from SWR responses
    const reports = reportsData?.reports || [];
    const users = usersData?.users || [];
    const analytics = analyticsData || {
        totalUsers: 0,
        activeUsers: 0,
        totalPosts: 0,
        reportsToday: 0,
        reportsThisWeek: 0,
        resolvedReports: 0,
        pendingReports: 0,
        communityScore: 0,
        topCategories: []
    };

    // Handle errors
    useEffect(() => {
        if (reportsError) {
            toast.error("Failed to load reports. Please try again.");
        }
        if (usersError) {
            toast.error("Failed to load users. Please try again.");
        }
        if (analyticsError) {
            toast.error("Failed to load analytics. Please try again.");
        }
    }, [reportsError, usersError, analyticsError]);

    const handleResolveReport = async (reportId) => {
        try {
            await updateReportStatus(reportId, "resolved", "Report resolved by admin", "content_approved");
            toast.success("Report resolved successfully");
        } catch (error) {
            toast.error("Failed to resolve report");
        }
    };

    const handleInvestigateReport = async (reportId) => {
        try {
            await updateReportStatus(reportId, "investigating", "Report under investigation", "under_review");
            toast.success("Report marked as investigating");
        } catch (error) {
            toast.error("Failed to update report status");
        }
    };

    const handleDismissReport = async (reportId) => {
        try {
            await updateReportStatus(reportId, "dismissed", "Report dismissed after review", "no_action_required");
            toast.success("Report dismissed");
        } catch (error) {
            toast.error("Failed to dismiss report");
        }
    };

    const pendingReports = analytics.pendingReports;
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
                                    <div className="text-2xl font-bold">
                                        {analyticsLoading ? "..." : analytics.totalUsers.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Users</div>
                                    <div className="text-xs text-green-600">
                                        {analyticsLoading ? "..." : `${analytics.activeUsers.toLocaleString()} active`}
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
                                    <div className="text-2xl font-bold">
                                        {analyticsLoading ? "..." : analytics.totalPosts.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Posts</div>
                                    <div className="text-xs text-blue-600">
                                        {analyticsLoading ? "..." : `+${analytics.reportsToday || 0} today`}
                                    </div>
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
                                    <div className="text-2xl font-bold">
                                        {analyticsLoading ? "..." : analytics.communityScore}
                                    </div>
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
                            {reportsLoading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                    <p className="mt-2 text-gray-500">Loading reports...</p>
                                </div>
                            ) : reports.length > 0 ? (
                                <>
                                    {reports.map((report) => (
                                        <ReportCard
                                            key={report.id}
                                            report={report}
                                            onResolve={handleResolveReport}
                                            onInvestigate={handleInvestigateReport}
                                            onDismiss={handleDismissReport}
                                        />
                                    ))}

                                    {/* Reports Pagination */}
                                    {reportsData?.pagination && (
                                        <div className="flex items-center justify-between mt-6">
                                            <p className="text-sm text-gray-600">
                                                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, reportsData.pagination.total)} of {reportsData.pagination.total} reports
                                            </p>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={page <= 1}
                                                    onClick={() => setPage(page - 1)}
                                                >
                                                    Previous
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={page >= reportsData.pagination.totalPages}
                                                    onClick={() => setPage(page + 1)}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
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
                                <Input
                                    placeholder="Search users..."
                                    className="w-64"
                                    value={userFilters.search || ""}
                                    onChange={(e) => setUserFilters({ ...userFilters, search: e.target.value })}
                                />
                                <Select
                                    value={userFilters.status || "all"}
                                    onValueChange={(value) => setUserFilters({ ...userFilters, status: value === "all" ? undefined : value })}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Users</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="warned">Warned</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                            {usersLoading ? (
                                                <tr>
                                                    <td colSpan={8} className="p-8 text-center">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                                                        <p className="mt-2 text-gray-500">Loading users...</p>
                                                    </td>
                                                </tr>
                                            ) : users.length > 0 ? (
                                                users.map((user) => (
                                                    <UserRow key={user.id} user={user} onAction={updateUserStatus} />
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="p-8 text-center">
                                                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                        <p className="text-gray-500">No users found</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Users Pagination */}
                        {usersData?.pagination && (
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Showing {((userPage - 1) * limit) + 1} to {Math.min(userPage * limit, usersData.pagination.total)} of {usersData.pagination.total} users
                                </p>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={userPage <= 1}
                                        onClick={() => setUserPage(userPage - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={userPage >= usersData.pagination.totalPages}
                                        onClick={() => setUserPage(userPage + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
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
                                    {analyticsLoading ? (
                                        <div className="text-center py-8">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                                            <p className="mt-2 text-gray-500">Loading categories...</p>
                                        </div>
                                    ) : analytics.topCategories && analytics.topCategories.length > 0 ? (
                                        analytics.topCategories.map((category) => (
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
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-500">No category data available</p>
                                        </div>
                                    )}
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
