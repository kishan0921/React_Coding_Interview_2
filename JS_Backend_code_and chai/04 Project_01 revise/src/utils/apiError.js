

// https://nodejs.org/api/errors.html
// Inside Error, These are the options are available--
// new Error(message[, options])
// Error.captureStackTrace(targetObject[, constructorOpt])
// Error.stackTraceLimit
// error.cause
// error.code
// error.message
// error.stack

// Why we created this file ? - because hum error ko handle krna chahte hai

class ApiError extends Error{

    // // Ye raha mera constructor 
    // constructor()
    // // and mai iss constructor ko override bhi karunga
    // {}

    // Jo bhi iss constructor ko use karega, wo mujhe 
    // statuscode,message,errors,stack dega
    constructor(
        //Jo bhi is constructor ko use krega, 
        // statuscode to dega like - 200 etc
        statusCode,
        // and message bhi
        message= "Something went wrong",
        // aur agar error dena hai to iss error [] array me bata dena.
        errors = [],
        // and agar error hai to error me dena , nahi to error stack me dena
        // and abhi stack empty hai
        stack = ""
    ){
        // Ab hum override karenge.and
        // jab hum override krte hai to super ka use krte hi hai,
        //now, super ke ander message pass kr rahe h, 
        // mtlb message to override krna hi krna h
        super(message)

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


        // Now, ab hum stack check kr rahe,
        if (stack) {
            // stack hai to stack de dena
            this.stack = stack
        } else{
            // nahi to error pass kar dena,
            // and ye aise hi likha jaata hai.
            // kuch nahi hum instance pass kr diye hai, like 
            // kon se context me baat kar rahe ho.
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}