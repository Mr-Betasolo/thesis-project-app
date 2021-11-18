import mongoose from "mongoose";

const connectDB = async (dbstring) => {
  try {
    await mongoose.connect(dbstring);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
