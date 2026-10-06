// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3e3;
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
