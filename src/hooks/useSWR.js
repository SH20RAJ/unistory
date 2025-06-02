"use client";

import useSWR from 'swr';

// Global SWR configuration
const defaultConfig = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Set to 0 to disable auto-refresh
  shouldRetryOnError: true,
  dedupingInterval: 2000,
};

// Generic data fetcher function
const fetcher = async (url) => {
  const response = await fetch(url);

  // Check if the response is okay
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.status = response.status;
    error.info = await response.json().catch(() => ({ message: 'Failed to fetch data' }));
    throw error;
  }

  const json = await response.json();

  // Handle API response formats
  if (json.success === false) {
    const error = new Error(json.error || 'API returned error');
    error.info = json;
    throw error;
  }

  // Return the data property if it exists, otherwise the entire json
  return json.data !== undefined ? json.data : json;
};

/**
 * Custom SWR hook for data fetching
 * @param {string} key - The API endpoint to fetch from
 * @param {object} options - Additional SWR options to override defaults
 * @returns {object} The SWR response object
 */
export function useSWRFetch(key, options = {}) {
  const mergedConfig = { ...defaultConfig, ...options };
  return useSWR(key, fetcher, mergedConfig);
}

/**
 * Custom SWR hook for fetching data with mutation capabilities
 * @param {string} key - The API endpoint to fetch from
 * @param {object} options - Additional SWR options
 * @returns {object} The SWR response object with additional mutation methods
 */
export function useSWRMutable(key, options = {}) {
  const { data, error, isLoading, mutate } = useSWRFetch(key, options);

  // Create a wrapper for mutate that handles optimistic updates
  const updateData = async (updateFn, optimisticData) => {
    return mutate(updateFn, {
      optimisticData,
      rollbackOnError: true,
      revalidate: true,
    });
  };

  // Create a method for POST operations
  const postData = async (postData) => {
    const response = await fetch(key, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.error || 'Failed to post data');
    }

    // Revalidate the data after mutation
    mutate();

    return result.data;
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    updateData,
    postData,
  };
}

/**
 * Hook to fetch posts with pagination
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Posts data with pagination info
 */
export function usePosts(page = 1, limit = 10) {
  return useSWRFetch(`/api/posts?page=${page}&limit=${limit}`);
}

/**
 * Hook to fetch a single post by ID
 * @param {string} id - Post ID
 * @returns {object} Post data
 */
export function usePost(id) {
  return useSWRFetch(id ? `/api/posts/${id}` : null);
}

/**
 * Hook to fetch circles with pagination
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Circles data with pagination info
 */
export function useCircles(page = 1, limit = 10) {
  return useSWRFetch(`/api/circles?page=${page}&limit=${limit}`);
}

/**
 * Hook to fetch a single circle by ID
 * @param {string} id - Circle ID
 * @returns {object} Circle data
 */
export function useCircle(id) {
  return useSWRFetch(id ? `/api/circles/${id}` : null);
}

/**
 * Hook to fetch clubs with pagination
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Clubs data with pagination info
 */
export function useClubs(page = 1, limit = 10) {
  return useSWRFetch(`/api/clubs?page=${page}&limit=${limit}`);
}

/**
 * Hook to fetch a single club by ID
 * @param {string} id - Club ID
 * @returns {object} Club data
 */
export function useClub(id) {
  return useSWRFetch(id ? `/api/clubs/${id}` : null);
}

/**
 * Hook to fetch events with pagination
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Events data with pagination info
 */
export function useEvents(page = 1, limit = 10) {
  return useSWRFetch(`/api/events?page=${page}&limit=${limit}`);
}

/**
 * Hook to fetch a single event by ID
 * @param {string} id - Event ID
 * @returns {object} Event data
 */
export function useEvent(id) {
  return useSWRFetch(id ? `/api/events/${id}` : null);
}

/**
 * Hook to fetch notes with pagination
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Notes data with pagination info
 */
export function useNotes(page = 1, limit = 10) {
  return useSWRFetch(`/api/notes?page=${page}&limit=${limit}`);
}

