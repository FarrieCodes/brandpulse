'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { getUserCompanies } from '@/lib/db'
import type { Company } from '@/types/database'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [showCompanySelect, setShowCompanySelect] = useState(false)
  const router = useRouter()

  const handleCompanySelect = (companyId: string) => {
    // Store selected company in localStorage/session
    localStorage.setItem('selectedCompanyId', companyId)
    router.push('/')
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Get user's companies
      const userCompanies = await getUserCompanies(userCredential.user.uid)

      if (userCompanies.length === 0) {
        setError('No companies associated with this account')
        return
      }

      if (userCompanies.length === 1) {
        // If user has only one company, select it automatically
        handleCompanySelect(userCompanies[0].id)
      } else {
        // If user has multiple companies, show company selection dialog
        setCompanies(userCompanies)
        setShowCompanySelect(true)
      }
    } catch (error: any) {
      console.error('Sign in error:', error)
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password')
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later')
      } else {
        setError(error.message || 'An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-6">Welcome back</h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn}>
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

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex items-center justify-end">
              <Link 
                href="/auth/reset-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <Dialog open={showCompanySelect} onOpenChange={setShowCompanySelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a company</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanySelect(company.id)}
                className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">{company.name}</div>
                <div className="text-sm text-gray-500">
                  {company.subscription.status === 'trial' 
                    ? 'Trial Period' 
                    : `${company.subscription.plan} Plan`}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 