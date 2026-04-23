import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// import your routes
import productRoutes from "../server/routes/productRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// test route
app.get("/api", (req, res) => {
  res.send("🚀 API working");
});

// REAL route (IMPORTANT)
app.use("/api/products", productRoutes);

// fallback
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
