import passport from "passport";
import strategy from "passport-local";

import UserModel from "../models/user.js";
import { validPassword } from "../utils/passwordUtils.js";

const LocalStrategy = strategy.Strategy;

const customFields = {
  usernameField: "email",
  passwordField: "password",
};
const verifyCallback = (email, password, done) => {
  UserModel.findOne({ email: email })
    .then((user) => {
      // return false if there is is no user with that username
      if (!user) return done(null, false, { message: "User doesn't exist" });

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    })
    .catch((err) => done(err));
};

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
