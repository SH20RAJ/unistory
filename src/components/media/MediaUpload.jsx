"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    ImageIcon,
    VideoIcon,
    FilePlus,
    Upload,
    X,
    Loader2,
    LucideBookAudio,
} from "lucide-react";

/**
 * MediaUpload Component
 * A comprehensive media upload component with preview capabilities
 * for images, videos, and audio files.
 */
export function MediaUpload({ 
    onUpload, 
    maxFiles = 5, 
    allowedTypes = ["image", "video", "audio"],
    children
}) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        addFiles(newFiles);
    };

    const addFiles = (newFiles) => {
        // Check if adding new files would exceed limit
        if (files.length + newFiles.length > maxFiles) {
            alert(`You can only upload a maximum of ${maxFiles} files.`);
            return;
        }

        // Process and validate each file
        const processedFiles = newFiles.map(file => {
            const fileType = file.type.split('/')[0];
            const isAllowed = allowedTypes.includes(fileType);

            return {
                file,
                id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                name: file.name,
                size: file.size,
                type: fileType,
                valid: isAllowed,
                url: isAllowed ? URL.createObjectURL(file) : null
            };
        }).filter(file => file.valid);

        if (processedFiles.length === 0) {
            alert(`Please select valid file types: ${allowedTypes.join(', ')}`);
            return;
        }

        setFiles([...files, ...processedFiles]);
        
        // Simulate upload immediately (in a real app, this would be an API call)
        simulateUpload(processedFiles);
    };

    const simulateUpload = (filesToUpload) => {
        setUploading(true);
        setProgress(0);
        
        // Simulate progress updates
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    
                    // Call the onUpload callback with all files
                    if (onUpload) {
                        onUpload([...files, ...filesToUpload]);
                    }
                    
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 200);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(Array.from(e.dataTransfer.files));
        }
    };

    const removeFile = (id) => {
        setFiles(files.filter(file => file.id !== id));
    };

    // If children are provided, render them with click handler
    if (children) {
        return (
            <>
                <div
                    onClick={() => fileInputRef.current?.click()}
                >
                    {children}
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={maxFiles > 1}
                    accept={allowedTypes.map(type => `${type}/*`).join(",")}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </>
        );
    }

    return (
        <div className="w-full">
            <div
                className={`border-2 border-dashed rounded-lg p-4 text-center ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={maxFiles > 1}
                    accept={allowedTypes.map(type => `${type}/*`).join(",")}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="flex flex-col items-center justify-center py-4">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">
                        <FilePlus className="h-6 w-6 text-primary" />
                    </div>
                    <p className="mb-1 font-medium">
                        {dragActive ? 'Drop files to upload' : 'Drop files here or click to upload'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {allowedTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')} files only (max {maxFiles})
                    </p>
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="mt-4"
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Select Files
                    </Button>
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map(file => (
                        <Card key={file.id} className="overflow-hidden">
                            <CardContent className="p-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-md bg-primary/10 p-2">
                                        {file.type === 'image' && <ImageIcon className="h-5 w-5 text-primary" />}
                                        {file.type === 'video' && <VideoIcon className="h-5 w-5 text-primary" />}
                                        {file.type === 'audio' && <LucideBookAudio className="h-5 w-5 text-primary" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFile(file.id)}
                                        disabled={uploading}
                                        className="h-8 w-8"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                {uploading && (
                                    <Progress className="mt-2" value={progress} />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MediaUpload;
