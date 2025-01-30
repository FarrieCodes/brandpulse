'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ResetPasswordConfirm({ 
  params 
}: { 
  params: { token: string } 
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verifyCode = async () => {
      try {
        const email = await verifyPasswordResetCode(auth, params.token)
        setEmail(email)
      } catch (error) {
        console.error('Invalid or expired reset code:', error)
        setError('This password reset link is invalid or has expired')
      } finally {
        setLoading(false)
      }
    }

    verifyCode()
  }, [params.token])

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await confirmPasswordReset(auth, params.token, password)
      router.push('/auth/signin?reset=success')
    } catch (error: any) {
      console.error('Password reset error:', error)
      if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long')
      } else if (error.code === 'auth/expired-action-code') {
        setError('This password reset link has expired')
      } else {
        setError('An error occurred. Please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">Verifying reset link...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-red-500 mb-4">{error}</div>
        <Link 
          href="/auth/reset-password"
          className="text-primary hover:underline"
        >
          Request a new password reset link
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Set New Password</h1>
      
      <p className="text-gray-600 mb-6">
        Setting new password for {email}
      </p>

      <form onSubmit={handlePasswordReset}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {loading ? 'Setting Password...' : 'Set New Password'}
          </button>
        </div>
      </form>
    </div>
  )
} 