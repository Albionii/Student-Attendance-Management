import React from 'react';

function CreateUser() {
  const handleRegisterStudent = () => {
    console.log("Register Student clicked");
    // Add logic for registering a student
  };

  const handleRegisterProfessor = () => {
    console.log("Register Professor clicked");
    // Add logic for registering a professor
  };

  return (
    <div className="flex items-center justify-center h-screen">
  <div className="text-center">
    <h1 className="text-2xl font-bold mb-6">Create User</h1>
    <div className="space-x-4">
      <button 
        onClick={handleRegisterStudent} 
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Register Student
      </button>
      <button 
        onClick={handleRegisterProfessor} 
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Register Professor
      </button>
    </div>
  </div>
</div>

  );
}

export default CreateUser;
