import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "../server/config/db.js";

import authRoutes    from "../server/routes/authRoutes.js";
import productRoutes from "../server/routes/productRoutes.js";
import stockRoutes   from "../server/routes/stockRoutes.js";
import orderRoutes   from "../server/routes/orderRoutes.js";
import reportRoutes  from "../server/routes/reportRoutes.js";
import userRoutes    from "../server/routes/userRoutes.js";

import { notFound, errorHandler } from "../server/middleware/errorMiddleware.js";

const app = express();

// Connect DB (only once)
connectDB();

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Trolly Hub API is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock",    stockRoutes);
app.use("/api/orders",   orderRoutes);
app.use("/api/reports",  reportRoutes);
app.use("/api/users",    userRoutes);

app.use(notFound);
app.use(errorHandler);

// ✅ IMPORTANT: export instead of listen
export default app;
