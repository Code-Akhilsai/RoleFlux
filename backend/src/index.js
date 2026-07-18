import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "../routes/register.routes.js";
import Profile_router from "../routes/profile.routes.js";
import dbconnection from "../db/dbconnection.js";
import Login_router from "../routes/login.routes.js";
import Logout_router from "../routes/logout.routes.js";
import jobsRouter from "../routes/jobs.routes.js";
import search_router from "../routes/search.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

//routes

app.use("/api/v1", router);
app.use("/api/v1", Profile_router);
app.use("/api/v1", Login_router);
app.use("/api/v1", Logout_router);
app.use("/api/v1", jobsRouter);
app.use("/api/v1/", search_router);

await dbconnection();
app.listen(port, () =>
  console.log(`Server is started ${`http://localhost:${port}`}`),
);
