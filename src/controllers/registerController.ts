import { NextFunction ,Request,Response} from "express";
import bcrypt from 'bcrypt'

import  User from '../models/userModel'

 export const newUserRegister = async(req:Request,res:Response,next:NextFunction)=>{
    
     const { user, pwd, email , phone } = req.body;
     
    if (!user || !pwd || !email || !phone) return res.status(400).json({ 'message': 'All fields are required.' });  // bad request

   

    try {
        
    
        const duplicate = await User.findOne({ email });
    
        if (duplicate) return res.sendStatus(409); // Conflict 
       
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        const newUser = new User({
             username: user,
             password: hashedPwd,
             email,
             phone
        });

        newUser.save()

        res.status(201).json({ 'success': `New user ${user} created!` });
        
    } catch (err:any) {
        
        next(err)
    }
}

