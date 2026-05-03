

// rating and review waala model import kr lete hai 
const RatingAndReview = require("../models/RatingandReview");

// course waala model import kr lete hai 
const Course = require("../models/Course");


//1. Create Rating and Review Handler Function 
// createRating
exports.createRating = async (req, res) => {

    try{

        // steps
        //1.get user id 
        //2.fetch data from req.body 
        //3. check if the user is enrolled or not 
        //4. check if the user has already reviewed the course or not 
        //5. Create kar do rating and review 
        //6. Kisbhi course pe rating and review add ki hai, Uss course ko update kr do 
        //7. return response 

        //1.get user id 
        const userId = req.user.id;

        //2.fetch data from req.body 
        const {rating, review, courseId} = req.body;
        
        //3. check if the user is enrolled or not 
        const courseDetails = await Course.findOne({
            // course ke ander courseId ka course findout kr liye
            _id:courseId, 
            // Ab har Course ke ander saare courseId paadi hai,jissme saare enrolled students ko show krti h 
            studentsEnrolled:{
                // element match ho raha ya nahi
                $elemMatch:{
                    //kon sa element match krna hai? using $eq operator userid findout kr liya 
                    $eq:userId}},
        });

        // Let's say courseDetails mila hi nahi to 
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`Student is not enrolled in this course`,
            })
        }


        //4. check if the user has already reviewed the course or not 
        const alreadyReviewed = await RatingAndReview.findOne({
            // user and course dono ko findout kr liya
            user:userId, 
            course:courseId,
            // Agar ye dono (userId, courseId) se data padi hai to already review kr dhuka h
        });
        // Let's say alreadyReviewed mila hi nahi to 
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:`Review already submitted`,
            })
        }

        //5. Create kar do rating and review 
        // 2 method to create -using Create (used here) and .save bhi tha 
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId, // Course ke ander CourseId dal di
            user:userId, // user ke ander UserId dal di
        });


        //6. Kisbhi course pe rating and review add ki hai, Uss course ko update kr do 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            
            {_id:courseId}, // course ko findout kr liya
            {
                // and course ko update krna hai using push operator
                $push:{
                    // ratingAndReview ko push krna hai
                    ratingAndReviews:ratingReview._id,
                },
            },

            {new:true} // and new document return krna hai
        );

        console.log(updatedCourseDetails);

        //7. return response 
        return res.status(200).json({
            success:true,
            message:`Rating and Review submitted successfully`,
            ratingReview,
        })

    } 
    // kuch error aaya to catch
    catch(error){
        return res.status(500).json({
            success:false,
            message:`Rating and Review failed`,
            error:error.message,
        })
    }

}

// 2.Average Rating Handler Function  (Aap Aggregatio Sikhenge- NewConcept)
exports.getAverageRating = async (req, res) => {
 
    try{
        //  steps
        //1. get courseId from req.body 
        // CourseId nikal gyi to Fir simple hai, Db se call maro,Aggregation karo then Done
        //2.Calculate the average rating 
        //3. return rating

        //1. get courseId from req.body 
        const {courseId} = req.body.courseId;


        //2.Calculate the average rating 
        //rating and review ke upper aapne aggregate function call kr liya
        const result = await RatingAndReview.aggregate([
            // than isske ander step baata diya
            // Aggregation Pipeline 
            // Step 1 - Match the courseId
            {
                // yaha match operator ka use kr liya and 
                // Aisa course findout krke do, jisski courseid = CourseId ke equal ho
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            // Step 2 - Group the matched documents by course and calculate the average rating
            {
                // Step 1 me humne aisi entry findout ki jisski courseid = courseId ke equal ho
                // to aisi course waali bahut saari entry avail hai
                // now, Ab unn sabko group krke average nikalna hai
                $group:{
                    // group jo hai kis basis pe? 
                    _id:null, // id null mark kr diya, Mtlb jitni bhi entry aayi thi,un sabko single entry me wrap kr diya
                    averageRating:{$avg:"$rating"}, // average nikalne ke liye $avg operator ka use kr liya
                },
            },
            // Syntax wise hard tha - So aap google ka help le skte h
        ])

        //3. return rating
        // ek baar cehck kr lo rating mili ya nahi
        if(result.length > 0 // isska mtlb hai rating 1 aur zaada hoga,mtlb rating mil gayi   
        ){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        // if no rating/review found, return 0 as default rating
        return res.status(200).json({
            success:true,
            averageRating:0, // and yaha humne avg rating 0 dal diya
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Failed to retrieve the rating for the course`,
            error:error.message,
        })
    }
} 


//3.Get All Rating and Review Handler Function 
// getAllRatingAndReview
exports.getAllRatingReview = async (req, res) => {

        try{
            // steps
            //Simple baat hai.. ek find call maaro and jo ans aaye wo return kr do
            //lakin find kis basis pe kare? - Kisi basis pe na kro...saari entry laa ke aa

            // 1.Find all the rating and review 
            // 2. Sort the rating and review in descending order
            // 3. Populate the user and course fields
            // 4. return response


            // 1.Find all the rating and review  
            const allReviews = await RatingAndReview.find({}) // .Find ( ke ander koi citeria nahi h ..sab le kar aa jao)
            // 2. Sort the rating and review in descending order
            .sort({rating:"desc"}) // rating ke basis pe sort krna hai like 5,4,3,2,1 on Main Page

            // 3. Populate the user and course fields
            .populate({ 
                // Populate New Takira
                // populate krna hai user ke ander jo object id hai usko
                path:"user",
                // Niche humne bta diya user ke ander hume kis kis field chahiye
                // and populate krna hai (Means sirf mujhe firstName, lastName, email, image) hi laa kr dena
                select:"firstName lastName email image",
            })
            .populate({
                // populate krna hai course ke ander jo object id hai usko
                path:"course",
                // and populate krna hai courseName
                select:"courseName", //Course ke ander, zaada nahi sirf courseName ke kar aao
            })
            .exec(); // and query ko execute kr diya .sort and .populate tk
 
            // 4. return response
            return res.status(200).json({
                success:true,
                message:`All Rating and Review fetched successfully`,
                data:allReviews,
            })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                error:error.message,
            })
        }
}


