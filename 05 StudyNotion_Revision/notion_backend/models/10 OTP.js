

// STP : 01
// last model create krne nikale hai.
// mongoose import kr let hai.
const mongoose = require("mongoose");


const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// STEP : 02
// OTP ka schma create kr lete hai.
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	// timestamp mtlb kb ye otp create kiya gaaya tha, taaki mai check kr paau valid hai ya nahi.
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// STEP : 04 Go to 11 mailsender.js file and do coding and then comeback.
// Isska sole Intend hoga ki email send kr de.
// a funtion -> to Send the email
// async funtion create kr letee hai fatta-fatt
// input m 2 parameter mujhe dena hoga, 
// 1st- kisko mail bheju, and 2nd- kis OTP ke saath mail bheju
// ye 2 chiz mujhe dena hoga, nahi to mai mail nhi send kr paayunga.
async function sendVerificationEmail(email, otp) {
	// STEP : 05
	// Create a transporter to send emails
	// Define the email options
	// a funtion -> to Send the email
	try {
		// maiSneder name ka function humne usee kiya hai.
		const mailResponse = await mailSender(
			// email bhej diya
			email,
			// mail ka title
			"Verification Email",
			// and OTP send kr diya.
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} // STEP : 04.1
	catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


// STEP : 06
// Aaao jao Pre-save middleware use kar liya
//syntax aapko bata rakha hai,Schema ko right down krna hai.(OTPSchema)
//then pre ka use krna hai.
// Document just save hone se pehle mera ye middleware run hona chhaiye.
// async function le lete hai, then next pass kr dete hai.
// next pass krne se ky hota hai? next middleware ke pass code run ho jaata h
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// STEP : 06.1
	// Only send an email when a new document is created
	if (this.isNew) {
		// hum mail send krna chahte hai.
		// issme mera jo bhi current email hoga wo,
		//and mera jo bhi current otp hoga wo.
		await sendVerificationEmail(this.email, this.otp);
	}
	// next middleware pe chale jaayenge
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);


module.exports = OTP;

// STEP : 03
// module.exportss = mongoose.model("OTP", OTPSchema)
