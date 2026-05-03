import React from 'react'

//  CTAButton import kr liya jo ki component hai
import CTAButton from "../HomePage/Button"
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    // Humne bola , kya kya chiz input me aayegi , means properties me ky ky le rahe ho
    // Position - jo mai div create kr raha hu , usski posiiton ky rakhi jaaye wo le raha hu.
    // Heading- jo heading me content rakhna hai wo le raha hu
    // subheading - jo subheading me content rakhna hai wo le raha hu.
    // ctabtn1, ctabtn2 - dono button ka content le raha hu
    //codeblock - aur jo code ke ander likhna hai wo le raha hu.
    // BackgroundGradient - bhi le raha hu 
    // Codecolor - code ka color box ke ander.
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor
}) => {


  return (

    // ye meri top level div ho gayi.
    // Classname - flex rakhna hai
    // {position} - jo bhi input me aayi hui hai wo.
    // mergin add krna do - y direction me 20 margin add kr diya
    // justify-content kr diya aapne pure ke pure content ko
    // ek gap define kr diya - 10
    // 
    <div className={`flex ${position} my-20 justify-between gap-10 flex-wrap `}>
      
    {/*Section 1*/}
    
    {/* top level div ke ander section 1 waala div create kr diya  */}
    {/* maine bola 50% width mere text ko mark kar do,
    then jo bhi hai issko flex assign kro , and jo bhi hai issko,flex-col ki direction de do
    then gap assign kr do 8, ...more */}
    <div className=' flex flex-col gap-8 lg:w-[50%] p-4'>
        {/* // ab sabse pehle me chahta hu heading pass kru, jo as input aa rahi hai, to mai yaha place kr diya hu */}
        {heading}
        
        {/* // Heading ke baad mai subheading chahta hu. to sub heading ke liye, ek div bana diya and 
        sub heading add kr diya.

        // Sub Heading ko style krna padega.- text ka colour - richblack 300 show kr do
        and mera font bold kr do, .....more*/}
        <div className='text-richblack-300 font-bold text-sm p-4 md:text-lg'>
            {subheading}
        </div>



            {/* Button 1 */}
            Do button ke liye humne div banayi.
            dono button mujhe flex direction me chahiye, ek gap 7 define kr diya , and 
            ek margin define kr diya -7...more 
        <div className='flex gap-7 mt-7 p-3'>
            // ab koi need nahi hai, new button create krne ki, hum resue kr lenge button.
            CTAbutton ka active me - aap jo ctabtn1 ki active ki jo property h wo pass kr do.
            and linkto - ctabtn 1 ke ander jo linkto ki value h wo pass kr do.
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                uss button ke ander div create kr di , and ab mai chahta hu
                flex - mai do chiz chahta hu same line me to flex kr diya.
                dono text ka gap -2 assign kr diya 
                and item ko center place kr diya
                <div className='flex gap-2 items-center'>
                    // button ke ander text show krwa diya jo as input aa rah h
                    {ctabtn1.btnText}
                    next aapne arrow use kr liya jo apne import kr rakha hai.
                    <FaArrowRight/>
                </div>
            </CTAButton>


            {/* Button 2  */}
            active ka value - ctabtn2 ke ander active ka jo value h wo daalo.
            and ctabtn2 ke ander jo linkto ka value h wo daalo.
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                // second button ke ander mujhe koi div ki zarurat nhi h,
                and iss button ke ander mai text show kr diya.
                    {ctabtn2.btnText}
            </CTAButton>
        </div>


    </div>

     {/*Section 2*/}
     {/* 
     h-git = hifght ko maine fit kr diya 
     flex flex-row = flex ko flex - row kr diya 
     text-10[px] = text ka pixel 10 kr diya 
     widht[-100] = width 100% le lo
     and py-3 == padding from y index se 3
     lg:w-[500px] = large pixel size ke liye maine width 500px assign kr diya
     
     */}
     <div className=' h-fit  flex flex-row text-10[px] w-[100%] py-3 lg:w-[500px] glass  '> 
        {/*HW -> BG gradient*/}

{/* Humhara 
text-Center - text jo hai wo center me place ho  
flex and flex-col ho taaki mera text 1 ke niche 1 ke niche aaye.
width mera - 10% ho

text- color richblack 400
font inter - font ka style ye waala kar diya.
font ko thoda bold kr diya */}
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

{/*  Baaki bachi hui 90% width me ye waala div aayega.*/}
{/* 
flex flex-col - har code mai woohi flex column kr liya 
and gap-2 - gap mai 2 de diya hu 
font-bold - font thoda bold kr diya hu
and font-mono - font ka style mono kr diya hu 
and color - wohi {codecolor} le ander jo value hai wo waala rahega.
*/}
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 relative`}>
            <div className={`${backgroudGradient}`}></div>
          {/* Code animation ke liye mujhe, TypeAnimation waala package use krna hoga 
          
          then mai 
          
          */}
           <TypeAnimation
        //    mai cahhta hu codeblock waala code show kr dena, and 20 sec ka time ke lena.
            sequence={[codeblock, 2000, ""]}
            // and repeat infinite time kr dena
            repeat={Infinity}
            // and cursor bhi dikhna chahiyae
            cursor={true}
           // and ab issko thoda style de deta hu
            style = {
                {
                    whiteSpace: "pre-line",
                    // Display isski block bana do.
                    display:"block",

                    overflowX:"hidden",
                    // Font size 16px kr do 
                    fontSize:"16px",
                }
            }
            // and written hone ke baad delete ho jaata hai, jo ki mai nahi chahta so value True kr diya.
            omitDeletionAnimation={true}
           />
        </div>

     </div>



    </div>
    
  )
}

export default CodeBlocks
