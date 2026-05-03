
//section waala model import kr lete hai 
const Section = require("../models/Section");
//Course waala model import kr lete hai 
const Course = require("../models/Course");


//1.CreateSection Handler Function that will be sync
exports.createSection = async (req, res) => {

    try{
        //1. Data nikal lena hoga req body se
        //2. Validation kar lete hai
        //and jab data nikal gyi hai,validatio ho gayi hai to..sab kuch sahi h
        //3.Section create kr deta hai
        //and jab section create ho gya hai to..means iss section ko update krna hoga
        //Course ke ander  (Means course ke aschema ke ander iss new section ke id ko push krna hoga)
        //4.Update krna hoga Course ko with section Object Id
        //5.and At end sucessfully return response krna hoga

        //1. Data nikal lena hoga req body se
        const {sectionName, courseId} = req.body;

        //2. Validation kar lete hai
        if(!sectionName || // maan lo section name nahi mila
            !courseId // maan lo course id nahi mila
        ){
            return res.status(400).json({
                success:false,
                message:`Section Name and Course Id Both are Required`,
            })
        }

        //3.Section create kr deta hai
        const newSection = await Section.create({
            // aur maine bola section create kr do
            sectionName,
            // lo section create ho gya
        })

        //4.Update krna hoga Course ko with section Object Id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                // and maine bola course ke ander section ko push kr do
                $push:{
                    //courseContent name ki field hogi,usske ander newSection ke id ko push kr do
                    courseContent:newSection._id,
                },
            },
            // taaki mujhe update document mil sake, Old document nahi mile
            {new:true}
        )

        // TODO:Homework use populate to replace section/sub-sections both in the updatedcourseDetails


        //5.and At end sucessfully return response krna hoga
        return res.status(200).json({
            success:true,
            message:`New Section Created Successfully`,
            //new data bhi pass kar diya
            updatedCourseDetails,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



//2. Update Section Handler Function 
exports.updateSection = async (req, res) => {

    try{
        //Steps
        //1. data input me lena hoga 
        //2. Validation kar lete hai
        //agar data validation ho chuki hai to, to jaha data paadi hai usse update kr do 
        //3.Update Data (Yaha agar section update kr rahe h,to id thodi update kr raha hu) 
        // that's why mujhe course me jaa kr update krne ki need nahi h
        //4.return Response krna hoga


        //1. data input me lena hoga 
        // request ki body me sectionName,Sectionid,courseId aa rahi h
        const {sectionName, sectionId, courseId} = req.body;

        //2. Validation kar lete hai
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:`All Fields are Required`,
            })
        }

        // 3.Update Data using findByIdAndUpdate
        const updatedSection = await Section.findByIdAndUpdate(
            // Kis basic pe update krna hai,
            sectionId, // Section Id ka use krke data find kr liya
            {sectionName},// Kya data change krna chahte ho? Section Name ko change krna chahta hu
            {new:true} // Updated Data chahiye so new true
        )

        //4.return Response krna hoga
        return res.status(200).json({
            success:true,
            message:`Section Updated Successfully`,
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed to Update Section`,
            error:error.message,
        });
    }
}



//3. Detele Section Handler Function (jo ki last section hai)
exports.deleteSection = async (req, res) => {

    try{

        //Steps
        //name thodi pata honi chahiye delete krne ke liye ,Mujhe to Id pata honi chahiye
        //1.get id 
        // (koi function hai kya jo id se find krta and delete krta hai, hann "findByIdAndDelete" Function)
        //2.using findByIdAndDelete 
        //3.return Response krna hoga

        //1.get id 
        const {sectionId, courseId} = req.body;
        //2.using findByIdAndDelete 
        await Course.findByIdAndDelete(sectionId);


        // 1more step : 
        //TODO [Testing]:do we need to delete the entry from the course schema ??

        //3.return Response krna hoga
        return res.status(200).json({
            success:true,
            message:`Section Deleted Successfully`,
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed to Delete Section`,
            error:error.message,
        });
    }
}
