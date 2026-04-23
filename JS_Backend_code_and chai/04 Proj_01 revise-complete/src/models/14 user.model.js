
// STEP : 01
// step 1:mongoose import kar rahe hai, and
// baar baar mongoose.Schema nahi likhna paade issliye
// {Schema} bhi destrcture kar lete h mongoose se
import mongoose , {Schema} from "mongoose";


// STEP : 12
// Now, Bcrypt and jsonwebtoken ko lenge
// Ab encrypt wagera kaise karoge, 
// see, direct encryption krna possible to hai nahi.
// To Hummne leni padti hai,mongoose ke hooks ki help.
// unmese 1 hook hai, - prehook,
// prehook - Jab bhi koi data save hone waala rahta hai, 
//usse just phele kuch krwaana ho to to prehook ka use karega. Like password encrypt kr de
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// STEP : 02
//userSchema bana lete hai. and ye kaha se aayega ?
//Ek new,   Schema() ek method hai and isske ander multiple objects aayenge.
const userSchema = new Schema(
    // 1st object
    // now ab hum field banayenge
    {
        // STEP : 03
        // ye raha mera username field
        username: {
            // username field ka type : string hai
            type: String,
            // username field required hai ye
            required: true,
            //username field unique  hai
            unique: true,
            //username field lowercase field hai
            lowercase: true,
            // username field trim bhi kr deta hai, taaki space na ho
            trim : true,

            //Kisi bhi field ko agar aapko searchable banana hai to,
            // taaki database ki searching me aane lag jaaye.
            // uss field ki index ko true kar do.
            // Note: bina isske bhi search ho jaata h, 
            // but index: true krne se- thoda optimise ho jaata hai.
            index:true
        },
        // STEP : 04
        // ye raha mera email field h
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        // STEP : 05
        // ye raha mera fullname field h
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        // STEP : 06
        // ye raha mera avatar field h
        avatar: {
            type: String, // cloudinary url 
            required: true,
        },
        // STEP : 07
        // ye raha mera coverImage field
        coverImage : {
            type: String, // cloudinary url h
        },
        // STEP : 08
         // ye raha mera watchHistory field h
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        // STEP : 09
        // ye raha mera password field h
        password : {
            type: String,
            // required, true hai and ek message bhi de rahe hai
            required: [true , 'Password is required']
        },
        // ye raha mera refreshToken field h
        refreshToken: {
            type: String
        } 
    },

    // STEP : 10
    // 2nd object
    {
        // timestamps ka use krke and true krne pe , mujhe createdAt,UpdatedAt ban hi jaayega
        timestamps: true
    }

)

// :::::::::::::::::::::::   BREAK  ::::::::::::::::::::
// STEP : 11 (15 video.model.js) - do this file code then comeback




// STEP : 13
// prehook - Jab bhi koi data save hone waala rahta hai, 
//usse just phele kuch krwaana ho to to prehook ka use karega. Like password encrypt kr de
// Ab userSchema lo and then pre() use kr lo

// STEP : 14
// Yaha pre, ke ander mujhe 2 functionality , milti hai,
// 1st one- jab bhi data save ho raha ho, usske phale mujhe kuch krwana hai, to "save" use kr liye.
// isska mtlb yaha h, "save"- yaha hum apne password ko encrypt kr rahe hai
// 2nd one- Usske baad apnko milta hai, callback
// Aap chalo to directly callback likh skte ho, but 1 chiz ka dhyn rahkna,
// jab bhi aap pre ke ander callback likhte ho to ()=> {} to aise callback nahi likhna
// iss callback se , kaafi problm hoti h, kyu hum padhe h, iss callback ko this ka reference nahi 
// pta hota hai,means context nahi pta hota hai
// Note: yaha context pta hona bahut jaruri hai,kyuki save event, userSchema pe chal raha hai.
//and userSchema and ander jo sab likha hai,usska bhi to access laagega, 
// Kyuki userSchema ke ander waale hi value ko to manipulate krna hai.
// Isliye - mostly humlog   function(){} use krte hai,
// and async isliye use kiye hai, kyuki , ye jo humlog encrytion warega kr rahe hai,
// ye thoda complex process h, and ye time leega. issliye async use krte hai.
//  and (next) kyuki ye middleware hai, to middleware ke flag ko next ka access to hona hi chahiye.
 // isse ye hoga, jab isska kaam ho jaayega to next flag call kr denge,
 // meeans isska kaam ho gya hai , ab aage pass kr do.
