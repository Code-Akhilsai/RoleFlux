import bcrypt from "bcryptjs";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isExisted = await User.findOne({ username, email });

  if (isExisted) return res.send("user already existed");

  const hashPassword = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashPassword });

  const user = await User.findOne({
    username,
    email,
  });

  const token = await jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECREATE_KEY,
    { expiresIn: "1d" },
  );

  return res
    .status(200)
    .cookie("token", token, { httpOnly: true })
    .json({ message: "successfully created an account" });
};

export default registerController;
