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

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading, redirectToApp } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      redirectToApp()
    }
  }, [isAuthenticated, isLoading, redirectToApp])

  useEffect(() => {
    if (errorParam) {
      switch (errorParam) {
        case 'Configuration':
          setError('There is a problem with the server configuration.')
          break
        case 'AccessDenied':
          setError('Access denied. Please use a valid .edu email address to sign in.')
          break
        case 'Verification':
          setError('The verification link was invalid or has expired.')
          break
        default:
          setError('An error occurred during sign in. Please try again.')
      }
    }
  }, [errorParam])

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true)
      setError('')

      console.log('Starting Google sign-in...', { callbackUrl })
      
      // First, let's try the simple approach without timeout
      const result = await signIn('google', {
        callbackUrl,
        redirect: false // Let's use false to debug what's happening
      })
      
      console.log('Sign-in result:', result)
      
      if (result?.error) {
        console.error('Sign-in error:', result.error)
        if (result.error === 'AccessDenied') {
          setError('Please use a valid .edu email address to access Unistory.')
        } else {
          setError(`Sign-in failed: ${result.error}`)
        }
      } else if (result?.url) {
        console.log('Redirecting to:', result.url)
        window.location.href = result.url
      } else if (result?.ok) {
        console.log('Sign-in successful, redirecting...')
        window.location.href = callbackUrl
      } else {
        console.log('Unexpected result:', result)
        setError('Sign-in completed but redirect failed. Please try again.')
      }
      
    } catch (error) {
      console.error('Sign in error:', error)
      setError(`An error occurred: ${error.message}`)
    } finally {
      setIsSigningIn(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home link */}
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">U</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to Unistory
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Connect with your campus community
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Benefits section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Users className="w-5 h-5 text-blue-500" />
                <span>Connect with students at your university</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>Join study groups and academic circles</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Safe, verified community with .edu emails</span>
              </div>
            </div>

            {/* Sign in button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
              size="lg"
            >
              {isSigningIn ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-3"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </div>
              )}
            </Button>

            {/* .edu requirement notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-blue-800 font-medium">College Email Required</p>
                  <p className="text-blue-700 mt-1">
                    You must use your .edu email address to access Unistory and verify your student status.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms and privacy */}
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gray-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-gray-700">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
