'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function AuthTestClient() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const testGoogleSignIn = async () => {
    setIsLoading(true)
    setResult(null)
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/dashboard'
      })
      setResult(result)
    } catch (err) {
      setResult({ error: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Auth Test Page</h1>
      <button onClick={testGoogleSignIn} disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Test Google Sign-In'}
      </button>
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
      {session && (
        <div>
          <h2>Session</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
