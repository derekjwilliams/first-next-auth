import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { CookieOptions, createServerClient } from '@supabase/ssr'

const ratelimit = new Ratelimit({
  redis: kv,
  // 100 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(100, '10 s'),
})

export async function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
  const path = request.nextUrl.pathname

  // Skip rate limiting and auth checks for Uploadthing webhook callbacks
  // This allows Uploadthing's servers to call your endpoint without auth
  if (path === '/api/uploadthing') {
    // If it's a POST request from Uploadthing's servers, let it through
    if (request.method === 'POST') {
      // Optionally verify the request is from Uploadthing via headers/signature
      // but don't block it with auth or rate limiting
      return NextResponse.next()
    }
  }

  // Rate limiting for other routes
  if (ip !== process.env.CIP && ip !== '127.0.0.1') {
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    if (!success) {
      const response = NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429 })
      response.headers.set('X-RateLimit-Limit', limit.toString())
      response.headers.set('X-RateLimit-Remaining', remaining.toString())
      response.headers.set('X-RateLimit-Reset', reset.toString())
      return response
    }
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options: CookieOptions) {
          response.cookies.delete({
            name,
            ...options,
          })
        },
      },
    },
  )
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Only check auth for non-Uploadthing routes or GET requests to Uploadthing
  if (path.startsWith('/api/uploadthing') && request.method !== 'POST') {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  response = await updateSession(request)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
