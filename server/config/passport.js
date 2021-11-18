import passport from "passport";
import strategy from "passport-local";

import UserModel from "../models/user.js";
import { validPassword } from "../utils/passwordUtils.js";

const LocalStrategy = strategy.Strategy;

const customFields = {
  usernameField: "email",
  passwordField: "pw",
};
const verifyCallback = (username, password, done) => {
  UserModel.findOne({ username: username })
    .then((user) => {
      // return false if there is is no user with that username
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
