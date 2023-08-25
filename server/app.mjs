// import modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dbConnection from "./db.mjs";
import { router as userRouter } from "./routes/userRoutes.mjs";
import { router as jobRouter } from "./routes/jobRoutes.mjs";
import dotenv from "dotenv";
import globalErrorHandler from "./controllers/errorController.mjs";
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config.env" });
// app
const app = express();
// db
dbConnection();
// middleware
app.use(express.json()); //access json data from req.body
app.use(cors());
app.use(express.static(`${__dirname}/public`));
// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);
// handling unhandled routes
app.use("*", (req, res, next) => {
  res.status(400).json({
    status: "fail",
    message: "no such route ",
  });
});
// global error handling middleware
app.use(globalErrorHandler);
// port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
export { mongoose, app };
