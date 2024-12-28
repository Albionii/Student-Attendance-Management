import React from 'react'
import Studentet from '../Component/Studentet'
import {useLocation } from 'react-router-dom'

function Start({userData}) { 

  return (
    <>
      <Studentet userData={userData}/>
    </>
  )
}

export default Start
