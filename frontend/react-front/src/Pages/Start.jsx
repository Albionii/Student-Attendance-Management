import React from 'react'
import NavBar from '../Component/NavBar'
import Studentet from '../Component/Studentet'
import CreateUser from './CreateUser'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Start() {
  return (
    <div className='flex '>
        <NavBar/>
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
