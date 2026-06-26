import { Router } from "express";
import profileController from "../controllers/profile.controllers.js";
import profile_middleware from "../middlewares/profile.middlewares.js";

const Profilerouter = Router();

Profilerouter.get("/profile", profile_middleware, profileController);

export default Profilerouter;
