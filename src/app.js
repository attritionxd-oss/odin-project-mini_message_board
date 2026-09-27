import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import basicLogger from "#middleware/logger.js";
import {
  addMessage,
  getAllMessages,
  getMessageById,
  getMessageForm,
} from "#controllers/messageController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

const publicPath = join(__dirname, "..", "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(basicLogger);

app.get("/new", getMessageForm);
app.post("/new", addMessage);
app.get("/:id", getMessageById);
app.get("/", getAllMessages);

export default app;
