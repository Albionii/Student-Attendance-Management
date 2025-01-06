import React, { useState } from 'react'
import NavBar from '../Component/NavBar'
import {useAxiosInstance} from "../useAxiosInstance"
import ErrorAlert from '../error/ErrorAlert';


export default function AboutMe({userData}) {
  const axiosInstance = useAxiosInstance({});

  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [show, setShow] = useState(false);
  const [type, setType] = useState(2);
  const [email, setEmail] = useState("");

  const closeShow = () => {
    setShow(false);
  }
  
  const checkIfPasswordSame = (e) => {
    e.preventDefault();
  
    if (!newPassword || !rePassword) {
      setType(4);
      setShow(true);
      return;
    }
  
    //* Password security check: At least 8 characters and at least one number
    const passwordStrengthRegex = /^(?=.*\d).{8,}$/;
  
    if (!passwordStrengthRegex.test(newPassword)) {
      setType(4); 
      setShow(true);
      return;
    }
  
    if (newPassword === rePassword) {
      setType(3); 
      setShow(true);
      updatePassword();
    } else {
      setType(2);
      setShow(true);
    }
  };

  const formData = {
    email:email == ""?userData.email:email,
    password:newPassword
  }
  
  const updatePassword = () => {
    axiosInstance.put("http://localhost:8080/user/pass", formData)
    .then((response)=>{
      console.log("RESPONSE : " + response.data)
      console.log("RESPONSE : " + JSON.stringify(response.data))
    }
  )
  }

  




  return (
    <>
      <ErrorAlert show={show} type={type} closeShow={() => closeShow()}/>
      <NavBar userData={userData}/>
      <div className='w-full flex justify-center items-center mx-2 gap-5 md:flex-row flex-col'>
        <div className='md:w-1/2 w-4/5'>
          <form
            className="w-full shadow-2xl p-8"
            onSubmit={(e) => checkIfPasswordSame(e)}
          >
          
            <div className="mb-5">
                <p className='text-xl'><strong>General Information</strong></p>
                <br/>
              <div className="w-full flex gap-2">
                <div className='w-full'>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                  <input
                    type="text"
                    id="firstname"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={userData.firstName}
                    readOnly
                  />
                </div>
                <div className='w-full'>

                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                  <input
                    type="text"
                    id="lastname"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={userData.lastName}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="w-full flex gap-2">
                <div className='w-full'>
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={{}}
                    readOnly
                  />
                </div>
                <div className='w-full'>

                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                  <select 
                    name="gender" 
                    id="gender"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={""}
                  >
                    <option value="" disabled selected>Gender</option>
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
                    <option value="notspecified">Not Specified</option>

                  </select>
                
                </div>
              </div>

              <br />
              <p className='text-xl'><strong>Password</strong></p>
              <br/>

              <div className="w-full flex gap-2">
                <div className='w-full'>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                  />
                </div>
                <div className='w-full'>

                <label
                  htmlFor="repassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rewrite Password
                </label>
                  <input
                    type="password"
                    id="repassord"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={rePassword}
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Change your password
            </button>
          </form>
        </div>


        <div className='md:w-1/2 w-4/5 shadow-2xl flex flex-col items-center rounded-xl overflow-hidden bg-white'>
          {/* Background Image */}
          <div className='w-full h-[200px] bg-gray-200'>
            <img
              src="https://picsum.photos/800"
              alt="Background"
              className='w-full h-full object-cover'
            />
          </div>

          {/* Profile Picture */}
          <div className='relative -mt-20'>
            <div className='rounded-[50%] w-[150px] h-[150px] border-4 border-white'>
              <img
                className='rounded-[50%] w-[150px] h-[150px] object-cover'
                src={"https://picsum.photos/200"}
                alt="Profile"
              />
            </div>
          </div>

          {/* Profile Information */}
          <div className='flex flex-col justify-center items-center gap-4 p-5'>
            <div className='text-center'>
              <p className='text-xl font-bold'>{userData.firstName + " " + userData.lastName}</p>
              <p className='text-sm text-gray-500'>
                <em>
                  {userData.role === "STUDENT"
                    ? "Student at the University of Business and Technology"
                    : "Professor at the University of Business and Technology"}
                </em>
              </p>
            </div>
            <button className='rounded bg-blue-700 hover:bg-blue-800 text-white px-4 py-2'>
              Edit
            </button>
          </div>
        </div>


      </div>
      
    </>
  )
}
