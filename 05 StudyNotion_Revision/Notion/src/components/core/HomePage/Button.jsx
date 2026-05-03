import React from 'react'

// Link tag import kr liya
import { Link } from 'react-router-dom'
import { setProgress } from '../../../slices/loadingBarSlice'
import { useDispatch } from 'react-redux'
 
//  yaha button me kuch 3 chize aa rahi h, as props retrive kr rahe
//  children hai - Like learn more,Book a demo
//  active hai - se mai isse show krunga yellow,button krna h ya black
//  linkto- isse mai bataunga ye button kisse link h,and kya perform krna h
const Button = ({children,active,linkto}) => {
    const dispatch = useDispatch();
  return (
    // Ab yaha maine link Tag ka use kr liya
    <Link onClick={()=>{dispatch(setProgress(100))}}  
    // Mera link tag point kr raha yaha pe
    to={linkto}>

    {/* yaha isske ander active flag use kr liya  */}
    <div className={`
    text-center 
    text-[13px] 
    px-6 
    py-3 
    rounded-md 
    font-semibold 
    ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} 
    hover:scale-95 
    transition-all 
    duration-200`}>

        {/* 
        Chalo Properties add krte hai button ke ander
        text-center - text ko center me place kr dena issko
        text-[13px] - text ka size fix kr diya 13px
        px-6 - padding x axis me 6px me kr dena issko
        py-3 - padding y axis me 3px me kr dena issko
        rounded-md - hum chahte hai corners jo h iss button ki wo round ho
        font-bold - font ko bold set kr diya
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} -pura ka pura logic define kr rahe depending on active ki value.
                 agar active true h to background colour ko yellow kr dena issko and text ko black kr dena issko
                 agar active false h to background colour ko richblack-800 kr dena issko   
        hover:scale-95 - button pe hover krne pe scale 95% kr dena
        transition-all - Transition maine use kr liya
        duration-200 - Transition ke duration ko 200ms me kr dena
        */}


        {/* yaha maine text daala hai Like - Learn More,Book a demo jo ki children h */}
        {children}
        </div>
        </Link>
  )
}

export default Button