
// reset password kr ne liye mujhe email pe ek link bhejna hoga 
// to maine resetPasswordToken - isska work hai mail send krne ka 
//resetPassword - Db me password update krne ka kaam ye krega


// now kis kis model ki need padni waali hai
const User = require("../models/User");
// Mujhe mailsender ka bhi use krna hai...and isski need padne waali hai
const mailSender = require("../utils/mailSender");



// resetPasswordToken 
exports.resetPasswordToken = async (req, res) => {
    // steps :
    //1. password chnage krne aaye ho to , Input me email diya hoga (get email from req body)
    //2. Check user for this email, and let say email validation krna chahte hai
    // 3. Link generate krna chahte hai token ka (Generate Token)
    // 4.update user by adding token and expiration time
    // 5.Then Url Create 
    // 6.Send mail containing the (url craeted)
    // 7.return response


    try{
    // 1. get email from req body
    const {email} = req.body.email;

    // 2. Check user for this email, and let say email validation krna chahte hai
    const user = await User.findOne({email:email});
    // agar user nahi mila 
    if(!user){
        return res.status(400).json({
            success:false,
            message:`This Email: ${email} is not Registered With Us Enter a Valid Email `,
        })
    }

    // 3. Link generate krna chahte hai token ka (Generate Token)
    const token = crypto.randomUUID();

    // 4.update user by adding token and expiration time
        // user ke ander token add krna hai and expirtation time
        const updatedDetails = await User.findOneAndUpdate(
            // email ke based pe search kr lenge
            {email:email},
            {
                // and change kya krna h, 
                // token change krna hai and date add krna hai
                token:token,
                resetPasswordExpires:Date.now() + 3600000,
            },
            // Yaha new (3rd parameter) ko true mark krte hai to ...... update document jo hoga wo return hoga response me
            // nahi to old document return hoga
            {new:true} // 3rd parameter
        );

    // 5.Then Url Create 
    // Note: Backend : 4000 port and frontend : 3000 port 
    const url=`http://localhost:3000/update-password/${token}`
    // Ab humne ${token} generate krna hoga using crypto package 


    // 6.Send mail containing the (url craeted)
    await mailSender(
        // ye send krne ke liye kya kya chahiye email,
        email,
        "Password Reset Link",
        `Password Reset Link: ${url}`);  

    // 7.return response
    return res.status(200).json({
        success:true,
        message:`Email Sent Successfully, Please Check Your Email to Continue Further`,
    })
}catch(error){
    return res.status(500).json({
        success:false,
        message:`Some Error in Sending the Reset Message`,
    })
}
}


//resetPassword

exports.resetPassword = async (req, res) => {
    try {

        // steps
        // 1.data fetch
        // 2.validation
        // 3.get user details from db using token
        // 4. if no entry - 1st reason-(invalid token)
        // 5. 2nd reason (token ka time expire ho gya hoga) token time check
        // 6. hash password (hmehsa to ye krte hai password ko hash krna)
        // 7. password update (6. ke baad password update krenge)
        // 8. return response


        // 1.data fetch
        // yaha frontend ne daala hai ye sab value 
        const {password, confirmPassword, token} = req.body;

        // 2.validation
        // check krta hu password and confirm password same hai ya nahi
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:`Password and Confirm Password Does not Match`,
            })
        }

        // 3.get user details from db using token
        const userDetails = await User.findOne({token:token});

        //4. if no entry - 1st reason-(invalid token)
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:`Token is Invalid`,
            })
        }


        //5. 2nd reason (token ka time expire ho gya hoga) token time check
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(400).json({
                success:false,
                message:`Token is Expired, Please Regenerate Your Token`,
            })
        }

        //6. hash password (hmehsa to ye krte hai password ko hash krna)
        const hashedPassword = await bcrypt.hash(password, 10);

        //7. password update (6. ke baad password update krenge)
        await User.findOneAndUpdate(
            //token ke based pe user dhundh kr laao
            {token:token},
            // and password update kr denna
            {password:hashedPassword},

            // new kon sa docuemnt return krna hai, new waala docuemnt return kr denge
            {new:true}
        )

        //8. return response
        return res.status(200).json({
            success:true,
            message:`Password Reset Successful`,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`Some Error in Updating the Password`,
        })
    }
}


