import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Student } from "../models/Student.js";

dotenv.config();
const router = Router();

router.post("/login", async(req,res)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email e password são obrigatórios" });
  }
  const student = await Student.findOne({ email: email });
  if (!student) return res.status(401).json({ message: "Credenciais inválidas" });
  const ok = await student.checkPassword(password);
  if (!ok) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: student._id, name: student.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, student: { id: student._id, name: student.name, email: student.email } });
});

export default router;
