"use client"
import { useState } from "react";

export default function AIChat (props:any) {
    const [textAreaContent, setTextAreaContent] = useState(props.content)
    const handleChange = (e:any)=>{
        const value = e.target.value;
        setTextAreaContent(value)
    }
  return (
    <textarea value={textAreaContent} className='w-full p-4 max-h-full' onChange={handleChange} />
  )
}
