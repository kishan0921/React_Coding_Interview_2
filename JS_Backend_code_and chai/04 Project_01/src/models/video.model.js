import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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


//Monngose ek aur option deta hai, 
//ki aap apne khud ke plugin add kr skte hai
// and iss plugin ke saath hum mongooseAggregatePaginate  ko add krte hai.
// then isske baad hum,queries likh skte hai, jo ki aggregation queries hogi.
// and jo hai na mongoose ka 'AggregatePaginate' yahi humhare project ko advanced level tk le jaayega.
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)