import mongoose from "mongoose";
import { app } from "./app.mjs";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

function dbConnection() {
  const DB = process.env.MONGO_DB_URI.replace(
    "<PASSWORD>",
    process.env.DB_PASSWORD
  );
  mongoose
    .connect(DB)
    .then((con) => console.log("DataBase Connected Succesfully...."))
    .catch((err) => console.log(err));
}
export default dbConnection;
