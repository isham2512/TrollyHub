import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// test routes
app.get("/", (req, res) => {
  res.send("🚀 Backend working");
});

app.get("/api", (req, res) => {
  res.send("🚀 API working");
});

// simple test route (no imports)
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working ✅" });
});

export default app;
