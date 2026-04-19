
// Router banana hai to lena hoga, and ye express se aayega.
import { Router } from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getUserWatchHistory } from "../controllers/user.controller.js";

// import karenge uplaod 
import { upload } from "../middlewares/upload.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


// ek router varible bana lete hai using Router 
const router = Router();

// abhi register route laa rahe hai, and then post() method ka use krke, 
// ander registerUser waala method use kr rahe h
// example : http://localhost:8000/users/register
router.route("/register").post(
    // ye middleware hai and multer waale middleware se liye h, middleware means jaate hue mujhese mil kar jaana,
    // mtlb register User se pehle mai upload krna chahta hu.
    // upload jo hai, bahut saare option deta hai
    // and upload me fields() method ka use karenge
    // and fields() method me ek array pass karenge
    upload.fields([
        // Middleware inject kr rahe niche - like avatar and coverimg
        // inject krne ke syntax hai, alag ho skte hai, yaha humne post waala syntax use kiya h
        // and ye waala syntax hi most common h, industry standard h
        
        // Now,
        // ab mai do file accept kr raha hu, avatar and coverimg
        // niche jo hai, ye dono objects hai.
        { 
            name: "avatar", 
            // mtlb aap kitni file accept karoge
           maxCount: 1 
        },
        { 
            name: "coverImg", 
            maxCount: 1 
        }, 
    ]),
    registerUser
);

// using router usske baad hume ek new route banaana h, /login route bana liye,
// then isske infromation lena hai to , post () method ka use kr lenge.
// then inside post() method hum loginUser() method call kr lnege.
router.route("/login").post(loginUser)


// Mujhe route banana hai, so using router usske ander hum route ka use krke (/logout)
// route bana liye hai, then mujhe kuch information chahiye to post () emthod use kr lengege,
// the iss post() method ke ander logoutuser() method call kr lenge , and isse pehla verfyJWT middleware  ka use krenge
// verifyJWT middleware ke baad, ye logoutUser() method ko call krega.
// secured routes  bolte hai issko
// now, abhi verifyJWT middleware ka code to complete h, but logoutUser() waaale controller ka code likhna hoga to chalo. [user.controller.js file me]
router.route("/logout").post(verifyJWT,logoutUser)

// yaha hum verifyjwt middleware use nahi kr rahe hai, kyuki uss verification waala 
// sab kuch refreshAccessToken me likha hua h, so no need to use verifyJWT middleware
router.route("/refresh-token").post(refreshAccessToken )

router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").post(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/cover-img").post(verifyJWT,upload.single("coverImg"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getWatchHistory)


// ab router export kr lenge
export default router;