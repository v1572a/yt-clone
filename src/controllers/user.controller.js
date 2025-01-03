import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js"
import { uploadFileCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const userRegister = asyncHandler(async (req, res) => {

  // Get User details
  const { username, email, fullname, password } = req.body

  if (
    [username, email, fullname, password].some((fields) =>
      fields?.trim() ===""
    )
  ) {
    ApiError(401, "All fields are required");
  }
  
 try {
  const existedUser =await User.findOne(
    {email}
  )
  if (existedUser) {
    throw new ApiError(403,"USer or Email Already Exists")
  }
  console.log(email+"1");
 } catch (error) {
  console.log(error);
  
 }
  console.log("I exist");

  
  

  

 
  const avatarLocalPath=  req.files?.avatar[0]?.path;
  const coverImageLocalPath=req.files?.coverImage[0]?.path;
  console.log(avatarLocalPath);

   if (avatarLocalPath==="") {
    throw new ApiError(400,"Avatar file is required");
   }
  const avatarResponse=await uploadFileCloudinary(avatarLocalPath);
  const coverImageResponse=await uploadFileCloudinary(coverImageLocalPath);
  if (!avatarResponse) {
    throw new ApiError(400,"Avatar is needed");
  }
  console.log(avatarResponse);
  
  const user=await User.create({
    fullname,
     avatar:avatarResponse.url,
     coverImage:coverImageResponse?.url || "",
     email,
     password,
     username:username.toLowerCase()
  });
 const userSearch= await User.findById(user._id).select(
  "-password -refreshToken"
 )
 if (!userSearch) {
  throw new ApiError(500,"Something went wrong while registering the user");
 }

 return res.status(201).json(
  new ApiResponse(201,userSearch,"User registered")
 )
});

export default userRegister;
