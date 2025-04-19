import { drizzle } from "drizzle-orm/postgres-js";

import client from "./client";
import env from "./env";
import * as authSchema from "./schema/auth.schema";

const db = drizzle(client, {
  logger: env.NODE_ENV === "development",
  schema: {
    ...authSchema,
  },
});

export default db;
