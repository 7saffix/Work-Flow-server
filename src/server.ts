import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database Connected SuccessFully");
    server = app.listen(process.env.PORT, () => {
      console.log(`Server running at port ${process.env.PORT}💻`);
    });
  } catch (error) {
    console.log("Database connection failed❗");
  }
};
startServer();
