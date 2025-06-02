"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowLeft, AlertTriangle, Mail, Shield, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function SignInPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading, redirectToApp } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const errorParam = searchParams.get('error')

  useEffect(() => {
    // If error param is present, set the error
    if (errorParam) {
      switch (errorParam) {
        case 'AccessDenied':
          setError('Only verified college students with .edu emails can access Unistory.')
          break
        case 'CredentialsSignin':
          setError('Invalid credentials. Please check your email and password.')
          break
        default:
          setError('An error occurred during sign in. Please try again.')
      }
    }
  }, [errorParam])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      redirectToApp()
    }
  }, [isAuthenticated, isLoading, redirectToApp])

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true)
    setError('')
    try {
      await signIn('google', { callbackUrl })
    } catch (err) {
      console.error('Sign in error:', err)
      setError('Failed to sign in with Google. Please try again.')
      setIsSigningIn(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-500">Please wait</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Already signed in</h2>
          <p className="text-gray-500 mb-4">Redirecting you to your dashboard...</p>
          <Button onClick={redirectToApp}>Go to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex flex-col">
      {/* Back Link */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Unistory
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Sign in to Unistory</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with verified college students
            </p>
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center px-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    🎓 Sign in with your .edu email address
                  </p>
                </div>

                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                >
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{isSigningIn ? "Signing in..." : "Sign in with College Email"}</span>
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
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xs font-medium">Verified Students</h3>
            </div>
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xs font-medium">Safe Community</h3>
            </div>
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-2">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xs font-medium">Academic Focus</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
