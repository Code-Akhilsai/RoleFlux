import { Router } from "express";
import analyzeResumeController from "../controllers/analyseATS.controllers.js";
import upload from "../middlewares/upload.middlewares.js";

const analyseATS_Router = Router();
analyseATS_Router.post(
  "/analyze-resume",
  upload.single("file"),
  analyzeResumeController,
);

export default analyseATS_Router;
