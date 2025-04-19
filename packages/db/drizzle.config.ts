import type { Config } from "drizzle-kit";

import env from "./src/env";

export default {
  out: "./src/migrations",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
