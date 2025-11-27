import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Student } from "../models/Student.js";

dotenv.config();
const router = Router();

router.post("/login", async(req,res)=>{
  const { email, password } = req.body;
  // Implementar a lógica de autenticação aqui
});

export default router;
