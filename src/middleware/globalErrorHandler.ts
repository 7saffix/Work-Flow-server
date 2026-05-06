import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode;
  let message;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }
  res.status(statusCode as number).json({
    statusCode,
    success: false,
    message,
    stack: error.stack,
  });
};

export default globalErrorHandler;
