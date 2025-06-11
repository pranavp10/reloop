import { pg } from '@reloop/db/pg';
import fp from 'fastify-plugin';

export default fp(
  async function fastifyDb(fastify) {
    if (fastify.db) {
      return;
    }

    try {
      fastify.decorate('db', pg);

      fastify.addHook('onClose', async (fastifyInstance) => {
        if (fastifyInstance.db) {
          fastifyInstance.log.info('Closing db connection...');
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        fastify.log.error(
          `Failed to establish db connection: ${error.message}`,
        );
      } else {
        fastify.log.error('Failed to establish db connection: Unknown error');
      }
      throw error;
    }
  },
  { name: 'db' },
);
