import express from "express";
import passport from "passport";

import { userRegister, isAuth } from "../controllers/user.js";

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

router.post("/register", userRegister);

router.get("/protected", isAuth, (req, res) => {
  res.send("You are authenticated");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