userSchema.pre("save", async function(next){

    // STEP : 16
    // to hume krna hoga ki, jab bhi mai password field ka modification bheju.
    // tabhi appko password change krna hai,nahi to mt krna 
    // koi password me modification nahi hota to passsword mt change krna.
    // and mai kab password field bhejunga, first time create krne time,
    // ya update krne time.

    // to hume if condition use krna hoga, and isModifield available hota hai.
    //  this.isModified("password") - isske pta chal jaayega, password modified h ya nahi.
    // ! ka use krke hum check kr rahe agar password modified nahi hua h to,
    // to ab simple return kr do, next ()
    // isse ye hoga niche waaale method me hum jaayenge hi nahi.
    if(!this.isModified("password") ) return next()
              
    //STEP : 15 Ab krna ye hai, jab koi field save ho raha ho to
    // Unmese password field lo and ussko encrypt krke, save kar do
    // this.password se hum password le liye and acces hai,kyuki humne 
    // function use kiya hai, to this ko pta hai ssare field.
    // Now, ab isse encryot krna hai to kaise kare?
    // bcrypt ka use karke,and becrypt ke pass 1 method hota hai hash() krke
    //isse ye password hash kr dega,
    // ab, hash krne ke liye isse 2 chiz chahiye (
    // 1st one-Kya hash krna hai, to ye lo  "password" using this.password
    // 2nd one- salt ya bol skte hai kitne round krna hai, to ye lo like 10)
    // Kayi log default bhi use krte hai.
    this.password = await bcrypt.hash(this.password,10)
    // ab encrypt ho gya, ab isske baad next kr do
    next()
    // ab humne 1 problem create kr diye hai.like 
    // jab bhi koi kuch bhi change krta hai from field se like -
    //ex- ek banda aaya and avatar change kiya to, and pre hook ka use krke save kiye,
    // then password wapas se password change ho jaayega.and soo on...
    // to bar bar password chang hota hi jaayega, kyuki isske pass password ka access to h na
    // Solution : STEP : 16
} )

// ::::::::::::::: STEP 16 - Completed :::::::::::::::::::::::





// STEP : 17
// Note : 
// Jis tarah app middleware banate hai , ussi tarah mongoose aapko method 
// banane ka bhi option deta hai jaise like:validate, save, remove, 
// updateOne, deleteOne ye sb method aapko milte h waise hi , hum apna method bhi bana skte hai.

// Now, we are creating our custom method 

// userSchema ke ander hota hai, methods and iss methods ander aap jite 
// chaho methods add kr do,
// mai isPassswordCorrect custom method bana raha hu.
// and isPasswordCorrect jab bhi call hoga to to ussko ek password parameter bhejna hoga.
userSchema.method.isPasswordCorrect = async function(passsword){
    // now ab hum yaha apna logic likh denge, ki kaise apna password check hota h
    // Note: becrypt se hi password hash hota hai, and hum password check bhi kr skte h,
    //becrypt ke pass ek method hai compare() , 
    // jab aap compare use karoge to, isske pass 2 chiz chahiye
    // 1st one- mujhe data do string me like - jab user login karega to string me hi password bhejega na encrypt thodi karega.
    // 2nd one- bolta hai, mujhe encrypted password chahiye.
    // then bolta hai mai 1st one and 2nd one , dono ko compare kr dunga.
    // yaha this.password (encrypted waala h), and password jab usser login krra tha to string me h.
    // now,dono ko comapre krne me time lgta hai, computation power lgta hai to "await" use krte hai
    // ab await kr liye to isse sidha hi return kr do.
    // ab jab ye return hoga to appko true or false return krega.
    return await bcrypt.compare(passsword, this.password)
}


