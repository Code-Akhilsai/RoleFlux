import { Router } from "express";
import registerGoogleController from "../controllers/Registergooglecontroller.js";
import {
  verifyEmailController,
  resendVerificationController,
} from "../controllers/verifyemail.controllers.js";

const google_Router = Router();

google_Router.post("/register-google", registerGoogleController);
google_Router.get("/verify-email", verifyEmailController);
google_Router.post("/resend-verification", resendVerificationController);

export default google_Router;
