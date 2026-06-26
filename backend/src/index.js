import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "../routes/register.routes.js";
import Profilerouter from "../routes/profile.routes.js";
import dbconnection from "../db/dbconnection.js";

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
app.use("/api/v1", Profilerouter);

await dbconnection();
app.listen(port, () =>
  console.log(`Server is started ${`http://localhost:${port}`}`),
);
