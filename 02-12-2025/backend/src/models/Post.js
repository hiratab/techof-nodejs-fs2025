import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }
}, {
  timestamps: true
});

export const Post = mongoose.model("Post", PostSchema);
