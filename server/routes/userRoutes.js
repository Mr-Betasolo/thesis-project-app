import express from "express";
import passport from "passport";

import {
  userSignup,
  userLogin,
  userRefreshToken,
  userLogout,
} from "../controllers/userController.js";

const router = express.Router();
const verifyUser = passport.authenticate("jwt", { session: false });

router.post("/login", passport.authenticate("local"), userLogin);
router.post("/signup", userSignup);
router.post("/refreshToken", userRefreshToken);
router.get("/me", verifyUser, (req, res) => {
  res.send(req.user);
});
router.get("/logout", verifyUser, userLogout);

export default router;
