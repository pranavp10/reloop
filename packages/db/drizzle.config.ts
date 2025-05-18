import type { Config } from 'drizzle-kit';
import { env } from "./src/env";


export default {
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: env.DB_POSTGRES_URL },
  casing: 'snake_case',
} satisfies Config;
