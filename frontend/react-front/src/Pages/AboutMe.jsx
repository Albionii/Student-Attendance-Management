import React from 'react'
import NavBar from '../Component/NavBar'

export default function AboutMe({userData}) {
  return (
    <>
      <NavBar userData={userData}/>
      <p>About me</p>
    </>
  )
}
