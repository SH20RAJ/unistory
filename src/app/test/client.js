'use client'
import { SignInButton } from '@/components/auth/SignIn'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function TestClient() {
  // if session exists, redirect to home page
  const { data: session } = useSession()
  
  return (
    <div>
      {session && (
        <p className="text-center text-lg font-semibold">
          You are already signed in as {session.user.email}
        </p>
      )}
      <h1 className="text-2xl font-bold text-center mb-6">Sign In to Unistory</h1>
      <p className="text-center text-gray-600 mb-4">
        Connect with verified college students using your .edu email address.
      </p>
      <p className="text-center text-sm text-gray-500 mb-8">
        By signing in, you agree to our{' '}
        <a href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </p>
        
      <SignInButton/>
    </div>
  )
}
