# CONTEXT

Domain glossary for one-page-portfolio.

## Chat

- **Chat inbox** — the module (`src/server/chat/`) that owns everything about visitors chatting with the site owner: listing what a viewer may see, sending messages, rate limiting, and role policy. Behind a small interface (`list(viewer)`, `send(viewer, text, replyingTo?)`); persistence sits behind a store seam with Drizzle and in-memory adapters.
- **Viewer** — the resolved identity of whoever is calling the chat inbox: `{ userId, role }`. Constructed by the HTTP adapter from Clerk session claims; tests construct viewers directly.
- **Admin** — a viewer whose role is `"admin"` (the site owner). Admins see all chats grouped by user, may pass `replyingTo` when sending, and are exempt from rate limiting.

## Portfolio sections

- **Section registry** — the module (`src/app/_components/sections/`) that owns the portfolio's sections as data: ordered ids, labels, and in-view margins. Its `useSections()` hook resolves which section is active and hands the page refs, `scrollTo`, and `isInView`; Sidebar and BottomBar render from the same registry, so adding a section is a one-line change.
- **Portfolio content** — the module (`src/app/_components/content/`) that owns the portfolio's entries as typed data: `PROJECTS`, `EXPERIENCES`, `SKILLS`. Renderers map over it; editing an entry never touches rendering code.
