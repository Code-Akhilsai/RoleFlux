import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import adminAuth from "../src/firebaseAdmin.js";

const deleteController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.SECREATE_KEY);
    const user = await User.findById(decoded._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete from Firebase Auth if this user signed up via Google
    if (user.firebaseUid) {
      try {
        await adminAuth.deleteUser(user.firebaseUid);
      } catch (firebaseError) {
        console.error("Firebase deletion error:", firebaseError);
      }
    }

    await User.deleteOne({ _id: decoded._id });

    res.clearCookie("token");
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({ message: "Failed to delete account" });
  }
};

export default deleteController;
