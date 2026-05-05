

// database congfiguration - ab isse hum apne database mongodb se connect kr skte h
 // moogose ka instance
 
 // Step 01: humne bola mongose ka ek instance le kar aao
 const mongoose = require("mongoose");
 // ab humne likha ki mere env variable waale file se sab kuch le kar aao.
 // load kr do humhare process object kr ander.
 require("dotenv").config();


 // STEP :02 
 // hum exports.connect and then arrow function use kr liya
 // =()=> {}
 exports.connect =() => {
    // then yaha pe kon sa function use krte the mongoose ka?
    // connect() method use krte the, jissme hum 2 chize pass krte the.
    // 1st- humara url
    // 2nd- object and jissme hum options pass krenge.
    mongoose.connect(process.env.MONGODB_URL,{
        // iss dono option ke value true mark kr diya humne.
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    // isske baad ek message print kr do console me.
    .then(console.log("DB Connection Success"))
    // ab, lets say aap break kr gaye kahi pe 
    
    .catch((err) => {
    // to apne err ko pakda and console pe print kr diya error message.
        console.log("DB Connection Failed");
    // and error throw kr diya.
        console.error(err);
    // fir aap exit krke chale gaaye.
        process.exit(1);
    })
 }

 // TO aapka databse configuration ready hai.
 // to ab agar aap chahe  to aap database se connect kr skte hai, using mongoose

