"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

const errorMessages = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "Access denied. Please use a .edu email address to sign in.",
    Verification: "The verification token has expired or has already been used.",
    Default: "An unexpected error occurred during authentication.",
};

export default function AuthErrorClient() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error") || "Default";

    const errorMessage = errorMessages[error] || errorMessages.Default;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to Home */}
                <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to home
                </Link>

                <Card className="border-0 shadow-xl">
                    <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            Authentication Error
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                            We encountered an issue while trying to sign you in
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <AlertDescription className="text-red-800 dark:text-red-200">
                                {errorMessage}
                            </AlertDescription>
                        </Alert>

                        <div className="flex flex-col gap-3 mt-6">
                            <Button asChild className="w-full">
                                <Link href="/auth/signin">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Link>
                            </Button>

                            <Button variant="outline" asChild className="w-full">
                                <Link href="/">
                                    Go to Homepage
                                </Link>
                            </Button>
                        </div>

                        {error === "AccessDenied" && (
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                                    Why do I need a .edu email?
                                </h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    Unistory is exclusively for verified college students. 
                                    Using your official university email ensures our community 
                                    remains authentic and secure.
                                </p>
                            </div>
                        )}

                        {error === "Configuration" && (
                            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                                    Need Help?
                                </h4>
                                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                                    If this problem persists, please contact our support team.
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="mailto:support@unistory.in">
                                        Contact Support
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
