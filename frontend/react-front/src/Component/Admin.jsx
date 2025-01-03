import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import AdminCard from './AdminCard';
import {useAxiosInstance} from "../useAxiosInstance"

export default function Admin({userData}) {

  const [numberOfProfessors, setNumberOfProfessors] = useState(0);
  const [numberOfLigjerata, setNumberOfLigjerata] = useState(0);
  const [numberOfStudents, setNumberOfStudents] = useState(0);

  
  const handleShow = () => {
    
  }
  
  const axiosInstance = useAxiosInstance({handleShow});

  useEffect(()=>{
    const getNumberOfProfessors = () => {
      axiosInstance
          .get("http://localhost:8080/professors/count")
          .then((response) => {
            setNumberOfProfessors(response.data)
          })
    }

    const getNumberOfLigjerata = () => {
      axiosInstance
        .get("http://localhost:8080/ligjerata/count")
        .then((response) => {
          setNumberOfLigjerata(response.data)
        })
    }

    const getNumberOfStudents = () => {
      axiosInstance
        .get("http://localhost:8080/student/count")
        .then((response) => {
          setNumberOfStudents(response.data)
        })
    }

    getNumberOfProfessors();
    getNumberOfStudents();
    getNumberOfLigjerata();

  },[])


  return (
    <>
      <NavBar userData={userData}/> 
      <div className='w-full flex flex-wrap justify-start gap-7 m-5'>
        <AdminCard text={"Number of Professors"} data={numberOfProfessors}/>
        <AdminCard text={"Number of Students"} data={numberOfStudents}/>
        <AdminCard text={"Number of Ligjerata"} data={numberOfLigjerata}/>
      </div>
    </>
  )
}
