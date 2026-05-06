import { Response } from "express";

interface IMeta {
  total: number;
}

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: IMeta;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};
