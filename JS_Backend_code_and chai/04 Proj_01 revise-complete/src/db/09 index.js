// STEP :01
// Ab kyuki mai iss file mongoose ke through database connect krunga.
// to mongoose import kr leta hu.
import mongoose from "mongoose";

// Then , mujhe db ka name bhi laana hoga.
import { DB_NAME } from "./constants.js";

// STEP: 02
// Now, ab hum ek function banate hai.
// and obviously async function hoga....kyuki db se connect krna h(db alag continent me h to wait krna hoga.)
// Note: jab bhi async method complete hoga, then wo ek event listener dega.
const connectDB = async () => {
  // STEP : 04
  // Db connect kar rahe to to problem aa skti hai,
  // to try-catch block use karte hain
  try {
    // await to laagana hoga, kyuki db dusre continent me hai
    // then mongoose se connect() method use kr liye
    // then 1st variable - ${process.env.PORT} - Variable inject kar diye
    // then 2nd variable - DB_NAME - jo ki constants.js se import kiya
    // 'connectionInstance'variable name - ek response aa raha hai, jo ki connection instance me hum hold kar rahe h
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
      {}
    );
    // and then, print bhi rk do message "MongoDB connect hogaya h"
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    // STEP: 03
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // note: node js aapko access deta hai 'process ka' and aapko import bhi nahi karna padta
    // ab process exit kr skte hai, using Exit() method
    // process.exit(1) - 1 means failure, 0 means success
    process.exit(1); // Exit the process with failure
    throw error;
  }
};

// Ab issko export karte hain, taki baaki files me use kr sake
export default connectDB;
