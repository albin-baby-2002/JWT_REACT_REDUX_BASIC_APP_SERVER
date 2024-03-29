import express from "express";
const app = express();

import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors';
import path from "path"; 
import mongoose from "mongoose";
import { Request,Response,NextFunction } from "express";
import cookieParser from 'cookie-parser';

import connectDB from "./config/dbConnection";
import corsOptions from "./config/corsOptions";
import verifyJWT from "./middlewares/jwtVerification";
import {errorHandler} from "./middlewares/errorHandler";
import authRouter from './routes/authRoutes/authRoute';
import logoutRouter from "./routes/authRoutes/LogoutRoute";
import RefreshRouter from "./routes/authRoutes/refreshRoute";
import registerRouter from "./routes/authRoutes/registerRoute";
import credentials from "./middlewares/credentials";
import userRouter from './routes/userRoutes/userRoutes'
import verifyRoles from "./middlewares/verifyRoles";
import ROLES_LIST from "./config/allowedRoles";
import adminAuthRoute from './routes/adminRoutes/adminAuthRoute'
import userManagementRoutes from './routes/adminRoutes/userManagement'

const PORT = process.env.PORT || 3500;

// connect to mongodb database

connectDB()

// access-control-allow-credentials 
app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url}`);
  next();
});

app.use(credentials)

app.use(cors(corsOptions))

app.use('/public', express.static(path.join(__dirname,'..', 'public')));

console.log(path.join(__dirname,'..','public'))



app.use(cookieParser())

app.use(express.json())




app.use('/register',registerRouter)

app.use('/auth',authRouter)

app.use('/admin/auth',adminAuthRoute)

app.use('/refresh',RefreshRouter)

app.use('/logout',logoutRouter)



// authenticate users using jwt for private routes

app.use(verifyJWT)



app.use('/admin/users',verifyRoles(ROLES_LIST.Admin),userManagementRoutes)

app.use('/user',verifyRoles(ROLES_LIST.User),userRouter)







// 404 Error Middleware

app.use('*',(req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handler

app.use(errorHandler)

// running the server application

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});




