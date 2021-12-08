import { genPassword } from "../utils/passwordUtils.js";
import UserModel from "../models/user.js";

const userRegister = async (req, res) => {
  // check for existing email
  const duplicateEmail = await UserModel.findOne({ email: req.body.email });
  if (duplicateEmail)
    return res.status(200).json({ success: false, error: "duplicate" });

  const { salt, hash } = genPassword(req.body.pw);

  const newUser = new UserModel({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    hash,
    salt,
  });

  await newUser.save();

  res.status(201).json({ success: true, user: newUser });
};

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ success: false, message: "You are not authorized to view this" });
  }
};

export { userRegister, isAuth };
