import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {
  HiMenu, 
  HiLogout, 
  HiInformationCircle, 
  HiOutlinePresentationChartBar, 
  HiOutlineHome
 } from "react-icons/hi";
import {useNavigate } from 'react-router-dom';
import axios from 'axios';


function NavBar({userData}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();
  const handleNavBar = () => {
    setIsCollapsed((c) => !c);
  }

  const handleLogOut = () => {
    axios.post("")
    .then()
  }

  const navigateTo = (path) => {
    navigate(path);
  }
    return (
        <div className="flex h-screen">
          
          <Sidebar
            collapsed={isCollapsed}
            className=" text-white transition-all duration-300"
            backgroundColor='black'
            style={{ height: "100vh" }}
          >
            <Menu  
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  if (level === 0) {
                    return {
                      color: disabled ? "#eee" : "#cbd5e1", // Default text color
                      backgroundColor: active ? "#1a2037" : undefined, // Active state color
                      "&:hover": {
                        backgroundColor: "#3c4257", // Hover background color
                        color: "white", // Hover text color
                        fontWeight: "bold", // Hover font weight
                        borderRadius: "8px", // Hover border radius
                      },
                    };
                  }
                },
              }}
              iconShape="circle">
              <div
                className="flex justify-center items-center cursor-pointer py-5 text-center transition-all"
                onClick={handleNavBar}
              >
              <MenuItem className='text-lg' icon={isCollapsed && <HiMenu className="text-gray-400 hover:text-white" />}>
                {isCollapsed ? "" : "Pershendetje"}<br/>{isCollapsed?"":userData.firstName + " " + userData.lastName}
                
              </MenuItem>
              </div>


              <div onClick={()=>navigateTo("/")}>
                <MenuItem className='hover:text-red-950' icon={<HiOutlineHome />}>
                  Ballina
                </MenuItem>
              </div>

              <div onClick={()=>navigateTo("/statistics")}>
                <MenuItem className='hover:text-red-950' icon={<HiOutlinePresentationChartBar />}>
                  Statistics
                </MenuItem>
              </div>

              <div onClick={()=>navigateTo("/about")}>
                <MenuItem className='hover:text-red-950' icon={<HiInformationCircle />}>
                  About Me
                </MenuItem>
              </div>
              
              <div onClick={handleLogOut}>
                <MenuItem icon={<HiLogout />} >
                  Logout
                </MenuItem>
              </div>
            </Menu>
          </Sidebar>
        </div>
    )
}

export default NavBar
0