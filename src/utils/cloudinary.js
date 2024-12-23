import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


  // Configuration
  cloudinary.config({ 
    cloud_name: `${process.env.CLOUDINARY_API_NAME}`, 
    api_key: `${process.env.CLOUDINARY_API_KEY}`, 
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});   

const uploadFileCloudinary=async (localFilePath)=>{
    try {
        if (!localFilePath) {
            return null
        }
      const response=  cloudinary.uploader.upload(localFilePath,
            {
                resource_type:'auto'
            }
        )
        console.log("File uploaded");
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        // it removes the file saved if an error occured from the server
    }
}
export {uploadFileCloudinary} ;
  



