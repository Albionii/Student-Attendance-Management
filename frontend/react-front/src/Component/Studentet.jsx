import React, { useEffect, useState } from 'react'
import { Dropdown, Button, Table } from "flowbite-react";

import axios from 'axios';

function Studentet() {

  const [attendaces, setAttendances] = useState(null);
  const [ligjeratat, setLigjeratat] = useState(null);
  const [studentet, setStudentet] = useState(null);

  useEffect(() => {
    const getAttendances = () => {
      axios
        .get(`http://localhost:8080/attendance/findAttendances/2`)
        .then((response) => {
          setAttendances(response.data);
        })
        .catch((error) => {
          console.error("Error getting Attendances: " + error);
        });
    };

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
  
    getAttendances();
  }, []);
  
  const getLigjeratatByProfessorID = () => {
    axios
      .get(`http://localhost:8080/ligjerata/getByProfessor/`+1)
      .then((response) => {
        setLigjeratat(response.data);
      })
      .catch((error) => {
        console.error("Error getting ligjeratat: " + error);
      });
  };

  const getStudentsByLigjerataID = (id) => {
    console.log("id : " + 2);
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
      setCloseStudentDisplay(d=>!d);
    }
    const handleLigjerata = () => {
      getLigjeratatByProfessorID();
      setCloseLigjerataDisplay(d=>!d);
    }

    const [closeStudentDisplay, setCloseStudentDisplay] = useState(true);
    const [closeLigjerataDisplay, setCloseLigjerataDisplay] = useState(true);

    

    

    const tableTheme = 
        {
            "root": {
                "base": "w-full text-left text-sm text-gray-500 dark:text-gray-400",
                "shadow": "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
                "wrapper": "relative"
            },
            "body": {
                "base": "group/body",
                "cell": {
                    "base": "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg"
                }
            },
            "head": {
                "base": "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
                "cell": {
                    "base": "bg-green-100 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
                }
            },
            "row": {
                "base": "group/row",
                "hovered": "hover:bg-green-100 dark:hover:bg-gray-600",
                "striped": "odd:bg-white even:bg-gray-600 odd:dark:bg-gray-800 even:dark:bg-gray-700"
            }
        };

    return (
        <>
            <div className='flex flex-col container'>
                <div className='flex justify-center w-full h-fit mt-2 '>
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
                    <div className="overflow-x-auto">
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
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{attendace.student.firstName}</Table.Cell>
                                    <Table.Cell>{attendace.ligjerata.lenda.emriLendes}</Table.Cell>
                                    <Table.Cell>{attendace.hyrjaNeSalle}</Table.Cell>
                                    <Table.Cell>{attendace.daljaNgaSalla}</Table.Cell>
                                    <Table.Cell>{getTimeStayedInLecture(attendace.hyrjaNeSalle, attendace.daljaNgaSalla)}</Table.Cell>
                                  </Table.Row>  
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Studentet
