import React, { useEffect, useState } from 'react'
import { Dropdown, Button, Table } from "flowbite-react";
 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {useAxiosInstance} from "../useAxiosInstance"
import NavBar from './NavBar';
import ErrorAlert from '../error/ErrorAlert';
import axios from 'axios';

export default function Student({userData}) {

  const [showPopUp, setShowPopUp] = useState(false);
  const [ligjeratat, setLigjeratat] = useState([])
  const [currentLigjerata, setCurrentLigjerata] = useState();
  const [closeLigjerataDisplay, setCloseLigjerataDisplay] = useState(true);
  const [attendaces, setAttendances] = useState([]);
  const [allAttendances, setAllAttendances] = useState([]);


  const handleShow = () => {
    setShowPopUp(true);
  }
  const axiosInstance = useAxiosInstance({handleShow});
  
  

  const getLigjeratatByStudent = () => {
    axios.get("")
  }

  const handleLigjerata = () => {
    axiosInstance
    .get(`http://localhost:8080/v1/student/getAllLigjeratatByStudentID/`+userData.id)
    .then((response) => {
      setLigjeratat(response.data);
      setCloseLigjerataDisplay(false);
    })
    .catch((error) => {
      console.error("Error getting Ligjeratat: " + error);
    });
  }

  const getAllAttendances = () => {
    axiosInstance
    .get(`http://localhost:8080/v1/attendance/findByStudent/`+userData.id)
    .then((response) => {
      setAttendances(response.data);
      setAllAttendances(response.data);
    })
    .catch((error) => {
      console.error("Error getting Ligjeratat: " + error);
    });
  }


  useEffect(()=>{
    getAllAttendances();
  },[])


  useEffect(() => {
      const socket = new WebSocket('ws://localhost:8080/notifications');
  
      socket.onopen = () => {
        console.log('Connected to WebSocket');
      };
  
      socket.onmessage = (event) => {
          getAllAttendances();
      };
  
      socket.onerror = (error) => {
        console.log('WebSocket error:', error);
      };
  
      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      return () => {
        if (socket.readyState === 1) { //! <-- This is important
            socket.close();
        }
    
    }}, []);

  const getTimeStayedInLecture = (entry, out) => {
    const arrivalTime = new Date(entry); 
    const departureTime = new Date(out);

    const timeSpentMilliseconds = departureTime - arrivalTime;
    if (timeSpentMilliseconds < 0) {
      return "";
    }

    const timeSpentMinutes = timeSpentMilliseconds / (1000 * 60); // Convert to minutes
    
    const hours = Math.floor(timeSpentMinutes / 60);
    const minutes = Math.floor(timeSpentMinutes % 60);

    return String(hours).padStart(2,'0') + " : " + String(minutes).padStart(2, '0');
  }

  const attendanceData = attendaces?.map((attendance, index) => ({
    id: index,
    professor: `${attendance.ligjerata.professor.user.firstName} ${attendance.ligjerata.professor.user.lastName}`,
    lecture: attendance.ligjerata.lenda.emriLendes,
    entryTime: attendance.hyrjaNeSalle,
    exitTime: attendance.daljaNgaSalla,
    duration: getTimeStayedInLecture(attendance.hyrjaNeSalle, attendance.daljaNgaSalla),
  })) || [];

  
  const filterLigjerata = (id) => {
    setAttendances(() => allAttendances.filter((a)=> a.ligjerata.id == id))
  }


  return (
    <>
      <ErrorAlert type={1} show={showPopUp} closeShow={()=>{setShowPopUp(false)}}/>
      <NavBar userData={userData}/>
        <div className='flex flex-col container'>
          <div className='flex justify-center w-full h-fit mt-2 '>
              <div className='flex gap-2'>
                <div><Button color='success' onClick={handleLigjerata} >Kerko Ligjeratat </Button></div>
              </div>
          </div>


          <div className={"fixed  inset-0 z-50 h-screen w-screen bg-black bg-opacity-30 flex justify-center items-center " + (closeLigjerataDisplay && "hidden")}>
            <div className={"bg-white p-6 rounded shadow-lg "}>
                <p onClick={() => setCloseLigjerataDisplay(d => !d)} className='text-right cursor-pointer'>X</p>
                <div className="max-h-60 overflow-auto">
                    <p onClick={()=>getAllAttendances()} className="p-3 border-b hover:bg-green-200 cursor-pointer">
                        All Ligjeratat
                    </p>
                    {ligjeratat != null && ligjeratat.map((ligjerata, index) => (
                        <p key={index} onClick={()=>{filterLigjerata(ligjerata.id);setCloseLigjerataDisplay(d => !d)}} className="p-3 border-b hover:bg-green-200 cursor-pointer">
                            {ligjerata.lenda.emriLendes}
                        </p>
                    ))}
                </div>
            </div>
          </div>
      
            <div className='w-full h-full p-2 mt-5'>
              <div className="p-d-flex p-flex-column p-ai-center p-py-4">
              <DataTable value={attendanceData} paginator rows={8} rowHover={true}>
                <Column field="lecture" header="Ligjerata" sortable align={"center"} alignHeader={"center"}></Column>
                <Column field="professor" header="Profesori" sortable  align={"center"} alignHeader={"center"}></Column>
                <Column field="entryTime" header="Data e Hyrjes" align={"center"} alignHeader={"center"}></Column>
                <Column field="exitTime" header="Data e Daljes" align={"center"} alignHeader={"center"}></Column>
                <Column field="duration" header="Qendrueshmeria" align={"center"} alignHeader={"center"}></Column>
              </DataTable>
              </div>
            </div>
          </div>
     </>
)
}
