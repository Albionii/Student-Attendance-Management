import React, { useEffect, useState } from 'react'
import { Sidebar, Flowbite } from "flowbite-react";

import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

import {customTheme} from "../Themes"

function NavBar({userData}) {

  const handleNavBar = () => {
    
  }
    return (
        <div>
            <Flowbite  theme={customTheme}>
                <Sidebar theme={customTheme}  className='h-svh ' aria-label="Default sidebar example ">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" className="pointer-events-none">
                                Pershendetje {userData.firstName + " " + userData.lastName}
                            </Sidebar.Item>
                            {/* <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
                                Kanban
                            </Sidebar.Item> */}
                            <div onClick={handleNavBar}>
                              <Sidebar.Item href="#" icon={HiViewBoards}>
                                  Ballina
                              </Sidebar.Item>
                            </div>
                            {/* <Sidebar.Item href="#" icon={HiInbox} label="3">
                                Inbox
                            </Sidebar.Item> */}
                            <Sidebar.Item href="#" icon={HiUser}>
                                Kerko studentin
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                Logout
                            </Sidebar.Item>
                            {/* <Sidebar.Item href="/CreateUser" icon={HiArrowSmRight}>
                                regjistro test
                            </Sidebar.Item> */}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </Flowbite>
        </div>
    )
}

export default NavBar
