import mongoose from "mongoose";

interface roles {
    
    User:number
    Admin:number
    Editor:number
}

interface User extends mongoose.Document {
    
    username:string
    password:string
    roles: roles
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
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel