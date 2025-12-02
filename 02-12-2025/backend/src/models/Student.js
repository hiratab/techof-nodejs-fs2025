import mongoose from "mongoose";
import bcrypt from "bcrypt";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  skills: [String],
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  password: { type: String, required: true }
}, {
  timestamps: true
});

StudentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

StudentSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export const Student = mongoose.model("Student", StudentSchema);
