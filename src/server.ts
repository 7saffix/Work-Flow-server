import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import envVars from "./config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.MONGO_URI);
    console.log("Database Connected SuccessFully");
    server = app.listen(envVars.PORT, () => {
      console.log(`Server running at port ${envVars.PORT}💻`);
    });
  } catch (error) {
    console.log("Database connection failed❗");
  }
};
startServer();
