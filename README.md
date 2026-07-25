# James Lim — One-Page Portfolio

Personal portfolio site for [James Lim Zhong Zhi](https://www.jameslimzz.me): a single-page experience with animated ASCII art, project highlights, experience, skills, and contact.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Clerk](https://clerk.com) (auth for chat)
- Deployed on [Vercel](https://vercel.com)

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
SKIP_ENV_VALIDATION=1 npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `SKIP_ENV_VALIDATION=1` when Clerk or database env vars are not configured locally.

## Deploy

The project is linked to Vercel. Push to `main` to trigger a production deploy, or run:

```bash
vercel
```

Live site: [https://www.jameslimzz.me](https://www.jameslimzz.me)
