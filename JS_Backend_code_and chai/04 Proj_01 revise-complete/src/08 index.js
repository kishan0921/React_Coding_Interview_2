// STEP : 01
// Accroding to Mongoose Documentation.
// database hum ek line me connect kr skte hai
// Documentation :
// 01 - https://mongoosejs.com/
// 02 - mongoose.connect('mongodb://127.0.0.1:27017/test');
// But ek line waala professional approach ni hai,
// kabhi bhi database aise ni connect krna chahiye

// Hum 2 tarike se database connect krna sikhenge

// STEP: 10

// In Documentation :
// Its written : As early as possible in your application, import and
// configure dotenv.
// Automatically loads environment variables from .env file
// To hum ky chahte hai, jitni zaldi humari app start ho...usski ke saath
// utni hi zaldi, sabse pehle jitni bhi hmari .env file me jo configuration likhi h.
// wo sab import ho jaaye. and ye index main file h. to ye run hoga 1st time.
// to issi ke liye

// Old way
//to used : (isse mere code ka constency karab hota h)
// require('dotenv').config()

// New way
//to used (maintain constency)
// require ke ander file name, and config ke ander (path bata do)
// require('dotenv').config({path: './env'})

// Latest way to used like :
// dotenv.config({ path: "./.env" });

// Approach : 02
// STEP : 10 (db/index.jsx firstly go to this file)
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import connectDB from "./db/index.js";
import { app } from "./app.js";
import { error } from "console";

// STEP : 11
dotenv.config({ path: "./.env" });

// STEP : 12
// Jab Db connect ho jaye
// Note: (09 Index.js) jab bhi connectDB() async method complete hoga, then wo ek event listener dega.
connectDB()
  // STEP : 14
  // Now, jaise hi mera databse connect ho jaaye
  // to then () me successful handle kr lenge
  // and catch () me error handle kr lenge
  // Yaha ".then" ke ander bhi mujhe ek callback milega.
  .then(() => {
    // ab hum "app" ke ander hum listen karenge, tabhi na humara server chalega
    // Then kon sa port ? so we will use process.env.PORT
    app.listen(
      process.env.PORT || 8000, // Agar port nahi mila to 8000 pe chalega, jisse hum server crash hone se bacha sakte hain
      () => {
        // ${process.env.PORT} - Variable inject kar diye
        console.log(`Server is running on port ${process.env.PORT}`);
      }
    );
  })

  // STEP : 13
  .catch((err) => {
    console.log("MONGO db connection faild !!! ", err);
  });

// Note: 5:10:00 Ye Approach 01 accha hai, but humne thoda index.jsx code
//zaada polluted kr liya hai. (long line of code)
// STEP : 02
// Approach 01: Using IIFE (Immediately Invoked Function Expression) to handle async/await
/*  - Approach 01:
import express from 'express';
const app = express();
// Note : 
// ( async () => { - isske uppar agar koi line likhi hui nhi hoti hai to 
//   Hum aise likhte hai 
// ;( async () => {
*/

// Coding Start here
// // STEP : 06
// // Ab kai jagah aapko dikhega, ki issi same file me hum,
// // "app" ko initialize kr lete hai.
// // and ye app initialize hota hai using express se.
// import express from "express";
// const app = express();

// // STEP 03:
// // Chahiye async await le lete hai.
// (async () => {
//   // Now, ab database ko kaise connect kroge
//   // wohii try-catch
//   // Jab bhi database se connect kro, try-catch use kro hmesha
//   try {
//     // STEP : 05
//     // Error part to hogayha hai.
//     // ab agar sab kuch thik hai, Then
//     // ye apne jo mongoose liya hai, wo aapko de dega connect()
//     // and connect krne ke liye backticks bhi to dena hoga.
//     // ${process.env.MONGO_URI} - ittna se database connect ho jaayega.
//     // but itne se kaam ni hoga.
//     // /${DB_NAME} - se hume database ka name bhi dena hota hai.
//     // Ab ek kaam jo 100% krna hoga wo h, "await"
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

//     // STEP : 07
//     // "app" initialize krne ke baad.
//     // next line aap dekhoge listener bhi dikhte hai.
//     // and listener hote hai, "app" ke pass
//     // bahut saare listener hai, ussme se ek hai "error" event
//     // "error" event ? why we are using this
//     // Answer :- Jo skta hai ki humari app database se connect
//     //ho chuka hai, But kya pata humari express ki app hai, wo baat ni kr
//     // paa rahi hai.
//     // to ye raha appne ek callback "()=>{}" laaga diya
//     // also (err) - error yaha receive bhi to krna hoga, obviously h
//     app.on("error", (err) => {
//       // STEP : 08
//       // then aapne ke message bhi pass kr diya. ki "server error hai"
//       console.error("Server error:", err);
//       // then, aap chaho to error throw bhi kr skte ho.
//       // ki jab aap baat hi ni kr skte to error throw hi kr do.
//       // then, error uppar receive bhi to krna hoga, obviously h
//       throw err;
//     });

//     //STEP 09
//     // Now, agar app baat kr paa raha h, then hum listen kr dete hai.
//     // 1st - port le lo
//     // 2nd - ek callback le lo
//     app.listen(process.env.PORT, () => {
//       // ${process.env.PORT} - Variable inject kar diye
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//     // STEP : 04
//     // Catch ke ander humne apna error daal diya
//   } catch (error) {
//     // and aap chaho to ek message bhi send kr skte ho.
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// })();
