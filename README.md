# Marigold Housing

## Tech Stack

- React
- Next.js
- Supabase
- Playwright
- Radix
- StyleX
- Open Props
- Typescript


## Nextjs and StyleX example project

Found here, https://github.com/facebook/stylex/blob/main/apps/nextjs-example/

## Caching issues with StyleX

This problem is being worked on, but for now make sure to do an `npm run predev` prior to `npm run dev`.  And run `npm run prebuild` prior to running `npm run build`.  This issue is discussed here https://github.com/facebook/stylex/issues/286

### Vercel deployment notes

If there is a rendering issue with fonts, then forcing the build can remedy:

```npx vercel --prod -f```

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)


### Linking

```bash
supabase login
supabase projects list
supabase link --project-ref [ref from list]
supabase gen types typescript --linked --schema=public > utils/database.types.ts
```
## Tanstack React Query

https://www.youtube.com/watch?v=Z4L_UE0hVmo

References:
https://makerkit.dev/blog/saas/supabase-react-query

## SVG Go

For optimizing SVGs https://github.com/jakearchibald/svgomg/blob/main/README.md