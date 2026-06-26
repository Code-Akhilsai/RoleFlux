import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
const profile_middleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = await jwt.verify(token, process.env.SECREATE_KEY);
    req.user = decode;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default profile_middleware;
