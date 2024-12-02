import React, { useState } from 'react'
import { Dropdown, Button, Table } from "flowbite-react";

function Studentet() {
    const LigjerataData = [
        { name: "Ligjerata" },
        { name: "Ligjerata2" }
    ];
    const Studentdat = [
        { id: "Anna Jones" },
        { id: "Isabella Perez" },
        { id: "Anna Wilson" },
        { id: "Alex Moore" },
        { id: "Daniel Jones" },
        { id: "Andrew Perez" },
        { id: "Daniel Thomas" },
        { id: "Daniel Garcia" },
        { id: "Sophia Jones" },
        { id: "Joshua Anderson" },
        { id: "Sarah Harris" },
        { id: "Sarah Perez" },
        { id: "Chris Moore" },
        { id: "Chris Martinez" },
        { id: "Joshua Jackson" },
        { id: "Joshua Martin" },
        { id: "Anna Davis" },
        { id: "John Thomas" },
        { id: "Katie Johnson" },
        { id: "Robert Hernandez" },
        { id: "Katie Lee" },
        { id: "Matthew Williams" },
        { id: "Matthew Williams" },
        { id: "David Smith" },
        { id: "Michael Davis" },
        { id: "Alex Thompson" },
        { id: "Jane Jackson" },
        { id: "Anna Brown" },
        { id: "Mia Martin" },
        { id: "Alex Taylor" },
        { id: "John White" },
        { id: "Robert Gonzalez" },
        { id: "Emma Brown" },
        { id: "Daniel Gonzalez" },
        { id: "Emily Jackson" },
        { id: "Ethan Martinez" },
        { id: "Sarah Taylor" },
        { id: "John Smith" },
        { id: "Alex Taylor" },
        { id: "Matthew Miller" },
        { id: "Daniel Miller" },
        { id: "Mia Taylor" },
        { id: "Sarah Miller" },
        { id: "Andrew Lopez" },
        { id: "Olivia Harris" },
        { id: "Jane Davis" },
        { id: "John Thomas" },
        { id: "Katie Jackson" },
        { id: "James Thompson" },
        { id: "Matthew Johnson" },
        { id: "Daniel Harris" },
        { id: "Sarah Johnson" },
        { id: "Anna Davis" },
        { id: "Laura Jones" },
        { id: "Katie Smith" },
        { id: "Chris Garcia" },
        { id: "Chris Harris" },
        { id: "Michael Davis" },
        { id: "Katie Davis" },
        { id: "Sophia Brown" },
        { id: "David Anderson" },
        { id: "Chris Brown" },
        { id: "Anna Martin" },
        { id: "Sophia Martinez" },
        { id: "Sophia Brown" },
        { id: "Joshua Hernandez" },
        { id: "Katie Martin" },
        { id: "Jane Williams" },
        { id: "Ethan Anderson" },
        { id: "Joshua Lopez" },
        { id: "Daniel Martinez" },
        { id: "Joshua Hernandez" },
        { id: "Charlotte Taylor" },
        { id: "John White" },
        { id: "Alex Miller" },
        { id: "Andrew Moore" },
        { id: "John Harris" },
        { id: "Chris Wilson" },
        { id: "Ethan Sanchez" },
        { id: "Robert Thompson" },
        { id: "Daniel Johnson" },
        { id: "Jane Taylor" },
        { id: "Laura Johnson" },
        { id: "Laura Lopez" },
        { id: "Sophia Garcia" },
        { id: "Emily Jones" },
        { id: "David Johnson" },
        { id: "James Wilson" },
        { id: "Olivia Williams" },
        { id: "Emma Johnson" },
        { id: "Andrew Jones" },
        { id: "Michael Miller" },
        { id: "Jane Perez" },
        { id: "Daniel White" },
        { id: "Jane Brown" },
        { id: "Michael Williams" },
        { id: "Emma Johnson" },
        { id: "Andrew Smith" },
        { id: "Sarah Anderson" },
        { id: "Katie Davis" }
    ];

    const [searchItem, setSearchItem] = useState('')

    const [filteredUsers, setFilteredUsers] = useState(Studentdat)

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
        const filteredItems = Studentdat.filter((user) =>
            user.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filteredItems);
    }

    const [searchStudents, setSearchStudents] = useState(false);
    const [searchLigjerata, setSearchLigjerata] = useState(false);

    const handleStudents = () => {
        setSearchStudents(!searchStudents);
    }
    const handleLigjerata = () => {
        setSearchLigjerata(!searchLigjerata);
    }

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
                            <Button color='success' onClick={handleLigjerata}>Kerko Ligjeratat </Button>
                        </div>
                        <div>
                            <Button color='success' onClick={handleStudents}>Kerko Studentet</Button>
                        </div>
                    </div>


                </div>
                <div style={{ display: searchStudents ? '' : 'none' }} className="fixed  inset-0 z-50 h-screen w-screen bg-black bg-opacity-30 flex justify-center items-center">

                    <div className="bg-white p-6 rounded shadow-lg">
                        <p onClick={handleStudents} className='text-right cursor-pointer'>X</p>
                        <input
                            type="text"
                            value={searchItem}
                            onChange={handleInputChange}
                            placeholder="Type to search"
                            className="border p-2 rounded w-full mb-4"
                        />
                        <div className="max-h-60 overflow-auto">
                            {filteredUsers.map((item, index) => (
                                <p key={index} onClick={handleStudents} className="p-2 border-b hover:bg-green-200 cursor-pointer">
                                    {item.id}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ display: searchLigjerata ? '' : 'none' }} className="fixed  inset-0 z-50 h-screen w-screen bg-black bg-opacity-30 flex justify-center items-center">

                    <div className="bg-white p-6 rounded shadow-lg">
                        <p onClick={handleLigjerata} className='text-right cursor-pointer'>X</p>
                        <div className="max-h-60 overflow-auto">
                            {LigjerataData.map((item, index) => (
                                <p key={index} onClick={handleStudents} className="p-3 border-b hover:bg-green-200 cursor-pointer">
                                    {item.name}
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
                                <Table.HeadCell>Data</Table.HeadCell>
                                <Table.HeadCell>Qendrueshmeria</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {'Albion Qerreti'}
                                    </Table.Cell>
                                    <Table.Cell>I bardhe</Table.Cell>
                                    <Table.Cell>Pejan</Table.Cell>
                                    <Table.Cell>$100,000,000</Table.Cell>

                                </Table.Row>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Blend Elezi
                                    </Table.Cell>
                                    <Table.Cell>I bardhe</Table.Cell>
                                    <Table.Cell>Gjerman</Table.Cell>
                                    <Table.Cell>$100,000,000</Table.Cell>

                                </Table.Row>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Abdusamed Beqiri</Table.Cell>
                                    <Table.Cell>I Madh</Table.Cell>
                                    <Table.Cell>Shqiptar</Table.Cell>
                                    <Table.Cell>$&infin;</Table.Cell>

                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Studentet
