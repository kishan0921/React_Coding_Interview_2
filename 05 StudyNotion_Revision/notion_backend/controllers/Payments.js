// This File Contain Payment ka Controller Logic
// Firstly, Install razorpay package using npm 


// ab mujhe instance nikalna hai, to destructure krke mujhe instance mil jayega
const { instance } = require("../config/razorpay");

// course model ki need padegi 
const Course = require("../models/Course");

// user model ki need padegi 
const User = require("../models/User");

// lets say mujhe mail send krna hai ki aap course me enroll ho chuke hai,to mujhe mailSender ko import krna padega 
 const mailSender = require("../utils/mailSender");
 
 // Lets say mujhe course enrollment ka mail bhi send krna hai to mujhe courseEnrollmentEmail ko import krna padega 
 const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");


 
 // 1.Capture the payment and initiate the Razorpay order (Mujhe payment capture krna hai 
exports.capturePayment = async (req, res) => {
        //  steps
        // Course kon buy kr raha h, and kon sa course buy kr raha 
        // To ye dono Id hume pta hone chahiye (courseId,UserId)

        //1.get CourseId and UserId from req.body 

        //2.Validation kar lete hai 
        //3.Valid Course Id hai ya nahi
        //4.Valid CourseDetail hai ya nahi
        //5.User ne already pay to nahi rakhna h iss course ke liye 
        //Ab Upper saare validation done hai to .. Ab kya Karu?
        // Kuch Nahi Order create kro and jao
        //6.Create order
        //7.return response


        //1.get CourseId and UserId from req.body 
            const {courseId} = req.body;  // course Id nikal li reuqest body se
            const userId = req.user.id; //User ki id nikal Auth midlleware se 
            
        //2.Validation kar lete hai 
        //Check kar lete hai courseId valid hai ya nahi
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:`Please Provide Valid Course Id`,
            })
        }    

        //3.Valid Course Id hai ya nahi
        // Ab Hum check krna chahte hai Course_Id se jo CourseDetail mila hai wo valid hai ya nahi 

        // Humne bola let course create kar liya 
        let course;
        try{
            // Ab fata Fat course ki detail lekar aate hai
            course = await Course.findById(courseId);
            // Ab Course ka Data mil gya hoga

            // Ab Fir se Validation Chala di maine,
            // Ki Agar Course ka data valid nahi  mila tmhe to 
        //4. Valid CourseDetail hai ya nahi    
            if(!course){
                return res.status(404).json({
                    success:false,
                    message:`Could not find the Course with given Id`,
                })
            }
        
         // To maine CouseId pe bhi validation Done 
        // Aur maine courseDetail pe bhi validation Done 
        

        // 5.User ne already pay to nahi rakhna h iss course ke liye 
        // iss step ke liye maine kya kiya,
        // User ki Id already present hai,Course ke model ke ander User ki Id kaise store h?
        // Bhaiya, Object Id ki form me store hai... mtlb abhi user ki Id kaisi h?
        // Mere pass mere User ki Id String type ki h. aur mere pass Course me kis type me store hai?
        // Object Id type me store hai...
        
        // To mai, UserId ko Object Id me convert kr leta hu 
        // To aise me UserId String se Object Id me convert kr liya
        const uid = new mongoose.Types.ObjectId(userId);

        // Maine check kr liya mere jo course h,wo StudentsEnrolled me pehle se to nahi padi ye object Id
        
        if(course.studentsEnrolled.includes(uid)){
            // Agar pehle se Paadi hui hai,mtlb 
        // student jo hai wo pehle se hi is Course me enrolled hai
            return res.status(400).json({
                success:false,
                message:`Student is already Enrolled`,
            })
        }       
    }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }


        // 6.Create order

        const amount = course.price;
        const currency = "INR";

        // 6.1fata fat option ka object Create kr deta hu
        const options = {
            // and isske ander saari ki saari values daalunga
            amount:amount*100, // Amount ko 100 se multiply krna hoga
            currency, // Fir tmne apni currency bhi daal di
            receipt:Math.random(Date.now()).toString(), // Then Receipt bhi bhej di tmne
            notes:{
                // Notes ke ander Additional Data pass kr rahe h
                courseId:course.id, // Course ki Id pass kr di
                userId, // User ki Id pass kr di
            },
        };

        // 6.2Ab Chalte h Function call ki taraf
        try{
            // Initiate the payment using Razorpay
            //Maine bola yaha jo bhi payment ka response h (paymentResponse) me aa jaayega
            // Fir maine jo mera instance h..usske upper "orders.create" waala function call kr liya 
            // and input me Options Pass kar diya
            // To iss parkar maine order Create kr liya
            const paymentResponse = await instance.orders.create(options);

            // and jo bhi answer aa raha h.. fata fat console bhi kr diya
            console.log(paymentResponse);
            
            //7.return response krna hoga agar payemnt ho gyi h
            return res.status(200).json({
                success:true,
                courseName:course.courseName, // Course ka name bhi bhej diya
                courseDescription:course.courseDescription, // Course ka description bhi bhej diya
                thumbnail:course.thumbnail, //course ka thumbnail bhi bhej diya
                orderId:paymentResponse.id, // Order Id bhi bhej diya, baad me isska status track karenge iss Order Id ke base  pe
            })

        }
        // let's say kahi fatt gya then response me bhej diya
        catch(error){
            return res.status(500).json({
                success:false,
                message:`Could not initiate order.`
            })
        }

        //7.return response


}



