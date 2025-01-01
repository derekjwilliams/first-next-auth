# Marigold Housing

## Tech Stack

- React
- Next.js
- Supabase
- React-query
- Radix
- StyleX
- Open Props
- Typescript
- Lexical

## React 19 and NextJS 15 notes

Many packages have not been updated yet for React 19, to avoid errors on `npm install` make sure to include the `--legacy-peer-deps` flag, e.g.`npm install  --legacy-peer-deps`

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

## Lexical Editor

https://www.npmjs.com/package/lexical

https://playground.lexical.dev/

See: https://github.com/yeehanchung/lexical-rich-text-editor-nextjs-13/tree/main

https://codesandbox.io/s/lexical-rich-text-example-5tncvy?file=/src/App.js

https://www.youtube.com/watch?v=yXd0z1shhoU