// ::::: NOTE:- generateAccessToken,generateRefreshToken have same code ::::::
// Agar dono same code hai to 2 baar kyu same code likh rahe h?
// RefreshToken baar baar refresh hota rahta hai, isskiye isske pass information km hoti h. (issliye issme hum sirf ID rakhte hai)
// AccessToken (issme zaada time tk information rahta hai)

// STEP : 18
// JWT - ek bearer token hota hai, and iss token ko use krke user ko authenticate krna hota hai.
// https://github.com/auth0/node-jsonwebtoken
// using: from github - Synchronous Sign with RSA SHA256, and Backdate a jwt 30 seconds
// also using- Another way to generate a token like this with this library is:
// ab .env me yw add krenge - 
// ACCESS_TOKEN_SECRET=chai-aur-code
// ACCESS_TOKEN_EXPIRY=1d
// REFRESH_TOKEN_SECRET=chai-aur-backend
// REFRESH_TOKEN_EXPIRY=10d

// Ab hum access token generate, and refresh token ka bhi method banayenge.
// generateAccessToken, generateRefreshToken dono hi JWT token h
// yaha async ki zarurat nhi h, kyuki fast process hota hai , 
// and likh bhi doge to problm nhi

userSchema.method.generateAccessToken = function(){
    // kai generate krre,
    // to jwt ke pass sign() method hota h, wo generate kr deeta h token
    // ab sign method ke ander hum denge payload , ki kya kya information hum 
    // rakhna chahte hai.

    // Now, Jab jwt token generate ho jaaye to ussko return kr do 
    // Using "return" and yaha time nahi lgta to async nahi use krenge
    return jwt.sign(
        // payload start-
    {
        _id : this._id, // this._id ye hume mil jaayegi mongodb se
        email : this.email,// this.email se email mil jaayegi
        // ab username and fullname bhi rakhna chahunga.
        username : this.username,
        fullName : this.fullName // this.fullname  database se mil jaayega
    },
    // Upper signIn ke liye to payoad token de diya ,
    // But 2-3 chiz aur lgta hai hai
    // Access Token Scret
    process.env.ACCESS_TOKEN_SECRET,
    //yaha expriy ek object ke ander jaayega. [Syntax hai, aise hi hmesha hoga]
    {
        // Access Token Expiry
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    // payload end

    )
    
}


// STEP : 19
userSchema.method.generateRefreshToken = function(){
    // Most imp: Jai upper AccessToken generate kiye , same code 
    // isska bhi hoga,

    return jwt.sign(
        {
            // Note: aapka jo refresh token hota hai,
            // issme information kaam hoti hai, issliye _id hota hai
            // baaki email, username and fullname nahi hoti
            // why only _id hota hai? kyuki refresh token baar baar refresh hota rhta hai,
            // issliye hum kaam information rakhte hai.
            _id : this._id, // this._id ye hume mil jaayegi mongodb se
        },
        // Refresh Token Scret
        process.env.REFRESH_TOKEN_SECRET,
        //yaha expriy ek object ke ander jaayega. [Syntax hai, aise hi hmesha hoga]
        {
            // Refresh Token Expiry
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )


}

// STEP : 20
// Ab export kr dete hai iss schema ko, and important "Video" ye aise hi likhna hai
//Kyuki, "Video" as reference pass kiya gaya hai.

// then, mongoose ko bolenge, ek model bana kar dena, model ka name "Video" rakhenge.
// and ye model based hoga mera videoSchema pe based.
export const User = mongoose.model("User", userSchema)