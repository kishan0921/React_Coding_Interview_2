// Skipping this detail comments - becausse (95% same code/concept as Login.jsx)

// Note: Login.jsx and sigup .jsx dono react form hook 
// pe based hai and same code likha gaya hai dono me ...
// // 1 samjh lo 2nd file easily smjh jaaoge


// STEP 01:
// state to change krna hoga , so useState le lete hai
import React, {useState} from 'react'
// authService bhi lagegi hi , to import krenge
import authService from '../appwrite/auth'
// login ke baad kahi to bhejoge user ko , 
// Clickable ke liye Link, and Dusri jagah bhejne ke liye useNavigate import krenge kr liye
import {Link ,useNavigate} from 'react-router-dom'
// ab login import kr rahe hai and , yaaha hm usse as authLogin use krengege.
import {login} from '../store/authSlice'
// Button, input, Logo sab index se import kr liye h
import {Button, Input, Logo} from './index.js'
// Dispatch bhi krna hoga , to useDispatch import krenge react-redux se
import {useDispatch} from 'react-redux'
// and form ke liye react-hook-form import krenge
import {useForm} from 'react-hook-form'



// signup ka component banayenge
function Signup() {
    // STEP : 02 
    // sabse pehle navigate to lenge hi
    const navigate = useNavigate()
    // error display krwane ke liye useState ka use krenge 
    // starting me empty state hai isska
    const [error, setError] = useState("")

    // Dispatch bhi krna hoga , to useDispatch import krenge react-redux se
    const dispatch = useDispatch()
    // useForm se hum, register and handleSubmit le rahe hai.
    const {register, handleSubmit} = useForm()


    // STEP 03:
    // Ab sabse pehle to 1 method banayenge create ka
    // then async function banayenge , kyuki data submit hoga then aayega , and bahut kuch
    // and data ko send krenge
    const create = async(data) => {
        // Now, jab bhi login first time set kro to error ko empty kr do.
        setError("")
        // ab try ke ander hum saara data send krke dekhenge.
        // jo bhi form me fill hoga.
        try {
            // async laaga rakha hai, to await use krna hi hoga.
            // then authService se createAccount method ko call krenge and data ko send krenge
            // and jo response aayega wo aayega ek session. 
            const userData = await authService.createAccount(data)

            // agar session aaya hai then, then user login hai and nahi aaya hai mtlb
            // user login nahi hai.
            if (userData) {

            // agar session hai, to hum user data nikalenge
                const userData = await authService.getCurrentUser()

                // agar ab, humare pass userData aaya hai then 
                // dispatch krna hoga, and authlogin ke ander UserData pass kr diya.
                if(userData) dispatch(login(userData));

                // yaha tak, iss step tk agar user aa gaya h, then 
                // ab mtlb user login hai, then yaha kyu rakhna hai isse,
                // login ho gaya h user, then (/) yaha pe naviagte kr do user ko    
                navigate("/")
            }  // STEP : 04
        } catch (error) {
            // agar error aaya to error message show kr denge.
            // ye jo error.message hai ye mai state me save kr liya hu.
            setError(error.message)
        }
    }

  return (
    // STEP 05:
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                
                {/* // STEP : 06 */}
        {/* // agar error aayega tabhi && ke baad jo likha hai , show krenge nahi to nahi. */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}


         {/* STEP : 07  */}
        {/* // Ab interesting Story start hoti hai yaha se, form ki  */}
        {/* // form ke ander 1 major activity hoti hai, onSubmit
        // and form jab bhi submit hoga then , always handleSubmit() use hoga, and ye ek method hai 
        // and isske ander hum apna method send krte hai, ki iss tarah se hum submit handle krengege. 
        // not yaha handleSubmit ek event hai. */}

        {/* //Note: why we use handleSubmit ?
        - form me jitne bhi input field wagera hum denge,to yaha agar hum register() ka use krte hai,
         krte hai to , automatically form me jitne bhi input field wagera hum denge, usska state manage krne ki zarurate nahi h
         //automatically, from ke saare value register pick krega and without , managing state 
         // apne aap handleSubmit call krte time, saare value wo le lega.  */}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                         // {...register} - aise hi use krte hai , always 
                // // and register ke ander (1st- key value, 2nd - object)
                        {...register("name", {
                             // 2nd value hai, object
                // and obejct me hum bahut saare options pass krte hai.
                //1st option true h  
                            required: true,
                        })}
                        />
                        {/* STEP : 08 */}
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        {/* STEP : 09  */}
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default Signup