import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
    console.log("📦 DB Name:", conn.connection.name);
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};