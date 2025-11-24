import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export function connectDB() {
  return mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error(err));
}

export function disconnectDB() {
  return mongoose.disconnect()
    .then(() => console.log("MongoDB desconectado"))
    .catch(err => console.error(err));
}
