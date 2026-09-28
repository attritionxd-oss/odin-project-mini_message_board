import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { loadEnvFile } from "node:process";
import basicLogger from "#middleware/basicLogger.js";
import {
  addMessage,
  getAllMessages,
  getMessageById,
  getMessageForm,
} from "#controllers/messageController.js";

loadEnvFile("./.env");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

const publicPath = join(__dirname, "..", "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(basicLogger);
}

app.get("/new", getMessageForm);
app.post("/new", addMessage);
app.get("/:id", getMessageById);
app.get("/", getAllMessages);

export default app;
