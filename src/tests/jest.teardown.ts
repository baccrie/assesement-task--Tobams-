import mongoose from 'mongoose';

// delete database and close connection
export default async() => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}