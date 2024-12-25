import axios from 'axios';
import React , { useState }  from 'react'
import { readTokenData } from '../ReadToken';

const LoginForm = ({loggedIn, getToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logout = () => {
    setEmail('');
    setPassword('');
  }

  const findUser = () => {
    const response = axios
    .post("http://localhost:8080/user/login", {email, password},{withCredentials: true})
    .then((response) => {
      getToken(response.data.user);
      loggedIn();
    })
    .catch((error) => {
      if (error.response){
        console.log("Error : " + error.response.data)
      }else {
        console.log("Error : " + error.message)
      }
    })

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    findUser();
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('public/background11.jpg')" }}
    >
      <div className="bg-white bg-opacity-65 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm  text-gray-600 mb-2">
              ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none px-4 py-2  border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none px-4 py-2  border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white rounded-md hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;




