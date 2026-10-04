import { pool } from "#db/pool.js";
import format from "pg-format";

export async function getAllUsers() {
  const query = format(/* sql */ `
    SELECT * FROM users
  `);
  const { rows: users } = await pool.query(query);
  return users;
}

const usersQueries = {
  getAllUsers,
};

export default usersQueries;
