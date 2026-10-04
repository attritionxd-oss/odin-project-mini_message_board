import { sanitizeInput } from "#middleware/sanitizeInput.js";
import messagesQueries from "#db/messages/messages-queries.js";
import usersQueries from "#db/users/users-queries.js";

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

export async function addMessage(req, res) {
  const user = Number(sanitizeInput(req.body.user));
  const message = sanitizeInput(req.body.message);

  try {
    const result = await messagesQueries.insertMessage(user, message);
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
}

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

export async function editMessage(req, res) {
  const messageId = Number(req.params.id);
  const userMessage = req.body.userMessage;
  const result = await messagesQueries.updateMessage(messageId, userMessage);
  // eslint-disable-next-line no-console
  console.log(
    `[UPDATE MESSAGE] Successfully updated message ID: ${messageId} (${result.rowCount} record)`,
  );
  res.redirect("/");
}