/**
 * Hook to fetch a single note by ID
 * @param {number} id - Note ID (integer)
 * @returns {object} Note data
 */
export function useNote(id) {
  return useSWRFetch(id ? `/api/notes/${id}` : null);
}

/**
 * Hook to fetch user suggestions for following
 * @param {string} email - Current user email (to exclude from suggestions)
 * @param {number} limit - Number of suggestions to fetch
 * @returns {object} User suggestions
 */
export function useUserSuggestions(email, limit = 10) {
  const query = new URLSearchParams();
  if (email) query.append('email', email);
  if (limit) query.append('limit', limit);

  return useSWRFetch(`/api/users/suggestions?${query.toString()}`);
}

/**
 * Hook to fetch user profile by ID
 * @param {string} id - User ID
 * @returns {object} User profile data
 */
export function useUserProfile(id) {
  return useSWRFetch(id ? `/api/users/${id}` : null);
}

/**
 * Hook to fetch current user data by email
 * @param {string} email - User email
 * @returns {object} Current user data
 */
export function useCurrentUser(email) {
  return useSWRFetch(email ? `/api/users?email=${encodeURIComponent(email)}` : null);
}

/**
 * Hook to fetch user profile with mutation capabilities for updates
 * @param {string} id - User ID
 * @returns {object} User profile data with update methods
 */
export function useUserProfileMutable(id) {
  const { data, error, isLoading, mutate } = useSWRFetch(id ? `/api/users/${id}` : null);

  const updateProfile = async (updates) => {
    if (!id) throw new Error('User ID is required for profile updates');

    const response = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.error || 'Failed to update profile');
    }

    // Optimistically update the cache
    mutate(result.data, false);

    return result.data;
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    updateProfile,
  };
}

/**
 * Hook to fetch user achievements by ID
 * @param {string} id - User ID
 * @returns {object} User achievements data
 */
export function useUserAchievements(id) {
  return useSWRFetch(id ? `/api/users/${id}/achievements` : null);
}

/**
 * Hook to fetch user statistics by ID
 * @param {string} id - User ID
 * @returns {object} User statistics data
 */
export function useUserStats(id) {
  return useSWRFetch(id ? `/api/users/${id}/stats` : null);
}

/**
 * Hook to fetch user recent activity by ID
 * @param {string} id - User ID
 * @param {number} limit - Number of activities to fetch
 * @returns {object} User recent activity data
 */
export function useUserActivity(id, limit = 10) {
  return useSWRFetch(id ? `/api/users/${id}/activity?limit=${limit}` : null);
}

// ========================================
// WELLNESS HOOKS
// ========================================

/**
 * Hook to fetch wellness check-ins for a user
 * @param {string} userId - User ID
 * @param {number} limit - Number of check-ins to fetch
 * @param {string} startDate - Start date filter (YYYY-MM-DD)
 * @param {string} endDate - End date filter (YYYY-MM-DD)
 * @returns {object} Wellness check-ins data
 */
export function useWellnessCheckins(userId, limit = 30, startDate = null, endDate = null) {
  const params = new URLSearchParams();
  if (userId) {
    params.append('userId', userId);
    if (limit) params.append('limit', limit.toString());
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
  }

  return useSWRFetch(userId ? `/api/wellness/checkins?${params.toString()}` : null);
}

/**
 * Hook to fetch wellness check-ins with mutation capabilities
 * @param {string} userId - User ID
 * @param {number} limit - Number of check-ins to fetch
 * @returns {object} Wellness check-ins with mutation methods
 */
export function useWellnessCheckinsMutable(userId, limit = 30) {
  const { data, error, isLoading, mutate } = useWellnessCheckins(userId, limit);

  const submitCheckin = async (checkinData) => {
    if (!userId) throw new Error('User ID is required for check-in submission');

    const response = await fetch('/api/wellness/checkins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...checkinData
      }),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.error || 'Failed to submit check-in');
    }

    // Optimistically update the cache
    mutate();

    return result.data;
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    submitCheckin,
  };
}

