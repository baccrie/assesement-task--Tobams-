import mongoose from 'mongoose';

// close connection
export default async() => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}