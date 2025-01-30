'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/auth/signin`,
      })
      setSuccess(true)
      // Clear the form
      e.currentTarget.reset()
    } catch (error: any) {
      console.error('Password reset error:', error)
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address')
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address')
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later')
      } else {
        setError('An error occurred. Please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {success ? (
        <div className="space-y-4">
          <div className="bg-green-50 text-green-600 p-4 rounded">
            Password reset email sent! Please check your inbox.
          </div>
          <p className="text-sm text-gray-600">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setSuccess(false)}
              className="text-primary hover:underline"
            >
              try again
            </button>
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </div>
          </form>
        </>
      )}

      <div className="mt-6 text-center">
        <Link 
          href="/auth/signin" 
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  )
} 