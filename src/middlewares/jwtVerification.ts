import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()

import jwt, { JwtPayload } from 'jsonwebtoken'

interface CustomRequest extends Request {
  userInfo?: {
    // Define the structure of the user object here
    username: string
    roles: number []
    // Add other properties if needed
  };
}

interface UserInfo {
  username: string;
  roles: number[];
}

interface DecodedToken {
  UserInfo: UserInfo;
}

const verifyJWT = (req:CustomRequest,res:Response,next:NextFunction)=>{
    
    const authHeader =( req.headers.authorization || req.headers.Authorization) as string ;
    
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401) // unauthorized
    
    try{
        
        const ACCESS_SECRET =process.env.ACCESS_TOKEN_SECRET;
            
            
        if(!ACCESS_SECRET ){ 
                
            throw new Error('Failed to create token')
        }
    
        const token = authHeader.split(' ')[1];
    
        jwt.verify(token,ACCESS_SECRET,(err,decoded)=>{
            
            if(err) return res.sendStatus(403); // forbidden
            
            req.userInfo = req.userInfo || {username:'',roles:[]};
            
         
            
            req.userInfo.username = (decoded as DecodedToken).UserInfo.username 
            req.userInfo.roles = (decoded as DecodedToken).UserInfo.roles;
        })
        
        next()
    
    }
    
    catch(err:any){
        
        next(err)
    }
    
    
}

export default verifyJWT