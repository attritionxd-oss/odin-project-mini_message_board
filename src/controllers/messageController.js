import { body, validationResult, matchedData } from "express-validator";
import messagesQueries from "#db/messages/messages-queries.js";
import usersQueries from "#db/users/users-queries.js";

const validateMessage = [
  body("userMessage")
    .trim()
    .notEmpty()
    .withMessage("Message cannot be empty.")
    .isLength({ min: 1, max: 2000 })
    .withMessage("Message must be between 1 and 2,000 characters.")
    .escape(),
];

export async function getAllMessages(req, res) {
  const messages = await messagesQueries.getAllMessages();

  if (!messages) {
    res.status(500).render("layouts/error-layout", {
      title: "Internal Server Error",
      message: "",
    });
    return;
  }

  res.render("layouts/main-layout", {
    title: "All messages",
    messages: messages.map((message) => ({
      id: message.id,
      user: message.firstandlastname,
      text: message.user_message,
      added: message.tstz,
    })),
  });
}

export async function getMessageForm(req, res) {
  const users = await usersQueries.getAllUsers();
  res.render("layouts/new-message", {
    title: "Create new message",
    users: users,
  });
}

export const addMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const users = await usersQueries.getAllUsers();
      return res.status(400).render("layouts/new-message", {
        title: "Create new message",
        users: users,
        userMessage: req.body.userMessage,
        errors: errors.array(),
      });
    }

    const userId = Number(req.body.user);
    const { userMessage } = matchedData(req);

    try {
      const result = await messagesQueries.insertMessage(userId, userMessage);
      if (result.rowCount === 0) {
        console.warn("[INSERT MESSAGE] Failed");
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `[INSERT MESSAGE] Successfully inserted message. ${result.rowCount} record(s) created.`,
        );
      }
      res.redirect("/");
    } catch (err) {
      console.error("[INSERT MESSAGE FAILED]", err.message, {
        code: err.message,
      });
    }
  },
];

export async function getMessageById(req, res) {
  const messageId = req.path.replace("/", "");
  const message = await messagesQueries.getMessageById(messageId);
  const formattedMessage = {
    id: message[0].id,
    user: message[0].firstandlastname,
    text: message[0].user_message,
    added: message[0].tstz,
  };

  res.render("layouts/message-layout", {
    title: `Message from ${message[0].firstandlastname}`,
    message: formattedMessage,
  });
}

export async function deleteMessage(req, res) {
  const messageId = req.params.id;
  const result = await messagesQueries.deleteMessage(messageId);
  // eslint-disable-next-line no-console
  console.log(
    `[DELETE MESSAGE] Successfully deleted message. ${result.rowCount} record(s) deleted.`,
  );
  res.redirect("/");
}

export const editMessage = [
  validateMessage,
  async (req, res) => {
    const messageId = Number(req.params.id);
    const { userMessage } = matchedData(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = await messagesQueries.getMessageById(messageId);
      const formattedMessage = {
        id: message[0].id,
        user: message[0].firstandlastname,
        text: req.body.userMessage,
        added: message[0].tstz,
      };

      res.status(400).render("layouts/message-layout", {
        title: `Message from ${message[0].firstandlastname}`,
        message: formattedMessage,
        errors: errors.array(),
      });
    }

    try {
      const result = await messagesQueries.updateMessage(
        messageId,
        userMessage,
      );
      // eslint-disable-next-line no-console
      console.log(
        `[UPDATE MESSAGE] Successfully updated message ID: ${messageId} (${result.rowCount} record)`,
      );
      res.redirect("/");
    } catch (err) {
      console.error("[UPDATE MESSAGE FAILED]", err.message, { code: err.code });
    }
  },
];
