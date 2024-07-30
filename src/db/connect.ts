import mongoose from "mongoose";

export default function connectDB(URI: string) {
  return mongoose.connect(URI);
}
