import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const UserSchema = new Schema({
  firstName: { type: String, default: "", required: true },
  lastName: { type: String, default: "", required: true },
  authStrategy: {
    type: String,
    default: "local",
  },
  points: {
    type: Number,
    default: 50,
  },
  refreshToken: {
    type: [Session],
  },
});

// Remove refreshToken from the response
UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken;
    return ret;
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
