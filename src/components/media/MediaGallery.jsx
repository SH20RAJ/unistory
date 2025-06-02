"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

/**
 * MediaGallery Component
 * Displays a collection of media items with navigation
 */
export function MediaGallery({ items = [], maxHeight = "500px" }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = useCallback(() => {
        setActiveIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
    }, [items.length]);

    const handleNext = useCallback(() => {
        setActiveIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
    }, [items.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext]);

    if (!items || items.length === 0) return null;

    // Single media item
    if (items.length === 1) {
        return (
            <div className="overflow-hidden rounded-md" style={{ maxHeight }}>
                <MediaItem item={items[0]} />
            </div>
        );
    }

    // Multiple media items
    return (
        <div className="relative">
            <div className="overflow-hidden rounded-md" style={{ maxHeight }}>
                <MediaItem item={items[activeIndex]} />
            </div>

            {/* Navigation indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-white scale-110' : 'bg-white/60'}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>

            {/* Navigation buttons */}
            {items.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full bg-black/20 hover:bg-black/40 text-white h-8 w-8"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-black/20 hover:bg-black/40 text-white h-8 w-8"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </>
            )}
        </div>
    );
}

/**
 * MediaItem Component
 * Renders a single media item (image, video, or audio)
 */
function MediaItem({ item }) {
    if (!item) return null;

    // For images
    if (item.type === 'image') {
        return (
            <div className="relative w-full h-full aspect-video">
                <Image
                    src={item.src}
                    alt={item.title || 'Image'}
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    // For videos
    if (item.type === 'video') {
        return <VideoPlayer src={item.src} title={item.title} />;
    }

    // For audio
    if (item.type === 'audio') {
        return <AudioPlayer src={item.src} title={item.title} />;
    }

    // Fallback for unknown media types
    return (
        <div className="flex items-center justify-center h-40 bg-muted">
            <p className="text-muted-foreground">Unsupported media format</p>
        </div>
    );
}

/**
 * VideoPlayer Component
 * A custom video player with basic controls
 */
function VideoPlayer({ src, title }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Handle video events
    useEffect(() => {
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            setProgress((video.currentTime / video.duration) * 100);
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handlePlayToggle = () => {
        const video = videoRef.current;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const position = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
        const newTime = position * duration;

        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress(position * 100);
    };

    const handleFullscreenToggle = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            videoRef.current.requestFullscreen();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="relative group">
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain"
                playsInline
            />

            {/* Video controls */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-black/30 text-white"
                    onClick={handlePlayToggle}
                >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
            </div>

            {/* Progress bar and additional controls */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                    className="w-full h-1 bg-white/30 rounded cursor-pointer mb-2"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-white rounded"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-xs text-white">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white"
                        onClick={handleFullscreenToggle}
                    >
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

/**
 * AudioPlayer Component
 * A custom audio player with basic controls
 */
function AudioPlayer({ src, title }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    // Handle audio events
    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const handlePlayToggle = () => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const position = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
        const newTime = position * duration;

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress(position * 100);
    };

    const handleVolumeToggle = () => {
        const audio = audioRef.current;

        if (isMuted) {
            audio.volume = volume;
        } else {
            audio.volume = 0;
        }

        setIsMuted(!isMuted);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="p-4 bg-muted/30 rounded-md">
            <audio ref={audioRef} src={src} className="hidden" />

            <div className="flex items-center gap-4">
                {/* Play/Pause button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-primary/10 text-primary"
                    onClick={handlePlayToggle}
                >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex-1">
                    {/* Title */}
                    <p className="text-sm font-medium mb-1">{title || 'Audio'}</p>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            {formatTime(currentTime)}
                        </span>

                        <div
                            className="flex-1 h-1 bg-muted-foreground/20 rounded cursor-pointer"
                            onClick={handleProgressClick}
                        >
                            <div
                                className="h-full bg-primary rounded"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <span className="text-xs text-muted-foreground">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                {/* Volume button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={handleVolumeToggle}
                >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
}

export default MediaGallery;
