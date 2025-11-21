import express from "express";
import { connectDB } from "./db.js";

const app = express();
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/posts", postRoutes);

connectDB().then(() => {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
