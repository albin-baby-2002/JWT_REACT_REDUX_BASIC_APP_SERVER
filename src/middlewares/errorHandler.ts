import { NextFunction,Request,Response } from "express";

type ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const errorHandler:ErrorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.message) ;
}

export default errorHandler