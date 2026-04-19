// Async handleer jo hai, uska use hoga to import kr lete h

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { jwt } from "jsonwebtoken";
import mongoose from "mongoose";





const generateAccessAndRefreshTokens = async (userId) => {
    
    try {
        // now, agar mujhe token generate krna hoga to , usske liye mujhe user find krna hoga.
        // yaha User ye user use kr rahe
        // then hum find kr lenge user using findbyId se (and isske ander userid pass krke)
        // then ye jo user mila hai, issko hold kr lete hai ek varible me. 
        const user = await User.findById(userId);
        // now, Ab isske access token and refresh token generate krenge.
        // generateAccessToken se access token generate krwa liye.
        // and accessToken varible me store kr liye
        const accessToken = user.generateAccessToken();
        // and generateRefreshToken se refresh token generate krwa liye
        // and refreshToken varible me store kr liye
        const refreshToken = user.generateRefreshToken();


        // Ab user ke ander hum refresh token add krenge.
        user.refreshToken = refreshToken;
        // ab user dave krna hoga , to use save method ka use kr lenge.
        // Now save method jab use krenge to password bhi chahiye, jo ki hum pass hi nahi kr rahe hai, only we are passing (userid)
        // to hum ek paramter pass krenge.{validateBeforeSave: false} and false kr diye h, means bs user save kr do. without any checking
        // kyuki database ka operation hai, to time lega....isliye "await use kr lo"
       // note: yaha hum user ko save krwa rahe hai db me.
        await user.save({validateBeforeSave: false});

        // Agar sabkuch yaha tak thik hai to , refresh token and access token return kr do
        return {accessToken , refreshToken}

        // now go to Step: 06  - loginUser
        
    } catch (error) {
        // Error handling
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
    }
}




// Hum ek method create kr rahe h- isska kaam hai sirf user ko register krna hai
// asyncHandler ka use karenge - jo humne banaya, jo ki Higher order function hai.
//asynchandler jo ki ek HOC and ye accept krta hai, ek function ko
//and isske ander hum async() method banayenge, and method ke ander hume pta hai, req, and res availabl hota hai.
// Old Code:-
// const registerUser = asyncHandler(async (req, res) => {
//     // ab hume sidha hi response send kr dena hai.and response ka status 200
//     // and response ka type json hai.
//     res.status(200).json({
//         // and isske ander message "OK" send kar dete hai.
//         message: "chai aur code"
//     })
// })

