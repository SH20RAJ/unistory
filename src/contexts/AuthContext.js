"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useSWRFetch } from '@/hooks/useSWR'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnboarded, setIsOnboarded] = useState(false)
  const router = useRouter()

  // Use SWR to fetch user data if session exists
  const { data: userData, error: userError, mutate: mutateUser } = useSWRFetch(
    session?.user?.email ? `/api/users?email=${encodeURIComponent(session.user.email)}` : null,
    { revalidateOnFocus: false } // Don't revalidate on focus to reduce API calls
  )

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
      return
    }

    if (status === 'unauthenticated') {
      setIsLoading(false)
      setUser(null)
      setIsOnboarded(false)
      return
    }

    // If we have userData from SWR, use it
    if (userData) {
      setUser(userData)
      setIsOnboarded(!!userData.university && !!userData.major)
      setIsLoading(false)
    }
    // If SWR returned 404, create new user
    else if (userError?.status === 404 && session?.user?.email) {
      createUser(session.user)
    }
    // If no SWR data yet but we have session, fallback to old method
    else if (!userData && session?.user?.email) {
      checkOrCreateUser(session.user)
    }
  }, [session, status, userData, userError, createUser, checkOrCreateUser])

  // Legacy method for fallback
  const checkOrCreateUser = useCallback(async (sessionUser) => {
    try {
      setIsLoading(true)

      // First, try to get existing user
      const response = await fetch(`/api/users?email=${encodeURIComponent(sessionUser.email)}`)

      if (response.ok) {
        const { data: existingUser } = await response.json()
        setUser(existingUser)
        setIsOnboarded(!!existingUser.university && !!existingUser.major)
      } else if (response.status === 404) {
        // User doesn't exist, create new user
        await createUser(sessionUser)
      }
    } catch (error) {
      console.error('Error checking/creating user:', error)
    } finally {
      setIsLoading(false)
    }
  }, [createUser])

  // Method to create a new user
  const createUser = useCallback(async (sessionUser) => {
    try {
      setIsLoading(true)
      const createResponse = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: sessionUser.email,
          name: sessionUser.name,
          image: sessionUser.image
        })
      })

      if (createResponse.ok) {
        const { data: newUser } = await createResponse.json()
        setUser(newUser)
        setIsOnboarded(false) // New user needs onboarding

        // Update SWR cache with new user
        if (mutateUser) {
          mutateUser();
        }
      } else {
        console.error('Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    } finally {
      setIsLoading(false)
    }
  }, [mutateUser])

  const completeOnboarding = async (onboardingData) => {
    if (!user?.email) return false

    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          ...onboardingData
        })
      })

      if (response.ok) {
        const { data: updatedUser } = await response.json()
        setUser(updatedUser)
        setIsOnboarded(true)

        // Update the SWR cache
        if (mutateUser) {
          mutateUser(updatedUser, false); // false means we don't need to revalidate, we already have latest data
        }

        return true
      }
      return false
    } catch (error) {
      console.error('Error completing onboarding:', error)
      return false
    }
  }

  const handleSignOut = async () => {
    setUser(null)
    setIsOnboarded(false)
    await signOut({ callbackUrl: '/' })
  }

  const redirectToApp = useCallback(() => {
    if (isOnboarded) {
      router.push('/dashboard')
    } else {
      router.push('/onboarding')
    }
  }, [isOnboarded, router])

  const value = {
    // Session data
    session,
    user,
    isLoading,
    isAuthenticated: !!session,
    isOnboarded,

    // Auth methods
    signIn,
    signOut: handleSignOut,

    // User management
    completeOnboarding,
    redirectToApp,
    refreshUser: () => {
      if (mutateUser) {
        return mutateUser();
      } else {
        return checkOrCreateUser(session?.user);
      }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
