import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  comment: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

export const Post = mongoose.model('Post', PostSchema, 'posts');
