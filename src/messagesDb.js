const ID_LENGTH = 8;

const messages = [
  {
    id: crypto.randomUUID().slice(0, ID_LENGTH).trim(),
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: crypto.randomUUID().slice(0, ID_LENGTH).trim(),
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

function getAllMessages() {
  return messages;
}

function getMessageById(id) {
  return messages.find((message) => message.id === id);
}

function addMessage({ user, message }) {
  messages.push({
    id: crypto.randomUUID().slice(0, ID_LENGTH).trim(),
    text: message,
    user: user,
    added: new Date(),
  });
  return messages;
}

export default { getAllMessages, getMessageById, addMessage };
