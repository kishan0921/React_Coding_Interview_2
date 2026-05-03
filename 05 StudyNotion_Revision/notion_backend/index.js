

// Chalo express le aate hai 
const express = require("express");

//then humne app create kr liya 
const app = express();


// Ab Saare ke Saare route import krte hai 
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");


// database waali chiz import krte hai 
const database = require("./config/database");
const cookieParser = require("cookie-parser"); // and make sure kro cookie-parser install ho

// Hum chahte hai frontend host : 300 and Backend host : 4000 pe chale .
// And mai Chahta hu mera Backend jo hai wo Frontend ko access kr sake 
const cors = require("cors"); // and make sure kro ki cors install ho

// cloudinary connect krte hai 
const {cloudinaryConnect } = require("./config/cloudinary");

// File upload krne ke liye humne ek package install kiya tha 
const fileUpload = require("express-fileupload"); // make sure kro ki express-fileupload install ho

// import krte hai dotenv
const dotenv = require("dotenv"); // and make sure kro ki dotenv install ho
// jo bhi mera .env file hai wo sabkuch load kr lo
dotenv.config();

// port number nikal lo 
const PORT = process.env.PORT || 4000; // port se aayega ...nahi to 4000 pe run krega


//database se connect kar lo
database.connect();  // database ke pass connect() name ka function hai..usse connect kr lenge
//Kuch middlewares add krna chahta hu
app.use(express.json()); // json parse krna ho to isse kr lenge
app.use(cookieParser()); // Cookie parsa krna ho to isse kr lenge


// ye line likhni bahut important hai 
app.use(
	cors({
		// Forntend se jo bhi request aa rahi uss ko allow krna hai
		origin:"http://localhost:3000",
		credentials:true,
	})
)

// Ek aur middleware add krte hai 
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

// cloudinary se connection bhi krna hai
cloudinaryConnect();

// routes ko use krte hai  (Sare routes ko mount kr diya)
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);	


// det route (Jab ye "/" default route pe aayega to ye message show ho jaayega )
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


// Most important
// Hume apne server ko active krna hai 
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})




