import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());

app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Knex API running on http://localhost:" + PORT);
});
