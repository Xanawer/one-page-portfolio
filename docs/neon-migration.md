# Neon database migration

The application was migrated from deprecated `@vercel/postgres` to `@neondatabase/serverless` and Drizzle's `neon-http` adapter.

- Runtime queries use pooled `DATABASE_URL`.
- Drizzle Kit uses direct `DATABASE_URL_UNPOOLED` because schema tools should not run through PgBouncer transaction pooling.
- The Vercel Marketplace Neon integration injects both values for linked environments.
- The HTTP adapter fits the app's request-scoped queries. Interactive transactions would require Neon's WebSocket adapter instead.

Primary references:

- [Neon Vercel Postgres transition guide](https://neon.com/docs/guides/vercel-postgres-transition-guide)
- [Drizzle Neon connector](https://orm.drizzle.team/docs/connect-neon)
- [Neon serverless driver](https://neon.com/docs/serverless/serverless-driver)
- [Neon Vercel-managed integration](https://neon.com/docs/guides/vercel-managed-integration)
- [Neon connection pooling](https://neon.com/docs/connect/connection-pooling)
- [Neon Drizzle migrations](https://neon.com/docs/guides/drizzle-migrations)
