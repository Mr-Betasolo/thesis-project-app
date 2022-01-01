import passport from "passport";
import strategy from "passport-local";

import User from "../models/user.js";

const LocalStrategy = strategy.Strategy;
console.log("Local strategy");

// Called during login/sign up
passport.use(User.createStrategy());

// called while after loggin in/signing up to set user details in req.user
passport.serializeUser(User.serializeUser());
