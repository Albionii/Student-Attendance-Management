import React, { useEffect, useState } from 'react'
import NavBar from '../Component/NavBar'
import Studentet from '../Component/Studentet'
import CreateUser from './CreateUser'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AboutMe from './AboutMe'

function Start({userData}) {
  
  

  return (
    <Router>        
      <div className='flex '>
        <NavBar userData={userData}/>
          <Routes> 
            <Route path='/' element={<Studentet userData={userData} />}></Route>
            <Route path='/CreateUser' element={<CreateUser />}></Route>
            <Route path='/about' element={<AboutMe />}></Route>
          </Routes>
      </div>
    </Router>
  )
}

export default Start
