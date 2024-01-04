import { NextFunction, Request, Response } from "express";


interface CustomRequest extends Request {
  userInfo?: {
    // Define the structure of the user object here
    username: string
    roles: number []
    // Add other properties if needed
  };
}
const verifyRoles = (...allowedRoles:number []) => {
    return (req:CustomRequest, res:Response, next:NextFunction) => {
        if (!req?.userInfo?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.userInfo.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

export default verifyRoles