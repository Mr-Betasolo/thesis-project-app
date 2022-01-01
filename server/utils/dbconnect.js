import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
