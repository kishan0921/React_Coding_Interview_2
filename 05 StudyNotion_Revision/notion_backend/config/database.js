

// database congfiguration - ab isse hum apne database mongodb se connect kr skte h
 // moogose ka instance 
 const mongoose = require("mongoose");
 require("dotenv").config();

 exports.connect =() => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB Connection Success"))
    .catch((err) => {
        console.log("DB Connection Failed");
        console.error(err);
        process.exit(1);
    })
 }


