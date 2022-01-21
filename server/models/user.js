import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

import { StudentSchema } from "./subjects.js";

const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const UserSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
  subjects: [
    {
      subjectName: String,
      subjectGrade: String,
      details: String,
      total: Number,
    },
  ],
  students: [StudentSchema],
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
