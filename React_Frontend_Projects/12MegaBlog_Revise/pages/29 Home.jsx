

// STEP :01
// Home hai to mtlb yaha bhi dekhna padega posts hai ya ni.
// to hum useEffect and useState le lete hai.
import React, {useEffect, useState} from 'react'
// Fir appwriteService ka bhi use hoga hi
import appwriteService from "../appwrite/config";
// 2 components ki bhi need padegi.
import {Container, PostCard} from '../components'

// STEP : 02
function Home() {
    // post ka state bana lete hai , and empty array ya null bhi le skte h
    const [posts, setPosts] = useState([])


    // STEP : 03
    // useeffect hook le lete hai
    useEffect(() => {

    // appwrite ki service call krenge,
    // and then getPosts() method call krenge and saare ke saare posts ko le kr aane ki kosis krenge, and koi query isske ander pass ni kr rahe h
        appwriteService.getPosts()
        .then((posts) => {
        // agar posts mil gye to
            if (posts) {
            // then posts ko setPosts me set krenge
            // and post ke ander document mil jaayenge saare ke saare
                setPosts(posts.documents)
            }
        })
    }, 
    // dependency array kuch hai hi nahi.
    [])
  
    // STEP : 04
    // Ab condition check krenge ki post hai mere pass ya ni
   // ab hume post ki length check krna hoga, 
   // post ki length 0 hai to login page pe redirect krenge
   // Note: copy-paste this code in video also
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // STEP : 05
    // agar post ki length 0 nhi h to 
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>

            {/* // posts pe ek loop chahlo map waala 
            // and map ke ander post le lo   */}
                    {posts.map((post) => (
                    // then post ka saara card show krenge with post id 
                        <div key={post.$id} className='p-2 w-1/4'>
                    {/* // and postcard ke ander post ka data pass krenge */}
                        {/* // basically, saare post ko spread kr deta h, means saare post 1 -1 krke de do (spread krke saare post hum le aaye h) */}
                            <PostCard {...post} /> 
                            {/* // uppar waala line aise bhi use kr skte h,<PostCard post = {post}/> */}

                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home