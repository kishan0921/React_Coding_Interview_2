
// STEP : 01
// Note: jaise (12.ApiError.jsx) file me code kiya same way ek ApiResponse ki file bhi bana lete hai.

// Api error to hogya, Ab hum ApiResponse bana lete hai

// Ab mai simple ek class banayenge, name "ApiResponse"
class ApiResponse {
    // STEP : 02
    // Ab iss class me mujhe pta hai, mera constructor available h.
    // But, yaha mai mera constructor banana chahunga.
    // // Ye raha mera constructor

    // and jab bhi app , kisi ko response bhejenge issko class ke through bhejenge.
    // To atleast ye class jab bhi benegi, to statusCode lagega hi lagega.
    // data bhejna hi hoga nad message bhi bhejna hi hoga
    // ye ApiResponse class jab bhi banegi, to humme
    // statusCode, data , message to bhejna hi hoga and kyuki ye ApiResponse hai (toh mostly ye "success" hi hoga.)
    constructor(statusCode, data, 
        // api response hai, to mostly success hi jaayega
        message = "Success")
        
        // STEP : 03
    // Now, aao ab override kare, iss constructor ki chizo ko override kr dete hai.
    {
        //this.statusCode ko apne statusCode se overrride kar rahe h
        this.statusCode = statusCode
        // this.data ko apne data se override kar rahe h
        this.data = data
        // this.message ko apne message se override kar rahe h
        this.message = message

        
        //and jo successage message aa raha hai, ussko status code bhej dete h
        // <400 hi hona chahiye
// Note: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
        // Informational responses (100 – 199)
        // Successful responses (200 – 299)
        // Redirection messages (300 – 399)
        // Client error responses (400 – 499)
        // Server error responses (500 – 599)
        this.success = statusCode < 400
    }
}


export { ApiResponse }