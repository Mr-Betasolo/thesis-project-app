import express from "express";
import passport from "passport";

import { userRegister } from "../controllers/user.js";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "this is homepage" });
});

mainRouter.post(
  "/login",
  passport.authenticate("local", { successRedirect: "" })
);

mainRouter.post("/register", userRegister);

export default mainRouter;
