import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  // from  https://youtu.be/PdmKlne1gRY?si=A3J-MZvqwV3Oge06&t=1026
  // not sure if needed, tbd

  const requestUrl = new URL(request.url)

  const { searchParams } = requestUrl

  //   const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  // NOTE, completed code in the demo branch has the functionality in
  // app/oauth/callback/route.ts not
  // app/auth-server-action/callback/route.ts
  // code is also different, see: https://github.com/Chensokheng/next-14-supabase-ssr/blob/demo/app/oauth/callback/route.ts
  if (code) {
    const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            return await cookieStore.get(name)?.value
          },
          async set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          async remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      },
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/servicerequests/new`) // from , at https://youtu.be/PdmKlne1gRY?si=A3J-MZvqwV3Oge06&t=1026
      //return NextResponse.redirect(`${origin}${next}`) original
    }
  }

  // return the user to an error page with instructions
  // TODO handle error
  //return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
