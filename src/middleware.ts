import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(100, '10 s'),
})

export async function middleware(request: NextRequest) {
  // const ip = request.ip ?? '127.0.0.1'
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'

  if (ip !== process.env.CIP || ip !== '127.0.0.1') {
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)

    if (!success) {
      const response = NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429 })
      response.headers.set('X-RateLimit-Limit', limit.toString())
      response.headers.set('X-RateLimit-Remaining', remaining.toString())
      response.headers.set('X-RateLimit-Reset', reset.toString())
      return response
    }
  }

  return await updateSession(request)

  // return success
  //   ? NextResponse.next()
  //   : NextResponse.redirect(new URL('/blocked', request.url));
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

// Define which routes you want to rate limit
// export const config = {
//   matcher: '/',
// };
