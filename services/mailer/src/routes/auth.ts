import { toNodeHandler } from "better-auth/node";
import type { FastifyPluginAsync } from "fastify";

export default (async (fastify) => {
  const authHandler = toNodeHandler(fastify.auth.handler);

  fastify.addContentTypeParser(
    "application/json",
    (_request, _payload, done) => {
      done(null, null);
    }
  );

  fastify.route({
    method: ["POST", "GET"],
    url: "/auth/*",
    handler: async (req, reply) => await authHandler(req.raw, reply.raw),
  });
}) satisfies FastifyPluginAsync;
