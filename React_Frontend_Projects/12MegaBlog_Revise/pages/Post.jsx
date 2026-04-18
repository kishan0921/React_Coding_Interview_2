//Note: Video me Code directly Paste kiya gya hai.


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {

    // post ka state bana lete hai, and empty array ya null bhi le skte h
    const [post, setPost] = useState(null);
    // slug useParams se le rahe h
    const { slug } = useParams();
    // user ko navigate krwana hai, so useNavigate se le rahe h
    const navigate = useNavigate();

    // ab mujhe userData chahiyhe, and ye mujhe state se milega wohaa hi rakhaa hua hai
    const userData = useSelector((state) => state.auth.userData);

    //  !important 
    // humne author check kr liya h
    // yaha hum check kr rahe hai, post se jo userId mila h, and userData se jo userId mila h wo false h to author h nahi to nahi
    // and Agar author h, to hum ussko Edit and Delete waala button denge ni to nhi.
    const isAuthor = post && userData ? post.userId === userData.$id : false;


    // ye same  EditPost.jsx pe bhi use kiya gaya h
    // slug me kuch bhi change ho to, saari value le kar aani hogi
    useEffect(() => {

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
    // ek to slug(url) and navigate me kuch bhi change hota hai to ye useEffect call hoga.
    [slug, navigate])


    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
