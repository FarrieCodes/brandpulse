'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  fetchSignInMethodsForEmail 
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { createCompany, createCompanyMember } from '@/lib/db'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [existingEmail, setExistingEmail] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (loading) return
    
    setLoading(true)
    setError(null)
    setExistingEmail(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const companyName = formData.get('company_name') as string

    try {
      // 1. Check if user already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      if (signInMethods.length > 0) {
        setExistingEmail(email)
        setError('This email is already registered. Please sign in instead.')
        setLoading(false)
        return
      }

      let user;
      try {
        // 2. Create the user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        user = userCredential.user

        // 3. Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          preferences: {
            notifications: {
              email: true,
              push: true
            },
            theme: 'light'
          }
        })

        // 4. Create company
        const company = await createCompany({
          name: companyName,
          billing: {
            email: email,
            name: companyName,
            address: {
              line1: '',
              city: '',
              state: '',
              postal_code: '',
              country: '',
            }
          }
        })

        // 5. Create company member relationship
        await createCompanyMember(user.uid, company.id, 'admin')

        // 6. Send verification email
        await sendEmailVerification(user, {
          url: `${window.location.origin}/auth/verify`,
        })

        // 7. Redirect to verification page and stop any further processing
        router.push('/auth/verify')
        return // Important: stop execution here

      } catch (error) {
        // If anything fails after user creation, clean up
        if (user) {
          try {
            await user.delete()
          } catch (deleteError) {
            console.error('Error cleaning up user after failed signup:', deleteError)
          }
        }
        throw error
      }

    } catch (error: any) {
      console.error('Signup error:', error)
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.')
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.')
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError(error.message || 'An unexpected error occurred during signup')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Create your account</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="company_name">
            Company Name
          </label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            required
            disabled={loading}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={loading}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            disabled={loading}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
} 