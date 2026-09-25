import express from "express";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import basicLogger from "#middleware/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

app.use(basicLogger);

export default app;
