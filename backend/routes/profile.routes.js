import { Router } from "express";
import profileController from "../controllers/profile.controllers.js";
import profile_middleware from "../middlewares/profile.middlewares.js";

const Profile_router = Router();

Profile_router.get("/profile", profile_middleware, profileController);

export default Profile_router;
