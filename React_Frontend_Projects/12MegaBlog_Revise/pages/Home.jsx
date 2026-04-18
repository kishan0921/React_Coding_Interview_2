import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {

    // post ka state bana lete hai , and empty array ya null bhi le skte h
    const [posts, setPosts] = useState([])


    // useeffect hook le lete hai
    useEffect(() => {

    // appwrite ki service call krenge,
    // and then getPosts() method call krenge, and koi query isske ander pass ni kr rahe h
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
  
   // ab hume post ki length check krna hoga, 
   // post ki length 0 hai to login page pe redirect krenge
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
                        {/* // basically, saare post ko spread kr deta h, means saare post 1 -1 krke de do */}
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