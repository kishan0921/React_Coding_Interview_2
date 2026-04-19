// require('dotenv').config({path: './env'}) // Automatically loads environment variables from .env file

import dotenv from "dotenv"
import mongoose from 'mongoose';
import {DB_NAME} from "./constants.js";

import connectDB from './db/index.js';
import { app } from "./app.js";

dotenv.config({ path: './.env' }); 


// Jab Db connect ho jaye
connectDB()

// to then () me successful handle kr lenge
// and catch () me error handle kr lenge
// Yaha Then ke ander callback mil raha hai.
.then(() =>{
    // App ke ander hum listen karenge, tabhi na humara server chalega
    // Then kon sa port ? so we will use process.env.PORT
    app.listen(process.env.PORT || 8000, // Agar port nahi mila to 8000 pe chalega, jisse hum server crash hone se bacha sakte hain
 () => {
    
        // ${process.env.PORT} - Variable inject kar diye
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})

.catch()








// Approach 01: Using IIFE (Immediately Invoked Function Expression) to handle async/await
/*  - Approach 01:
import express from 'express';

const app = express();

( async () => {
   try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

    app.on('error', (err) => {
        console.error('Server error:', err);
        throw err;
    });

    app.listen(process.env.PORT, () => {
        // ${process.env.PORT} - Variable inject kar diye
        console.log(`Server is running on port ${process.env.PORT}`);
    });

   } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
   }
}) ()

*/