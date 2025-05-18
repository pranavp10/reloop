import server from './server';

server().catch((error) => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});
