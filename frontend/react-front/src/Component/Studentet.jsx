import React, { useEffect, useState } from 'react'
import { Dropdown, Button, Table } from "flowbite-react";

import axios from 'axios';

import {tableTheme} from "../Themes"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



function Studentet({userData}) {

  const [attendaces, setAttendances] = useState(null);
  const [ligjeratat, setLigjeratat] = useState(null);
  const [studentet, setStudentet] = useState(null);

  useEffect(() => {

    const getStudents = () => {
      axios
        .get(`http://localhost:8080/student/findAll`)
        .then((response) => {
          setStudentet(response.data);
        })
        .catch((error) => {
          console.error("Error getting students: " + error);
        });
    };
    console.log("userData :"  + JSON.stringify(userData))
    getAttendances();
  }, []);


  // WebSocket setup
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/notifications');

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
        getAttendances();
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
    axios
      .get(`http://localhost:8080/attendance/findAttendances/2`)
      .then((response) => {
        setAttendances(response.data);
      })
      .catch((error) => {
        console.error("Error getting Attendances: " + error);
      });
  };
  
  const getLigjeratatByProfessorID = () => {
    axios
      .get(`http://localhost:8080/ligjerata/getByProfessor/`+ userData.id)
      .then((response) => {
        setLigjeratat(response.data);
      })
      .catch((error) => {
        console.error("Error getting ligjeratat: " + error);
      });
  };

  const getStudentsByLigjerataID = (id) => {
    axios
      .get(`http://localhost:8080/student/getByLigjerata/`+2)
      .then((response) => {
        setStudentet(response.data);
      })
      .catch((error) => {
        console.error("Error getting students: " + error);
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
  

    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState('');
    
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
        const filteredItems = Studentdat.filter((user) =>
            user.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filteredItems);
    }

    const handleStudents = (id) => {
      getStudentsByLigjerataID(id);
      // getAttendances(id);
      setCloseStudentDisplay(d=>!d);
    }
    const handleLigjerata = () => {
      getLigjeratatByProfessorID();
      setCloseLigjerataDisplay(d=>!d);
    }

    const [closeStudentDisplay, setCloseStudentDisplay] = useState(true);
    const [closeLigjerataDisplay, setCloseLigjerataDisplay] = useState(true);

    return (
        <>
            <div className='flex flex-col container'>
                <div className='flex justify-center w-full h-fit mt-2 '>
                  {/* Buttons Above the table */}
                    <div className='flex gap-2'>
                        <div>
                            <Button color='success' onClick={handleLigjerata} >Kerko Ligjeratat </Button>
                        </div>
                        <div>
                            <Button color='success' onClick={handleStudents}>Kerko Studentet</Button>
                        </div>
                    </div>
                </div>


                <div className={"fixed inset-0 z-50 h-screen w-screen bg-black bg-opacity-30 flex justify-center items-center " + (closeStudentDisplay && "hidden")}>
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p onClick={() => setCloseStudentDisplay(d => !d)} className='text-right cursor-pointer'>X</p>
                        <input
                            type="text"
                            value={searchItem}
                            onChange={handleInputChange}
                            placeholder="Type to search"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <div className="max-h-60 overflow-auto">
                          {studentet != null && studentet.map((student, index) => (
                            <p key={index} className="p-2 border-b hover:bg-green-200 cursor-pointer">{student.firstName}</p>
                          ))}
                            {/* {filteredUsers.map((item, index) => (
                                <p key={index} onClick={handleStudents} className="p-2 border-b hover:bg-green-200 cursor-pointer">
                                    {item.id}
                                </p>
                            ))} */}
                        </div>
                    </div>
                </div>
                <div className={"fixed  inset-0 z-50 h-screen w-screen bg-black bg-opacity-30 flex justify-center items-center " + (closeLigjerataDisplay && "hidden")}>

                    <div className={"bg-white p-6 rounded shadow-lg "}>
                        <p onClick={() => setCloseLigjerataDisplay(d => !d)} className='text-right cursor-pointer'>X</p>
                        <div className="max-h-60 overflow-auto">
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
                    <DataTable value={studentet} paginator rows={5} style={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                      }}>
                      <Column field="id" header="ID" sortable></Column>
                      <Column field="name" header="Name" sortable></Column>
                      <Column field="status" header="Attendance Status" sortable></Column>
                    </DataTable>
                  </div>

                    


                    {/* <div className="overflow-x-auto">
                        <Table theme={tableTheme} hoverable>
                            <Table.Head>
                                <Table.HeadCell>Studenti</Table.HeadCell>
                                <Table.HeadCell>Ligjerata</Table.HeadCell>
                                <Table.HeadCell>Data e Hyrjes</Table.HeadCell>
                                <Table.HeadCell>Data e Daljes</Table.HeadCell>
                                <Table.HeadCell>Qendrueshmeria</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                              {attendaces != null && attendaces.map((attendace, index) => 
                                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{attendace.student.user.firstName + " " + attendace.student.user.lastName}</Table.Cell>
                                    <Table.Cell>{attendace.ligjerata.lenda.emriLendes}</Table.Cell>
                                    <Table.Cell>{attendace.hyrjaNeSalle}</Table.Cell>
                                    <Table.Cell>{attendace.daljaNgaSalla}</Table.Cell>
                                    <Table.Cell>{getTimeStayedInLecture(attendace.hyrjaNeSalle, attendace.daljaNgaSalla)}</Table.Cell>
                                  </Table.Row>  
                                )}
                            </Table.Body>
                        </Table>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Studentet
