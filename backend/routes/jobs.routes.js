import { Router } from "express";
import jobsController from "../controllers/jobs.controllers.js";

const jobsRouter = Router();

jobsRouter.post("/jobs", jobsController);

export default jobsRouter;