/**
 * Hook to fetch wellness statistics and insights for a user
 * @param {string} userId - User ID
 * @returns {object} Wellness statistics and insights
 */
export function useWellnessStats(userId) {
  return useSWRFetch(userId ? `/api/wellness/stats?userId=${userId}` : null);
}

/**
 * Hook to fetch wellness goals for a user
 * @param {string} userId - User ID
 * @returns {object} Wellness goals data
 */
export function useWellnessGoals(userId) {
  return useSWRFetch(userId ? `/api/wellness/goals?userId=${userId}` : null);
}

/**
 * Hook to fetch wellness goals with mutation capabilities
 * @param {string} userId - User ID
 * @returns {object} Wellness goals with mutation methods
 */
export function useWellnessGoalsMutable(userId) {
  const { data, error, isLoading, mutate } = useWellnessGoals(userId);

  const createGoal = async (goalData) => {
    if (!userId) throw new Error('User ID is required for goal creation');

    const response = await fetch('/api/wellness/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...goalData
      }),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.error || 'Failed to create goal');
    }

    // Revalidate the data
    mutate();

    return result.data;
  };

  const updateGoal = async (goalId, updates) => {
    const response = await fetch('/api/wellness/goals', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goalId,
        updates
      }),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.error || 'Failed to update goal');
    }

    // Revalidate the data
    mutate();

    return result.data;
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    createGoal,
    updateGoal,
  };
}

/**
 * Admin-specific hooks for content moderation and user management
 */

/**
 * Hook to fetch admin reports with filtering and pagination
 * @param {object} filters - Filter options (status, priority, category, search)
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Reports data with pagination info
 */
export function useAdminReports(filters = {}, page = 1, limit = 10) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });

  return useSWRFetch(`/api/admin/reports?${queryParams.toString()}`);
}

/**
 * Hook to fetch admin reports with mutation capabilities
 * @param {object} filters - Filter options
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Reports data with mutation methods
 */
export function useAdminReportsMutable(filters = {}, page = 1, limit = 10) {
  const { data, error, isLoading, mutate } = useAdminReports(filters, page, limit);

  // Update report status
  const updateReportStatus = async (reportId, status, moderatorNotes = '', action = '', moderatorId = null) => {
    try {
      const response = await fetch('/api/admin/reports', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId,
          status,
          moderatorNotes,
          action,
          moderatorId
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.error || 'Failed to update report');
      }

      // Revalidate the data after mutation
      mutate();

      return result.data;
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    updateReportStatus,
  };
}

/**
 * Hook to fetch admin users with filtering and pagination
 * @param {object} filters - Filter options (status, search)
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Users data with pagination info
 */
export function useAdminUsers(filters = {}, page = 1, limit = 10) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });

  return useSWRFetch(`/api/admin/users?${queryParams.toString()}`);
}

/**
 * Hook to fetch admin users with mutation capabilities
 * @param {object} filters - Filter options
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} Users data with mutation methods
 */
export function useAdminUsersMutable(filters = {}, page = 1, limit = 10) {
  const { data, error, isLoading, mutate } = useAdminUsers(filters, page, limit);

  // Update user status
  const updateUserStatus = async (userId, status, adminId = null, reason = '') => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          status,
          adminId,
          reason
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.error || 'Failed to update user');
      }

      // Revalidate the data after mutation
      mutate();

      return result.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    updateUserStatus,
  };
}

/**
 * Hook to fetch admin analytics and platform statistics
 * @returns {object} Analytics data
 */
export function useAdminAnalytics() {
  return useSWRFetch('/api/admin/analytics');
}

/**
 * Hook to fetch admin analytics with refresh capabilities
 * @returns {object} Analytics data with refresh method
 */
export function useAdminAnalyticsMutable() {
  const { data, error, isLoading, mutate } = useAdminAnalytics();

  // Manual refresh method
  const refreshAnalytics = () => {
    mutate();
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    refreshAnalytics,
  };
}
