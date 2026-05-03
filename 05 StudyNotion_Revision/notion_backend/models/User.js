
// Mode,schema chahiye koi bhi model baane ke liye


// Mongoose ka instance chahiye hoga (mongoose import kara liya)
const mongoose = require("mongoose");


// moongoose ka schema baanayenge
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
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
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    addditionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",   //profile aapka model ka name hoga
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",   // courses appka model ka name hoga
    }],
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
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
    }], 

});


// export krna pending hai..chalo krte hai
// model ka name use hai
module.exports = mongoose.model("user",userSchema);