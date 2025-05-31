"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export function SignInButton({ className }) {
    return (
        <Button
            onClick={() => signIn("google")}
            variant="outline"
            className={className}
        >
            <FcGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
        </Button>
    )
}

export function SignInCard() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle>Welcome to Unistory</CardTitle>
                <CardDescription>
                    Connect with verified college students
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <SignInButton className="w-full" />
                <p className="text-xs text-muted-foreground text-center">
                    Only .edu email addresses are allowed
                </p>
            </CardContent>
        </Card>
    )
}
