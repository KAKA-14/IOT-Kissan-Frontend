import React, { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import './Signup.css';
import logo from '../../assets/IOT Kisaan Logo - coloured.svg';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/api.js';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

function Signup({ user, setUser }) {
  
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);
  
  
  //SIGNUP
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorsignup, setErrorSignup] = useState(null);

  const handleInputChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    const result = await signup(register);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrorSignup(result.data.data);
        toast.error(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        toast.success("User Created Successfully");
        setTimeout(() => {
          navigate('/login');
        }, 6000);

        return;
      }
      if (result.data.status === 202) {
        toast.error(result.data.message);
        return;
      }
    }
    else {
      toast.error("Something went wrong,please try again later");
      return;
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


  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div  >
      <ToastContainer toastStyle={{ backgroundColor: "#121212", color: "wheat" }} />
      <div className='logo2' >
          <img src={logo} alt="logo2" />
        </div>
      <div className='container' >
       
        <div className="form-container ">
          <form action="#">
            <h1 className='h1'>Create Account</h1>
            <input type="text" placeholder="Name" name='name' onChange={handleInputChange} />
            {
              errorsignup?.name && <small>{errorsignup.name.msg}</small>
            }
            <input type="email" placeholder="Email" name='email' onChange={handleInputChange} />
            {
              errorsignup?.email && <small>{errorsignup.email.msg}</small>
            }
            <input
              type={type}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { handleInputChange(e); setPassword(e.target.value); }}
              autoComplete="current-password"
            />
            {
              errorsignup?.password && <small>{errorsignup.password.msg}</small>
            }
            <span className='icon' onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </span>
            <button className='btnn' onClick={handleSubmitSignup}><span>Sign Up</span></button>
          </form>
          <div className='navtologin' onClick={navigateToLogin}>
            <p>Already have an account? Login</p>
          </div>
        </div>        
      </div>
    </div>
  );
}

export default Signup;