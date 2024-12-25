import React, { useEffect, useState } from 'react'
import NavBar from '../Component/NavBar'
import Studentet from '../Component/Studentet'
import CreateUser from './CreateUser'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { readTokenData } from '../ReadToken'

function Start({userData}) {
  
  

  return (
    <div className='flex '>
        <NavBar userData={userData}/>
        <BrowserRouter>        
        <Routes> 
        <Route path='/' element={<Studentet />}></Route>
        <Route path='/CreateUser' element={<CreateUser />}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Start
