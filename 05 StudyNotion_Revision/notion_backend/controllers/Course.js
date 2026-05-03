// sabse pehle course model ki need padegi
const Course = require("../models/Course");
// tags ki need bhi paadegi
const Tag = require("../models/Tag");
// User model ki bhi need padegi 
const User = require("../models/User");

// Ab Dhyn se socho to 1 chiz ki need aur hai.... image uplaod krna hoga 
// Cloudinary install karo, and create imageUploader.js Function file in utils folder 
// wait.......Util me ab imageuploader ban gyi hai.. ussko bhi import kr lete hai
const {uploadImageToCloudinary} = require("../utils/ImageUploader");



//1. Create Course Handler Function 
exports.createCourse = async (req, res) => {    
    try{
            //Steps
            //1.maine bola saare data laa kar do ...request ki body se
            //2. mujhe to thumbnail image bhi chahiye hoga 
            //3.validation suruu
            //4.Check for instructor 
            //5. Maine bola let's say koi instrcutor detail hi nhai mila 
            //6. Check given tag is valid or not (and iss tarah se tag ki need nikal gyi)
            //7.let's say koi tag detail hi nhai mili(means tag valid nhi tha)
            //8. Upload Image to Cloudinary using "uploadImageToCloudinary" function 
            //9. Create an entry for new course in DB
            //10.Add the new course to the User Schema of the Instructor 
            //11. [Homework] Update the Tag ka schema 
            //12. Return the response 


        //1.maine bola saare data laa kar do ...request ki body se
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, instructions} = req.body;

        //2. mujhe to thumbnail image bhi chahiye hoga 
        const thumbnail = req.files.thumbnailImage;

        //3.validation suruu
        if(!courseName ||  // maan lo course name nahi mila
            !courseDescription || // maan lo course description nahi mila
            !whatYouWillLearn ||  //maan lo what you will learn nahi mila
            !price || // maan lo price nahi mila
            !tag ||  // maan lo tag nahi mila
            !category || //maan lo category nahi mila 
            !instructions || //maan lo instructions nahi mila
            !thumbnail //maan lo thumbnail nahi mila
        ){
            return res.status(400).json({
                success:false,
                message:`All Fields are Required`,
            })
        }

        //4.Check for instructor 
        // maine bola 1st instructor ki detail chahiye
        
            //4.1 to maine user ki id nikal li...jo ki present hai payload me 4.1.1 user.id (controller/Auth.js)
            const instructorId = req.user.id;
            //4.2 ab maine user ki id se instructor ki detail nikal li
            const instructorDetails = await User.findById(req.user.id);
            //4.3 ab maine log kr diya 
            console.log("instructorDetails:",instructorDetails);
            
            // ToDo:Verify that userId and instructorDetails._id are same or different ?

        //Steps5. Maine bola let's say koi instrcutor detail hi nhai mila 
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:`Instructor Details Not Found`,
            })
        }

        //6. Check given tag is valid or not (and iss tarah se tag ki need nikal gyi)
        const tagDetails = await Tag.findById(tag);

        //7.let's say koi tag detail hi nhai mili(means tag valid nhi tha)
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:`Tag Details Not Found`,
            })
        }

        //8. Upload Image to Cloudinary using "uploadImageToCloudinary" function 
        //and Paramter me 2 chiz pass krni hotio hai, 
        // thumbnail (exact file hoti hai)and folder name(Kon se folder me store krni hai)
        // .env me file me FOLDER_NAME = "images"
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //9. Create an entry for new course in DB
        const newCourse = await Course.create({
            // And aapne apna data pass kr diya hai Db me
            courseName,
            courseDescription,
            instructor:instructorDetails._id, // Db me instructor Object id hai
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
            // Yaha pe humne 1 new course create kr liya hai
        });


        //Note: Agar User student hota to usse course buy krna hota
        // then usse ye new course show hota..But yaha User instructor hai
        // To Usse buy krne ki need nahi hai....Usse course apne aap show kr jaayega
       
        // 10.Add the new course to the User Schema of the Instructor 
        await User.findByIdAndUpdate(
            // Yaha pe user ka id pass krna hai
            {_id:instructorDetails._id}, // maine bola ye search parameter ka use krke entry findout krke laao
            
            // yaha pe maine,mai uss user ke course 
            // ke ander jo new course create kiya hu, 
            // usski id store krna chahta hu.
            // and yaha pe course ko push operator kr diya
            {$push:{courses:newCourse._id}}, 

            // and now, mai chahta hu jo response mile wo ekdm updated response ho
            {new:true}
        );

        //TODO: Homework
        //11. Update the Tag ka schema


        //12. Return the response 
        return res.status(200).json({
            success:true,
            message:`Course Created Successfully`,
        })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}  


