import React from 'react'
import TestClient from './client'

// Prevent static prerendering which causes issues with client components
export const dynamic = 'force-dynamic';

// Server component wrapper
export default function TestPage() {
  return <TestClient />
}
