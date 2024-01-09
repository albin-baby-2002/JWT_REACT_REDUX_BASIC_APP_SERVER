import { NextFunction,Request,Response } from "express";

type ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const errorHandler:ErrorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.message) ;
}

export const multerErrorHandler:ErrorHandlerMiddleware = (err, req, res, next) => {

  
  console.log(err)


    return res.status(400).json({ "success": false, "message": "Img uploading Failed : wrong img type , Insert correct Img and try Again!" })

    





}
