"use client";

import { cn } from "@/lib/utils";

export function LoadingSpinner({ className, size = "default" }) {
    const sizeClasses = {
        sm: "w-4 h-4",
        default: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12"
    };

    return (
        <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-blue-600", sizeClasses[size], className)} />
    );
}

export function LoadingDots({ className }) {
    return (
        <div className={cn("flex space-x-1", className)}>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
    );
}

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-8">
                {/* App Logo with elegant animation */}
                <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                        <span className="text-white font-bold text-3xl tracking-tight">U</span>
                    </div>
                    {/* Elegant breathing animation */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 opacity-20 animate-pulse"></div>
                    <div className="absolute -inset-2 rounded-3xl border border-blue-500/20 animate-ping"></div>
                </div>

                {/* Minimalistic loading dots */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
                        Unistory
                    </p>
                </div>
            </div>
        </div>
    );
}

export function PageLoading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-600 dark:text-gray-400 text-sm">Loading...</p>
            </div>
        </div>
    );
}
