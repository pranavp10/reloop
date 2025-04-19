import fp from "fastify-plugin";

import auth from "@reloop/auth";

export default fp(
  async function fastifyAuth(fastify) {
    if (fastify.auth) {
      return;
    }
    try {
      fastify.decorate("auth", auth);
    } catch (error) {
      fastify.log.error(`Auth Plugin Error: ${error.message}`, error);
      throw error;
    }
  },
  { name: "auth" }
);
