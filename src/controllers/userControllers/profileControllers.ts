import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../middlewares/jwtVerification";
import User from "../../models/userModel";
import { log } from "console";


 
 export const getProfileDataHandler = async (req:CustomRequest, res:Response,next:NextFunction)=>{
    
    try{
        
        const id = req?.userInfo?.id;
        
        const user = await User.findById(id);
        
        // console.log(user);
        
        
        if(!user){
            
            return res.status(404).json({'message':"failed to access user data"})
        }
        
        res.status(200).json({username:user.username,email:user.email,phone:user.phone,image:user.image})
        
        
    }
    
    catch(err:any){
        
    }
}


 export const handleProfileImg = async (req:CustomRequest, res:Response,next:NextFunction)=>{
    
    try{
        
        const image = req.file?.filename;
        
        const userId = req.userInfo?.id;
        
        console.log(image, '', userId)
        
        
        const result = await User.findByIdAndUpdate(userId,{$set:{image}})
        
        console.log(result)
        
        res.sendStatus(200)
        
    }
    
    catch(err:any){
        
        
        console.log('error \t \t ',err)
        
        next(err)
        
    }
}


