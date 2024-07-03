# Marigold Housing

## Tech Stack

- React
- Next.js
- Supabase
- React-query
- Playwright
- Radix
- StyleX
- Open Props
- Typescript
- Prisma

## React 19 and NextJS 15 notes

Many packages have not been updated yet for React 19, to avoid errors on `npm install` make sure to include the `--legacy-peer-deps` flag, e.g.`npm install  --legacy-peer-deps`

## Generating Data Types from Supabase

`supabase link --project-ref [project ref]`

`supabase gen types typescript --linked --schema=public > src/utils/database.types.ts`

Note: there is a bug where the types for many-to-many don't appear to be generated correctly now. If a build error is encountered that says "technicans not present" then add [x: string]: any to the service_request definition in src/utils/database.types.ts, e.g.

```
service_requests: {
        Row: {
          [x: string]: any
          completed: boolean | null
          date_created: string | null
          date_updated: string | null
          description: string | null
          details: string | null
          ...
```

Unclear why this is the case, but the line [x: string]: any was at one point added, regerating the database types does not have that present

## Safari And Authentication

Safari, sensibly, does not like using http to send sensitive data, so if you run with `npm run dev` Safari will complain, to work around this a script has been added to package.json that runs with the Next https server, `npm run dev-https`. More details on the Next `--experimental-https` flag can be found here: https://nextjs.org/docs/app/api-reference/next-cli

## Nextjs and StyleX example project

Found here, https://github.com/facebook/stylex/blob/main/apps/nextjs-example/

## Caching issues with StyleX

This problem is being worked on, but for now make sure to do an `npm run predev` prior to `npm run dev`. And run `npm run prebuild` prior to running `npm run build`. This issue is discussed here https://github.com/facebook/stylex/issues/286

### Vercel deployment notes

If there is a rendering issue with fonts, then forcing the build can remedy:

`npx vercel --prod -f`

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
