import { config } from "dotenv";
import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "node:path";

import env from "./lib/env";

config({ path: ".env", override: true });

export default async function startServer() {
  const fastify = Fastify({ logger: true });

  fastify.register(autoLoad, {
    dir: join(__dirname, "plugins"),
  });

  fastify.register(autoLoad, {
    dir: join(__dirname, "routes"),
    options: {
      prefix: "/api",
    },
  });

  try {
    const address = await fastify.listen({
      port: Number(env.PORT) || 13001,
    });

    console.log(`Server listening at ${address}`);
  } catch (error) {
    fastify.log.error(`Failed to start server: ${error.message}`);

    process.exit(1);
  }
}
