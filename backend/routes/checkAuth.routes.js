import { Router } from "express";
import checkAuthController from "../controllers/checkAuth.controllers.js";

const checkAuth_Router = Router();

checkAuth_Router.get("/me", checkAuthController);

export default checkAuth_Router;
