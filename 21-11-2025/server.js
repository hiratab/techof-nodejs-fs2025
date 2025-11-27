import express from "express";
import { connectDB, disconnectDB } from "./db.js";
import { StudentModel, PostModel } from './models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const SECRET = 'a-string-secret-at-least-256-bits-long';

// app.use("/students", studentRoutes);
// app.use("/courses", courseRoutes);
// app.use("/posts", postRoutes);
// app.use("/auth", authRoutes);

app.post("/post",
  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Missing authorization header"
      })
    }

    const [_, token] = authHeader.split(' ')
    try {
      const payload = jwt.verify(token, SECRET) // payload + secret = signature do jwt
      req.studentId = payload.id

      next()
    } catch (error) {
      return res.status(401).json({
        message: "invalid token"
      })
    }
  },
  async (req, res, next) => {
    const { studentId } = req

    const student = await StudentModel.findById(studentId)
    if (!student) {
      return res.status(401).json({
        message: "student not found"
      })
    }

    req.student = student
    next()
  },
  async (req, res) => {
    const { student } = req;
    console.log(student)

    return res.json(student)
  }
)

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 1) {
    return res.status(400).send({
      message: "Email or password is not valid"
    })
  }

  const student = await StudentModel.findOne({
    email
  });
  if (!student) {
    return res.status(401).send({
      message: "Email or password is not valid"
    })
  }

  const passwordMatch = await bcrypt.compare(password, student.password);
  if (!passwordMatch) {
    console.log("passwordMatch", passwordMatch)
    return res.status(401).send({
      message: "Email or password is not valid"
    })
  }

  const token = jwt.sign({
    id: student._id,
    email: student.email,
  },
    SECRET, // 10^256
    {
      expiresIn: '1h'
    })

  return res.status(200).json({
    token
  })
})

connectDB().then(() => {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});

const gracefulShutdown = async (exitCode = 0) => {
  await disconnectDB();
  process.exit(exitCode);
}

process.on("uncaughtException", async (err) => {
  await gracefulShutdown(1);
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await gracefulShutdown();
});
