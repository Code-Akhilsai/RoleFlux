import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const checkAuthController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.SECREATE_KEY);
    const user = await User.findById(decoded._id).select("-password");

    if (!user) return res.status(401).json({ message: "Not authenticated" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Not authenticated" });
  }
};

export default checkAuthController;
