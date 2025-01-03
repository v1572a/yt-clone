import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});

console.log(  process.env.CLOUDINARY_API_NAME, 
    );

  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_API_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});   

const uploadFileCloudinary=async (localFilePath)=>{
    try {
        if (!localFilePath) {
            console.log("null");
            
            return null
        }
                console.log("Entered cloudinary util before response");
                
      const  response= await cloudinary.uploader.upload(localFilePath,
           (err,result)=>{
             if (err) {
                console.log(err);
             }
           }
        )
        console.log("File uploaded");
        fs.unlinkSync(localFilePath)

        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // it removes the file saved if an error occured from the server
    }
}
export {uploadFileCloudinary} ;
  