const registerUser = asyncHandler(async (req, res) => {
    
    // 01- get user details from frontend
    // 02- validate - not empty
    // 03- check if user already exists: username, email
    // 04 - check for images, check for avatar
    // 05- upload them to cloudinary, avartar
    // 06- create user object - create entry in db
    // 07 - remove password and refresh token field from response
    // 08- check for user creation
    // 09- return response

     // 01-User ki detail frontend se le lenge
    const {username, email, password} = req.body
    console.log("UserName, Email, Password",username, email, password)

    // 02- Ab validation check krna hai ek, ek field ka ki empty to nhi h
    
    // [Not Using]method: 01 ye beginner aise hi krte hai.
    // agar fullName empty h to error send krenge
    // if(fullName === ""){
    //     // hum ApiError ka use karenge
    //     // ApiError ke ander statuscode,message,error,stack,  pass krna hoga.
    //     throw new ApiError(400, "fullName is required")
    // }

    //Method: 02
    if(
        // if ke ander hum array add kr rahe h,
        // and array me ek object add kr rahe h
        // Ab kyuki ye array h , and array pe bahut saare method hote h
        // ek method hota h, some method hota h
        // basically, using some() hum value compare kr skte hai.
        // and inside some har field ka name field hi de rahe h
        [fullName,email,username,password].some((field) => 
            // now here, agar field hai to ussko trim kr do and usske baad bhi empty hai to
            // usko true return kr do, and ye sab field ke uppar chalega.
            field?.trim() === ""
        )
    ){
        throw new ApiError(400, "All fields are required")
    }

    // 03- check if user already exists: username, email
    // ab mujhe database se puchna h, ki aap mujhe find krke batao aise 
    // user jo ki "email" is email ko match krta hai , ya fir "username" iss username ko match krta h. jo bhi apne diya h
    
    // yaha user ke pass ek method hai findone(), aap find bhi use kr skte the.
    // yaha User.findOne return krega,jo bhi first search issko milega database me.
    // ab uss reference/data ko hum existedUser variable me store kr lete h
    const existedUser = User.findOne({
        // ab yaha aap "$" ye sign use krke kaafi operator use kr sskte ho.
        // yaha or parameter aap use kr skte ho , simple colon : lagao and array start kr do.
        // then aapko jitni value check krni hai, utni value check kr do iss ibject ke ander
        $or: [
            // ye first object hum check kr rahe h - email
            {
                email: email
            },
            {
                username: username
            }
        ]
    })

    //uppar agar existed User me kuch value aata hai, 
    // mtlb hua h mujhe next proceed nhi krna , yaahi error throw krna h
    if(existedUser){
        // apiError ke ander statuscode,message,error,stack,  pass kr skte h, nahi to default value use hoga
        throw new ApiError(409, "User already exists")
    } 


    console.log(req.files);

    // 04 - check for images, check for avatar
    // req.body ke ander humhare pass saara ka saara data aata h
    // ab hum using multer saare file ka access le skte h
    // ab ho skta h files ho ya nahi , so hum ?. chaing operator use krenge taaki null ya undefined value ho to error na aaye. 
    // ab mai file le raha hu - avatar , and avator ke bhi index 0 waala property chahiye.
    // 1st index [0] issliye, kyuki hume path option milta hai.
    // multer.middleware.js me hum file liye hai original name se. that's why yaha avartor name use kiye
    // File aa gyi , then reference store kr lete hai ek variable me.
    const avatarLocalPath = req.files?.avatar[0]?.path  

    // then same coverImg ke liye bhi [classic tarika use kr rahe-niche]
    // const coverImgLocalPath = req.files?.coverImg[0]?.path

    // extra - classic if else se check krenge value aayi h ya nahi.
    // ======================
    let coverImgLocalPath; 
    // sabse pehle check kr rahe, req.files...mtlb file aayi h ya nhi
    if(req.files && Array.isArray(req.files.coverImg) && 
    req.files.coverImg.length > 0){
        coverImgLocalPath = req.files.coverImg[0].path
    }
    // =========================

    // now,
    // avatar file to chahiye hi chahiye nahi to error thorw krenge
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar and coverImg is required")
    }

    // 05- upload them to cloudinary, avartar
    // next step hai file mili to cloudinary me upload krenge
    // yaha uploadOnCloudinary() ek method hai
    // and ye time lega so await use krenge
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    // now coverImg bhi upload krenge
    const coverImg = await uploadOnCloudinary(coverImgLocalPath)

    
    // Now, agar avatar aur coverImg upload hua to
    // and yaha ab hum usse check krenge ki upload hua h ya nhi.
    // yaha avartar check kr rahe h, upload hua h ya nhi , nhi to error throw kr do
    if(!avatar){
        throw new ApiError(500, "Image upload failed")
    }

    // 06- create user object - create entry in db
    // now ab hum user object banayenge
    
    // User lenge then hmare pass method hai .create()
    // db se baad kr rahe h, jo ki kaahi aur h to time laagega so await
    // then user name ke reference/ variable me store kr lenge
    const user = await User.create({
        // iss object me jo field pass krna hai pass kro do
        // usser.model.js se check kr skte ho ki kya kya field le.
        fullName,
        // avartar ka url send krenge db
        avatar: avatar.url,
        // coverImg ka url send krenge db me , and nahi h to empty string send krenge
        coverImg: coverImg?.url || "",
        email,  
        password,
        // username bhi bhej rahe db me but lowercare me send krenge
        username: username.toLowerCase(),

    })
    // now , yaha 06 step me user create ho gya and entry bhi ssave ho gaayi database me
    // now ab check krenge, sahi me user db me bana h ya nhi


    // 07 - remove password and refresh token field from response
    
    // now, user ko lo and findbyId() method hota h usse find krne ki kosis kro , user user create kiye hai db me
    // note: jab user create hoga, jab db me by default "_id" ek field add hoga

    // yaha simply findById() use krenge and _id se wo created user find krenge, 
    // then .select use krenge, and by default saare field ko select rahte hai to "-" use krke jo field nhi chahiye usse hum haata denge.
    // .select("--password --refreshToken") use krenge and password , refresh token field remove kr denge
    const createdUser = await User.findById(user._id).select("-password -refreshToken") 


    // 08- check for user creation
    //now mai check karunga ki agar user create nhi hua then error throw krenge
    if(!createdUser){
        throw new ApiError(500, "User creation failed");
    }

    
    // 09- return response
    // yaah hum return kr rahe hai 1 response ko, and usska status send kr rahe hai (201)- 201 mtlb aapna saare kaam acche se hogya h
    // usske baad json request bhejenge,
    return res.status(201).json(
        // ab json response me , hum new ApiResponse object bana rahe h
        // and iss object banane me hume, status, data, message pass krna hoga.according to ApiResponse.js file
        new ApiResponse(201, createdUser, "User registered successfully")
    )

    // all 9 algorithm completed.
})

