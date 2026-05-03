// Aap auth ka middleware create kroge
//isStudent ka middleware create kroge
//isInstructor ka middleware create kroge
//isAdmin ka middleware create kroge


// Note : Jo purana middleware pehle dekhe the 
// exaclty same hai ...kuch new nahi 
 

// aditional package need hai
const jwt = require("jsonwebtoken");
// dotenv ki bhi need padegi
require("dotenv").config();
//hume user ki need paadegi
const User = require("../models/User");

 
// 1.auth
//Chalo auth handler function start krte hai
exports.auth = async (req, res, next) => {

    // ye raha mera try block 
    try {
        // auth verify krne ke liye aap authentication check krte the
        // auth check krne ke liye aap Json web token verify krte the
        //aapko json web token mil jaata tha to done.. well good nahi to aap bhaaga dete the
        //Now,question hai aap token kaha se milega? 
        // 1. Cookie me se, 
        // 2.body me se, and  (ye method avoid krna hai)
        // 3.bearer token me se  (Best tarika)

        // extract token
        const token = req.cookies.token 
                    || req.body.token 
                    || req.header("Authorization").replace("Bearer ","");
        // maine bola if token is missing, then return response
        if(!token){
            return res.status(401).json({
                //success false kr diye
                success:false,
                // and message show kr diye
                message:`Token Missing`,
            });
        }

        // verify the token - kaise? verify method using secret key
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // now decode code print kr dete hai
            console.log(decode);
        }// lets day kuch problme hota hai to error message show kr dete hai
        catch (error) {
            return res.status(401).json({
                //success false kr diye
                success:false,
                // and message show kr diye
                message:`Token is Invalid`,
            });
        }

        // then hum next middle ware pe chale jaayenge
        next();


    }catch(error){
        return res.status(401).json({
            //success false kr diye
            success:false,
            // and message show kr diye
            message:`Something went wrong while validating the token`,
        });
    }
}


// 2. isStudent 
// chalo isStudent handler function start krte hai

exports.isStudent = async (req, res, next) => {

    try{

        // 1st tarika hai,  (1st Method)
        // res ke ander jo role add kiya hu(Auth.js me) during login/authentication
        // yaha pe  during 3.Login step (Auth.js)
        // const payload = {
        //     // payload ke ander user ka email, id, role pada hai
        //     email:user.email,
        //     id:user._id,
        //     role:user.accountType,
        // };
        // Iss payload ke ander Role pada hai

        // and Jab maine upper  decode kiya to 
        // const decode = jwt.verify(token, process.env.JWT_SECRET);
        //     // now decode code print kr dete hai
        //     console.log(decode);
        // yaha console.log me decode me role bhi print hoga to waaha se le skte hai
        // and hum isStudent me  uss role ko find out kr skte hai
        // jaise last time use kiya tha humne Authentication and Authorization waali video me (same ussi tarike se)


        // 2nd tarika hai,  (2nd Method) jo hum use krne waale hai
        // Kuch new try krte hai
        // Chalo logic write down krte hai
        // 2nd method - Kuch nahi Db me se Data nikal lo, Db me Account_type hoga wo nikal lo
        // Chalo 1st method hi use krte hai...kyuki data pehle se hi pada hai to use krte h usse


        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                //success mili nahi hai
                success:false,
                // and message show kr diye
                message:`This is a Protected Route for Students only`,
            });
        }

        next();

    }catch(error){
        return res.status(401).json({
            //success mili nahi hai
            success:false,
            // and message show kr diye
            message:`User Role Can't be Verified,please try again`,
        });

    }
}


// 3.IsInstructor
// same copy code as isStudent
exports.isInstructor = async (req, res, next) => {

    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                //success mili nahi hai
                success:false,
                // and message show kr diye
                message:`This is a Protected Route for Instructor only`,
            });
        }

        next();

    }catch(error){
        return res.status(401).json({
            //success mili nahi hai
            success:false,
            // and message show kr diye
            message:`User Role Can't be Verified,please try again`,
        });

    }
}


// 4.isAdmin
// same copy code as isStudent
exports.isAdmin = async (req, res, next) => {

    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                //success mili nahi hai
                success:false,
                // and message show kr diye
                message:`This is a Protected Route for Admin only`,
            });
        }

        next();

    }catch(error){
        return res.status(401).json({
            //success mili nahi hai
            success:false,
            // and message show kr diye
            message:`User Role Can't be Verified,please try again`,
        });

    }
}

