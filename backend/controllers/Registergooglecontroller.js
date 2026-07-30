import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../controllers/verifyemail.controller.js";

const registerGoogleController = async (req, res) => {
  const { email, username, firebaseUid } = req.body;

  try {
    if (!email || !username) {
      return res.status(400).json({ message: "Email and username required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.isEmailVerified) {
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.SECREATE_KEY,
          { expiresIn: "24h" },
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          message: "Login successful",
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        const verificationToken = jwt.sign(
          { userId: user._id },
          process.env.SECREATE_KEY,
          { expiresIn: "24h" },
        );

        // fire and forget — don't block the response on email sending
        sendVerificationEmail(email, verificationToken).catch((err) =>
          console.error("Background email send failed:", err),
        );

        return res.status(200).json({
          message: "Check your email to verify your account",
          email: user.email,
        });
      }
    }

    // Create new user (not verified yet)
    user = await User.create({
      username: username + "_" + Date.now().toString().slice(-4),
      email,
      password: jwt.sign({ email }, process.env.SECREATE_KEY),
      firebaseUid,
      isEmailVerified: false,
    });

    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.SECREATE_KEY,
      { expiresIn: "24h" },
    );

    // fire and forget — don't block the response on email sending
    sendVerificationEmail(email, verificationToken).catch((err) =>
      console.error("Background email send failed:", err),
    );

    return res.status(200).json({
      message: "Account created! Check your email to verify.",
      email: user.email,
    });
  } catch (error) {
    console.error("Google registration error:", error);
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export default registerGoogleController;
