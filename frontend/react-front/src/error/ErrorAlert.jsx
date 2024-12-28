import React from 'react'
import { useNavigate } from 'react-router-dom';
import SweetAlert2 from 'react-sweetalert2'
export default function ErrorAlert({onConfirmLogout, show, closeShow, type}) {

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
    
    </>
    
  )
}
