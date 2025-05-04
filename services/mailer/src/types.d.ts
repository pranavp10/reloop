import type { PostgresJsDatabase } from "@reloop/db/orm";
import type * as schema from "@reloop/db";
import { RedisType } from "@reloop/db";
import type { AuthType } from "@reloop/auth";

declare module "fastify" {
  interface FastifyInstance {
    db: PostgresJsDatabase<typeof schema>;
    auth: AuthType;
    redis: RedisType;
  }
}
