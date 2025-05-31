"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const errorParam = searchParams.get("error");

    useEffect(() => {
        if (errorParam) {
            switch (errorParam) {
                case "OAuthSignin":
                    setError("Error signing in with Google. Please try again.");
                    break;
                case "OAuthCallback":
                    setError("Error during authentication callback. Please try again.");
                    break;
                case "OAuthCreateAccount":
                    setError("Could not create account. Please ensure you're using a .edu email address.");
                    break;
                case "EmailCreateAccount":
                    setError("Could not create account with this email.");
                    break;
                case "Callback":
                    setError("Authentication error. Please try again.");
                    break;
                case "OAuthAccountNotLinked":
                    setError("Account not linked. Please sign in with the same provider you used before.");
                    break;
                case "EmailSignin":
                    setError("Check your email for the sign-in link.");
                    break;
                case "CredentialsSignin":
                    setError("Invalid credentials. Please check your email and password.");
                    break;
                case "SessionRequired":
                    setError("Please sign in to access this page.");
                    break;
                case "AccessDenied":
                    setError("Access denied. Please use a .edu email address to sign in.");
                    break;
                default:
                    setError("An unexpected error occurred. Please try again.");
            }
        }
    }, [errorParam]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("google", {
                callbackUrl,
                redirect: false,
            });

            if (result?.error) {
                setError("Failed to sign in with Google. Please try again.");
            } else if (result?.ok) {
                router.push(callbackUrl);
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">U</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Unistory
                            </span>
                        </div>

                        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>
                            Sign in to your Unistory account with your college email
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    🎓 College students only - use your .edu email
                                </div>
                            </div>

                            <Button
                                onClick={handleGoogleSignIn}
                                disabled={isLoading}
                                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                                size="lg"
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    <FcGoogle className="w-5 h-5" />
                                    <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
                                </div>
                            </Button>

                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                <p>
                                    By signing in, you agree to our{" "}
                                    <Link href="/terms" className="text-blue-600 hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Trust Indicators */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Verified Students Only
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Safe & Secure
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            Privacy First
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
