import connectDB from '../db/connect';

// connect to db
export default async () => {
  await connectDB(`${process.env.MONGO_URL}`);
}