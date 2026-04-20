
// STEP : 01 
// Ab ye asyncHandler krega kya,
// zaada kuch nhi bas ye ek method banayega and ussko export kr dega.

// Note:
// Option 01: Try-Catch waala tricks se
// Option 02: Promise waala tricks


// STEP : 08 
// Now, exaclty try-catch waale code ko promise me kaise convert krenge.
// Option 02: Promise waala tricks 
// yaha hum 'requestHandler' function ka name de rahe h
const asyncHandler = (requestHandler) => {
    //STEP : 09
    // ab yaha asyncHandler directly return kar dunga, promise ke format me
    return (req, res, next) => {
        // Ab aap promise invoked kar dijiye manually
        // then ussko boliye aapke pass 2 option h.
        // 01- .resolve()
        //02 - .catch()
        Promise.resolve(
            // STEP : 11
            // To mera promise ho gaya resolved, Ab resolved ke ander
            //1.requestHandler() method lo and issko execute kr do,
            // also (req,res, next) all parameter passed kar dena
            requestHandler(req, res, next)).
            // STEP : 10
            //2. Agar promise failed hogya, then (err) le lete hai,
            // and kuch nahi next le lete, taaki next jisse kam krna hoga wo kr lega.
            catch((err) => next(err))
    }
}



// AsychHadnler ko export kar diye.
export {asynchHandler};



// STEP : 02 
// Option 01: Try-Catch waala tricks se


// To pehle ek asyncHandler method bana lete hai. and basic arrow fucntion 
// bana lete hai.
// Note : ab kyuki asynchHandler ek HOC function hai.
// Higher Order Functions
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// STEP 04:
// what is  HOC function ?
// wo functions jo functions ko as a parameter bhi accept kr skte h and
// return kr skte hai. 

// To hum krte hai "fn" ek function accept kr lete as parameter,
// then mujhe iss function ko execute krna hai.
// const asyncHandler = (fn) => {}  - but execute to ni ho skta, kyuki yaha callback aa chuka hai yaha.
// so jo humne paramter accept kiya hai, ussme further ek Higher-order function execute krna hoga.
// Like -  const asyncHandler = (func) => () => {}  - Now ab mujhe issko async banana ho to?
// Kuch ni async() add kr denge.
// Final - const asyncHandler = (func) => async () => {}


// STEP : 05
// now, ab jab bhi hum async function execute/run krte hai, to humne jo "fu" pass kiya h paramter me.
// ussme se "req, res, next" extract kr lete h.  ("err" bh le skte ho)
// const asyncHandler = (fn) => async (req, res, next) => {
    // further ab mujhe try-catch chahiye
//     try {
    // STEP : 07 
    // try me kuch ni, await kro and jo function aapne liya h, ussko bs execute hi to krna h.
//         await fn(req, res, next)
//     } catch (error) {
        // STEP :06
        // error ke ander reponse code aa jaayega, warna hum "500" bhej denge.
        // but, usually ek .json response aise bhi hum bhejte hai
//         res.status(err.code || 500).json({
            // json response me ek mera hota h success flag, 
            // and error message mera.
//             success: false,
//             message: err.message
//         })
//     }
// }

// STEP 03:
// then issko export bhi kr lete hai.
// export {asynchHandler};