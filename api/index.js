import express from "express";

const app = express();

// Root (optional)
app.get("/", (req, res) => {
  res.send("🚀 Backend working");
});

// ✅ IMPORTANT: add this
app.get("/api", (req, res) => {
  res.send("🚀 Trolly Hub API is working");
});

export default app;
