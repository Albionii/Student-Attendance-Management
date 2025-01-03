import React, { useState } from "react";
import NavBar from "../Component/NavBar";

import {useAxiosInstance} from "../useAxiosInstance"
import {
  HiCreditCard,
  HiKey,
  HiOutlineIdentification,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineUserCircle,
} from "react-icons/hi";

function CreateUser({ userData }) {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");


  const handleShow = () => {

  }

  const axiosInstance = useAxiosInstance({handleShow});



  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (repassword && e.target.value !== repassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleRepasswordChange = (e) => {
    setRepassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const saveUser = (formData) => {
    axiosInstance
    .post("http://localhost:8080/user/" + (role == "STUDENT"?"createStudent":"createProfessor"),formData)
    .then((response) => {

    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const uid = document.getElementById("uid").value;

    if (!firstname || !lastname || !email || !uid || !role || !password) {
      setFormError("All fields are required");
      return;
    }

    if (password !== repassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const formData = {
      "firstName" : firstname,
      "lastName": lastname,
      "email" : email,
      "uid" : uid,
      "role" : role,
      "password" : password,
    };

    console.log("Form Submitted:", formData);
    setFormError("");
    saveUser(formData);
    alert("User registered successfully!");
  };

  return (
    <>
      <NavBar userData={userData} />
      <div className="w-full flex justify-center items-center">
        <form
          className="w-[450px] shadow-2xl shadow-blue-300 p-8"
          onSubmit={handleSubmit}
        >
          {formError && (
            <p className="text-red-500 text-center text-sm mb-4">{formError}</p>
          )}

          <div className="mb-5">
            <label
              htmlFor="firstname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <div className="w-full flex gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <HiOutlineUserCircle />
                </div>
                <input
                  type="text"
                  id="firstname"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <HiOutlineUserCircle />
                </div>
                <input
                  type="text"
                  id="lastname"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <HiOutlineMail />
              </div>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="name@gmail.com"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <HiOutlineIdentification />
              </div>
              <select
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Choose a role
                </option>
                <option value="STUDENT">STUDENT</option>
                <option value="PROFESSOR">PROFESSOR</option>
              </select>
            </div>
          </div>


          {role == "STUDENT" && 
              <div className="mb-5">
              <label
                htmlFor="uid"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Card ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <HiCreditCard />
                </div>
                <input
                  type="text"
                  id="uid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  required
                />
              </div>
            </div>
          }
          

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <HiKey />
              </div>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="repassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <HiOutlineLockClosed />
              </div>
              <input
                type="password"
                id="repassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                required
                value={repassword}
                onChange={handleRepasswordChange}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register new account
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateUser;