// But Abhi Payment Complete thodi hui h,
// 1. ke baad payment sirf create/captuing hui h, Authorized thodi hui payment ki
// 2. Verify Signature of Razorpay and Server (2nd handler Function)

exports.verifySignature = async (req, res) => { // to apne ek arrow function create kr diya
    // Now,
    // Steps 
    // Bhaiya mujhe matching krni h, Kiski ?
    // Mujhe server ke ander jo secret pada h wo secret, and 
    // Razorpay ne jo secret bheja wo secret match krna hoga 


    // 1.To maine bola server ka secret ye raha 
    const webhookSecret = "12345678";

    // 2. 
    // 2nd secrete kaha se aayega,Razorpay se aayega 
    // Jab Razorpay jb webhook ko activate karega,jab ye waala Api route hit/call hoga tb aayega
    //to input me aapna 2nd secret key mil jaayega
    
    const signature = req.headers["x-razorpay-signature"]; 
    // ye signature razorpay se mil jaayega , and ye request ke headers ke ander aa raha  
    //Kis key ke saaath ? [x-razorpay-signature] iss key ke ander ye signature pass kiya hoga 


    // const webhookSecret = "12345678"; ye mera waaala signature hai
    // const signature = req.headers["x-razorpay-signature"]; ye razorpay ka signature hai 

    // Now, upcoming process thoda teda hai, why ? ka answer nahi h..
    // Just rule h, wo follow krna


    //3. Ab maine crypto package ka use kr liya
    // uss package ke ander ek function h "createHmac (Hmac)" isska use kr liya
    //Hmac - Hashed based messaage authentication code
    // and 1 algo available h "sha256" 
    // to fark kya ha Hmac and sha256 ? -1:07:00

    //Hume Hmac me- 2 chiz ke need hai(Algo and Secret Key)
    const shasum = crypto.createHmac("sha256",webhookSecret);
    // Ab mere pass Hmac object aa gya hai 

    // 4.Next mujhe Hmac object ko String me convert krna hoga and shaum me pass kr diya value
    shasum.update(JSON.stringify(req.body));


    // 5.New-concept 
    // Jab bhi aap Hashing algo ko run krte ho, Kisi text ke upper 
    // then jo output aata hai.. uss term ko kehte hai "Digest"
    // and ye "Digest".Generally,hexadecimal format me hota hai.

    // to hum Digest create kr lete hai
    const digest = shasum.digest("hex");


    // repeated 3 step used up (ye 3 step smjh nahi aaye ho..but this k)
    // const shasum = crypto.createHmac("sha256",webhookSecret);
    // shasum.update(JSON.stringify(req.body));
    // const digest = shasum.digest("hex");


    // 6.Now , webhookSecret ko convert krke digest me kr diya 
    // Now,next mujhe ye Digest and signature ko match krna h aapse me
     if(signature === digest){
        // dono key signature and digest ko match krke dekho
        // Agar dono match krte hai to 
        // Payment Successfull hua hai
        console.log("Payment Successfull");
        
        
        //7. Now, payment Authorized ho gayi hai
     //Ab Action item full fill krna hogi (Like Baache ko course me enroll krwaao)
     // Isske ander bhi multiple step hai
     // for example-
     // 01-User ke ander course ke array ke ander Object Id store karo
     // 02- Specific Course ke ander Studentenrolls ke ander iss bache ki Object Id daalo

     //Ab Ques hai? CourseId and UserId kaha se laauu?
     // Ye request to frontend se nahi aayi h... razorpay se aayi h
     // To frontend body me resquest nahi bhejega
     // To now, Kisi ko yaad h notes name ki chiz used ki thi
     // Notes ke ander (userid and CourseId pass ki hui h)
     //  notes:{
     //  Notes ke ander Additional Data pass kr rahe h
     //     courseId:course.id, // Course ki Id pass kr di
     //      userId, // User ki Id pass kr di
     //  },


     // To ab mai CourseId and Userid Findout krunga
        const {courseId,userId} = req.body.payload.payment.entity.notes;
        // to dono chize nikal liye hai 

        // ab try-catch
        try{
            // FullFill the action - Student ko enroll karo 

            // 1.st step 
            //Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId}, // Find the course by its ID
                // and update the course and kya push krna chahta hu
                {$push:{studentsEnrolled:userId}}, // Push the student's ID to the studentsEnrolled array
                {new:true} // and update the course
                
            );
            // course ko find krke student ko push kr diya

            // 2nd Step- verify kr lete response ko
            if(!enrolledCourse){  // Agar course mila hi nahi to 
                return res.status(500).json({
                    // success false kr diya
                    success:false,
                    // message ke ander "course cannot be found"
                    message:`Course cannot be found`,
                })
            }

            // Sabkuch sahi chl raha to enrolled course ko print kr diya
            console.log(enrolledCourse);


            // 3rd Step- Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                // Search karo using Student ki Id
                {_id:userId}, // Find the student by their ID
                //Ab mujhe push krna hai..kya?  Course ki Id ko push krna hai, Course me
                {$push:{courses:courseId}}, // Push the course's ID to the courses array
                {new:true} //And jo bhi document return kroge wo updated return krna 
            );

            // Ab let's say maine isse bhi console.log kr diya 
            console.log(enrolledStudent);

            //Till Here- Bacche ne paise diye, bacche ko course mil gaya and
            // Course ko Baccha mil gaya


            // 4th- Ab kya Karu (mail ans krna- Conformation waala mail)
            // Email template bhejo - Dear lovababber you enrolled into the course sucessfully

            // yaha mailsender 3 chiz leta h(email-Kisko bhejna hai)
            // ,title - mtlb Subject kya use krna chahte ho
            // ,body - mtlb kya contain bhejna chahte ho)
            const emailResponse = await mailSender(
                enrolledStudent.email, // Kisko bhejna chahte ho
                "Congratulations from Codehelp",   // Title me
                "Congratulations,you are onboarded into new Codehlp Course" // Body me
            );

            //Console.log kr lete hai emailresponse 
            console.log(emailResponse);

            // 5th - response send kr diya
            return res.status(200).json({
                success:true,
                message:`Signature Verified and Course Added`,
            })

        }   catch(error){
            return res.status(500).json({
                success:false,
                message:`Could not verify Signature`,
            })
        }
     }

     else{
        // Agar Signature match nahi hua to response bhej do 
        return res.status(400).json({
            success:false,
            message:`Invalid request`,
        })
     }

}









