import express from "express";
import { connectDB } from "./db.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://techof-2025-frontend.onrender.com"
]
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not Allowed by CORS'))
  }
}));
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

connectDB().then(() => {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
