import dotenv from 'dotenv';
import express from 'express';
import ConnectDB from './db/index.js';
const app=express();
dotenv.config();
ConnectDB();
// ; (async () =>{
//    try {
//      await mongoose.connect(`${process.env.MONGODB_URL}`)
//      app.on("error",(error)=>{
//        console.error("Error: ",error)
//      })
//      app.listen(process.env.PORT,()=>{
//         console.log(`server is running on port ${process.env.PORT}`)
//     })
//    } catch (error) {
//     console.error("Error: ",error);
//     throw error
//    }
// })();


