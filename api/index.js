import express from "express";
import mongoose from "mongoose";

const app = express();


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(" DB Error:", err));

// routes
app.get("/", (req, res) => {
  res.send("Backend working");
});

app.get("/api", (req, res) => {
  res.send("Trolly Hub API is working");
});

export default app;
