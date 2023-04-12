import ApiError from "../exceptions/ApiError";
import { Request, Response, NextFunction } from "express";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err });
  }
  return res.status(500).json({ message: "Unknown error.", err });
};
