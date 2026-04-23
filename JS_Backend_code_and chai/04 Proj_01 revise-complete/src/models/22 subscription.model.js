
// STEP : 04 GO TO (18_20 user.controller) - STEP 12
// STEP : 01
//(18_20 user.controller) --- STEP :11 (create 22 subscription.model.js) - controller file se aayeg hai yaha 

import mongoose, {Schema} from "mongoose";  


// STEP : 02
// Ab hume schema banaya hai, and timestamps option use hota hai
const subscriptionSchema = new mongoose.Schema({
    // 1st id to aise hi aa jaati h,
    // 2nd- ab scriber chahiye,
    // 3rd- ab subscriber chahiye
    subscriber: {
        // isska type hoga - object id
        //and reference kaha se lega, user se 
        type: mongoose.Schema.Types.ObjectId, //one who is subscribing
        ref: "User",
        // and required true kr deta hu
        required: true,
    },
    channel: {
        // isska type hoga - object id
        //and reference kaha se lega, user se 
        type: mongoose.Schema.Types.ObjectId, //one to whom 'subscriber' is subscribing
        ref: "User",
        // and required true kr deta hu
        required: true,
    },

}, 
// ab aa jaate hai , bahar and bol dete hai ab chahiye timestamps
{timestamps: true});

// STEP : 03
// export kr diye subscriptionSchema ko
export const Subscription = mongoose.model("Subscription", subscriptionSchema);





// Aggregation Pipeline example:

// [
//     // 1st pipeline - isska overall result array me milta h
//     {
//        // first pipeline, usually match hone ke iye likhi jaati h
//        // But abhi hume, to bas dekhna hai ki join kaise hota h...
//        // usske liye lookup use hota h
//        $loopup: {
//         // lookup ke ander ab fields hai, like from- mtlb kaha se mai lookup kru, ya mtlb kon si table join kru
//         from : "authors",  // mtlb authors waale table se join ho jaao
//         localfield : "author_id", 
//         // dusra jo table hai ussme kaise dekhu, usska name do
//         foreignField:"_id",
//         // final jo result hoga usska ky name dena h
//         as : "author_details"
//        }

//     },
//     // 2nd pipeline - array me result nhi chahiye to ye 2nd pipeline use kro.
//     {
//         // example : first name, lastname
//         // and mujhe chahiye fullname 
//         // to like this example yaha bhi woohi kr rahe h
//         $addFields:{
//             author_details: {
//                 // author_details is field se , aap 1st value le aao
//                $arrayElemAt: ["$author_details", 0] 
//             }
//         }

//     },
//     //3rd pipeline
//     {}
// ]



