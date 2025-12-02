import { Router } from "express";
import { Student } from "../models/Student.js";

const router = Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page)||1;
  const limit = parseInt(req.query.limit)||10;
  const skip = (page-1)*limit;

  const [data,total] = await Promise.all([
    Student.find().populate("course").skip(skip).limit(limit),
    Student.countDocuments()
  ]);

  res.json({ page, total, totalPages: Math.ceil(total/limit), data });
});

export default router;
