import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Mongoose connected.');
    return;
  }
  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  });
};

export default connectDB;