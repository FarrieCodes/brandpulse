import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    // Redirect to error page if no code is present
    return NextResponse.redirect(`${requestUrl.origin}/auth/error?error=no_code`)
  }

  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/error?error=${encodeURIComponent(error.message)}`)
    }

    // Successful authentication
    return NextResponse.redirect(requestUrl.origin)
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(`${requestUrl.origin}/auth/error?error=unexpected_error`)
  }
} 