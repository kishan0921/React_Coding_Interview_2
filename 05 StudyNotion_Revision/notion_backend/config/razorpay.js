
// Razorpay ka instance create krna hoga
const Razorpay = require("razorpay");
// Ab aako razorpay ka instance mil gya


// Ab hum 1 instance create krna chahte hai
exports.instance =  new Razorpay({

    // Isske ander option pass kar rahe hai
    key_id: process.env.RAZORPAY_KEY,  //RAZORPAY_KEY env file se le laayenge
    key_secret: process.env.RAZORPAY_SECRET, //RAZORPAY_SECRET env file se le laayenge
});

//  Razorpay ka config done