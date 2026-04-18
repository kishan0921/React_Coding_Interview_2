// ye appko time laagega smjhne me
// And functionality thodi si extra used hui hai.
// video deko - 7:22:00 baar baar


//STEP :: 01
// react to lenge hi, isske alawa yaha pe ek "usesCallback" bhi lagega.
import React, { useCallback } from "react";
//yaha functionality thoda extra h, useForm hum import krenge.
// and ye "useForm" hook mera aata hai, react-hook-form se
import { useForm } from "react-hook-form";

// then apna banaya component chahiye hoga like button, editor(RTE), input , Select
import { Button, Input, RTE, Select } from "..";

// appwrite ki service bhi lagegi  , kyuki actually appwrite ki data collect kregi.
import appwriteService from "../../appwrite/config";
// aur naviagtor and Selector chahiye
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({ post }) {
    // STEP ::02 
    // Hume kuch information cahahiye, and jab bhi aap form use krenge, aise hi information chahiye hoga
    // and useForm aapko kaafi information de skta hai.
    //to hum information se lenge, 
    // Like register, - ye bhi last video me dekh chuke h
    // handlesubmit ,  - ye last video me dekh chuke h
    // watch, - aur watching capacity bhi deta hai.(App kisi bhi form ke saath watch laga skte hai)
    // setValue , - kisi bhi form ki value set krni hogi to hum directly "value" likh kr ni krte h.. "SetValue" ka use krenge.
    // control,- kisi form ka control chahiye to "control" le lijiye
    // getValues - kisi bhi form ki value chahiye to "getValue" k use kr lenge.
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
       // and additionally, aap useForm ke ander aap 1 object bhi pass kr skte h, and usske ander jo bhi value aap pass krna chahte hai aap de skte h
        // and isske ander aap jo bhi value dena chahe de skte hai, to mai default value pass kr raha hu.
        // default value ky h? - wo value hai to hum actually use krenge.
        defaultValues: {
            
            // STEP : 03
            // and ye value aayegi kaha se , to jab bhi koi post pe click krega then ye value aa jaayegi.
            // jab bhi edit button pe click krunga then ye post ki saari value chahiye.
            // agar post hai to usska titile use kr lo , nahi to empty pass kr rahe h
            // Note: Use ya to title edit krne aaya h, ya fir value dene aaya h.
            // Agar value denen aaya ha, to ussko empty dikhega,
            // end edit krne aaya hai to usko default value dikhega.
            title: post?.title || "",
            // issi tarah agar koi url(slug) hai to use kr lenge, nahi to empty
            slug: post?.$id || "",
            //Post ke ander content hai to use kr lo nahi to empty de do.
            content: post?.content || "",
            // post ke ander status h , to use kr lo nahi to empty de do.
            status: post?.status || "active",
        },
    });

    // STEP : 04
    //  ab naviagtion bhi ke lete hai 
    const navigate = useNavigate();
    //Ab mujhe userData chahiyhe, and ye mujhe state se milega wohaa hi rakhaa hua hai.
     // to mai useSelector ko bol raha hu userData mujhe de do.
    const userData = useSelector((state) => state.auth.userData);

    //STEP :: 05
    // Now, agar user ne form submit kr diya hai to kya kro.
    // to pehle 1 submit name ka form banate hai, 
    // and dekhenge ky chiz kaise kaam krti h
    // ab 2 cases h to, 
    // 1st case , koi post hai to update kar do , 
    // 2nd case , koi post nahi hai to create kar do.

    // to ek submit banate hai and async ke ander ki saara data jaayega.
    const submit = async (data) => {

        // STEP : 06 post hai, to bas update hi to krna h.
        // 1st case , post hai to update kar do , 
        if (post) {
            // Added - react-hook-form ka ye benefit hai ki, hum directly  data de skte h
            // and uss data me saare infromation hai.to hum .inmage[0] kar ke data me se,
            // 1st image nikal lenge.
            // ab agar imagee hai to kuch kro ? : warna kuch aur kro : ke baad.
            // agar hai image to appwrite ki service use krke file ko upload kr do (from data se 1st index waala image)
            // ab ye sab aa gaya h to ek variable (file) bana lete hai. and isske store ho jaayega.
            // and image ni aaya data se to null
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            // STEP : 07
            // ab agar aapke pass file aa chuki h, to purani image delete bhi to kro
            if (file) {
                // appwriteService ka use krke purani image ko delete kr do
                // and kyuki post ka access hai mere pass, to hum past.featuredImage krke delete kr denge.
                // database me hum "featuredImage" use kiye the so ussko use krenge, "Image" use ni krenge.
                appwriteService.deleteFile(post.featuredImage);
            }


            // ab uppar jo change kiye hai post ke ander , usse update krenge (mtlb post update bhi to krna hoga)

            // STEP : 08
            // ek variable bana lenge dbPost and then await krenge,
            // then appwriteService ka use krenge and updatePost() method ka use krenge.
            const dbPost = await appwriteService.updatePost(
                // ab updatepost me chahiye slug(ID), ye pass kr denge.
                post.$id, {
                // spread kr diye data ko , and kyu data ko update krna h (...data) - aise use krke hum saara data le aayenge and then ek field ka value overwrite krna hai.
                ...data,
                // and bas ek field overwrite krna hoga jo ki yaha update kiye h featured image
                // agar file hai to file ki id se overwrite kro , warna undefined kro
                featuredImage: file ? file.$id : undefined,
            });

            // STEP : 09
            // ab agar dbPost hua to user ko navigate kr do
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 


        // STEP : 10
         // 2nd case , koi post nahi hai to create kar do.
        else {

            // else me humne mtlb krna hai, ki "ek user jo hai wo ek new form create krna chahta hai"
            // New form create krna chahta hai to wo file upload kiya hi hoga.

            // ab file ko handle krenge
            // data se aap image [0] 1st index waala le lenge.
            // appwrite ki service use krke file ko upload kr do  
            const file = await appwriteService.uploadFile(data.image[0]);

            
            // STEP : 11
            // agar file hai to , mtlb "new user ne" file uplaod kr di
            if (file) {
                // sabse pehle file ki id le lete hai.
                // Note: mongoDB me _id aise use krte h, yaaha $id use krte hai.
                const fileId = file.$id;

                // ab humara pass data hai, and usske ander featuredImage h to usko file id se overwrite/update kro
                data.featuredImage = fileId;
                
                // ab uppar 1 property update kiye , and baaki baachi hui property create kr do
                // ek db post variable me store kr lete hai.
                const dbPost = await appwriteService.createPost({ // hum directly ek post ni create krnege,
                    // sabse pehle jo data hai mere pass old waala.
                    // Ussko laao using (...)spread operator
                    // ab old saara data aa gaya, now ab bas
                    //jo User ne new file upload ki hai.
                    //usska Id create hua hoga ussko bas Update kr do data me.
                    ...data, 
                    // user data se userid le lenge
                    // and userData jo hai, wo hum store se laa rahe h
                    userId: userData.$id });


            // STEP : 12
            // ab agar dbPost hua to user ko navigate kr do
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };


    // STEP : 13
    // Ab jo hum new method bana rahe hai, wo mera hai slugTransform.
     
    // ab new concepts dekhte hai, jo ki help krega interview clear krwane me.
    // ab ye slug transform ky krta hai ?
    // 2 inputs fields hai,ek title and slug h, 
    // title ko watch krna hai and slug ke ander value generate krni h
    // agar user kahi pe ( ) space deta hai to hume ussko replace krna h - (dash me) - ye to mera regex se ho jaayega.
    

    // STEP : 14
    // sabse pehle useCallback le lete hai and usske ander value pass kr rahe h
    const slugTransform = useCallback((value) => {

        // agar value h and value ka type bhi check kr lete h string h ya  nahi
        if (value && typeof value === "string")
            // then return kr denge value ko
            return value
            // then some validation laga do and regex ka use kr lo.
            // saari value ko trim kr do
                .trim()
                // and lower case kr do
                .toLowerCase()
                // and replace kr do
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                // and replace kr do
                .replace(/\s/g, "-");

        // and agar value nahi h to empty return kro
        return "";
    }, 
    // useCallback ke ander 2nd argument me dependency hoti hai, but abhi need nhi h to empty
    []);


    // STEP : 15 - 7:16:00 
    // Interview Ques : uppr jo slugTransform banaye h, ussko use kaise krna h ?
    // ye question thoda senior level interview ke liye hi h.

    // react me se hum useEffect use kr lete hai
    React.useEffect(() => {
        // Ab hum banayenge subscription
        // ab ye subscription kaise banega? - ye banta hai watch method se

        const subscription = watch(
            // ab watch ke ander bhi ek callback milta hai.
            // ab ander mujhe value milti hai, and name milti hai
            //STEP : 17
            (value, { name }) => {
            // humare pass jo name hai, wo tittle hai.
                if (name === "title") {
            // ab jaha pe title hai wooha ek setvalue() method use krenge
            // then setvalue, like setvalue kaha use krni hai ?
            // slug pe and replace krni hai hume value
            // slugTransform(value.title) -- isski value 
            // iss "slug" pe 
                setValue("slug", slugTransform(value.title), 
                // lastly, validate krna hai ya nahi ? to hum kr rahe hai 
                { shouldValidate: true });
            }
        });

        // return ke ander ek callback milta hai,ussko call krke subscription ko unsubscribe kr rahe h 
        return () => subscription.unsubscribe();
    }, 
    // STEP : 16
    // ab dependecy array me hai kya kya hai - ek to mera hai watch, sllugTransform, setValue , ye sab me kuch bhi change aayega then hum useefect ko run krna h
    // watch hum input jo hai usspe hum laaga denge.
    [watch, slugTransform, setValue]);


    // STEP 17
    // Now, ab hum return ke ander form use krenge. and form humne kaafi baar use kr liya hai,So time-waste ni krenge
    // and direct code-copy-paste krenge.
    // Note: copy-paste code directly in Video also - Skip
    return (
        // form mera 2 part me divided hai 
        // first part me 2/3 wala part hoga
        // second part me 1/3 wala part hoga

        // first part me 2/3 wala part hoga
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    // STEP 18
                    // yaha ...register liya hu and title use kiya hu and ye title required hai iss input ke liye.
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    // STEP:19
                    // yaha name slug hi dena, kyuki issi ke basis pe hum kaam kr rahe h.
                    {...register("slug", { required: true })}
                    // isska input kaisee aayega?
                    // humne ek e - event call krega.
                    onInput={(e) => {
                        // then event ke ander humne ek setvalue call kiya hai.
                        // adn baaki aur then, automatically value fill hoti jaayegi.
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                {/* // aur RTE maine banaya tha ussko as it is pass kr denge. */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>


            // second part me 1/3 wala part hoga
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
