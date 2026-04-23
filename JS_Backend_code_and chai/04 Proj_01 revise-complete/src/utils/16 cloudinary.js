// STEPS : 01
// Ab cloudinary waali file jo hai na, usska mera simple sa goal hai.
// ki meri aayegi kisi system ke throgh...means files meri already server pe store ho gayi h.
//kaise store hui wo nhi pta....but jab store hoga to mujhe ek local file ka path dega.
//(local file ka mtlb hai jo file server pe jaa chuki h wo file)


// STEPS :
// Server pe file bhejo 
// server se mujhe aap local path doge file ka.
// then mai uss file ko cloudinary pe daal dunga.
// Jab successfully file upload ho gayi hai, then mai server file ko remove bhi kr dunga.
// To overall, kaafi file handling humlog padhenge.


// ab using multer file jo hai, local storeage me upload rahega,
// using cloudinary, hum local storage file lenge and server pe store krenge


// STEPS : 02
// sabse pehle documententation me bola hai, v2 le aao , cloduinary se
// and v2 accha nahi lgta, isslye hum issko cloudinary name se use karenge
// and sb jagah aise hi use hota h.
import {v2 as cloudinary} from "cloudinary";
// next, chiz hume laagegi, fs
//node ke ander hume filsystem(fs) milta hai.
// ye hume help krta hai, file ko read, write, delete,opendir, openpath, unlink(path) krne me.
// aur bhi bahut kaam - yaha url pe jao and dekh lo
// https://nodejs.org/api/fs.html
import fs from "fs";


// STEP : 03
// ab hum ek method bana rahe , uploadOnCloudinary
// and ye time lega, issliye async and then ek "arrow function" bana rahe 
// like async () => {}
// then async (yaha paremeter pass kro like localfilepath (means url pass kr rahe)) => {} 
const uploadOnCloudinary = async (localfilePath) => {
    // ab krte hai try,catch ki story start
    try {
        // Step: 04
        // ab condition lagate hai, and check krte hai, ki localfilepath h ya nahi
        //!localFilePath - agar nahi hai to direct return kr do null ko.
        // like mujhe nahi pta next kya krna hai.Aap chahe to error message bhi return kr skte h
        if (!localFilePath) return null;
        // step 05:upload the file in cloudinary
        // documentation se dekh ko same syntax hai
        
        // yaha cloudinary ke pass ek uploadeer hai and and then upload() method use krke upload kr deta hai.
        // Ab upload ke ander() url chahiye , jo bhi url de doge , usko ye pass kr dega, so locaFilePath as url as parameter pass kr rahe hai 
        // then , laaga kr {} curly brackets  me aur option bhi add kr skte hai
        cloudinary.uploader.upload(localFilePath, {
            // Isske alawa upload me aur bhi option hum add kr skte hai, using {} curly brackets
            // ek milta hai resource_type
            resource_type: "auto", // means jaisi file hogi khud detect kr lo
        })
        // STEP : 06
        // Ab file upload hogya hai, to console pe message print kr dete hai
        // and upload hone ke baad jo url hai using response.url ussko bhi print kr dete hai
        // console.log("File uploaded on cloudinary", response.url);
        // Ab user ko bhi to kuch return krna hoga,
        // To hum pura ka pura response hi user ko return kr dete hai, 
        // usse jo chahiye hoga wo use kr lega, accha to hoga user sirf url hi le , but chalega
        // console se check kr lo and successfully ho raha then
        // then unlink/ delete krna hoga file ko, and unlinkSync() use krenge - mtlb isko kro hi nahi to aage process mt badna
        // and unlinkSync() method ke ander localFilePath as parameter pass krenge - mtlb url
        fs.unlinkSync(localFilePath);
        
        // ab cloudinary ke response return krenge
        return response;
    } 
    // STEP : 07
    // ab agar file sucessfully, upload nahi hui hai to catch me handle karenge.
    catch (error) {
        // ab cloudinary use kr rahe mtlb, is step se pehle file local storage me upload hui hai,
        // to us local storage file ko unlink/delete kr dete hai from local storage.
        // yaha hum localFilePath(url) ko delete kr rahe hai.
        // Note: Also unlink Sync kr rahe hai, mtlb ye step to hona hi chahiye then aage baadho
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed.
        // then return kar do null
        return null
        
    }
}


// ab hum export karenge
export default uploadOnCloudinary