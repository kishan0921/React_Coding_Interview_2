
// STEP : 01
// sabse pehla model hum "user" ka create kr lete hai.

// Model create krne ke liye humme ky ky chiz chahiye ?
// mongoose ka use krenge, schema banayenge.
// and ek model ko create krne ke liye humme, 2 chize chahiyee...
// 01-model ka name , 
// 02-schema


// Note: 
// ref : Profile,Course, CourseProgress  (used down-side)

// STP:02
// Mongoose ka instance chahiye hoga (mongoose import kara liya)
const mongoose = require("mongoose");


// STP :03
// moongoose ka schema baanayenge, 
// ab humne ek apna userSchema create kr liya.
// then apne userSchema me bol diya, ek new mongoose ka schema create kr do.
const userSchema = new mongoose.Schema({
    // then isske ander humne define kr diya , mujko chahiye 1st name
    firstName:{
        // type string 
        type:String,
        // requred hoga, fill krna hi hoga
        required:true,
        // blank space remove krega.
        trim:true,
    }, 
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },

    // user ka account type
    accountType:{
        type:String,
        // 3 type ke hi account ho skte hai. so enum banana zaruri hai.
        // dropdown show hoga and 3 option de rahe for select "admin","student","instructor"
        enum:["Admin","Student","Instructor"],
        required:true,
    },

    // ab hum aa gaaye additional details pe.
    // kisi ko yaad hai aditional details kya refer krta tha?
    // mera ek profile name ka model hoga ussko hum refer krenge.
    addditionalDetails:{
        // humn bol diya isska type...iss type ka isska type humne mentioned kr diya.
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",   //profile aapka model ka name hoga
    },

    // ab hume courses chahiye.
    // and humne reference add kr diya course model ka
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",   // courses appka model ka name hoga
    }],

    // jo bhi mere user ko image hogi.
    // image ke ander humne string kyu likha ?
    image:{
        type:String,
        required:true,
    },

    // har user ka apna token ho issliye
    token:{
        type:String,
        
    },
    // Token ka expire time ke liye
    resetPasswordExpires:{
        type:Date,
    },

    // course ka progress
    // coursee bahut saare ho skte hai, to hum ek array me store kr denge.
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
    }], 

});

// STEP : 04
// export krna pending hai..chalo krte hai
// model ka name use hai
// model ke ander 2 chize hum pass krte hai.
// 1st - Model ka name
// 2nd - User schema add kr do.
module.exports = mongoose.model("User",userSchema);