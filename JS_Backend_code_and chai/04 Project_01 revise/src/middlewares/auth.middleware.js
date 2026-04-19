// logout user - controller me need padi isski

import { asynchHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

// what is use of this middleware ? 
// Note: Ye middleware bas verify krega ki, user hai ya nahi.



//sabse pehle asynchHandler ka use karenge, then usske ander async ()
// then request, response, next parameter pass karenge.
// next - isska mtlb hai ki isska kaam ho gya next jaaha le jaana hai le jao...jaha bhi le jaana h le jao.
// Note: (req, res, next) - yaha (response)res ka kuch use hi nahi ho raha tha, so _ ye use kr skte h
export const verifyJWT = asynchHandler (async (req, _, next) => {
    
    try {
        // Step 01:
        // Ab token ka access kaise loge. bahut simple hai- kyuki request ke pass cookie ka acces hai.
        // maine hi diya hai, app.js (app.use(cookieParser())) - cookieParser middleware use krke
    
        // req.cookies (krne se saare cookie ke acces humhare pass rahte hai.)
        // req.cookies me hume refresh token and access token ka access hai.
        // yaha hum access token le rahe hai , and ?.(chainning operator use kr rahe hai - taaki nahi mila to error show na kre)
        // Now, Agar access token nahi mila to (mobile application case me nahi milega) then 
        // ho skta hai user jo hai wo ek custom header bhej raha ho req ke ander.
        // header() ek method hota hai. jo ki available hota hai req ke ander.
        // Akshar jo header aata hai wo hota hai, Authorization.
        // Now ,ye same hum try kr rahe hai, lene ka- Authorization: Bearer <token>   (https://www.jwt.io/introduction)
        // Authorization ke baad token bhejna hai.
        // Bearer and space remove krna hoga...to yaha hum JS ka concept use krenge.
        // replace("Bearer ", "") -isska mtlb h, agar aapko bearer mile to "" empty string se replace kr do.
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    
    
        // Step 02:
        //Now, agar appke paas token nahi mila then, errror bhej do.
        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }
    
        // Step 03: 
        // ab yaaha hume decode krna hoga information jo hum Jwt token me liye the.
        // ab hume jwt use krna waale h to, usske import krenge and then verify krna hoga 
        // Verfiy krna time , kuch kuch information issko dena hoga.
        // verfiy ke time , hum token and secreate key verfy kr rahe hai.
        // agar verify ho jaata hai to, decode ho jaayega and usske ander jo information hoga wo mil jaayega.
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        // step 04: user ko find krenge using findbyId
        // and agar user hai to decodeToken me hume uss user ka id mil jaayega.
        // ab decode krke jo information aaya hai, ussme kcuh field nahi chahiye so, select ka use kr lenge.
        // and -password and -refreshToken ko select ke ander daal rahe taaki wo remove ho jaayega.
        const user = await User.findById(decodedToken?._id).select ("-password -refreshToken")
    
        // Now, agar user nahi hai, 
        // to throw kr do 1 new API error ....
        if(!user){
            // Next Video: discuss about frontend
            throw new ApiError(401, "Invalid Access Token");
        }
    
        // now, asynchHandler (async (req, res, next) yaha mujhe access hai, req ka to hum 
        // to hum iss req ke ander ek new object add kr dete h, and isske ander hum user ka access de dete hai.
        req.user = user;
    
        // finally jab sab kaam ho gaya to next ka use krke, next work pe shoft ho jaao
        next();
    } catch (error) {
        // new new ApiError throw kr do.
        // and error ka message pass kr do
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})