// Now basic login banayenge.
const loginUser = asyncHandler(async (req, res) => {
    // Steps: 

    // 01 - Request body se data le aao
    // 02- Check krna padega, ki username, email hai ya nahi.
    // 03 - Find the user
    // 04 - Check password
    // 05 - Access and Refresh Token dono generate krne padenge .
    // 06 - Then Cookie me isse send kr do



    // Step 01:
    // request.body se hum data le rahe hai, like username, email, password 
     const {email, username, password} = req.body


     // Step 02: 
     // Ab mujhe check krna hai username, email hai ya nahi
     if(!username && !email){
        // agar username ya email empty h to error throw krenge
        // and ApiError ke ander statuscode,message,error,stack,  pass krna h, nahi to default value use hoga
        throw new ApiError(400, "Username and email are required")
     }



     // Step : 03
     // Agar dono email,username humare pass me hai to, ab hum user find krenge.
     // User import kr rahe hai,
     // findOne - ye krta hai, mongoDb me pehla jo record milega ussko return kr dega.
     // Database dusre continent me h, to await lagana hoga.
     const user = await User.findOne({
        // $or: - mongoDb operator hai, and multiple condition check krne ke liye use hote h
        // $or - ke ander array [] pass kro and then usske ander {} object pass kr skte hai.
        $or: [
            // Ab or jo hai wo, find karega email, username ke base par.
            // and jo bhi mil gya wo return kr dega
            {email},
            {username}
        ]
     })


     // Step : 04 Agar 3rd step me check krne ke baad bhi useer nahi milta hai ,
     // to user tha hi nahi.....register
     // Agar user nahi mila hai , to throw kr do ApiError
     if(!user){
        // ab ApiError ke ander statuscode,message,error,stack,  pass krna h, nahi to default value use hoga
        throw new ApiError(404, "User not found");
     }


     //Step :05 
     // Ab user mil gya hai, and password check krenge
     // Note: umme user lena hai, jo humlog find kiye hai ...
     // Naaki , User jo hum import kr rahe hai 

     // ab jo user hume return hua hai, usske pass kuch methods hote hai like - isPasswordCorrect()
     // and isske ander hum password check krenge, valid hoga to true mil jaayega nahi to false.
     // and iska value store kr lete hai, isPasswordValid variable me   
     const isPasswordValid = await user.isPasswordCorrect (password)

     // Ab agar isPasswordValid false hua to error throw krenge
     if(!isPasswordValid){
        // ab ApiError ke ander statuscode,message,error,stack,  pass krna h, nahi to default value use hoga
        throw new ApiError(401, "Invalid user credentials");
     }



     // Step : 06 -(Ye step bahut baar, use krenge to isska method ki bana lete hai.
    // Go to generateAccessAndRefreshToken)
    // ab iss step me hume access token and refresh token generate krna hoga

    // Now, ab hum direct hi refresh and access token le skte hai.
    // by calling generateAccessAndRefreshTokens() method
    // and isske ander user jo aaya hai,as object usska mai id pass kr dunga.
    // Yaha bhi ho skta hai time se chize na ho, so await use kr lenge.
    //Ye waale method ko call krne se, as return mujhe access and refresh token milta hai.
    // issko 1 varible ma store kr lenge.
     const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
     // now, refresh toekn and accesstoken dono hi hai , humare pass



     // Step: 07
     // ab jo refreshtoken and accesstoken aaya hai, ussko hum cookie me bhejenge.

     // Now, 1 more imp is : user ko hume kya kya imp data send krna hai.
     // uppar step 3, me jo user liya hu findone krke, to bahut unwanted field bhi aa gye hai.
     // jo ki aage cookie me bheja sahi nahi hoga.
     // And uppar ko user hai (step 3 me) usske pass refresh and access token empty hai.
     // kyuki method ne call kiya wo just uppar step 6 me kiya.

     // Now, hum database query maarenge, and jo data bhejna hai, 
     // woohi sirf cookie me bhejnege.... baaki ko remove kr denge
     
     // Before sending cookie.
     
     // Now, User uppar (step 3 se le lete hai) then ek baar aur findbyId se user find kr lete hai.
     // and user ke ander sab field aayega , but hum sab nahi chaiye to , exclude kr denge using .select() field
     // then loggedInUser variable me store kr lenge.
     // and find krne me kuch time lega, so await use krenge(also, other reason is database dusre continent me h)
     // .select () field use krke , jo jo field nahi chahiye to remove kr denge......yaha password , refresh token nahi bhej rahe ye field
     const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

     // Now, ab hum cookie bhejenge, jab hum cookie bhejte hai to kuch options hum design krne pdte hai.
     //Note: ye jo options hai ye frontend se modified nahi hoti, sirf server se modified hoti hai, and server and frontend dono me hum dekh skte hai isse.
     const options = {
        // ek to option hota hai httpOnly, and issko bol dete hai true
        httpOnly: true,
        // and secure option bhi hota hai, ussko bhi true kr dete hai
        secure: true
     }

     // ab hume iss method se return krna hai, ek response ki haan kaam acche se ho gya hai.- status (200)
     // then using cookie parser hum cookie use kr lenge.
     // then aap jitni cookie chaho uttni cookie create kr skte ho .cookie laga kar.
     // cookie ke ander- 1st parater - key - "accesstoken" 
        // 2nd - value - accessToken
        // 3rd - kuch options bhi hai
    // Ab Refresh Token bhi add kr dete hai.
    //.cookie (refreshToken", refreshToken, options)

     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     // Ab hum ek json response send kar dete hai.
     .json(
        // ab hum ek new api response create kr dete hai.
        new ApiResponse (
            // and isske ander status code - 200 pass kr dete h
            200,
            // Now, Ab totally humpe depend krta hai, ki kya object hum bhejna chahte h
            // ye data send kr rahe, agar hum apiresponse.js me jaaoge to milega.
            {
                // Mai bhejna chahta hu "user" ke ander, 
                // loggedInUser, accessToken and refreshToken

                // and yaha bhejna acchi practice hai, kyu ? watch video - 32:00 (Backend part-02)
                user: loggedInUser, accessToken, refreshToken
            },
            // ab ek message bhi send kr dete hai,
            "User Logged In Successfully"
        )
         
    )

})  

