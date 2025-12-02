import { Router } from "express";
import { Post } from "../models/Post.js";
import { authRequired } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authRequired, async(req,res)=>{
  const page=parseInt(req.query.page)||1;
  const limit=parseInt(req.query.limit)||10;
  const skip=(page-1)*limit;

  const [data,total]=await Promise.all([
    Post.find().populate("author","name").skip(skip).limit(limit),
    Post.countDocuments()
  ]);

  res.json({page,total,totalPages:Math.ceil(total/limit),data});
});

router.post("/", authRequired, async(req,res)=>{
  const authorId = req.user.id;
  const { title, comment } = req.body;
  const created = await Post.create({ title, comment, author: authorId });
  res.status(201).json(created);
});

router.put("/:id", authRequired, async(req,res)=>{
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", authRequired, async(req,res)=>{
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post removido" });
});

export default router;
