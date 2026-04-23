// STEP : 01
import mongoose , {Schema} from "mongoose";

// STEP : 04 Hum ek special package ka use krenge.
// ye package aapko allowed krta hai, "aggregation queries likhne me "
// documentation : https://www.npmjs.com/package/mongoose-aggregate-paginate-v2
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// STEP : 03
const videoSchema = new Schema({

    // VideoField field hai
    videoFile:{
        type: String, // cloudinary url
        required: true
    },
    thumbnail: {
        type: String, // cloudinary url
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    
},{
timestamps: true
})


// STEP : 05  - END
//Aap export kr rahe ho "videoSchema" ko usse pehle, issko use krna hota h.
//Monngose ek aur option deta hai, 
//ki aap apne khud ke plugin add kr skte hai
// and iss plugin ke saath hum mongooseAggregatePaginate  ko add krte hai.
// then isske baad hum,queries likh skte hai, jo ki aggregation queries hogi.
// and jo hai na mongoose ka 'AggregatePaginate' yahi humhare project ko advanced level tk le jaayega.
videoSchema.plugin(mongooseAggregatePaginate)


// STEP : 02
// Ab export kr dete hai iss schema ko, and important "Video" ye aise hi likhna hai
//Kyuki, "Video" as reference pass kiya gaya hai.

// then, mongoose ko bolenge, ek model bana kar dena, model ka name "Video" rakhenge.
// and ye model based hoga mera videoSchema pe based.
export const Video = mongoose.model("Video", videoSchema)