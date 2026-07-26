import { Router } from "express";
import {
  savedjobsController,
  getSavedJobsController,
} from "../controllers/savedjobs.controllers.js";
import profile_middleware from "../middlewares/profile.middlewares.js";

const savedjobs_Router = Router();

savedjobs_Router.get("/savejob", profile_middleware, getSavedJobsController);
savedjobs_Router.post("/savejob", profile_middleware, savedjobsController);

export default savedjobs_Router;