// Chalo ab logout user bhi bana lete hai.
// wohi basic asyncHandler use karenge, and isske ander async code likhenge, and isske and (req,res) hoga
// then => {} arrow function likhenge

const logoutUser = asyncHandler(async (req, res) => {
    // kaise kiya jaayega.
    // sabse phale cookie warega, delete krna hoga.

    // Step 1: find karo user ko ? - middleware concept use karenge, new authentication middleware banayenge and use krenge
    
    // Now, abhi iss condition pe aap login hai, aapke pass access token tha, maine
    // usske basis pe ek database query maari...... and 1 request.user add kr diya database me.
    // to ab humare pass req.user ka bhi access hai....
    // then mujhe user nikalna hai, mai 1 min me user nikal lunga
    // and usske baad mai id nikal lunga user ka , id mil gayi to 1 query maar ke pura user detail nikal lunga
    // then id mil gayi to logout/unlink krwa dunga 
    // req.user._id - database se mil jaayega

    // Now, find krna hai user kon sa method use karu ? user dega hum , findbyIdAndUpdate
    // agai db se hum connect kr rahe hai, and db dusre continent me hai , to  time lega. so await
    
    // Note: Basically, yaha hum refresh token remove kr rahe hai , Database se
    await User.findByIdAndUpdate(
        // Ab yaha query batao user ko find kaise krna hai.
        // req.User._id se user find kar lo
        req.User._id,
        {
            // Ab yaha aapko batana padta hai, update krna kya hai.
            // and isske liye hume mongoDb ka operator use krna pdta hai.
            // Ab ye set aapko deta hai, 1 object , and jo bhi field iss object ke ander hum denge.
            // wo field update ho jaayegaa.
            $set : {
                // mai yaha refreshToken ko undefined kr raha hu.
                refreshToken : undefined
            }
        },
        {
            // Ab yaha hum 1 new value le rahe hai and ussko true kr rahe h
            // to isse ye hoga,jo return me aapko response milega
            // ussme new update value true milega.
            new : true
        }
    )
        // Yaha iss step tak, refresh token remove ho gya hai
        // Ab cookie waala kaam krna hoga, to options to laagega hi
        const options = {
            httpOnly: true,
            secure: true
        }


        // Ab options ke ander, hume bas cookie clear krna hai 
        // return kr rahe response
        return res
        // and status de rahe 200 Ok
        .status(200)
        // then 1 method availabe hota hai, clearCookie() method isse hum cookie clear kr skte h
        //.clearCookie("accessToken") - ittna se cookie clear ho jaata hai, but isske baad hume options bhi add krna hota h
        .clearCookie("accessToken", options)
        // now, refresh Token bhi remove kr denga, Database se to remove hi h, ab yaha se bhi remove kr dete h
        .clearCookie("refreshToken", options)
        //then 1 json response bhej do.
        .json(
            new ApiResponse(
                200,
                {}, // data mai kuch bhej nahi raha hu - empty h
                "User logged Out", 
            )
        )

});

