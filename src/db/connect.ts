import mongoose from "mongoose";

export default async function connectDB(URL: string): Promise<void> {
  await mongoose.connect(URL);
}
