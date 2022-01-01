import express from "express";
import passport from "passport";

import {
  userSignup,
  userLogin,
  userRefreshToken,
  userLogout,
} from "../controllers/userController.js";
import { verifyUser } from "../utils/tokenUtils.js";

const router = express.Router();

router.post("/login", passport.authenticate("local"), userLogin);
router.post("/signup", userSignup);
router.post("/refreshToken", userRefreshToken);
router.get("/me", verifyUser, (req, res) => {
  res.send(req.user);
});
router.get("/logout", verifyUser, userLogout);

export default router;
