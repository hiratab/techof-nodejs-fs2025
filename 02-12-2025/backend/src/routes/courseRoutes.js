import { Router } from "express";
import { Course } from "../models/Course.js";

const router = Router();

router.get("/", async(req,res)=>{
  res.json(await Course.find());
});

export default router;
