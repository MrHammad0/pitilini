import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Xslogin from './xsLogin'

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();  // Get the navigate function

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const [User, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: ""
  });

  const userValue = (e) => {
    const { value, name } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/register/User`, User);
      console.log(response.data);
      toast.success("User Created Successfully. You are on login. Please click on login.");
      navigate('/login');
    } catch (error) {
      console.log("Data Rendering Error", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const changeLoginValue = (e) => {
    const { name, value } = e.target;
    setUserLogin(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/login/User`, userLogin);
      console.log("Response data:", response.data);
      toast.success("Logged in Successfully");
      localStorage.setItem("userType", response.data.foundUser.userType);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.foundUser._id);
      navigate('/dashboard');  // Redirect to dashboard or another route upon successful login
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='big'>
        <div className='backgroundL'>
          <div className={`container1 ${isActive ? 'active' : ''}`}>
            <div className="curvedShape"></div>
            <div className="curvedShape2"></div>

            <div className={`formBox Login ${!isActive ? 'show' : ''}`}>
              <h2 className='animation' style={{ "--D": "0;", "--S": "0;", color: '#fff' }}>Login</h2>
              <form onSubmit={submitLoginHandler}>
                <div className="inputbox">
                  <input type="email" required name="email" value={userLogin.email} onChange={changeLoginValue} placeholder='Email' />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='i'>
                    <path fill='white' d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                  </svg>
                </div>
                <div className="inputbox">
                  <input type="password" required name="password" value={userLogin.password} onChange={changeLoginValue} placeholder='Password' />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='i'>
                    <path fill='white' d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                  </svg>
                </div>
                <div className="inputbox">
                  <button className="btnL" type='submit' style={{ marginTop: "-0.5%" }}>Login</button>
                </div>
                <div className="regilink">
                  <p style={{ color: '#fff' }}>Don't have an account? <a href="#" className='SignupLink' onClick={handleRegisterClick}>Signup</a>  |  <Link to={'/forget/mail'}>Forget</Link></p>
                </div>
              </form>
            </div>

            <div className={`infoContent login ${!isActive ? 'show' : ''}`}>
              <h2 className='animation' style={{ "--D": "0;", "--S": "0;", color: '#fff' }}>WELCOME BACK!</h2>
              <p className='animation' style={{ "--D": "1;", "--S": "1;", color: '#fff' }}>Login to achieve Your Goals</p>
            </div>

            <div className={`formBox Register ${isActive ? 'show' : ''}`}>
              <h2 className='animation' style={{ "--D": "0;", "--S": "0;", color: '#fff' }}>Sign Up</h2>
              <form onSubmit={submitHandler}>
                <div className="inputbox">
                  <input type="text" required name="firstName" value={User.firstName} onChange={userValue} placeholder='First Name' />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='i'>
                    <path fill='white' d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                  </svg>
                </div>

                <div className="inputbox">
                  <input type="text" required name="lastName" value={User.lastName} onChange={userValue} placeholder='Last Name' />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='i'>
                    <path fill='white' d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                  </svg>
                </div>

                <div className="inputbox">
                  <input type="email" required name="email" value={User.email} onChange={userValue} placeholder='Email' />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='i'>
                    <path fill='white' d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                  </svg>
                </div>
                <div className="inputbox">
                  <input type="password" required name="password" value={User.password} onChange={userValue} placeholder='Password' />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='i'>
                    <path fill='white' d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                  </svg>
                </div>
                <div className="inputbox">
                  <input type="text" name="referralCode"
                    value={User.referralCode}
                    onChange={userValue}
                    placeholder='Referral Code' />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='i'>
                    <path fill='white' d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                  </svg>
                </div>
                <div className="inputbox">
                  <button className="btnL" type='submit' style={{ marginTop: "-1%" }}>Sign Up</button>
                </div>
                <div className="regilink">
                  <p style={{ color: '#fff' }}>Already have an account? <a href="#" className='SignInLink' onClick={handleLoginClick}>Login</a></p>
                  <p style={{ color: '#fff' }}><Link to={'/collaborator/signup'}>SignUp </Link>as Collaborator</p>
                </div>
              </form>
            </div>

            <div className={`infoContent Register ${isActive ? 'show' : ''}`}>
              <h2 className="animation" style={{ "--D": "0;", "--S": "0;", color: '#fff' }}>Welcome To Pitiklini.</h2>
              <p className='animation' style={{ "--D": "1;", "--S": "1;", color: '#fff' }}>Sign up to Achieve Your Goals</p>
            </div>
          </div>
        </div>
      </div>
      <Xslogin />
    </>
  );
}
