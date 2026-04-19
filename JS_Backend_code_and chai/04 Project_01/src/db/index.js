import mongoose from "mongoose";


import { DB_NAME } from "./constants.js";



const connectDB = async () => { 
    // Db connect kar rahe to to problem aa skti hai, to try-catch block use karte hain
  try {
    // await to laagana hoga, kyuki db dusre continent me hai
    // then mongoose se connect() method use kr liye
    // then 1st variable - ${process.env.PORT} - Variable inject kar diye
    // then 2nd variable - DB_NAME - jo ki constants.js se import kiya
     
    // 'connectionInstance'variable name - ek response aa raha hai, jo ki connection instance me hum hold kar rahe h
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
    });
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // node js aapko access deta hai 'process ka' and aapko import bhi nahi karna padta
    // ab process exit kr skte hai, using Exit() method
    // process.exit(1) - 1 means failure, 0 means success
    process.exit(1); // Exit the process with failure
    throw error;
  }
}


// Ab issko export karte hain, taki baaki files me use kr sake
export default connectDB;