// Ab hum 1 refreshaccesstoken ka 1 endpoint banate hai.
// endpoint ke liye, controller hi banana hoga.
// name de dete hai, refreshAccessToken
// then wohi asyncHandler then usske ander hum baanate hai async Request,
// then req - equest and res - response isske ander 

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Socho 
    // Referesh Token hume refresh krwaana hai, so refresh krne ke liye,
    // token kaahi se laana hoga old waala,
    // to humlog , cookie se token access kar lenge. and req.cookie aise access mil jaata h
    // Cookie se humlog "req.cookie.refreshToke" aise cookie ko access kr lenge,
    // then suppose karo koi mobile user hoga to usska refresh token body me gya hoga to 
    // wooha se bhi hum nikal lete hai. and then store kr denge , incomingRefreshToken me
   const incomingRefreshToken = req.cookie.refreshToken ||  req.body.refreshToken

    // Now, agar refreshToken nahi mila to kya kare..
    if(!incomingRefreshToken) {
        throw new ApiError(401,"unauthorized refresh token ")
    }


    try {
        // Now agar refreshToken mila hai, to ussko verify bhi to krna hoga.
        // jwt ko bolenge verify krne ke liye,
        
        // Yaha jo humme token milega wo decoded hoga.
    
        const decodedToken = jwt.verify(
            // Ab verify krne ke liye kuch dena padta h,
            incomingRefreshToken,
            // and refresh token ko verify krne ke liye hume secret key pass krna h 
            process.env.REFRESH_TOKEN_SECRET,
        )
    
    
        // Now , ab step rahega ki hum incomming token jo ki cookie se aa rahe hai, 
        // usska and database me jo refresh token rakha hai usska compare krenge,
        // and agar match nahi hota hai to, isska mtlb hai refresh token expire ho gya h,
        // and hume new Refresh token generate krna hoga.
    
        // Step 1: user find krlo ho database me rakhna hai ussko
        const user = await User.findById(decodedToken?._id);
    
        // Step 2: agar user nahi mila to kya kare
        if(!user) {
            throw new ApiError(401,"Invalid refresh token ")
        }
    
        // step 03: now comapre krenge, incomming token and refresh token Database waala
        if(incomingRefreshToken !== user?.refreshToken) {
            // Agar dono match nahi krta to Error show kr do.
            throw new ApiError(401,"Refresh token is expried or used")
        }
    
    
            // Now, Agar yaha tak aaye to, means refresh token match hota hai,
            // and hume new refresh token generate krna hoga.
            // Sabse pehle cookie me bhejna hai, to options generate krne padenge.
            const options = {
                // to http only true kr dete h
                httpOnly: true,
                // and secure bhi apna true kr dete h, taaki secure rahe
                secure: true
            }
            // Ab options ban gaye hai to , response send kr do,
            // lakin usse pehle token generate kr lete hai
            // generate kr rahe hai token , and ussko user ke Id me pass kr rahe h.
            // and kyuki ye db waala operation hai to await use krenge.
            const {accessToken,newrefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
            // ab response send kr dete h,
            return res 
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(
    
                // Json request ke ander hum new ApiResponse send kr dete hai.
                200,
                {accessToken, refreshToken: newrefreshToken},
                "Access token refreshed"
                
            )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }

})


