import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

import authRoutes    from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import stockRoutes   from "./routes/stockRoutes.js";
import orderRoutes   from "./routes/orderRoutes.js";
import reportRoutes  from "./routes/reportRoutes.js";
import userRoutes    from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();


connectDB();


app.use(cors({
  origin: process.env.CLIENT_URL || "*",   // allow all for now
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));


app.get("/", (_req, res) => {
  res.send("🚀 Trolly Hub API is running");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});


app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock",    stockRoutes);
app.use("/api/orders",   orderRoutes);
app.use("/api/reports",  reportRoutes);
app.use("/api/users",    userRoutes);


app.use(notFound);

r
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
