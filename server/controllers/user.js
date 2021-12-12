import { genPassword } from "../utils/passwordUtils.js";
import UserModel from "../models/user.js";

const userRegister = async (req, res) => {
  try {
    // check for existing email
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });

    const { salt, hash } = genPassword(req.body.password);

    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hash,
      salt,
    });

    await newUser.save();

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
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
