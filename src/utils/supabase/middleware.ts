import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
        // set(name: string, value: string, options: CookieOptions) {
        //   request.cookies.set({
        //     name,
        //     value,
        //     ...options,
        //   })
        //   supabaseResponse = NextResponse.next({
        //     request: {
        //       headers: request.headers,
        //     },
        //   })
        //   supabaseResponse.cookies.set({
        //     name,
        //     value,
        //     ...options,
        //   })
        // },
        // remove(name: string, options: CookieOptions) {
        //   request.cookies.set({
        //     name,
        //     value: '',
        //     ...options,
        //   })
        //   response = NextResponse.next({
        //     request: {
        //       headers: request.headers,
        //     },
        //   })
        //   response.cookies.set({
        //     name,
        //     value: '',
        //     ...options,
        //   })
        // },
      },
    },
  )
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname
  // protect service requests and protected paths
  if (
    ['/servicerequests', '/protected', '/image-uploader'].some((pathRoot) => pathname.startsWith(pathRoot)) &&
    !user
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
  return supabaseResponse
}
