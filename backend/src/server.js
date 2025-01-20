import dotenv from 'dotenv';
dotenv.config({path: "./.env"});

import connectDB from "./configs/db.configs.js";
import { app } from './app.js';

const PORT = process.env.PORT || 3000;
console.log(PORT);


connectDB().then(
    ()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);

        })
    }
).catch((error)=>{
    console.log(error);
});