import { Router } from "express";
import registerController from "../controllers/register.controllers.js";
const router = Router();

router.post("/register", registerController);

export default router;
