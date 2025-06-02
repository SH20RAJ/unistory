"use client"

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function AuthTestPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const testGoogleSignIn = async () => {
    setIsLoading(true)
    setResult(null)
    
    try {
      console.log('Testing Google sign-in...')
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/dashboard'
      })
      
      console.log('Sign-in result:', result)
      setResult(JSON.stringify(result, null, 2))
    } catch (error) {
      console.error('Error:', error)
      setResult(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Auth Test Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Session Status:</h2>
          <p>Status: {status}</p>
          <pre className="mt-2 text-sm">{JSON.stringify(session, null, 2)}</pre>
        </div>

        <button
          onClick={testGoogleSignIn}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test Google Sign-In'}
        </button>

        {result && (
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold">Result:</h2>
            <pre className="mt-2 text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
