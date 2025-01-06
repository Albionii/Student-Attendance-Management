import React from 'react'
import { useNavigate } from 'react-router-dom';
import SweetAlert2 from 'react-sweetalert2'
export default function ErrorAlert({onConfirmLogout=null, show, closeShow, type}) {

  const navigate = useNavigate();
  return (
    <>
      {type == 0 &&
        <SweetAlert2
          show={show}
          title="Are you sure?"
          text="You will be logged out of your account."
          icon="question"
          showCancelButton={true}
          confirmButtonColor="#3085d6"
          cancelButtonColor="#d33"
          confirmButtonText="Yes, log out!"
          cancelButtonText="Cancel"
          onConfirm={() => {
            closeShow();
            onConfirmLogout();
          }}
          didClose={() => closeShow()}
        />
      }
      {type == 1 &&
        <SweetAlert2
          show={show}
          title="Session Expired"
          text="You will be redirected to the login page."
          icon="info"
          confirmButtonColor="#3085d6"
          confirmButtonText="Yes, log out!"
          onConfirm={() => {
            closeShow();
            navigate("/")
          }}
        />
      }
      {type == 2 &&
        <SweetAlert2
          show={show}
          title="Password do not match"
          text="Please type the password again."
          icon="warning"
          confirmButtonColor="#3085d6"
          confirmButtonText="Ok!"
          onConfirm={() => closeShow()}
        />
      }
      
      {type == 3 &&
        <SweetAlert2
          show={show}
          title="Changed Password Successfully"
          text="Your old password has been updated."
          icon="success"
          confirmButtonColor="#3085d6"
          confirmButtonText="Ok!"
          onConfirm={() => closeShow()}
        />
      }
      {type == 4 &&
        <SweetAlert2
          show={show}
          title="Password not secure enough"
          text="Please add at least 8 characters and numbers."
          icon="warning"
          confirmButtonColor="#3085d6"
          confirmButtonText="Ok!"
          onConfirm={() => closeShow()}
        />
      }
      
    
    </>
    
  )
}
