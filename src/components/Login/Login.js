import React, { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/IOT Kisaan Logo.svg';
import { login } from '../../services/api.js';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

function Login({ user, setUser }) {
  const [loginn, setLoginn] = useState({
    email: '',
    password: ''
  }
  );
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);
  const handleChangeLogin = (e) => {//handlechange
    setLoginn({
      ...loginn,
      [e.target.name]: e.target.value
    });
  };
  //login
  const handleSubmit = async (e) => {//handlesubmit
    e.preventDefault();
    const result = await login(loginn);

    console.log("form", result);
    setErrors(null);
    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        toast.success("Welcome Back");
        setTimeout(() => {
          navigate('/');
        }, 6000);

        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast.error(result.data.message);
        return;
      }
      if (result.data.status === 202) {
        toast.error(result.data.message);
        return;
      }
    }
  };


  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  
  const navigateToSignup = () => {
    navigate('/signup');
  };


  return (
    <div>
      <ToastContainer toastStyle={{ backgroundColor: "#121212", color: "wheat" }} />
      <div className='logo' >
          <img src={logo} alt="logo" />
        </div>
      <div className={'container'} >
        
        <div className="form-container ">
          <form>
            <h1 className='h1'>Sign in</h1>
            <input type="email" onChange={handleChangeLogin} name='email' placeholder="Email" required />
            {
              errors?.email && <small>{errors.email.msg}</small>
            }
            <input
              type={type}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                handleChangeLogin(e);
                setPassword(e.target.value);
              }}
            />
            <span className='icon' onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </span>
            {
              errors?.password && <span>{errors.password.msg}</span>
            }
            <button className='btnn' onClick={handleSubmit}><span>Login</span></button>
          </form>
          <div className='navtologin' onClick={navigateToSignup}>
            <p>Dont have an account? Join us!!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;