// Home.jsx
import React from 'react';
import './Home.css'; // Optional: Import a CSS file for styling
import { Link } from "react-router-dom"; // Added this import for the Link component

// Icons Import
import { FaArrowRight } from "react-icons/fa";

// Component HighlightText Imports kr liye
import HighlightText from "../Components/core/HomePage/HighlightText";

// button import kr liye
import CTAButton from "../Components/core/HomePage/Button";

// video import kr lete h jo ki Banner name se h 
import Banner from "../assets/Images/banner.mp4";


// Homepage hum create krne nikle hai
const Home = () => {
    return (
        // yaha pe hum ek div setup kr liye hai
        <div>
            {/* section 01 */}
            {/* section 1 ki 1 div create krte h */}
            <div className="
            relative  
            mx-auto 
            flex w-11/12 
            max-w-maxContent 
            flex-col 
            items-center 
            justify-between 
            gap-8 
            text-white">
                {/*
                relative - relative positioning kr dena isski,
                mx-auto: means center me place kr dena issko
                flex: flex bana dena issko
                flex-col: means saara contain 1 ke niche 1 aayega
                items-center: means jo bhi items honge ussko center me place kr dena
                w-11/12: means 11/12 width kr dena issko.. jo ki generally hum follow krte hai
                text-white: means text color ko white color me kr dena
                justify-between: means saare items ko isske beech me place kr dena issko
                max-w-maxContent: means max width ko max content me kr dena issko (Added this property when creating sub heading)
                gap-8: means saare items ko 8px ke gap me place kr dena issko
                */}

                {/* Humne 1 Link tag ka use kete hai ...jo ki hume signup page pe le jaayega */}
                <Link to={"/signup"}>
                    <div className="group 
                    mx-auto 
                    mt-16 
                    w-fit 
                    rounded-full 
                    bg-richblack-800 
                    p-1 
                    font-bold 
                    text-richblack-200 
                    drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] 
                    transition-all 
                    duration-200 
                    hover:scale-95 
                    hover:drop-shadow-none
                    ">
                        {/* 
                        Chalo Properties add krte hai 
                        group - group property added in parent and later used in child
                        mx-auto  - Chalo center me place kr dena issko
                        rounded-full  -Roundeed full karo
                        mt-16 - margin top se 16px ke lo
                        bg-richblack-800  - ek background colour isska bhi hoga richblack-800
                        p-1 - padding 1px ke lo
                        font-bold  - Font ko humne bold kar diya
                        text-richblack-200  - text colour bhi hoga (richblack-200)
                        drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] 
                        transition-all - Kuch shadows hai,and hover effect bhi h...to transition maine use kr liya
                        duration-200 - Transition ke duration ko 200ms me kr dena
                        hover:scale-95 - Hover krne pe scale 95% kr dena
                        hover:drop-shadow-none
                        w-fit - width fit kr dena issko(shadows khud se add krna )
                        */}

                        <div className="
                        flex 
                        flex-row 
                        items-center 
                        gap-2 
                        rounded-full 
                        px-10 
                        py-[5px] 
                        transition-all 
                        duration-200 
                        group-hover:bg-richblack-900
                        ">
                            {/* 
                            Chalo Properties add krte hai 
                            flex - Icon and <P> tag upper niche aa rahe the..ek line me krne ke liye flex use kr liya
                            flex-row - Ek line me krne ke liye flex-row use kr liya
                            items-center - Items ko center me place kr dena issko (Like <p>text and icon here in this case)
                            gap-2 - Items ko 2px ke gap me place kr dena issko
                            rounded-full - Rounded full kr dena issko
                            px-10 -humne kuch padding add kr liya
                            py-[5px] -humne y-axis ke padding ko 5px me kr liya
                            transition-all - Transition maine use kr liya
                            duration-200 - Transition ke duration ko 200ms me kr dena
                            group-hover:bg-richblack-900 - (parent me group property define h, nd yaha child me use kr rahe)
                                                            button pe Hover krne pe background colour ko richblack-900 me kr dena
                            */}

                            <p>Become an Instructor</p>
                            {/* maine yaha FaArrowRight icon use kr liya*/}
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className="text-center text-4xl font-semibold mt-7">
                    {/* 
                    text-center - text ko center me place kr dena issko
                    text-4xl - text ko 4xl me kr dena issko
                    font-semibold - font ko semibold kr dena issko 
                    mt-7 - margin top se 4px ke lo
                    */}
                    Empower Your Future with Coding Skills
                    {/* text pass kr rhe hai,as state in this homepage,
                    yaha humne property send kr di..and 
                    HighlightText.js me use kr lenge */}
                    <HighlightText text={"Coding Skills"} />
                </div>

                {/* Sub Heading */}
                <div className="
                -mt-3 
                w-[90%] 
                text-center 
                text-lg 
                font-bold 
                text-richblack-300">
                    {/* 
                    mt-4 - margin top se 4px ke lo
                    w-[90%] - width ko 90% me kr dena issko
                    text-center - text ko center me place kr dena issko
                    text-lg - text ka size thoda bada kr dena issko
                    font-bold - font ko bold kr dena issko
                    text-richblack-300 - text colour ko richblack-300 me kr dena issko
                    */}
                    With our online coding courses, you can learn at your own pace,
                    from anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-7 mt-8">
                    {/* 
                    ye 3 chiz as props hum send kr denge Button.jsx component me
                    CTA button ka children hai - Learn More  
                    Active flag - se mai isse show krunga yellow,button krna h ya black
                    linkto- isse mai bataunga ye button kisse link h,and kya perform krna h
                    */}

                    {/* Button 01 */}
                    {/* 
                    1st jo ye button hai - Learn More 
                    issko true mark kar diya hu 
                    and linkto ko signup pe kr diya hu */}
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    {/* Button 02 */}
                    {/* 
                    2nd jo ye button hai - Book a Demo 
                    issko false mark kar diya hu 
                    and linkto ko login pe kr diya hu */}
                    <CTAButton active={false} linkto={"/login"}>
                        {/* CTA button ka children hai - Book a Demo  */}
                        Book a Demo
                    </CTAButton>
                    {/* 
                    CTAButton - CTAButton ko use kr liya
                    active={false} - active ko false kr dena issko
                    linkto={"/login"} - linkto ko login pe kr dena issko
                    */}
                </div>
            </div>


            {/* Video */}
            <div className="mx-3 
               my-7 
               shadow-[10px_-5px_50px_-5px] 
               shadow-blue-200">

                {/* 
                mx-3 - margin x-axis se 3px ke lo
                my-7 - margin y-axis se 7px ke lo
                shadow-[10px_-5px_50px_-5px] - shadow ko 10px_-5px_50px_-5px me kr dena issko
                shadow-blue-200 - shadow colour ko blue-200 me kr dena issko 
                */}

                {/* Video adding krte hai */}
                <video
                    muted
                    loop
                    autoPlay>
                    {/* 
                    muted - video muted ho hmehs
                    loop - video loop kr dena issko
                    autoPlay - mai chahta hu video auto play ho..kuch krne ki need na pade
                    */}
                    {/* Question hai ? video kaha se aayega ? 
                        to tumne 1 sourceTag ka use kr liya*/}

                    {/* 
                        src - source ko Banner me kr dena issko
                        type - type ko video/mp4 me kr dena issko
                        */}
                    <source src={Banner} type="video/mp4" />
                </video>

            </div>


            {/* Code Section 1 */}
            <div>
                <CodeBlocks
                    //   codeblocks ka position flex-row lena hai, large waale case me
                    position={"lg:flex-row"}

                    heading={
                        // Text size 4xl kr diya and font ko thoda bold kr dena.
                        <div className="text-4xl font-semibold">
                            Unlock your
                            {/* Mujhe basically, ye waala line highlish krna hai. */}
                            <HighlightText text={"coding potential"} /> with our online
                            courses.
                        </div>
                    }

                    // Ab maine subheading ka content bhej diya
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }

                    // 1st button ka content bhej diya, maine 
                    ctabtn1={{
                        // Button ka text "Try it yourself"
                        btnText: "Try it Yourself",
                        //   button pe click hoga to /signup pe redirect ho jaayega
                        link: "/signup",
                        //    Iss button ko hume "yellow" color se show krna hai to true mark kr idya.
                        active: true,
                    }}
                    ctabtn2={{
                        // Button 2, me text daal diya 
                        btnText: "Learn More",
                        //   Link kr diya mai, click hone pe /signup pe redirect ho jaayega
                        link: "/signup",
                        // Iss button ko yellow show nahi krna, so False kr diya
                        active: false,
                    }}

                    // and code ka Color - Text - yellow kr diya hu.
                    codeColor={"text-yellow-25"}
                    // Codeblock le ander "Entire code ka data daal diya hu."
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>



            
            {/* Note: Section 1 waaala hi exact code hai - bs flex-row -reverse kr diya hu  */}
            <div>
                <CodeBlocks
                    //   codeblocks ka position flex-row lena hai, large waale case me
                    position={"lg:flex-row-reverse"}

                    heading={
                        // Text size 4xl kr diya and font ko thoda bold kr dena.
                        <div className="text-4xl font-semibold">
                            Unlock your
                            {/* Mujhe basically, ye waala line highlish krna hai. */}
                            <HighlightText text={"coding potential"} /> with our online
                            courses.
                        </div>
                    }

                    // Ab maine subheading ka content bhej diya
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }

                    // 1st button ka content bhej diya, maine 
                    ctabtn1={{
                        // Button ka text "Try it yourself"
                        btnText: "Try it Yourself",
                        //   button pe click hoga to /signup pe redirect ho jaayega
                        link: "/signup",
                        //    Iss button ko hume "yellow" color se show krna hai to true mark kr idya.
                        active: true,
                    }}
                    ctabtn2={{
                        // Button 2, me text daal diya 
                        btnText: "Learn More",
                        //   Link kr diya mai, click hone pe /signup pe redirect ho jaayega
                        link: "/signup",
                        // Iss button ko yellow show nahi krna, so False kr diya
                        active: false,
                    }}

                    // and code ka Color - Text - yellow kr diya hu.
                    codeColor={"text-yellow-25"}
                    // Codeblock le ander "Entire code ka data daal diya hu."
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>



            {/* section 02 */}


            {/* section 03 */}


            {/* Footer  */}


        </div>
    );
};

export default Home;