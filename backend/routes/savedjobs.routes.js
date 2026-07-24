import { Router } from "express";
import savedjobsController from "../controllers/savedjobs.controllers.js";
import profile_middleware from "../middlewares/profile.middlewares.js";

const savedjobs_Router = Router();

savedjobs_Router.post("/savejob", profile_middleware, savedjobsController);

export default savedjobs_Router;
