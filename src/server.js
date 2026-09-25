import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import app from "#app.js";

const HOSTNAME = "localhost";
const PORT = 3000;

const server = app.listen(PORT, HOSTNAME, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Closing HTTP server...`);
  server.close(async () => {
    console.log("HTTP server closed.");
    // close open connections, e.g., db
    process.exit(0);
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
