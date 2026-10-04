#! /user/bin/env mode

import { Client } from "pg";
import { loadEnvFile } from "node:process";

if (process.env.NODE_ENV !== "production") {
  try {
    loadEnvFile("./.env");
  } catch (e) {
    console.error(e);
  }
}

const SQL = /* sql */ `
CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  user_message VARCHAR(255),
  tstz TIMESTAMPTZ
);

INSERT INTO
  messages (user_message, user_id, tstz)
VALUES
  ('Hello!', 1, '2026-09-28 03:25:02.095988+00'),
  (
    'Hello world!',
    4,
    '2026-09-30 16:50:06.095988+00'
  );
`;

async function main() {
  // eslint-disable-next-line no-console
  console.log("seeding...");
  const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });
  await client.connect();
  await client.query(SQL);
  // eslint-disable-next-line no-console
  console.log("done");
}

main();
