
// mujhe need padne waali hai model ki 
const Tag = require("../models/Tag");


//1. create tag ka handler function likhna hai
exports.createTag = async (req, res) => {
    try{
        // 1. Data nikal liya req body se 
        const{name, description} = req.body;
        // 2.validation kar lete hai
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:`All Fields are Required`,
            })
        }

        // 3. Create Entry in DB
        // tag ki entry create krni hai Db me 
        const tag = await Tag.create({
            name,
            description,
        })

        // Console .log krna chahte hai 
        console.log(tag);

        // 4.return response krna hai ab ....Ki tag create ho gya hai
        return res.status(200).json({
            success:true,
            message:`Tag Created Successfully`,
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// 2. 2nd handler function banana hai GetAllTags Handler function 
exports.getAllTags = async (req, res) => {

    try{
        // Show krne ke liye ... Find Function mar do

        //here, Find ke ander koi input citeria nahi hai, But make sure krna 
        // jo bhi data laa rahe, usske ander name and description hona chahiue response ke ander
        const tags = await Tag.find({}, {name:true, description:true});
        // return response
        res.status(200).json({
            success:true,
            message:`All Tags fetched Successfully`,
            // and then response ander saare ke saare tags pass kr diye
            allTags,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// 3. CategoryPageDetails handler function 

exports.categoryPageDetails = async (req, res) => {

    try{

        // steps
        // 1. get categoryId from req.body 
        // Ab category Id mil gayi, Ab iss category ke saare courses ko fetch kar lo 
        // 2. get Courses for the specified categoryId
        // 3. Validation (Ho skta hai uss Category ke ander koi course hi nahi mile)
        // 4. Get courses for other categories (Aab diff category ke course bhi le aao)
        // 5. Get Top selling courses across all categories 
        // 6. return response  (3 type ke couse nikal gye -Category wise, Other Category, Top Selling)

        // 1. get categoryId from req.body 
        const {categoryId} = req.body;

        // 2. get Courses for the specified categoryId
        const categoryCourses = await Course.findById(
                                    // category Findout kr li
                                     categoryId)
                                     // Category ke ander..Coursees ref pass kiya hua h
                                     // To hume populate krna padega, Kyuki ye hum show krna nahi chahte hai
                                    .populate("courses") // Courses waali field ko populate kr diya
                                    .exec(); // query ko execute kr diya

        // 3. Validation (Ho skta hai uss Category ke ander koi course hi nahi mile)
            
        if(!SelectedCategory){
            return res.status(400).json({
                success:false,
                message:`Category not found`,
            })
        }

        // 4. Get courses for other categories (Aab diff category ke course bhi le aao)
        const categoriesExceptSelected = await Category.find({
            // category ko findout kr liya
            // $ne - notqual operator use kr liya
            _id:{$ne:categoryId}, // category Id ke ander jo bhi id hai usko ne kr do
        })
        .populate("courses") // Courses waali field ko populate kr diya
        .exec(); // query ko execute kr diya

        // TODO: Homwork (write it on your own)
        // 5. Get Top selling courses across all categories 
        const allCategories = await Category.find()
        .populate("courses") // Courses waali field ko populate kr diya
        .exec(); // query ko execute kr diya
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
        .map((course) => course._id);
        console.log(mostSellingCourses);


        // 6. return response  (3 type ke couse nikal gye -Category wise, Other Category, Top Selling)
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })  

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

