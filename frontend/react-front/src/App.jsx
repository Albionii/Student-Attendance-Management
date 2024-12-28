import { useEffect, useState } from 'react'
import './App.css'
import Start from './Pages/Start';
import Login from './Pages/Login';

import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

import axios from 'axios';
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Studentet from './Component/Studentet';
import AboutMe from './Pages/AboutMe';
import ErrorAlert from './error/ErrorAlert';



function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();


  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/protected", {withCredentials: true});

        if (response.data !== "No cookie") {
          setUserData(response.data);
        } else {
          // handleErrorAlert();
          navigate("/");
        }
      } catch (error) {
        navigate("/");
        console.error("Error validating token:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    validateToken();
  }, [navigate]);

  const handleUserData = (data) => {
    setUserData(data);
  };

  if (loading) {
    //? Should make a spinner in the future if I want to change from plain Loading text
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {/* <ErrorAlert type={1} show={showPopUp} closeShow={()=>setShowPopUp(false)}/> */}
      <Routes>
        <Route path="/" element={<Login sendUserData={handleUserData} />} />
        <Route
          path="/home"
          element={userData ? <Start userData={userData} /> : <div>Loading...</div>}
        />
        <Route
          path="/about"
          element={userData ? <AboutMe userData={userData} /> : <div>Loading...</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