// ab hum ek aur controller banayenge, jisska use krke hum user se usska password change krwaayenge.
const changeCurrentPassword = asyncHandler(async (req,res) => {
    // Ab password change krwaane ke liye , kitne field lene hai wo aape depend krta h.
    // mai oldpassword, newpassword req.body se le leta hu
    const {oldPassword,newPassword} = req.body

    //step:2 ab mujhe user lena hoga, tabhi to mai user ke field me jaakar password verified krwa paaunga.
    
    // Now, req.user me se user ka id nikal lo , agar present haito
    // User le lo, then findById method ka use kr lo and req.user._id pass kr lo, then user mil jaayega
    // and issko hold bhi kr lete h, 1 user me 
    // and kyuki database waala kaam h, to wait krna hoga, to await use kr lete h
    const user =await User.findById (req.user._id)
    // Ab bolte hai, ki ye jo "user" aaya hai, ussko isPasswordCorrect() de do,
    // and isske ander oldpassword pass kr do
    // and kyuki isPasswordCorrect  ye ek async method h, to await use krenge
    // isPasswordCorrect  - me true aur false mil hoga.
    const isPasswordCorrect =  await user.isPasswordCorrect(oldPassword)

    // Ab agar password correct nahi h to errror show kr do
    if(!isPasswordCorrect) {
        throw new ApiError(400,"Invalid old password")
    }

    // ab yaha tak pahunche ho to , mtlb h old password correct tha,
    // ab new password set krna hai.
    // isske liye user lo then user ke ander password waala field lo and then set kr do as newPassword
    user.password = newPassword 
    // ab user ko save kr do, ab save krte time, mai baaki ke validation run nhi krna chahta to,
    // validateBeforeSave: false pass krenge
    // and ye database operation h to time lagega, issliye await use krenge
    await user.save({validateBeforeSave: false})
    // ab user ko ek response send kr dete hai, password changed successfully
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Password changed successfully"))
})


// ab current user get krna hai humme.
// to agar user logged in hoga to , to 2 min ussko user me find krke de skta hu.
const getCurrentUser = asyncHandler(async (req,res) => {
    return res 
    .status(200)
    .json(new ApiResponse(200,req.user,"User fetched successfully"))
})

// ab agar aapko aur bhi detail update krwaane h to ,
const updateAccountDetails = asyncHandler(async (req,res) => {
    // kya krna hai, sabse pehle req.user se information leni padegi.
    // kya kya lena h, wo aape depend krta h. 
    // mai, fullName,email le raha hu , req.body se
    const{fullName,email} = req.body
    
    // Step: agar fullName aur email nahi mile to error show kr do
    if(!fullName || !email) {
        throw new ApiError(400,"FullName and email required")
    }

    //step: ab user find krenge , then next step me update krna hoga.
    const user = await User.findById(
        req.user?._id,
        // 2nd hum pass kr rahe h, object
        {
             // ab hum mongodb ke operator ka use krenge.
             // set kaise kaam krta hai, ? 
             // set recieve krta hai ek object and isske ander , aap parameter de do.
             $set: {
                // parameter de do.
                fullName,
                email: email
             }
        },
        // new true karne pe, yaha jo update hoga information, wo update value return hoga.
        // isliye new: true
        //3rd bhi hum pass kr rahe h, object
        {new: true}
    // humme find to krna hai, and new update waala user detail bhi lena hai. jo ki uppar kiye h,
    // but, kuch field nahi chahiye. to select method ka use krenge.
    ).select("-password")

    // find hogya user, ab update krna hoga fullname and email
    // ab hume uppar jo hai ussko return krna hoga,

    return res
    // status bhej diya
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))

})

// ab avatar user ka update krwa lenge.
const updateUserAvatar = asyncHandler(async (req,res) => {
    // Ab hume yaha pe avatar update krna hoga.
    // yaha hum bas 1 file liye h, avartar waala
    const avatarLocalPath =  req.file?.path

    // agar file nahi mila to error show kr do
    if(!avatarLocalPath) {
        throw new ApiError(400,"Avatar is required")
    }

    // TODO: delete old image - assignment

    // agar mil gaya hai to upload kr do cloudinary pe
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    // agar avartar upload ho gaya hai, cloudinary pe and url nahi mila h
    // to error show kr do
    if(!avatar.url) {
        throw new ApiError(400,"Error while uploading on avatar") 
    }

    // aur agar cloudinary pe bhi upload hogya hai to,
    // ab kuch nhi , user find kro and update kr do

    const user = await User.findById(
        req.user?._id,
        {
            // Update ke liye mongodb ka operator use hota hai...ki set kr do
            // basically patch operation kr rahe h.
            $set: {

                avatar: avatar.url
            }
        },
        // update kr do with new value and return kro usske baad detail
        {new: true}
        // password field nahi chahiye
    ).select("-password")

     // sabkuch sahi hai to response bhej dete hai.
    return res 
    .status(200)
    .json(new ApiResponse(200, user, "avatar Image updated successfully"))
})

