// STep : 00
// Jo piche jo conpcept use kiye hai like forwardRef hook use krna etc
// yaha hum thoda again revision krenge.

// STEP : 01
// Note:  forwardRef ka use krenge- 2 Tarike se 
// 1st - this file input.jsx
// 2nd = select.jsx (export me "React.forwardRef" ye use kr liye h)

//STEP : 02 
// use "rfce" command

// same jaise input.jsx me use kiya tha id - for unique id import kr liye.
import React, {useId} from 'react'

// STEP : 03
// Simple sa yaha humara select component start hai.
function Select({
    // // STEp 04:
    // Selete component ke ander hum ye saare properties  daalenge as object
    // ab properties le lete hai
    // Option dena important hai - taaki hum uss option me se select kr lenge
    options,
    // Then, label bhi dena hoga
    label,
    // then, class Name bhi dena hoga...and by default mostly hum  "className" empty hi dente hai (input.jsx,Button.jsx me bhi same use kiya hu)
    className = '',  // aisa mtlb className ='' empty hi hua
    // ab saare apne properties ko spread kr lete h
    ...props
}, 
// STEP : 05
// then ek aur value mujhe lena hoga yaha extra "ref"
// saath me mujhe ref bhi return krna hoga
ref) {

    // STEP : 07.1
    // use Id banate hai.
    const id = useId()
  return (
    // STEP: 06
    // chalo ab form baane ki kosis krte hai.
     // ab yaaha pe mere pass ek div hai and className usska name "w-full" hai.
        <div className='w-full'>
            {/* // Now, agar kisi ne label pass kiya hai then only && ke baad jo likha hai show kro nahi to nahi.
            // Lable component hum show krenge ni  to ni.
            // same use kiya hu button.jsx file me */}
            {label && <label
            // STEP : 07
                    // Why hum htmtFor use kiye hai ?
            // sabse pehle Id banana hoga.  " const id = useId()", then simply hum htmlFor ke ander "id" use kr lenge.
            // ab hume useId import kiya hu , for generating unique id
            // so using htmlFor  and isske ander {id} pass krne se unique id milegi hume
        htmlFor={id} 
        // classNma empty hi hua
        className=''></label>}

            {/* STEP 08 */}
        {/* // ab hume chahiye 1 select element  */}
        {/* AB select ke ander aate hai options me but usse pehle properties le lete h  */}
        <select
        // ab ky select ke ander kuch properties deni hai.
        // hann , jitne bhi properties uppar hai sab pass kr do.
        // kar diya saare properties ko as- {...props}
        // note: {...props} - last me pass kro, pehle pass kro koi farak nhi pdta
        {...props}
        // id de do, jo uppar generate hua hai.
        id={id}
        // ab ref jo apne user se liya h, as a props ussko pass kr do
        // note: yahi wo chiz hai, jo aapko ref degi parent component ke ander, issliye humne apna forwardRef use kiya hu.
        ref={ref}
        // ab thodi className bhi add kr dete h, and default value bhi de dete hai
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
        
        {/*  STEP : 09 */}
        {/* // ab kyuki select use kiya hu, to options bhi dene padenge */}

        {/* // ab option ke ander ?. ternary operator use kiya hu. */}
        {/* // like options hai then, then map ka use kro and loop chalo  */}
            {options?.map((option) => (
                // key option pass kiya hu, and value option pass kiya hu
                <option key={option} value={option}>
                    {/* // option ke ander option pass kr diya hu. */}
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

// STEP 10:
// Here, do tarike se forwardRef krte hai syntax wise 
//01- export default React.forwardRef(Select) (Select.jsx)
//02- const Input = React.forwardRef( function Input({ (Input.jsx)

export default React.forwardRef(Select)