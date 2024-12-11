import mongoose from "mongoose";
import dotenv from 'dotenv';
import { DB_NAME } from "../constants.js";

dotenv.config({
    path:'./env'
})

 const  ConnectDB= async ()=>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       console.log(" \n MongoDB connected and DBHOST: ",connectionInstance.connection.host);
    } catch (error) {
        console.error("MongoDB connection failed: ",error);
        process.exit(1);   
    }
}
export default ConnectDB;