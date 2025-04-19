import server from "./src/server";

server().catch((error) => {
  console.error("Failed to start the server:", error);

  process.exit(1);
});
