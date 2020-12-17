import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB is connected'.yellow.bold);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
