"use client";

import { SWRConfig } from 'swr';

// Global fetcher function for SWR
const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.status = response.status;
    error.info = await response.json().catch(() => ({ message: 'Failed to fetch data' }));
    throw error;
  }

  const json = await response.json();

  if (json.success === false) {
    const error = new Error(json.error || 'API returned error');
    error.info = json;
    throw error;
  }

  return json.data !== undefined ? json.data : json;
};

export function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        shouldRetryOnError: true,
        dedupingInterval: 2000,
        onError: (error, key) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(`SWR Error for ${key}:`, error);
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
