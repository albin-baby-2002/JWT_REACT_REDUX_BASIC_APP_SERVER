import mongoose from "mongoose";

interface roles {
    
    User:number
    Admin:number
    Editor:number
}

interface User extends mongoose.Document {
    
    username:string
    password:string
    email:string
    phone:string
    roles: roles
    image:string
    refreshToken:string
}

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phone:{
        type: String,
        required: true,
     
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    image:{
      types:String  
    },
    
    refreshToken: String
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel