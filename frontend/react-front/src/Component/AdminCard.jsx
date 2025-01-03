import React from 'react'
import { HiOutlineArrowCircleRight, HiOutlinePencil } from "react-icons/hi";

export default function AdminCard({text, data}) {
  return (
    <div className='w-[300px] h-[200px] bg-blue-400 flex flex-col justify-between'>
      <div className='flex justify-end m-2'><HiOutlinePencil className='cursor-pointer'/></div>
      <div>
        <p className='text-[50px]'>{data}</p>   
        <p>{text}</p>   
      </div>
      <div className='flex justify-center items-center w-full py-2 gap-2 bg-slate-200 cursor-pointer opacity-70'>
        <span className='flex justify-center items-center'>More info</span>
        <HiOutlineArrowCircleRight size={"18px"}/>
      </div>
      
    </div>
  )
}
