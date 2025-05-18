import { redis } from '@reloop/db/redis';
import fp from 'fastify-plugin';

export default fp(
  async function fastifyDb(fastify) {
    if (fastify.redis) {
      return;
    }

    try {
      if (!redis.isOpen) {
        fastify.log.info('Connecting to Redis...');
        await redis.connect();
        fastify.log.info('Redis connection established!');
      }

      fastify.decorate('redis', redis);

      fastify.addHook('onClose', async (fastifyInstance) => {
        if (fastifyInstance.redis?.isOpen) {
          fastifyInstance.log.info('Closing Redis connection...');
          await fastifyInstance.redis.quit();
          fastifyInstance.log.info('Redis connection closed.');
        }
      });
    } catch (error) {
      fastify.log.error(
        `Failed to establish Redis connection: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      throw error;
    }
  },
  { name: 'redis' },
);
