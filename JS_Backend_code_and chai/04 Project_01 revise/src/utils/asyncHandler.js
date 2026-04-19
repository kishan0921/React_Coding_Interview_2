
// Note:
// Option 01: Try-Catch waala tricks se
// Option 02: Promise waala tricks




// Option 02: Promise waala tricks
// yaha hum 'requestHandler' function ka name de rahe h
const asyncHandler = (requestHandler) => {
    // ab yaha asyncHandler direct return kar dunga, promise ke format me
    return (req, res, next) => {
        // Ab aap promise invoked kar dijiye manually
        Promise.resolve(
            // To mera promise ho gaya resolved, Ab resolved ke ander
            //1.requestHandler() method lo and issko execute kr do,
            // also (req,res, next) all parameter passed kar dena
            requestHandler(req, res, next)).
            //2. Agar promise failed hogya, then (err) le lete hai,
            // and kuch nahi next le lete, taaki next jisse kam krna hoga wo kr lega.
            catch((err) => next(err))
    }
}



// AsychHadnler ko export kar diye.
export {asynchHandler};



// Option 01: Try-Catch waala tricks se
// Higher Order Functions
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }