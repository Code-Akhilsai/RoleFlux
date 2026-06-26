import { Router } from "express";

const Logout_router = Router();

Logout_router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the session cookie
  return res.status(200).json({ message: "Logged out successfully" });
});
export default Logout_router;
