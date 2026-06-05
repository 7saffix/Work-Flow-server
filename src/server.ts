import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import envVars from "./config/env";

let server: Server;
let PORT = envVars.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.MONGO_URI);
    console.log("Database Connected SuccessFully");
    server = app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}💻`);
    });
  } catch (error) {
    console.log("Database connection failed❗");
  }
};
startServer();
