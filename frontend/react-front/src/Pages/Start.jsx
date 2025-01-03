import React from 'react'
import Student from '../Component/Student'
import Professor from '../Component/Professor'
import Admin from '../Component/Admin'

function Start({userData}) { 
  return (
    <>
      {userData.role == "PROFESSOR" && <Professor userData={userData}/> }
      {userData.role == "STUDENT" && <Student userData={userData}/> }
      {userData.role == "ADMIN" && <Admin userData={userData}/> }

      
    </>
  )
}

export default Start
