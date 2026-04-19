
// multer ka use karke hum middleware banayenge

// now, firstly, hum multer import krenge
// ab multer ka to kuch pta hi nahi hai, to chalo multer documentation me

// DiskStorage waala topic from github yaha use karenge.
import multer from "multer";


// copy-paste code hai ye, from multer github
// storage bana liya hai, humne and using multer.diskStorage() method use kr rahe h
const storage = multer.diskStorage({
    // and destination ke ander hum bole hai, function jo hai req,file aur cb le rahe
    // req - ye request user se aa rahi h
    // file - ye file user se aa rahi h
    // cb - callback
  destination: function (req, file, cb) {
    //yaha cb ka jo 1st parameter h, wo null hai , and 2nd parameter h - like kon sa folder dena hai localstorage pe jaaha aap saari file upload kroge ['/tmp/my-uploads']
    // mai saare file public folder me upload krunga.
    cb(null, '/tmp/my-uploads')
  },


  filename: function (req, file, cb) {
    // ye mai copy passte kiya hu from multer github- and i m removing this line
    // becasue abhi itna complex chahiye nahi.
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    
    
    // Now-ab aate hai, callback me,
    // 1st parameter h - null (means callback null hai)
    // 2nd parameter h - file ka field hai file.originalname 
    // and hum original name le rahe hai, jo user ne upload kiya tha.
    cb(null, file.originalname)
  }
})


// Now, ye jo multer waala kahani hai, issko export bhi krna hoga
const upload = multer({ storage: storage })






