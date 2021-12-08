import express from "express";
import passport from "passport";

import { userRegister, isAuth } from "../controllers/user.js";

const router = express.Router();

const logger = (req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
};

router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "this is homepage" });
});

router.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/protected" })
);

router.post("/register", userRegister);

router.get("/protected", logger, isAuth, (req, res) => {
  res.send("You are authenticated");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
