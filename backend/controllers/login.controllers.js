import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return res.status(400).json({ message: "invalid credentionals" });

    const token = await jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECREATE_KEY,
      { expiresIn: "1d" },
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({ message: "Login successfull" });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

export default loginController;
