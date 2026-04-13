import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/root";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
      errors: error.errors
    });
  }

  console.error(error);
  return res.status(500).json({
    message: "Internal Server Error",
    errorCode: 30001
  });
};