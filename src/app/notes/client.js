"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, Calendar, BookOpen, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Sample notes data
const sampleNotes = [
    {
        id: 1,
        title: "Linear Algebra Chapter 3",
        content: "Vector spaces and linear transformations. Key concepts include basis vectors, dimension, and span. Remember that a basis must be linearly independent and span the entire space.",
        subject: "Mathematics",
        tags: ["linear-algebra", "vectors", "midterm"],
        createdAt: "2024-03-10T14:30:00Z",
        updatedAt: "2024-03-10T14:30:00Z"
    },
    {
        id: 2,
        title: "Psychology Research Methods",
        content: "Experimental design principles: control groups, random assignment, operational definitions. Correlation vs causation is crucial for understanding research validity.",
        subject: "Psychology",
        tags: ["research", "experimental-design", "final"],
        createdAt: "2024-03-09T10:15:00Z",
        updatedAt: "2024-03-09T10:15:00Z"
    },
    {
        id: 3,
        title: "Organic Chemistry Reactions",
        content: "SN1 vs SN2 mechanisms depend on substrate structure and nucleophile strength. Primary carbons favor SN2, tertiary favor SN1. Protic solvents stabilize SN1.",
        subject: "Chemistry",
        tags: ["organic", "mechanisms", "quiz"],
        createdAt: "2024-03-08T16:45:00Z",
        updatedAt: "2024-03-08T16:45:00Z"
    }
];

export default function NotesClientPage() {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        subject: ''
    });

    useEffect(() => {
        // Initialize with sample data
        setNotes(sampleNotes);
    }, []);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleCreateNote = async () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error("Please fill in title and content");
            return;
        }

        setLoading(true);
        try {
            const newNote = {
                id: Date.now(),
                title: formData.title,
                content: formData.content,
                subject: formData.subject || 'General',
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            setNotes([newNote, ...notes]);
            setFormData({ title: '', content: '', tags: '', subject: '' });
            setIsCreateDialogOpen(false);
            toast.success("Note created successfully!");
        } catch (error) {
            toast.error("Failed to create note");
        } finally {
            setLoading(false);
        }
    };

    const handleEditNote = async () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error("Please fill in title and content");
            return;
        }

        setLoading(true);
        try {
            const updatedNotes = notes.map(note =>
                note.id === selectedNote.id
                    ? {
                        ...note,
                        title: formData.title,
                        content: formData.content,
                        subject: formData.subject || 'General',
                        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                        updatedAt: new Date().toISOString()
                    }
                    : note
            );

            setNotes(updatedNotes);
            setIsEditDialogOpen(false);
            setSelectedNote(null);
            toast.success("Note updated successfully!");
        } catch (error) {
            toast.error("Failed to update note");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteNote = async () => {
        setLoading(true);
        try {
            setNotes(notes.filter(note => note.id !== selectedNote.id));
            setIsDeleteDialogOpen(false);
            setSelectedNote(null);
            toast.success("Note deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete note");
        } finally {
            setLoading(false);
        }
    };

    const openEditDialog = (note) => {
        setSelectedNote(note);
        setFormData({
            title: note.title,
            content: note.content,
            tags: note.tags.join(', '),
            subject: note.subject
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (note) => {
        setSelectedNote(note);
        setIsDeleteDialogOpen(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            My Notes
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Organize your study materials and class notes
                        </p>
                    </div>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-4 sm:mt-0">
                                <Plus className="w-4 h-4 mr-2" />
                                New Note
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Note</DialogTitle>
                                <DialogDescription>
                                    Add a new note to your collection
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Enter note title..."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="e.g., Mathematics, Chemistry..."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Write your note content here..."
                                        className="min-h-[200px]"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="tags">Tags (comma separated)</Label>
                                    <Input
                                        id="tags"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="e.g., midterm, important, chapter-3..."
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsCreateDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateNote} disabled={loading}>
                                        {loading ? "Creating..." : "Create Note"}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                        <Card key={note.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg font-semibold truncate">
                                            {note.title}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            <div className="flex items-center space-x-2">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{note.subject}</span>
                                            </div>
                                        </CardDescription>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEditDialog(note)}>
                                                <Edit2 className="w-4 h-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => openDeleteDialog(note)}
                                                className="text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                                    {note.content}
                                </p>
                                <div className="space-y-3">
                                    {note.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {note.tags.map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {formatDate(note.updatedAt)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredNotes.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {searchTerm ? 'No matching notes found' : 'No notes yet'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {searchTerm
                                ? 'Try adjusting your search terms'
                                : 'Create your first note to get started organizing your studies'}
                        </p>
                        {!searchTerm && (
                            <Button onClick={() => setIsCreateDialogOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Create First Note
                            </Button>
                        )}
                    </div>
                )}

                {/* Edit Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit Note</DialogTitle>
                            <DialogDescription>
                                Make changes to your note
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                    id="edit-title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter note title..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-subject">Subject</Label>
                                <Input
                                    id="edit-subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="e.g., Mathematics, Chemistry..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-content">Content</Label>
                                <Textarea
                                    id="edit-content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your note content here..."
                                    className="min-h-[200px]"
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                                <Input
                                    id="edit-tags"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="e.g., midterm, important, chapter-3..."
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleEditNote} disabled={loading}>
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Note</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete "{selectedNote?.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteNote}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
