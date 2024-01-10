
import * as dotenv from 'dotenv'
dotenv.config()

import User from '../../models/userModel';
import { NextFunction, Request, Response } from 'express';
import { log } from 'console';
import { rmSync } from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'


 export const getUsersData = async (req:Request, res:Response,next:NextFunction) => {
    
    
    try{
        
       const users =  await User.find({},'_id username email phone ');
       
       res.status(200).json(users)
       
    
        
    }
    catch(err:any){ 
        
        next(err)
    }
}


export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const deletedUser = await User.findOneAndDelete({_id:userId});

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found ' });
    }
    
    console.log('deleted ',deletedUser._id);
    

    res.status(200).json({ message: 'User successfully deleted' });
    
  } catch (error) {
    console.error(error); // Log the error for debugging
    next(error);
  }
};

export const editUserInfoHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const { username, phone } = req.body;


    if (!mongoose.Types.ObjectId.isValid(userId)) {
        
      return res.status(400).json({ message: 'Invalid userId' });
      
    }
    if (typeof username !== 'string' || !username.trim()) {
        
      return res.status(400).json({ message: 'Invalid username' });
    }
    if (typeof phone !== 'string' || !phone.match(/\d{10}/)) {
        
      return res.status(400).json({ message: 'Invalid phone number' });
      
    }

    

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { username, phone } }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User successfully updated', updatedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    next(error);
  }
};


export const addNewUserHandler = async (req: Request, res: Response, next: NextFunction) => {
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
};


