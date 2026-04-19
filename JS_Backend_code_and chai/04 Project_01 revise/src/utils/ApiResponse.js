
// Api error to hogya, Ab hum ApiResponse bana lete hai


class ApiResponse {

    // ye ApiResponse class jab bhi banegi, to humme
    // statusCode, data , message to chahiye hoga humesha
    constructor(statusCode, data, 
        // api response hai, to mostly success hi jaayega
        message = "Success")
    // Now, aao ab override kare
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