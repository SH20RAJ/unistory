"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    VideoIcon,
    FilePlus,
    Upload,
    X,
    Loader2,
    Play,
    Pause,
    Volume2,
    AudioLinesIcon
} from "lucide-react";

/**
 * MediaUpload Component
 * A comprehensive media upload component with preview capabilities
 * for images, videos, and audio files.
 */
export function MediaUpload({ onUpload, maxFiles = 5, allowedTypes = ["image", "video", "audio"] }) {
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
                type: fileType,
                size: file.size,
                sizeFormatted: formatFileSize(file.size),
                preview: fileType === 'image' ? URL.createObjectURL(file) : null,
                error: isAllowed ? null : `${fileType} files are not allowed`,
                progress: 0,
                uploaded: false
            };
        });

        // Filter out files that aren't allowed
        const validFiles = processedFiles.filter(f => !f.error);

        // Add new files to state
        setFiles([...files, ...validFiles]);
    };

    const removeFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files.length) {
            addFiles(Array.from(e.dataTransfer.files));
        }
    };

    const uploadFiles = async () => {
        if (files.length === 0) {
            return;
        }

        setUploading(true);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                // Once completed, update files to mark them as uploaded
                setFiles(files.map(f => ({ ...f, uploaded: true })));
                setUploading(false);

                // Call onUpload callback with all file data
                if (onUpload) {
                    onUpload(files);
                }
            }
        }, 200);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const renderFilePreview = (file) => {
        switch (file.type) {
            case 'image':
                return (
                    <div className="relative">
                        <img
                            src={file.preview}
                            alt={file.name}
                            className="w-full h-32 object-cover rounded-lg"
                        />
                        {file.uploaded && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        )}
                    </div>
                );

            case 'video':
                return (
                    <div className="relative bg-gray-900 rounded-lg flex items-center justify-center h-32">
                        <VideoIcon className="h-8 w-8 text-gray-400" />
                        <div className="absolute bottom-2 left-2 right-2 text-xs text-gray-300 truncate">
                            {file.name}
                        </div>
                    </div>
                );

            case 'audio':
                return (
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center h-32">
                        <AudioLinesIcon className="h-8 w-8 text-white" />
                        <div className="absolute bottom-2 left-2 right-2 text-xs text-white truncate">
                            {file.name}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center h-32">
                        <FilePlus className="h-8 w-8 text-gray-500" />
                        <div className="absolute bottom-2 left-2 right-2 text-xs truncate">
                            {file.name}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full space-y-4">
            <div
                className={`upload-zone ${dragActive ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                    accept={allowedTypes.map(type => `${type}/*`).join(',')}
                />

                <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="mb-1 text-lg font-medium text-gray-800 dark:text-gray-200">
                        Drag and drop your files here
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        or click to select files
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Supported formats: Images, Videos, Audio • Max {maxFiles} files
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                            {files.map((file) => (
                                <div key={file.id} className="relative">
                                    {renderFilePreview(file)}
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                            {file.sizeFormatted}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 rounded-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(file.id);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {files.length > 0 && (
                            <div className="mt-4">
                                {uploading ? (
                                    <div className="space-y-2">
                                        <Progress value={progress} />
                                        <div className="text-sm text-gray-500 text-center">
                                            Uploading {files.length} {files.length === 1 ? 'file' : 'files'}... {progress}%
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        className="w-full"
                                        onClick={uploadFiles}
                                        disabled={files.every(f => f.uploaded)}
                                    >
                                        {files.every(f => f.uploaded) ? (
                                            'All files uploaded'
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload {files.length} {files.length === 1 ? 'file' : 'files'}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

/**
 * MediaPlayer Component
 * A versatile media player that supports images, videos, and audio
 */
export function MediaPlayer({ src, type, poster, title, preview = true }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const mediaRef = useRef(null);

    const togglePlay = () => {
        if (!mediaRef.current) return;

        if (isPlaying) {
            mediaRef.current.pause();
        } else {
            mediaRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleLoad = () => {
        setIsLoaded(true);
    };

    if (type === 'image') {
        return (
            <div className="media-card">
                <img
                    src={src}
                    alt={title || "Image"}
                    className="w-full h-auto rounded-lg"
                    onLoad={handleLoad}
                />
                {!isLoaded && (
                    <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    if (type === 'video') {
        return (
            <div className="media-card relative">
                <video
                    ref={mediaRef}
                    src={src}
                    poster={poster}
                    className="w-full h-auto rounded-lg"
                    onLoadedData={handleLoad}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controls={!preview}
                />

                {preview && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white"
                            onClick={togglePlay}
                        >
                            {isPlaying ?
                                <Pause className="h-6 w-6" /> :
                                <Play className="h-6 w-6" />
                            }
                        </Button>
                    </div>
                )}

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    if (type === 'audio') {
        return (
            <div className="media-card bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/20 hover:bg-white/40 text-white"
                        onClick={togglePlay}
                    >
                        {isPlaying ?
                            <Pause className="h-6 w-6" /> :
                            <Play className="h-6 w-6" />
                        }
                    </Button>

                    <div className="flex-1">
                        <div className="text-sm font-medium text-white mb-1">
                            {title || "Audio track"}
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1.5">
                            <div className="bg-white h-1.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </div>

                    <Volume2 className="h-5 w-5 text-white/80" />
                </div>

                <audio
                    ref={mediaRef}
                    src={src}
                    className="hidden"
                    onLoadedData={handleLoad}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            </div>
        );
    }

    return null;
}

/**
 * MediaGallery Component
 * Displays a gallery of media items with different layouts based on count
 */
export function MediaGallery({ items = [] }) {
    if (items.length === 0) return null;

    if (items.length === 1) {
        return (
            <div className="media-gallery-single">
                <MediaPlayer
                    src={items[0].src}
                    type={items[0].type}
                    poster={items[0].poster}
                    title={items[0].title}
                    preview={true}
                />
            </div>
        );
    }

    if (items.length === 2) {
        return (
            <div className="media-gallery-grid grid grid-cols-2 gap-2">
                {items.map((item, index) => (
                    <MediaPlayer
                        key={index}
                        src={item.src}
                        type={item.type}
                        poster={item.poster}
                        title={item.title}
                        preview={true}
                    />
                ))}
            </div>
        );
    }

    if (items.length === 3) {
        return (
            <div className="media-gallery-grid grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <MediaPlayer
                        src={items[0].src}
                        type={items[0].type}
                        poster={items[0].poster}
                        title={items[0].title}
                        preview={true}
                    />
                </div>
                <MediaPlayer
                    src={items[1].src}
                    type={items[1].type}
                    poster={items[1].poster}
                    title={items[1].title}
                    preview={true}
                />
                <MediaPlayer
                    src={items[2].src}
                    type={items[2].type}
                    poster={items[2].poster}
                    title={items[2].title}
                    preview={true}
                />
            </div>
        );
    }

    return (
        <div className="media-gallery-grid grid grid-cols-2 gap-2">
            <MediaPlayer
                src={items[0].src}
                type={items[0].type}
                poster={items[0].poster}
                title={items[0].title}
                preview={true}
            />
            <MediaPlayer
                src={items[1].src}
                type={items[1].type}
                poster={items[1].poster}
                title={items[1].title}
                preview={true}
            />
            <MediaPlayer
                src={items[2].src}
                type={items[2].type}
                poster={items[2].poster}
                title={items[2].title}
                preview={true}
            />
            <div className="relative">
                <MediaPlayer
                    src={items[3].src}
                    type={items[3].type}
                    poster={items[3].poster}
                    title={items[3].title}
                    preview={true}
                />
                {items.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl font-bold">+{items.length - 4}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
