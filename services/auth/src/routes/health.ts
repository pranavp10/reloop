import type { FastifyPluginAsync } from "fastify";

export default (async (fastify) => {
  fastify.get("/health", async (_, reply) => {
    try {
      await fastify.db.execute("SELECT 1");
      reply.status(200).send({ http: "ok", database: "ok" });
    } catch (error) {
      fastify.log.error("Error handling /health request:", error);
      reply.status(500).send({ http: "ok", database: "error" });
    }
  });
}) satisfies FastifyPluginAsync;
