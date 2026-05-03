
// Issme mai 
// Signup and Login hoga hi hoga ye to basic hai
// Additional chiz maine OTP send waala add kiya
// and Changed password

// To flow hai 
//1.SendOTP
//2.Signup
//3.Login
//4.ChangePassword


//aao jao 

//1.SendOTP
// user import kar lete 
const User = require("../models/User");
//OTP import kar lete hai 
const OTP = require("../models/OTP");
//Otp generator import kar lete hai 
const otpGenerator = require("otp-generator");


// 2.Signup
// becrypt use kiye hai to lena hoga

const bcrypt = require("bcrypt");

//3.Login
// to yaha humne jwt ka instance le liya
const jwt = require("jsonwebtoken");
// load krni padegi config
require("dotenv").config();



//1.SendOTP handler function - done
// Send OTP waala async waala Funtion create kr liya
exports.SendOTP = async (req, res) => {
    
    try{
    // Steps
    //1. Email nikal liya request body se 
        const {email} = req.body;
    //2. Mujhe User check krna hai already present hai ya nahi 
        const checkUserPresent = await User.findOne({email});
    // 3.Agar User already exits, then resturn a response
        if(checkUserPresent){
            return res.status(400).json({
                success:false,
                message:`User is Already Registered`,
            })
        }

    // 4. Generate OTP - Isse Pehle mujhe check krna hoga 
    // ye generate otp waala package install hai ya nahi
    // yaha genrate method use kiya hu and 6 length ka OTP generate krna hai
      var otp = otpGenerator.generate(6,{
        // condition: uppercaseAlphabets: false
        upperCaseAlphabets:false,
        //condition: lowerCaseAlphabets: false
        lowerCaseAlphabets:false,
        // SpecialChars: false
        specialChars:false
      });
      console.log("OTP generated: ", otp);

    // 5.Check unique otp or not 
    const result = await OTP.findOne({otp:otp});

    //6.jab tak mujhe DB se OTP mil rahi hai tb tk mai OTp generate krte rahaunga 
    while(result){
        otp = otpGenerator.generate(
            // genearte method ke ander baaki ka parameter add kr diye
            6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        result = await OTP.findOne({otp:otp});
        // bahut ki bekar code hai... hmme aisa code likhna
        // jo hmesha unique otp generate kre


        // 7.Ab aapko iss Otp entry database me krni hai
        const otpPayload = {email,otp};

        // 8.create an entry in DB for DB
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body",otpBody);

        //9. and at the end appne apna response successfully bhej diya
        res.status(200).json({
            success:true,
            message:`OTP Sent Successfully`,
            otp
        })
        
    }
    }
    // 10.lets say mai fass gya to catch error me aa jaate hai
    catch(error){
        // console.log kr diya and jo bhi error aaya hai show kr diya
        console.log(error);
        // and response aapne send kr diya
        return res.status(500).json({
            // sucess to hui nahi hai
            success:false, 
            message:error.message});
    }
    
}


//2.Signup
exports.Signup = async (req, res) => {

    // Step wise sochte hai- Full Flow
    //1.sabse pehle mai data fetch karunge request body se 
    //2.Data ko validate kar lo
    //3. 2 password aaye hai - pasword, conform password match krlo
    // 4. User exist krta hai ya nahi 
    //5. Agar sab kuch sahi chl raha to OTP nikal kr laao
    // 6. Fir aapne input OTP and database waala OTP validate kar liya //!SECTION
    // 7. Agar sab kuch sahi chl raha to Password ko apne hash kar liya
    // 8. Then Apne Entry Create kr di DB ke Ander
        
    
    try{
    //Step 1.sabse pehle mai data fetch karunge request body se 
    // Jo ki tmne UI pe data enter kiya hoga
        //-To maine bola mujhe data laa kar do
        const {firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body; // ye sab data request body se aa raha hai
            // to hmne saara data request ke body se nikal liya


    //Step 2.Data ko validate kar lo
        //-to maine bola iss data pe validation laagayenge
        //to maine bola inmese koi data present nahi hai
        if(
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            // !accountType || -- ye add nahi kiya kyuki ye tab hai (either student or instructor 1 value milega hi)
            !otp
        ){
            // to maine bola response bhej do
            return res.status(403).json({
                success:false,
                message:`All Fields are Mandatory`,
            })
        }

    //3. 2 password aaye hai - pasword, conform password match krlo
        //-Now password and conform password check karo same hai ya nahi
        if(password !== confirmPassword){
            // then response send kr denge
            return res.status(400).json({
                // success false kr diye
                success:false,
                // and message send kr diye
                message:`Password and Confirm Password does not match, Please try again`,
            })
        }
    

    // 4. User exist krta hai ya nahi 
        // and yaha hum email ke based par user find krna suru kiya hai
        const checkUserPresent = await User.findOne({email});

        // agar mujhe koi user mil gaaya to 
        if(checkUserPresent){
            // to maine bola response bhej do
            return res.status(400).json({
                // success false kr diye
                success:false,
                // and message send kr diye
                message:`User is Already Registered`,
            })
        }

    //5. Agar sab kuch sahi chl raha to OTP nikal kr laao (Find most recent OTP stored for the User)
    // .sort({createdAt:-1}).limit(1); iss querry ka use krke recent OTP nikal liya
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        // now print kr lete hai iss otp ko
        console.log(recentOtp);

    
    // 6. (validate OTP) Fir aapne input OTP and database waala OTP validate kar liya //!SECTION
        // maine bola iss recent otp ki value 0 hui to 
        if(recentOtp.length === 0){
            // means otp nahi mila
            // to maine bola response bhej do
            return res.status(400).json({
                // success false kr diye
                success:false,
                // and message/reason send kr diye
                message:`OTP is not found`,
            })
        }// res body se jo otp aa raha h, and ye validate otp dono equal nahi h to
        else if(otp !== recentOtp[0].otp) {
            // invalid otp
            // to maine bola response bhej do
            return res.status(400).json({
                // success false kr diye
                success:false,
                // and message/reason send kr diye
                message:`OTP is not valid`,
            })
        }
    
    // 7. Agar sab kuch sahi chl raha to Password ko apne hash kar liya
        // ab password hash krne ke liye package install krna hai bcryptjs and save kr denge DB ke ander
    const hashedPassword = await bcrypt.hash(password, 10);

        // additional details ke liye profile bana lete hai
        const profileDetails = await Profile.create({
            // and yaha values daal di jo bhi schema mai define kiye hai
            // and starting value null mark kr ek entry create kr diye DB mai
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        
        // ab fatafat entry create krni hai db mai
        // means ek user Db me create krna
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            addditionalDetails: profileDetails._id,
            image:"https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}",  // using DiceBear 3rd party website
        });

        // 8.(return res) Then Apne Entry Create kr di DB ke Ander
        
        return res.status(200).json({
            // success true kr diye
            success:true,
            // and message/reason send kr diye
            message:`User is Registered Successfully`,
            // and user bhi bhej diye
            user,
        });
    }catch(error){
        // console.log kr diya and jo bhi error aaya hai show kr diya
        console.log(error);
        // and response aapne send kr diya
        return res.status(500).json({
            // sucess to hui nahi hai
            success:false, 
            message:"User cannot be registered. Please try again.",
        });
    }
    
    



}


//3.login
exports.Login = async (req, res) => {
    try{

       // 1. get data from req body
       // 2.validation karo data ki
       // 3.User check karo exist krta hai ya nahi 
       // 4.Usske baad tm usska JWT token generate kr do, after Password matching
       // 5.Create Cookie and send response 
       // ye saara step exact same hai last week waala 
       



       //Step 1. get data from req body
       const {email, password} = req.body;
       //Step 2.validation karo data ki
       if(!email || !password){
        return res.status(403).json({
            success:false,
            message:`Please Fill up All the Required Fields`,
        })
       }
       // Step3.User check karo exist krta hai ya nahi 
       // .populate("additionalDetails");  - popu;ate kr diya profile detail ke saath
       // Means exaclty pura user aa jaayega
       const user = await User.findOne({email}).populate("additionalDetails");
       if(!user){
        return res.status(401).json({
            success:false,
            message:`User is not Registered with Us Please SignUp to Continue`,
        })
       } 

       //Step 4.Usske baad tm usska JWT token generate kr do, after Password matching
            //4.1 password compare  using bcrypt.compare function use karenge
            if(await bcrypt.compare(password, user.password)){

                //4.1.1 payload create krna hoga aage jaane se pehle
                const payload = {
                    // payload ke ander user ka email, id, role pada hai
                    email:user.email,
                    id:user._id,
                    role:user.accountType,
                };

                //4.2 JWT token generate kr diya hu
                 if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign(
                        {email:user.email, id:user._id, accountType:user.accountType},
                        process.env.JWT_SECRET, {
                        expiresIn:"24h",
                    });
                }

                //4.3 token ko user ke ander save kr diya
                user.token = token;
                //4.4 password ko undefined kr diya
                user.password = undefined;
                
                
                //Step 5.Create Cookie and send response 

                 //5.2 options bhej diye
                 const options = {
                    // cookie expire krna hai 3 days ke baad
                    expires:new Date(Date.now() + 3*24*60*60*1000),
                    // httpOnly true kr diye
                    httpOnly:true,
                 };
                 //5.1 create cookie and send response
                 res.cookie("token",token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:`User Login Success`,
                })
            }
            else{
                return res.status(401).json({
                    success:false,
                    message:`Password is incorrect`,
                })
            }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Login Failure Please Try Again`,
        })
    }

}


// 4.ChangePassword
// TODO: Homework
exports.changePassword = async (req, res) => {
    try{

        // 1.get data from req body (request ki body se data nikal liya)
        // 2.(password chnge kr raha hu to 3 types ka data aaya hoga oldPasswpord, newPassword, confirmNewPassword ye bhi fetch kr lena)
        // 3. validation (like password match kr raha ya nahi,password empty to nhi)
        // 4.(and validation passed ho jaaye to password update kr dena Db ke ander)update password in DB 
        // 5.(Password update hogya then mail send kr do)Send mail - password updated
        // 6.return response

    }catch(error){

    }
}
