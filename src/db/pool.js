import { Pool } from "pg";
import { loadEnvFile } from "node:process";

if (process.env.NODE_ENV !== "production") {
  try {
    loadEnvFile("./.env");
  } catch (e) {
    console.error(e);
  }
}

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
