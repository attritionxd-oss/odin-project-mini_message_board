import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import basicLogger from "#middleware/basicLogger.js";
import globalRateLimiter from "#middleware/globalRateLimiter.js";
import ipRateLimiter from "#middleware/ipRateLimiter.js";
import {
  addMessage,
  deleteMessage,
  editMessage,
  getAllMessages,
  getMessageById,
  getMessageForm,
} from "#controllers/messageController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = join(__dirname, "..", "public");

const app = express();

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

if (process.env.NODE_ENV !== "production") {
  app.use(basicLogger);
}
app.use(express.static(publicPath));
app.use(globalRateLimiter);
app.use(ipRateLimiter);
app.use(express.urlencoded({ extended: true }));

app.get("/new", getMessageForm);
app.post("/new", addMessage);
app.post("/:id/edit", editMessage);
app.post("/:id/delete", deleteMessage);
app.get("/:id", getMessageById);
app.get("/", getAllMessages);

export default app;
