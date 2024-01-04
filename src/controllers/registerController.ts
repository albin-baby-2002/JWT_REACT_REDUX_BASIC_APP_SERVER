import { NextFunction ,Request,Response} from "express";
import bcrypt from 'bcrypt'

import  User from '../models/userModel'

 export const newUserRegister = async(req:Request,res:Response,next:NextFunction)=>{
     const { user, pwd } = req.body;
     
     // 400 -bad request
     
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    
    const duplicate = await User.findOne({ username: user });
    
    if (duplicate) return res.sendStatus(409); // 409 - Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        
        const newUser = new User({
             username: user,
             password: hashedPwd
        });

        newUser.save()
        
        console.log(newUser);

        res.status(201).json({ 'success': `New user ${user} created!` });
        
    } catch (err:any) {
        
        res.status(500).json({ 'message': err.message });
    }
}

