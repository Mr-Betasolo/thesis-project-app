import { genPassword } from "../utils/passwordUtils";
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

  res.status(201).redirect("/login");
};

export { userRegister };
