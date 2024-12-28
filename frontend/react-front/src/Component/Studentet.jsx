import React, { useEffect, useState } from 'react'
import { Dropdown, Button, Table } from "flowbite-react";
 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {useAxiosInstance} from "../useAxiosInstance"
import NavBar from './NavBar';
import ErrorAlert from '../error/ErrorAlert';


function Studentet({userData}) {

  const [showPopUp, setShowPopUp] = useState(false);  
  
  const handleShow = () => {
    setShowPopUp(true);
  }
  const axiosInstance = useAxiosInstance({handleShow});

  const [attendaces, setAttendances] = useState(null);
  const [ligjeratat, setLigjeratat] = useState(null);
  const [currentAttendanceID, setCurrentAttendanceId] = useState(0);


  useEffect(()=>{
    getAllAttendances();
  },[])

  // WebSocket setup
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

  const getAttendances = (ligjerataID) => {
    axiosInstance
      .get(`http://localhost:8080/attendance/findAttendances/`+ligjerataID)
      .then((response) => {
        setAttendances(response.data);
      })
      .catch((error) => {
        console.error("Error getting Attendances: " + error);
      });
  };

  const getAllAttendances = () => {
    axiosInstance
      .get(`http://localhost:8080/attendance/findByProfessor/`+userData.id)
      .then((response) => {
        setAttendances(response.data);
      })
      .catch((error) => {
        console.error("Error getting Attendances: " + error);
      });
  };
  
  const getLigjeratatByProfessor = () => {
    axiosInstance
      .get(`http://localhost:8080/ligjerata/getByProfessor/`+ userData.id)
      .then((response) => {
        setLigjeratat(response.data);
      })
      .catch((error) => {
        console.error("Error getting ligjeratat: " + error);
      });
  };


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


    const handleStudents = (id) => {
      setCurrentAttendanceId(id);
      getAttendances(id);
      setCloseLigjerataDisplay(d=>!d);
    }
    const handleLigjerata = () => {
      getLigjeratatByProfessor();
      setCloseLigjerataDisplay(d=>!d);
    }
    
    const getAllStudents = () => {
      getAllAttendances();
      setCloseLigjerataDisplay(d=>!d);
    }

    const [closeLigjerataDisplay, setCloseLigjerataDisplay] = useState(true);

    const attendanceData = attendaces?.map((attendance, index) => ({
      id: index,
      student: `${attendance.student.user.firstName} ${attendance.student.user.lastName}`,
      lecture: attendance.ligjerata.lenda.emriLendes,
      entryTime: attendance.hyrjaNeSalle,
      exitTime: attendance.daljaNgaSalla,
      duration: getTimeStayedInLecture(attendance.hyrjaNeSalle, attendance.daljaNgaSalla),
    })) || [];



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
                        <p onClick={()=>getAllStudents()} className="p-3 border-b hover:bg-green-200 cursor-pointer">
                            All Students
                        </p>
                        {ligjeratat != null && ligjeratat.map((ligjerata, index) => (
                            <p key={index} onClick={()=>handleStudents(ligjerata.id)} className="p-3 border-b hover:bg-green-200 cursor-pointer">
                                {ligjerata.lenda.emriLendes}
                            </p>
                        ))}
                    </div>
                </div>
              </div>
          
                <div className='w-full h-full p-2 mt-5'>
                  <div className="p-d-flex p-flex-column p-ai-center p-py-4">
                  <DataTable value={attendanceData} paginator rows={8} rowHover={true}>
                    <Column field="student" header="Studenti" sortable  align={"center"} alignHeader={"center"}></Column>
                    <Column field="lecture" header="Ligjerata" sortable align={"center"} alignHeader={"center"}></Column>
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

export default Studentet
