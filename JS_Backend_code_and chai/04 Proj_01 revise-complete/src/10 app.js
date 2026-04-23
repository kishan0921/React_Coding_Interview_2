// STEP : 01
// express se usually ek app banti hai.
// to express import kr lete hai.
import express from "express";

// STEP : 03
// ab cors and cookieparser Package install hogya to dono ko bula lete hai
import cors from "cors";
import cookieParser from "cookie-parser";

// STEP : 02
// Note : ye to use() method h -> ye hum jitni bhi middlewares, configurations ke use me aata h.

// app ka name wohii common name "app" dee dete hai.
// and ye mera express() method se banega.
const app = express();

// STEP : 03
//  Note : jab bhi aap middleware use karte hai , 
// to app.use() method ka use karte hai
app.use(
  // use method ke ander hum cors use kr lenge.
  cors({
    // Niche ye objects hai
    // Cors me kuch options pass karte hai. like origin, credentials etc.
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


// STEP : 04
// Note: again app.use() kyu kiye h? kyuki mujhe configuration ya middleware set krna h.
// and jab bhi aisa krna hoga. hum app.use() hi krenge.

// Ab mujhe kuch setting krni padegi,
// Like data kaayi jagah se aane waali hai, backend ke ander,
// Like in url form, json, kuch log body me bhejte hai,

// Note: app.use() method ka use karte hai,kyuki middleware set krna hai

// express.json() - mtlb hum json ko bhi accept kr raha hu isske ander.
// ab json ke ander aapko dikhega, ki aap limit set kr skte ho. like: 16kb
app.use(express.json({ limit: "16kb" })); // Express ke saath mai, json ko accept kr raha hu then
// // Limit option hai, and 16kb is the limit


// STEP : 05
// Next jab url se data aayega, to usko bhi accept karna padega
// Note: app.use() method ka use karte hai,kyuki middleware set krna hai
// Extended: true - iska matlab hai ki hum nested objects ko bhi accept kar rahe hain
// Like : url me name=abc&%age=20&address={city:delhi,state:up} - %& warega
// Limit: "16kb" - iska matlab hai ki hum 16kb tak ka
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


// STEP : 06
// Ab hum ek aur express ki configuration use karenge static,
// Like pdf files, images, etc.jo serve se aa rahe hai, ussko store rakhna chahta hu to ek public folder bana lete hain
app.use(express.static("public"));

// STEP : 07
// Note: Why we using CookieParser ?
// Taaki mai user ke browser se cookie access kar paao and cookie set bhi kar paau.
// Basically, Crud option perform kr paao.
// Here, app.use because hum middleware use krne waale hai.
app.use(cookieParser());
//CookieParser ke ander bhi option hai, but abhi tak to koi option use nahi kiya

// STEP : 08 - 11 asyncHandler.js go here.

// STEP 09  (// (19 user.routes.js file)- coming here STEP : 04 (Go To 10 App.js file))
// routes import
import userRouter from "./routes/user.routes.js";
// import healthcheckRouter from "./routes/healthcheck.routes.js"
// import tweetRouter from "./routes/tweet.routes.js"
// import subscriptionRouter from "./routes/subscription.routes.js"
// import videoRouter from "./routes/video.routes.js"
// import commentRouter from "./routes/comment.routes.js"
// import likeRouter from "./routes/like.routes.js"
// import playlistRouter from "./routes/playlist.routes.js"
// import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
// jaise hi user "api/v1/users" pe aayega , then userRouter active ho jaayega
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/healthcheck", healthcheckRouter)
// app.use("/api/v1/tweets", tweetRouter)
// app.use("/api/v1/subscriptions", subscriptionRouter)
// app.use("/api/v1/videos", videoRouter)
// app.use("/api/v1/comments", commentRouter)
// app.use("/api/v1/likes", likeRouter)
// app.use("/api/v1/playlist", playlistRouter)
// app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

// export kar diye app ko, taki baaki files me use kr sake
export { app };
