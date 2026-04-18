// yaha hum Real Time Editor banayenge  (RTE.jsx file me)

// Step : 01
import React from 'react'
/// mujhe editor chahiye , to mai tinymce use krenge
import {Editor } from '@tinymce/tinymce-react';


// controller bhi lagegi hi , to import krenge react-hook-form se
import {Controller } from 'react-hook-form';


// STEP : 02
// function RTE ko directly hi export kr rahe hai, taaki easy rahe.
// ab isske ander input ky ky loge, to jab isse koi call krega then
// mai name, control, label, defaultValue empty pass krenge
export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {/* // agar label hai then && ke baad jo likha h wo display krwa denge.mltb label show kr diye h  */}
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}


        {/* STEP : 03 */}
    {/* // ab baat aati hai, controller ki, controller humne self closing liya h
    // documentation dekho same syntax hai jo yaaha use kiye h
    // DOC - https://react-hook-form.com/get-started#IntegratingControlledInputs
    // Ab controlleer jo hai , wo 3-4 chize deta hai.
    // Example: 
    //01-name bhi de skte h, 
    //02- control bhi de skte h 
    //03- Rules bhi aap define kr skte h
    //04- Render element bhi aap define kr skte hai. */}

        {/* STEP : 04 */}
    <Controller
    // NAME JO uppar pass kr rahe wo de rahe and agar wo ni h,to "content" name jo jaayega.
    name={name || "content"}
    // control jo uppar pass kr rahe wo de rahe,
    // and control jo hai wo parent element dega
    // means jo bhi parent element call krega, ussko as it is pass kr denge
    // taaki wo pura control le skke. (so that, jitne bhi states h,events , values hai wo saara ka saara le skke)
    control={control}
    
    // ab sikhte hai, element kaise rander krte h
    // Imp - sabse pehle ek callback daal dete hai {() => ()}
    // ab hum {} curely bracket lete h, then isske ander field hoga 
    // and field ke uppar tracking laagayenge,like onChange pe laagani h tracking mujhe.
    // Isse ye hoga, agar onChange pe kuch bhi change hota h, then 
    // means "onChange" fields ke andar kuch bhi change hota h, to mujhe inform kr dena render key ke saath.
    render={({field: {onChange}}) => (

        // STEP : 05
       // now, ab yaha aate hai jo bhi element aapko render krenge wo yaha likh lo
       // Input field ho to input le lo, Editor hai to "Editor" le lo
        
        // Note: Video me niche ka code Editor element waala copy paste kiya gaya h.
        // Code likha nhi gaya h.
       // ye editor mai le liya hu - copy paste krke
        <Editor
        initialValue={defaultValue}
        init={{ 
            // STEP : 06
            // InitialValue ke ander hum default value rakh rahe h, kyuki yahi value humne li h
            initialValue: defaultValue,
            // Height humne le liya
            height: 500,
            // user ko menubar ka option bhi de dete h. taaki menubar show ho ussko.
            menubar: true,
            // aapko plugins ka bhi option milta hai.
            //Plugins ke ander hum image bhi chahte h, link, lists etc
            // Documenttaion me jinte option mentioned tha sab paste kr diye direct.
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],

            // STEP : 07
            // aapko toolbar ka bhi option milta hai. ussko bhi saare le liye h.
            // from documentation.
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            
            // Content style bhi le lete hai , and value de dete h.
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}

        // STEP : 08 
        // editor ke andar kuch bhi change hota h, to mai onchange ko inform kr raha hu.
        onEditorChange={onChange}
        // and yaha humne self closing end diya hai.
        />
    )}
    />
     </div>
  )
}

