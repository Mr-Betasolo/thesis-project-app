import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  hash: String,
  salt: String,
});

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
