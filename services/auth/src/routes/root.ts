import type { FastifyPluginAsync } from 'fastify';

export default (async (fastify) => {
  fastify.get('/', async (_, reply) => {
    try {
      reply.status(200).send({ message: 'Welcome to Auth API Service' });
    } catch (error) {
      fastify.log.error('Error handling / request:', error);
      reply.status(500).send({ error: 'Failed to process the request.' });
    }
  });
}) satisfies FastifyPluginAsync;
