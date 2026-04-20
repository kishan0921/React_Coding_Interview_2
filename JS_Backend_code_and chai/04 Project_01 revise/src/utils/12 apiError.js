// STEP : 01
// Ab hum Error ko handle krna chahenge.


// https://nodejs.org/api/errors.html
// Inside Error, These are the options are available--
// new Error(message[, options])
// Error.captureStackTrace(targetObject[, constructorOpt])
// Error.stackTraceLimit
// error.cause
// error.code
// error.message
// error.stack

// STEP 02:
// Why we created this file ? - because hum error ko handle krna chahte hai
// Ab mai simply ek class banayunga, jisska hum name de dete hai."ApiError"
// ApiError jo h, wo extends kregi Error ko, issliye to humne "Error" ka documentation padha h
class ApiError extends Error{
    // STEP : 03
    // Ab iss class me mujhe pta hai, mera constructor available h.
    // But, yaha mai mera constructor banana chahunga.

    // // Ye raha mera constructor 
    // constructor()
    // // and mai iss constructor ko override bhi karunga
    // {}

    // and jab bhi app , kisi ko Error bhejenge issi class ke through bhejenge.
    // To atleast ye class jab bhi benegi, to statusCode lagega hi lagega and saath me extra like - message, error etc.

    // Ab pehle mai iss constructor ke ander ky ky chiz lena chah raha hu.
    // Jo bhi iss constructor ko use karega, wo mujhe 
    // statuscode,
    // message,
    // errors,
    // stack dega
    constructor(
        //Jo bhi is constructor ko use krega, 
        // statuscode to dega like - 200 etc
        statusCode,
        // and message bhi, and agar koi message ni dega then ek message bhi pass kr deta hu."Something.."
        message= "Something went wrong",
        // aur agar error dena hai, ya multiple error to  to iss error [] array me bata dena.
        errors = [],
        // and agar error hai to error me dena stack me dena
        // agar ni hai, to empty error stack de dena.
        stack = ""
    ){
        // STEP :04
        // Ab hum override karenge.and
        // jab hum override krte hai to super ka use krte hi hai,
        //now, super ke ander message pass kr rahe h, 
        // mtlb message to override krna hi krna h
        super(message)

        // STEP : 05
        // then , isske baad furthur jo bhi aapko add krna hai, iss constructor me
        // ya override krna hai.
        
        // to hum override kr dete hai........ and jo "statusCode,data,message.success,error" constructor me liya hai ussko override kr rahe hai.
        // ab hum this.statusCode ko override kr rahe mere statusCode se
        this.statusCode = statusCode
        // Data field ko generally null kr diya jaata h
        this.data = null
        // this.meesaage ko override kr rahe, apne message se
        this.message = message
        // Success ko false kr rahe, wo nhi jaayega, and jaayega to false response show krega
        this.success = false;
         // this.errors ko override kr rahe, apne errors se
        this.errors = errors


        // STEP : 06
        // App dekhoge kai baar ApiError ki file, babhut zaada lines of code ki hoti h and ye lines of code issi "stackTrack" me hota hai.
        // Zaada ke liye documentation padh lo.
        // Now, ab hum stack check kr rahe,
        if (stack) {
            // stack hai to stack de dena
            this.stack = stack
        } else{
            // nahi to error pass kar dena,
            // and ye aise hi likha jaata hai.
            // kuch nahi hum instance pass kr diye hai, like 
            // kon se context me baat kar rahe ho.
            // Error.captureStackTrace usage:
// 1. First argument: target object (e.g., `this`) where stack trace will be assigned
// 2. Second argument: constructor/function reference to exclude from the stack trace
Error.captureStackTrace(this, this.constructor)
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

// then lastly, ApiError ko export kr do taaki isse ussse kr skke dusri jagah.
export {ApiError}