import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,// Cloudinary String || aws
        required:true
    },
    coverImage:{
    type:String// Cloudinary Url ||will do aws also
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true});

userSchema.pre("save",async function (next){
    if (this.isModified("password")) {
        this.password= await bcrypt.hash(this.password,10)
    }
next();
})// no arrow function

userSchema.methods.isPasswordCorrect=async function
(password)
{
 return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
  return  jsonwebtoken.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname     
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return  jsonwebtoken.sign(
        {
            _id:this._id,  
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export  const User=mongoose.model("User",userSchema);