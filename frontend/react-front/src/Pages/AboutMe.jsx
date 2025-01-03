import React from 'react'
import NavBar from '../Component/NavBar'

export default function AboutMe({userData}) {
  return (
    <>
      <NavBar userData={userData}/>
      <div className='w-full flex justify-center items-center'>
        <div className='w-2/3'></div>
        <div className='w-1/3'>
          <div className='flex flex-col justify-center items-center'>
            <div className='rounded-[50%] w-[150px]'>
              <img className='rounded-[50%] w-[150px] h-[150px]' src="https://www.w3schools.com/images/w3schools_green.jpg" alt="" />
            </div>
            <p>Albion Qerreti</p>
            <p>Java Developer</p>
            <button className='rounded bg-cyan-300 text-black'>Edit</button>
          </div>
        </div>

      </div>
      
    </>
  )
}
