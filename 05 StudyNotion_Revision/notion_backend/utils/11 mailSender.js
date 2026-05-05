// STEP : 01
// Note: ye file hum config waale folder me bhi create kr skte the.

//Note: Issliye ye create kiya hu..taaki mai OTP ko Mail me Send kr paayu
// kon sa package use hua tha mail send krne ke liye...Nodemailer package tha 
// to ussko import krna hoga 
const Nodemailer =  require("nodemailer");

// STEP : 02
// Humne function create kr liya "mailSender" jo ki Async funct hai
// and kya kya aa raha issme, input ke ander me (email chahiye, title chahiye,body chahiye) =>
    const mailSender = async (email, title, body) => {
        // AB ek try-catch block le leta hu.

        // STEP : 05
        try{
            // ab mail send krna hai to kya kya krna hoga 
            // agar apne nodemailer waala docuemnt padha hai
            // to ussme mention hai mujhe 1 transporter bnana hoga 
            // using nodemailer ka createTransport waala function.
            let transporter = Nodemailer.createTransport({
                //isske ander jo obejct pass krte hai 
                // wo hai host: and auth:
                // secure chaho to kr skte ho, warna itte se ho jaayega.

                // host ke nder, humne bata diya ki data kaha se uthana h.
                // env ke ander MAIL_HOST jo bhi hoga wo- like Gmail.
                host:process.env.MAIL_HOST,
                auth:{
                    // user and password
                    user:process.env.MAIL_USER, 
                    pass:process.env.MAIL_PASS
                }
            }) // transporter Create ho gaya

            // Step : 06
            // transporter banane ke baad , hum mail send krne ke liye kon sa 
            // function use krte the "sendMail".

            // Ab mail send krte h ... usska code 
            let info = await transporter.sendMail({
                // then iss mail ke ander, mai saare option send kr diya hu.
                from:`"StudyNotion | CodeHelp - By Kishan" <${process.env.MAIL_USER}>`, // sender address
                // kisko send krna chahte ho
                to:`${email}`, // list of receivers
                // ab Subject batao (title ko use kr lo)
                subject:`${title}`, // Subject line
                // Aur body kya hai ..(body ko use kr liya)
                html:`${body}`, // html body

            })
            // console log kr liya jo bhi info h.
            console.log(info);
            // and info send bhi kr diya.
            return info;

        }
        // STEP : 03
        catch(error){
            // jo bhi mera error ka message hoga, ussko print kr do
            console.log(error.message);
        }
    }


// STEP : 04
// aur maine issko export kar diya 
module.exports = mailSender;
