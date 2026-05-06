import { NextFunction, Request, Response } from "express";

type TAsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

const catchAsync =
  (fn: TAsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;
