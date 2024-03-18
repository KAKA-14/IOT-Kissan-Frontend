import React, { useEffect, useState } from 'react';

import './Signup.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/IOT Kisaan Logo.svg';
// import { login, signup } from '../../services/api.js';
import "react-toastify/dist/ReactToastify.css";

function Hello({ user, setUser }) {
  

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);
  

  
  // const navigateToSignup = () => {
  //   navigate('/signup');
  // };
//   const navigateToLogin = () => {
//     navigate('/login');
//   };

  return (
    <div>
      <div className='logo' >
          <img src={logo} alt="logo" />
        </div>
      <div className={'container'} >
        
        <div className="form-container ">
          <form className='lk'>
            <h1 className='h1'>Hey there!</h1>
            <button className='btnnn' ><span>Login</span></button>
          </form>
          <div className='navtologin'>
            <p>Dont have an account? Join us!!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hello;