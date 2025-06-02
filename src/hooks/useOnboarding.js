"use client";

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';

/**
 * Hook to track and manage user onboarding progress
 * @param {object} options - Configuration options
 * @param {boolean} options.redirectUnauth - Redirect unauthenticated users to sign in
 * @param {boolean} options.redirectOnboarded - Redirect already onboarded users to dashboard
 * @param {boolean} options.redirectNotOnboarded - Redirect non-onboarded users to onboarding
 * @returns {object} Onboarding status and control methods
 */
export function useOnboarding({
  redirectUnauth = true,
  redirectOnboarded = false,
  redirectNotOnboarded = false,
} = {}) {
  const { user, isAuthenticated, isLoading, isOnboarded, completeOnboarding } = useAuth();
  const [isUserReady, setIsUserReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Wait until auth state is determined
    if (isLoading) {
      return;
    }

    // Handle redirects based on authentication/onboarding status
    if (!isAuthenticated && redirectUnauth) {
      router.push('/auth/signin');
      return;
    }

    if (isAuthenticated && isOnboarded && redirectOnboarded) {
      router.push('/dashboard');
      return;
    }

    if (isAuthenticated && !isOnboarded && redirectNotOnboarded) {
      router.push('/onboarding');
      return;
    }

    // User is ready when we have determined their status
    setIsUserReady(true);
  }, [
    isLoading,
    isAuthenticated,
    isOnboarded,
    redirectUnauth,
    redirectOnboarded,
    redirectNotOnboarded,
    router,
  ]);

  /**
   * Complete the user's onboarding process
   * @param {object} data - Onboarding data to save
   * @returns {Promise<boolean>} Success status
   */
  const completeUserOnboarding = async (data) => {
    if (!isAuthenticated) {
      return false;
    }

    try {
      // This uses the completeOnboarding method from AuthContext
      const success = await completeOnboarding(data);

      if (success) {
        // Auto-redirect to dashboard on success if requested
        if (redirectOnboarded) {
          router.push('/dashboard');
        }
      }

      return success;
    } catch (error) {
      console.error("Error completing onboarding:", error);
      return false;
    }
  };

  // Return onboarding status and methods
  return {
    isUserReady,
    isOnboarded,
    isLoading,
    user,
    completeOnboarding: completeUserOnboarding,
  };
}