// Same copy paste code hai, updateUserAvatar waala and usski me kuch changes kiye h
// Basically uppar avatar update krne waala controller banaye the, and yaaha hume
// coverImage update krne waala controller banana h
const updateUserCoverImage = asyncHandler(async (req,res) => {
    // Ab hume yaha pe avatar update krna hoga.
    // yaha hum bas 1 file liye h, avartar waala
    const coverImageLocalPath =  req.file?.path

    // agar file nahi mila to error show kr do
    if(!coverImageLocalPath) {
        throw new ApiError(400,"Cover Image is required")
    }

    // agar mil gaya hai to upload kr do cloudinary pe
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // agar avartar upload ho gaya hai, cloudinary pe and url nahi mila h
    // to error show kr do
    if(!coverImage.url) {
        throw new ApiError(400,"Error while uploading on avatar") 
    }

    // aur agar cloudinary pe bhi upload hogya hai to,
    // ab kuch nhi , user find kro and update kr do

    const user = await User.findById(
        req.user?._id,
        {
            // Update ke liye mongodb ka operator use hota hai...ki set kr do
            // basically patch operation kr rahe h.
            $set: {

                coverImage: coverImage.url
            }
        },
        // update kr do with new value and return kro usske baad detail
        {new: true}
        // password field nahi chahiye
    ).select("-password")

    // sabkuch sahi hai to response bhej dete hai.

    return res 
    .status(200)
    .json(new ApiResponse(200, user, "Cover Image updated successfully"))

})



// hard walaa case - Aggregate Pipeline

