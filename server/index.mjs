import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", posts);

app.use("/", express.static(path.join(__dirname, "dist")));
// app.get("/*", (req, res) => res.sendFile(path.join(__dirname)));

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
