
import bcrypt from 'bcrypt'
import User from '../models/userModel';
import { Request, Response } from 'express';

const handleLogin = async (req:Request, res:Response) => {
    
    const { user, pwd } = req.body;
    
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user });
    
    if (!foundUser) return res.sendStatus(401); // 401 - Unauthorized 
    
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    
    if (match) {
       
        res.status(200).json({"message":"Login Successful"})

    } else {
        res.sendStatus(401);
    }
}

export default handleLogin