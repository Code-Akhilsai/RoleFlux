import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../controllers/verifyemail.controllers.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isEmailVerified: false,
    });

    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.SECREATE_KEY,
      { expiresIn: "24h" },
    );

    await sendVerificationEmail(email, verificationToken);

    return res.status(200).json({
      message: "Registration successful! Check your email to verify.",
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export default registerController;
