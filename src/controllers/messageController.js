import { sanitizeInput } from "#middleware/sanitizeInput.js";
import messagesDb from "#messagesDb.js";

export async function getAllMessages(req, res) {
  const messages = await messagesDb.getAllMessages();

  if (!messages) {
    res.status(500).render("layouts/main-layout", {
      title: "Internal Server Error",
      errorContent: "",
    });
    return;
  }

  res.render("layouts/main-layout", { title: "All messages", messages });
}

export function getMessageForm(req, res) {
  res.render("layouts/new-message", { title: "Create new message" });
}

export function addMessage(req, res) {
  const user = sanitizeInput(req.body.user);
  const message = sanitizeInput(req.body.message);
  messagesDb.addMessage({ user, message });
  res.redirect("/");
}

export function getMessageById(req, res) {
  const messageId = req.path.replace("/", "");
  const message = messagesDb.getMessageById(messageId);

  res.render("layouts/message-layout", {
    title: `Message from ${message.user}`,
    message: message,
  });
}