//2.Get All Courses Handler Function 
exports.ShowAllCourses = async (req, res) => {

    try{

        //Steps
        //1.Now, Mujhe saare ke Saare course dekhne padenge to kya krna hoga suing Find call
        //2.Now, return response krna hai

        //1.Now, Mujhe saare ke Saare course dekhne padenge to kya krna hoga.
        //Kuch bhi nahi bhaiya Find call mar do
        const allCourses = await Course.find(
            // Find ke ander koi bbhi search Parameter nahi hai
            {},
            // But condition hai, make sure krna hai jo bhi data laa rahe, 
            // usske ander name 
            {courseName:true, // Data ke ander courseName present hona chahiye
                price:true, // Data ke ander price present hona chahiye
                thumbnail:true, // Data ke ander thumbnail present hona chahiye
                instructor:true, // Data ke ander instructor present hona chahiye
                ratingAndReviews:true, //Data ke ander ratingAndReviews present hona chahiye
                studentsEnrolled:true //Data ke ander studentsEnrolled present hona chahiye
            }
        )

        //Ab jo bhi data aa raha hai Find krke,ussko populate kr dena kisko? 
        //instructor ke ander object id aa rahi hogi ussko
        .populate("instructor")
        // and aapne query ko execute kr diya hai
        .exec();

        // Till here,Saare ke saare course detail nikal liye hai
       
       
        //2.Now, return response krna hai
        return res.status(200).json({
            success:true,
            message:`All Courses Fetched Successfully`,
            // and apne saara data jo hai ussko pass kr diya
            data:allCourses,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'cannot get all courses',
            error:error.message,
        })
    }

}



// Lec -91 me 
//3. get Course Details Handler Function 
exports.getCourseDetails = async (req, res) => {
    try{
        //Steps
        //1. CourseId ko le kar aao
        //2. Course ki Detail findout karo
        //3. Aao jao thodi validation kar lete hai
        //4.And at the end successfully return response krna hoga


        //1. CourseId ko le kar aao
        const {courseId} = req.body;
            
        //2. Course ki Detail findout karo
        const courseDetails = await Course.findById(
            // Kis basic pe findout karna hai ? _id (iss id ke basis pe findout ki courseId ..-id ke equal h)
            {_id:courseId})
            // yaha se Data to mil jaayega
        //mujhe niche jo sab present hai usski object id nahi chahiye...iss liye maine po
        // instructor as ref pass tha issliye populate krna pada
        .populate(
            {
                // instructor as ref pass tha model/Course.js me issliye populate krna pada
                path:"instructor",
                // as well as additionalDetails ko bhi populate krna hai
                populate:{
                    path:"additionalDetails", // saath hi saath jo profile ka data tha usko bhi populate kr liya
                },
            }
        ) 
        .populate("category") // category as ref pass tha model/Course.js meissliye populate krna pada
        .populate("ratingAndReviews") // ratingAndReviews as ref pass tha model/Course.js meissliye populate krna pada
        .populate( //  
            {
                // courseContent as ref pass tha model/Course.js me issliye populate krna pada
                path:"courseContent",
                // as well as subSection ko bhi populate krna hai
                populate:{
                    path:"subSection", // saath hi saath jo subSection ka data tha usko bhi populate kr liya
                },
            }
        ) 
        .exec(); // iss tarike se query ko execute kr diya


        // 3.Aao jao thodi validation kar lete hai
        // courseDetail aaya hi nahi to
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find course with id: ${courseId}`,
            });
        }
        // 4.And at the end successfully return response krna hoga
        return res.status(200).json({
            success:true,
            message:`Course Details Fetched Successfully`,
            data:courseDetails,
        })

    }// And yaha hum error catch kr rahe hai
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'cannot get all courses',
            error:error.message,
        })
    }
}


