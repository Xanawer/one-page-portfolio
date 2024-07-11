import { type Config } from "drizzle-kit";

import { env } from "@simple/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["one-page-portfolio_*"],
} satisfies Config;
