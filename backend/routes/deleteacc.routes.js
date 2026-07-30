import { Router } from "express";
import deleteController from "../controllers/deleteacc.controllers.js";
import profile_middleware from "../middlewares/profile.middlewares.js";

const delete_Router = Router();

delete_Router.delete("/delete-account", profile_middleware, deleteController);

export default delete_Router;
