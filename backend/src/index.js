import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../routes/register.routes.js";
import dbconnection from "../db/dbconnection.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//routes

app.use("/api/v1", router);

await dbconnection();
app.listen(port, () =>
  console.log(`Server is started ${`http://localhost:${port}`}`),
);
