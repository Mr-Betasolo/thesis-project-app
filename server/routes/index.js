import express from "express";
import passport from "passport";

import { userRegister, userLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", passport.authenticate("local"), userLogin);

router.post("/register", userRegister);

router.get("/protected", isAuth, (req, res) => {
  res.send("You are authenticated");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