const getUserChannelProfile = asyncHandler(async(req,res)=> {

    // 1st - username e lete hai, req.params se
    const {username} = req.params

    // ab check krenge, username sahi hai , ya req.params se aaya h ya nhi
    if(!username?.trim()){
        throw new ApiError(400, "username is missing")
    }

    // ab yaha tak pahunche hai , mtlb username sahi h

    // ab old method bhi use kr skte hai, but hum new method use krenge - aggregate piepline waala

    // user jo hai , usspe aggregate() pipeline laaga rahe hai , and
    // aggregate jo h , wo ek method h, and ye ek array leta hai , and {},{} aise isske ander pipeline likhi jaati h
   // ab kyuki database waala baat h, to await use kr lo
   // result jo aayega wo 1 array ke form me aayega and issko store kr rahe hai channel variable me. 
   const channel = await User.aggregate([
    // Ab aate hai step 02: aggregation pe

    // 1st pipeline
    {
        // match field ki pipeline h
        //to ye hum filter kr liye 1 document.
        $match: {
            // match field ko chahiye , kisse match kru
            username : username?.toLowerCase()
        }
    },
    // Now, uppar jo ek document hai usske basis pe mujhe krna hai, lookup

    // 2nd pipeline  - Subscriber saare mil jaayenge as document ke form me
    {
        // Note: go to Subscription model and see the example
        $lookup :{
            // ab lookup ko kuch fields chahiye
            // yaah kis table se left join krna hai usska name
            from: "subscriptions",
            //ek table me _id se dekhna hai
            localField:"_id",
            //and ek table me channel se dekhna hai
            foreignField: "channel",
            // and result ko return kr do as subscribers
            as:"subscribers"
        }
    },

    // 3rd pipeline - subscribed saare mil jaayenge document ke form me
        
    {
    $lookup :{
            from: "subscriptions",
            localField: "_id",
            foreignField: "subscriber",
            as : "subscribedTo"
        }
    },
        // 4th pipeline - ab ek aur pipeline hota hai humare pass, addfield name se
        
        // to hum addField - operator ka use krenge.
        // ye krta hai, jitne bhi humare pass field hai,user schema me,
        // use schema me additional fields add kr dega....yahi to humare target h
        {
            $addFields: {
                subscribersCount :{
                    $size : "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                }

                // Ab agar user follow krta hai channel to ussko followed waala button show krna h
                // to hum ek as flag true/false value waala logic likhenge.

            },
                isSubscribed: {
                    // ab is subscribed kaise count hoga.
                    // usske liye condition 
                    $cond: {
                    // Note: cond - me generally 3 parameter hote hai,
                    // if, - if me mostly condition likhte hai
                    // then - true hai to then 
                    // , else - and false hai to else me .
                    // if: calculate kaise hoga?
                    //basically, mere pass jo subscribers waala docuemnt aaya hai,
                    //ussme mujhe check krna hai ki mai(mtlb user hai ya nahi)
                    // to usske liye 1 aur operator hai, $in jo calculate krke de deta hai value aapko.
                    // $in - ke ander agar aap login h, to aapke pass user hoga.  
                    // 2nd kis obejct se hume dekhna hai, - subscriber.subscriber se
                    // Note: $in operator dono , array and object se data ko dekh skta hai.
                    if: {$in: [req.user?._id, " $subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }

        },

        // 5th pipeline - (project)finally return kr do 
        {
            // project kya hota h?
            // ye projection deta hai, ki mai saari value ko return nhi krunga, only select value ko return krunga.
           $project:{
            // yaha mai selected chize return krunga jo mujhe projection krna hai.
            // 1- true (as flag value use kr rahe h)
            // to enable this value for projections
            fullName: 1,
            username: 1,
            subscribersCount: 1,
            channelsSubscribedToCount: 1,
            isSubscribed: 1,
            avatar: 1,
            coverImage: 1,
            email: 1
           }
        }

        // Ab yaaha console log krke dekhna , kya value aata hai.
   ])

   // ab agar channel me data hi nahi aaya ho to , means pipeline failed hua ho to
   if(!channel?.length){
    throw new ApiError(404, "Channel not found")
   }


   // Agar sabkuch this h to , user ko response return kr do
   return res
   .status(200)
   .json(
        new ApiResponse(200,channel[0], "Channel profile fetched successfully")
   )
})


// Next pipeline likhange, ki user ki watch history kaise get hogi
const getUserWatchHistory = asyncHandler(async (req, res) => {
    
    // ek aur pipeline banayenge, and user me ussko return kr denge
    // hum User pe aggregate pipeline laga rahe h.
    const user = await User.aggregate([
        // 1st pipeline
        {
            // Ab hume pta h, match use krna hai
            $match: {
                // and ussme jo user id hoga, usko match kr do
                // ab yaha pe , _id: req.user?._id ye use nahi krenge
                // hume mongoose ki object id , jo hai usse banani padegi
                // new keyword ka use krke , mongosse hume types, objectId ka use krenge and req.user._id se mil jaayega
                _id: new mongoose.Types.ObjectId(req.user._id)
                
            }
        },

        // 2nd pipeline
        {
            // ab maine bola lookup kar lijiye
            $lookup: {
                // kaha se lookup karu, videos se
                from: "videos",
                // localField humhara watch History hai.
                localField: "watchHistory",
                //Foreign Field humara id hoga
                foreignField: "_id",
                // and hum iss pipeline ko "watchhistory" bolenge 
                as: "watchHistory",
                pipeline : [
                    // Ab hum videos ke ander lookup karenge
                    {
                        // ab hum lookup karenge.
                        $lookup: {
                            // kaaha se kare ? - users se
                            from: "users",
                            // localField humara owner hoga
                            localField: "owner",
                            //Foreign Field humara id hoga
                            foreignField: "_id",
                            // and hum iss pipeline ko "owner" bolenge
                            as: "owner",

                            // ab hum yaha pe bahar pipeline nhi laaga rahe h,
                            // as: "owner" field ke baad hi pipeline laaga raha hu.
                            pipeline: [
                                {
                                    // ab yaha pe aap project use kr lo
                                    // yaaha jitna bhi aap project kroge, ye sab owner ko return krega
                                    // aap bahar nikal kar bhi kr skte the , but hume structure way me chahiye to hum ander hi kr rahe h.
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
            // ab hum thoda pipeline ka data ka strucutre thik krenge,
            // ab nahi chaho to mt krna ye step
                    {
                        // add field waali pipeline
                        $addFields: {
                            // owner: {$arrayElemAt: ["$owner", 0]} //same ye aur tarike se kr skte h, niche dekho
                            owner:{
                                $first: "$owner"
                            }
                        }
                    }

                ]
            }
        }
    ])

    // ab response to return krna hoga
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "User watch history fetched successfully"
        )
    )
})



// export karenge, basically export kr rahe as object 
// and usske ander registerUser
export { 
    registerUser,
    // Uppar banaye hai to expoert bhi kar dete hai.
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getUserWatchHistory

 }




