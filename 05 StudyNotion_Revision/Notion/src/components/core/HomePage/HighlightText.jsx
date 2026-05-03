import React from 'react'

// yaha humne text as props pass kiya hai
function HighlightText({text}) {
  return (
    <span 
    className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>
        
    {/* span - ye span hai
    chalo span ki properties add krte hai
    className=
    'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] - {text} iss text ke ander ka text style kr rahe
    text-transparent 
    bg-clip-text 
    font-bold -font bold kr dena issko
    */}
        
        
        {" "}
{/* yaha humne text nikal liya using propes,jo Home.jsx me as state pass ki gyi h */}
{/* and yaha humne Homepage me pass ki gyi,
property retrive kr li */}
        {text}
         
    </span>
  )
}

export default HighlightText