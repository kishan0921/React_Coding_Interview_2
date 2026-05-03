

// Mode,schema chahiye koi bhi model baane ke liye


// Mongoose ka instance chahiye hoga (mongoose import kara liya)
const mongoose = require("mongoose");


// moongoose ka schema baanayenge
const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    },

});


// export krna pending hai..chalo krte hai
// model ka name use hai
module.exports = mongoose.model("user",userSchema);


// Profile Schema bhi ready ho gaya