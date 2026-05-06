import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to WorkFlow Server-A inventory management system");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
