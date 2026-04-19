
// STEP : 01
import React, {useEffect, useState} from 'react'
// container and postcard component le lete hai from components
import {Container, PostForm} from '../components'
// then appwrite kis service bhi chahiye hogi
import appwriteService from "../appwrite/config";

import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    // STEP : 02
    //sabse pehle posts chahiye honge.
    // post ka state bana lete hai, and empty array ya null bhi le skte h 
    const [post, setPosts] = useState(null)

    // then ek aapko slug laagega(id).
    // kyuki edit krne hai post , so user edit pe click krega and then edit post pe jaayega to url chahiye and url me slug(id) hoga.
    // slug useParams se mil jaayega.
    const {slug} = useParams()
    // user ko navigate krwana hai, so useNavigate se le rahe h
    const navigate = useNavigate()

    // STEP : 03
    // slug me kuch bhi change ho to, saari data value le kar aani hogi
    useEffect(() => {

        // STEP : 05
        if (slug) {
            // agar slug hai to , appwrite ki service call kr lenge. getpost and usske ander slug de denge
            appwriteService.getPost(slug)
            // slug diya hai , then aapke pass post aa jaayega
            .then((post) => {
                if (post) {
            // and agar post aa gaya h, to uss posts ko setPosts me set krenge
                    setPosts(post)
                }
            })
        } 
        // and agar slug nahi hai to / pe naviagte kr denge.
        else {
            navigate('/')
        }
    }, 
    // STEP : 04
    // ek to slug(url ki Id me) and navigate me kuch bhi change hota hai to ye useEffect call hoga.
    [slug, navigate])

    // STEP : 06
    // agar post hai to post ? () kuch return kro  : nahi to null return kro
  return post ? (
    // post hai to 
    <div className='py-8'>
        <Container>
            {/* // postform ko post pass kr diya  */}
            <PostForm post={post} />
        </Container>
    </div>
    // post nahi h to null return kr do
  ) : null
}

export default EditPost