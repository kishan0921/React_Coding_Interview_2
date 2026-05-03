

// Profile ka model import kr lete hai kyuki use hone waala hai
const Profile = require("../models/Profile");

// User ka model import kr lete hai kyuki use hone waala hai
const User = require("../models/User");



// 1.Update Profile Handler Function
// Pura ka pura logic kisi bhi profile ki detail update krne ke liye
exports.updateProfile = async (req, res) => {

    try{
        //Steps
        // 1.(Get Fata) Data nikal lena hoga req body se
        // 2.Get userId (data ke saath user id bhi lelena)
        // 3.Validation kar lete hai
        // Profile aapne bana rakhi hai 
        // 4.find kar lo profile ko
        // 5.Update Profile  (then update kar lo profile ko)
        // 6.At end return response kr do

        //1.(Get Fata) Data nikal lena hoga req body se
        const {
            dateOfBirth="", // agar data aa rahi hai to thi, else "" empty maan lete h
            about="", // agar data aa rahi hai to thi, else "" empty maan lete h
            contactNumber,
            gender,
        } = req.body; // Upar saaare data aa raha hai req body se


        //2.Get userId (data ke saath user id bhi lelena)
        //Auth.hs (payload me user.id hogi usse)
        const userId = req.user.id; // yaha pe user ka id aa raha hai
        // iss tarike se jo bhi user login hai usski id hume mil jaayegi

        //3.Validation kar lete hai
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:`All Fields are Mandatory`,
            });
        }

        // yaha tak hume sirf user ki (userId)id pta hai... 
        // ab aao user ki detail le kar aate hai and then target hai profile_id find krna
        //4.find kar lo profile ko
        const userDetails = await User.findById(Id);
        // Ab mujhe pure user ki detail mil gaayi
        // Chalo profile Id nikalte hai 
        const profileId = userDetails.additionalDetails;
        // Lo ji mil gaayi profile Id
        //Ab Jab hume profile Id mil gaayi to profile ka Pura ka Pura data 
        // Nikal skte hai ? - Haan using FindById
        const profile = await Profile.findById(profileId);
        // Puri Profile detail mil gayi


        //5.Update Profile  (then update kar lo profile ko)
        ProfileDetails.dateOfBirth = dateOfBirth;
        ProfileDetails.about = about;
        ProfileDetails.contactNumber = contactNumber;
        ProfileDetails.gender = gender;
        await Profile.save();  // Object already created hai to,save function use kr liye
        // and earlier Create Function Use krte the 


        //6.At end return response kr do
        return res.status(200).json({
            success:true,
            message:`Profile Updated Successfully`,
            //Aur apne Profile ki detail send kar diye, response me
            ProfileDetails
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed to Update Profile`,
            error:error.message,
        });
    }  
}


// 2. deleteAccount  Handler Function
// H.w - FindPout on Internet (What is cron job)
exports.deleteAccount = async (req, res) => {

        try{
            //Steps
            //Agar mujhe koi Account delete karna hai, to usski id pta honi chahiye
            // 1. get Id
            // 2.Validation kar lete hai (Means Check kar lo valid Id hai ya Nahi)
            // 3.(Delete Profile)Ab Iss Account ke Ander, profile Paadi hogi ussko delete kar ke aao
            // 4.(delete User) Ab User/Account Delete Kar do
            // 5.Return Response kr do


            // 1. get Id
            const userId = req.user.id;
            console.log("Printing ID:",userId);


            // 2.Validation kar lete hai (Means Check kar lo valid Id hai ya Nahi)
            const userDetails = await User.findById(id);
            // maan lo data nahi mila to response return kr do , Means 
            // Kaise delete kar du user..user not Found
            if(!userDetails){
                return res.status(404).json({
                    success:false,
                    message:`User Not Found`,
                });
            }


            // 3.(Delete Profile)Ab Iss Account ke Ander, profile Paadi hogi ussko delete kar ke aao
            await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

            // One more step :
            // Homework : Unenroll user form all enrolled courses
            // Search Cronk Job
            // 4.(delete User) Ab User/Account Delete Kar do
            await User.findByIdAndDelete({_id:userId});

            // 5.Return Response kr do
            return res.status(200).json({
                success:true,
                message:`User Deleted Successfully`,
            });

        }catch(error){
            return res.status(500).json({
                success:false,
                message:`user cannot be deleted successfully`,
            });
        }
}


// 3. getAllUserDetails Handler Function
exports.getAllUserDetails = async (req, res) => {
    try{

        //Steps
        // 1.Get Id
        // 2.Validation kar lete hai and get user details
        // 3.Return Response kr do

        //1.get Id
        const userId = req.user.id;

        // 2.Validation kar lete hai and get user details

        
        const userDetails = await User.findById(id) // FindbyId karke puri user detail mil jaayegi kya ? 
        //- Nahi, Kya mera gender mil jaayega ? - Nahi  (upper line me sirf profile ki Id paadi hogi)
        // Profile ka data nahi pada hoga...
        // using populate function
        // Mujhe Profile ki id ko gender me,contact number me, DateofBirth me, About Section me convert krna hai
        // To humlog Populate function use krenge 
        .populate("additionalDetails") // Kisse populate karna hai ? additionalDetails ko
        .exec(); // And iss query ko execute kr dena 
        // Now, Ab Mujhe iss userDetails ke response ke ander profile ka data populated milega
 
        // 3.Return Response kr do
        return res.status(200).json({
            success:true,
            message:`User Details Fetched Successfully`,
            data:userDetails,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:`user cannot be fetched successfully`,
        });
    }

}



