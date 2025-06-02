"use client"

import { SWRConfig } from 'swr'

// Default fetcher function
const fetcher = async (url) => {
  const response = await fetch(url)

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await response.json()
    error.status = response.status
    throw error
  }

  const data = await response.json()

  // If API returns success/data format, return just the data
  if (data.success !== undefined) {
    if (!data.success) {
      const error = new Error(data.error || 'API request failed')
      error.info = data
      throw error
    }
    return data.data
  }

  return data
}

// SWR configuration
const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Disable automatic refresh
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  dedupingInterval: 5000, // Dedupe requests for 5 seconds
  shouldRetryOnError: (error) => {
    // Don't retry on 4xx errors
    return error.status >= 500
  },
  onError: (error, key) => {
    console.error('SWR Error:', error, 'Key:', key)

    // Don't log 404 errors for user suggestions
    if (error.status === 404 && key.includes('/api/users/suggestions')) {
      return
    }

    // Could add error reporting service here
  },
  onSuccess: (data, key, config) => {
    // Optional: Log successful requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log('SWR Success:', key, data)
    }
  }
}

export function SWRProvider({ children }) {
  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  )
}

// Custom hooks for common API endpoints
export { default as useSWR } from 'swr'
export { mutate } from 'swr'

// API key generators for consistent cache keys
export const API_KEYS = {
  posts: '/api/posts',
  circles: '/api/circles',
  clubs: '/api/clubs',
  events: '/api/events',
  notes: '/api/notes',
  user: (email) => `/api/users?email=${encodeURIComponent(email)}`,
  userSuggestions: '/api/users/suggestions',
  testData: '/api/test-data'
}
