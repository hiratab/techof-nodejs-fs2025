import express from "express";
import { connectDB, disconnectDB } from "./db.js";

const app = express();
app.use(express.json());

// app.use("/students", studentRoutes);
// app.use("/courses", courseRoutes);
// app.use("/posts", postRoutes);
// app.use("/auth", authRoutes);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
})

connectDB().then(() => {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});

const gracefulShutdown = async (exitCode = 0) => {
  await disconnectDB();
  process.exit(exitCode);
}

process.on("uncaughtException", async (err) => {
  await gracefulShutdown(1);
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await gracefulShutdown();
});
