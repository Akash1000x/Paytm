import mongoose, { Schema } from 'mongoose';

const user = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:20,
    },
    password:{
        type:String,
        trim:true,
        minLength:8,
        maxLength:20,
    }
})

const User = mongoose.model("User",user);

export default User;