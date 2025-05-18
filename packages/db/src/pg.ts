import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { env } from './env';
import * as schema from './schema';

export type DatabaseInstance = NodePgDatabase<typeof schema>;

export const pg = drizzle({
  schema,
  casing: 'snake_case',
  connection: {
    connectionString: env.DB_POSTGRES_URL,
  },
});
