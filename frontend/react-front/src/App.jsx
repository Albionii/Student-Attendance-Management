import { useState } from 'react'
import './App.css'
import Start from './Pages/Start';
import Login from './Pages/Login';

import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons



function App() {
  
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  }

  const handleToken = (user) => {
    setUserData(user)
  }

  return (
    <>
      {isLoggedIn ? <Start userData={userData}/>:<Login loggedIn={handleLoggedIn} getToken={handleToken}/>}
    </>
  )
}


export default App
