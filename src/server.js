import app from "#app.js";
import { loadEnvFile } from "node:process";

if (process.env.NODE_ENV !== "production") {
  try {
    loadEnvFile("./.env");
  } catch (e) {
    console.error(e);
  }
}

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

const server = app.listen(PORT, HOSTNAME, (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

// eslint-disable-next-line require-await
const gracefulShutdown = async (signal) => {
  // eslint-disable-next-line no-console
  console.log(`\n${signal} received. Closing HTTP server...`);

  // eslint-disable-next-line require-await
  server.close(async () => {
    // eslint-disable-next-line no-console
    console.log("HTTP server closed.");
    // close open connections, e.g., db
    process.exit(0); // eslint-disable-line no-process-exit
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
