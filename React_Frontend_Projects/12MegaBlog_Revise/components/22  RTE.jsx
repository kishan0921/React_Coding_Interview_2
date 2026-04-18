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
// mai name, control, label, defaultValue pass krenge
export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    // agar label hai then && ke baad jo likha h wo display krwa denge
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}


    // ab baat aati hai, controller ki, controller humne self closing liya h
    // documentation dekho same syntax hai jo yaaha use kiye h
    // DOC - https://react-hook-form.com/get-started#IntegratingControlledInputs

    <Controller
    // NAME JO uppar pass kr rahe wo de rahe , nahi to content name jo jaayega.
    name={name || "content"}
    // control jo uppar pass kr rahe wo de rahe,
    // and control jo hai wo parent element dega
    // means jo bhi parent element call krega, ussko as it is pass kr denge
    // taaki wo pura control le skke
    control={control}
    
    // ab sikhte hai, element kaise rander krte h
    // sabse pehle ek callback daal dete hai {() => ()}
    // ab hum {} curely bracket lete h, then isske ander field hoga 
    // and field ke uppar tracking laagayenge,like onChange
    // means iss fields ke andar kuch bhi change hota h, to mujhe inform kr dena render ki tarah
    render={({field: {onChange}}) => (
       // an jo bhi element aapko render krenge wo yaha likh lo
        // ye editor mai le liya hu - copy paste krke
        <Editor
        initialValue={defaultValue}
        init={{ 
            initialValue: defaultValue,
            height: 500,

            // user ko menubar ka option bhi de dete h
            menubar: true,
            // aapko plugins ka bhi option milta hai
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

            // aapko toolbar ka bhi option milta hai.
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}

        // editor ke andar kuch bhi change hota h, to mai onchange ko inform kr raha hu.
        onEditorChange={onChange}
        // and yaha humne self closing kr diya h
        />
    )}
    />
     </div>
  )
}

