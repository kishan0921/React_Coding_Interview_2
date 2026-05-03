
// Subsection waala model import kr lete hai 
const SubSection = require("../models/SubSection");

// Section waala model import kr lete hai 
const Section = require("../models/Section");

//1.CreateSubSection Handler Function that will be sync
exports.createSubSection = async (req, res) => {
    try{
        // ye sab data aa raha hogya models/SubSection.js se
        // title:{type:String},
        // timeDuration:{type:String},
        // description:{type:String},
        // videoUrl:{type:String},

        //1.Fetch data from req Body (Data nikal lena hoga req body se)
        //Video kaha se milegi ? Files se
        //2.Extract File/Video
        // 3.Validation kar lete hai
        // Ab video store krni hai kya ? Nahi yaar Video url store krni hai 
        //and video Url banane ke liye upload krna hoga cloudinary pe
        //4.Upload Video to Cloudinary using "uploadImageToCloudinary" function 
        // Upload hone pe... tmhe secure url milegi as response
        // Now, Saara ka Saara detail mil gya hai to Subsection create krdo
        //5.Create a Sub-Section
        // Ab mujhe ye Sub-section ki id ko Section ki id me push krna hai 
        // 6.Update Section with Sub-Section Object Id
        // 7.At end return response krna hoga


        //1.Fetch data from req Body (Data nikal lena hoga req body se)
        const {sectionId,title,timeDuration,description} = req.body;

        //2.Extract File/Video
        const video = req.files.videoFile;

        //3.Validation kar lete hai
        if(!sectionId ||  // maan lo section id nahi mila
            !title ||   // maan lo title nahi mila 
            !timeDuration || // maan lo timeDuration nahi mila
            !description || // maan lo description nahi mila
            !video // maan lo video nahi mila
        ){
            // to maine bola response bhej do
            return res.status(400).json({
                success:false,
                message:`All Fields are Required`,
            })
        }


        //4.Upload Video to Cloudinary using "uploadImageToCloudinary" function 
        const uploadDetails = await uploadImageToCloudinary(
            video, // Kis video ko const video = req.files.videoFile; yaha video waali ko
            process.env.FOLDER_NAME  // FOLDER_NAME = "images"
        );

        // 5.Create a Sub-Section
        const subSectiondetails = await SubSection.create({
            title:title, // title me title store krna chahta hu
            timeDuration:timeDuration, // timeDuration me timeDuration store krna chahta hu
            description:description, // description me description store krna chahta hu
            videoUrl:uploadDetails.secure_url, // videoUrl me secure_url store krna chahta hu
        })

        // SubSectiondetails ki jo id hogi ussko sectionId me push krna hai (ya update krna hai)

        // 6.Update SubSectiondetails Id inside Section using FindByIdAndUpdate Function
        const updatedSection = await Section.findByIdAndUpdate(
            // 2st case -Kiske duwaara findout krna chahte ho ? 
            // to maine bola let's day _id equal to sectionId to isske duwaara findout kr lo
            {_id:sectionId}, // sectionId me SubSectiondetails ki id ko push krna hai
            {
                // 2nd case- Kya push krna chahte ho
                $push:{
                    //Subsection push krna chahta hu...
                    //To maine bola jo bhi subsection hai..
                    // Usske ander SubSectiondetails ki id hogi ussko push kr do
                    subSection:subSectiondetails._id,
                },
            },
            //and lastly jo bhi data mujhe tum bhejoge wo updated bhejna
            // to maine new true kar diya
            {new:true});


            //Note: Populate used why ?
            // Subsection ka Data kaise Store hoga..? Id ke Form me hoga
            //But mai chahta hu, Updateed Section ko log krna hai,
            // and kuch bhi id na dikhe,sabkuch mujhe populate ke form me dikhe
            // Kya use kru ? Populated
            // HomeWork : log updated section here,  after adding populate query

            //7.return Response krna hoga
            return res.status(200).json({
                success:true,
                message:`New SubSection Created Successfully`,
                // and updated subsection pass kr diya
                updatedSection,
            })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed to Create New SubSection`,
            error:error.message,
        })
    }
}








