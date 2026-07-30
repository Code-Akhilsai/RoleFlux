import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../routes/register.routes.js";
import Profile_router from "../routes/profile.routes.js";
import dbconnection from "../db/dbconnection.js";
import Login_router from "../routes/login.routes.js";
import Logout_router from "../routes/logout.routes.js";
import jobsRouter from "../routes/jobs.routes.js";
import search_router from "../routes/search.routes.js";
import savedjobs_Router from "../routes/savedjobs.routes.js";
import google_Router from "../routes/google.routes.js";
import analyseATS_Router from "../routes/analyseATS.routes.js";
import delete_Router from "../routes/deleteacc.routes.js";
import checkAuth_Router from "../routes/checkAuth.routes.js";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.use(cookieParser());

//routes

app.use("/api/v1", router);
app.use("/api/v1", Profile_router);
app.use("/api/v1", Login_router);
app.use("/api/v1", Logout_router);
app.use("/api/v1", jobsRouter);
app.use("/api/v1", search_router);
app.use("/api/v1", savedjobs_Router);
app.use("/api/v1", google_Router);
app.use("/api/v1", analyseATS_Router);
app.use("/api/v1", delete_Router);
app.use("/api/v1", checkAuth_Router);

await dbconnection();
app.listen(port, () =>
  console.log(`Server is started ${`http://localhost:${port}`}`),
);
