

//Note: Issliye ye create kiya hu..taaki mai OTP ko Mail me Send kr paayu
// kon sa package use hua tha mail send krne ke liye...Nodemailer package tha 
// to ussko import krna hoga 
const Nodemailer =  require("nodemailer");


// Humne function create kr liya "mailSender" jo ki Async funct hai
// and kya kya aa raha issme (email, title ,body) =>

    const mailSender = async (email, title, body) => {

        try{
            // ab mail send krna hai to kya kya krna hoga 
            // agar apne nodemailer waala docuemnt padha hai
            // to ussme mention hai mujhe 1 transporter bnana hoga 

            let transporter = Nodemailer.createTransport({
                //isske ander jo obejct pass krte hai 
                // wo hai host: and auth:
                host:process.env.MAIL_HOST,
                auth:{
                    // user and pass
                    user:process.env.MAIL_USER, 
                    pass:process.env.MAIL_PASS
                }
            }) // transporter Create ho gaya

            // Ab mail send krte h ... usska code 

            let info = await transporter.sendMail({
                
                from:`"StudyNotion | CodeHelp - By Kishan" <${process.env.MAIL_USER}>`, // sender address
                // kisko send krna chahte ho
                to:`${email}`, // list of receivers
                // ab Subject batao (title ko use kr lo)
                subject:`${title}`, // Subject line
                // Aur body kya hai ..(body ko use kr liya)
                html:`${body}`, // html body

            })

            console.log(info);
            return info;

        }
        catch(error){
            console.log(error.message);
        }
    }


// aur maine issko export kar diya 
module.exports = mailSender;
