import dotenv from 'dotenv';
import ConnectDB from './db/index.js';
import app from './app.js';

dotenv.config();

ConnectDB()
.then(()=>{
    app.listen(process.env.PORT||4000,()=>{
        console.log(`Server is connected to port ${process.env.PORT}`);
        
    })
})
.catch()


