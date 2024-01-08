
import * as dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcrypt'
import User from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const handleLogin = async (req:Request, res:Response,next:NextFunction) => {
    
    
    
    const { email, pwd } = req.body;
    
    if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    try{
        
        const foundUser = await User.findOne({ email });
        
        if (!foundUser) return res.sendStatus(404); // 401 - User Not found 
        
        // evaluate password 
        const match = await bcrypt.compare(pwd, foundUser.password);
        
        if (match) {
            
            const roles = Object.values(foundUser.roles).filter(Boolean);
            
            const ACCESS_SECRET =process.env.ACCESS_TOKEN_SECRET;
            
            const REFRESH_SECRET =   process.env.REFRESH_TOKEN_SECRET;
            
            if(!ACCESS_SECRET || !REFRESH_SECRET){ 
                
                throw new Error('Failed to create token')
            }
            
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                ACCESS_SECRET,
                { expiresIn: '30s' }
            );
            
            
            const refreshToken = jwt.sign(
            { "username": foundUser.username },
          REFRESH_SECRET,
            { expiresIn: '1d' }
            );
        
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        
        const result = await foundUser.save();
        
        res.cookie('jwt',refreshToken,{httpOnly:true,secure: true, sameSite: 'none',maxAge: 24*60*60*1000})
            
        res.status(200).json({ roles, accessToken, user:foundUser.username });
        } else {
            
            res.sendStatus(401);
        }
        
    }
    catch(err:any){
        
        next(err)
    }

   
}

export default handleLogin