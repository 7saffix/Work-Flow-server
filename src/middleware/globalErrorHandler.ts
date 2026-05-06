import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { ZodError } from "zod";

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
  } else if (error instanceof ZodError) {
    console.log(error.issues[0]);
    statusCode = 400;
    message = error.issues[0].message;
  } else if (error.name == "ValidationError") {
    statusCode = 400;
    let allErrors = Object.values(error.errors).map((e: any) => ({
      e,
    }));
    message = allErrors[0].e.message;
  } else if (error.code == 11000) {
    statusCode = 400;
    message = `${Object.keys(error.keyValue)} already exist`;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode as number).json({
    statusCode,
    success: false,
    message,
    error,
    stack: error.stack,
  });
};

export default globalErrorHandler;
