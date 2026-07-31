import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Send Verification Email
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "RoleFlux <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your RoleFlux Account - Action Required",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #333; text-align: center;">Welcome to RoleFlux!</h2>
            <p style="color: #666; text-align: center; margin: 20px 0;">
              Click the button below to verify your email address.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="background: #6366f1; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                Verify Email
              </a>
            </div>
            <p style="color: #999; font-size: 12px; text-align: center;">
              Or copy this link: ${verificationLink}
            </p>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
              This link expires in 24 hours.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      throw error;
    }

    console.log("Verification email sent to:", email, "id:", data?.id);
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};

// Rest of file stays exactly the same — verifyEmailController, resendVerificationController
const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.SECREATE_KEY);

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { isEmailVerified: true },
      { returnDocument: "after" },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const loginToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECREATE_KEY,
      { expiresIn: "24h" },
    );

    res.cookie("token", loginToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Email verified successfully!",
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired verification link" });
  }
};

const resendVerificationController = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.SECREATE_KEY,
      { expiresIn: "24h" },
    );

    await sendVerificationEmail(email, verificationToken);

    return res
      .status(200)
      .json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Resend verification error:", error);
    return res
      .status(500)
      .json({ message: "Failed to send verification email" });
  }
};

export {
  verifyEmailController,
  resendVerificationController,
  sendVerificationEmail,
};
