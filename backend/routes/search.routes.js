import { Router } from "express";
import searchController from "../controllers/search.controllers.js";

const search_router = Router();

search_router.get("/jobs/search", searchController);

export default search_router;
