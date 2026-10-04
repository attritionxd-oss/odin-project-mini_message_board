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
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255),
  firstandlastname VARCHAR (255),
  email VARCHAR (255)
);

INSERT INTO users (username, firstandlastname, email)
VALUES
  ('CoalSeller', 'Tanjiro Kamado', 'sunbreath@demonslayercorps.com'),
  ('LordInoske', 'Inoske Hashibira', 'lord.hashibira@demonslayercorps.com'),
  ('IFightAsleep', 'Zenitsu Agatsuma', 'iheartnezuko@demonslayercorps.com'),
  ('DontBreakMyKatana', 'Hotaru Haganezuka', 'dontbreakmykatana@swordsmith.com');
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
