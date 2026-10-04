import { pool } from "../pool.js";
import format from "pg-format";

export async function getAllMessages() {
  const query = format(/* sql */ `
    SELECT 
      messages.id, 
      users.firstandlastname, 
      users.id AS user_id, 
      messages.user_message, 
      messages.tstz
    FROM messages
    LEFT JOIN users ON messages.user_id = users.id;
  `);
  const { rows: messages } = await pool.query(query);
  return messages;
}

export async function getMessageById(id) {
  const query = format(
    /* sql */ `
    SELECT
      messages.id,
      users.firstandlastname, 
      users.id AS user_id,
      messages.user_message,
      messages.tstz
    FROM messages 
    LEFT JOIN users ON messages.user_id = users.id
    WHERE messages.id = %L;
  `,
    id,
  );
  const { rows: message } = await pool.query(query);
  if (!message[0]) {
    return {};
  }
  return message;
}

export async function insertMessage(user_id, user_message) {
  const query = format(
    /* sql */ `
    INSERT INTO messages (user_id, user_message, tstz)
    VALUES (%L, %L, NOW());
  `,
    user_id,
    user_message,
  );

  const result = await pool.query(query);
  return result;
}
/* note: result example output:
inserted: Result {
  command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [],
  fields: [],
  _parsers: undefined,
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false,
  _prebuiltEmptyResultObject: null
}
 */

export async function updateMessage(id, userMessage) {
  const query = format(
    /* sql */ `
    UPDATE messages
    SET user_message = %L
    WHERE id = %L
    `,
    userMessage,
    id,
  );

  const result = await pool.query(query);
  return result;
}
/* note: console.log("[UPDATE MESSAGE]", updateResult);
[UPDATE MESSAGE] Result {
  command: 'UPDATE',
  rowCount: 1,
  oid: null,
  rows: [],
  fields: [],
  _parsers: undefined,
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false,
  _prebuiltEmptyResultObject: null
}
 */

export async function deleteMessage(id) {
  const query = format(
    /* sql */ `
    DELETE FROM messages
    WHERE id = %L
    `,
    id,
  );
  const result = await pool.query(query);
  return result;
}

/* note: console.log("all messages", m);
[DELETE] Result {
  command: 'DELETE',
  rowCount: 1,
  oid: null,
  rows: [],
  fields: [],
  _parsers: undefined,
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false,
  _prebuiltEmptyResultObject: null
}
 */

const messagesQueries = {
  insertMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};

export default messagesQueries;
