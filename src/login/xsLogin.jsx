import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Input } from '@mui/material';
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  const navigate = useNavigate();  // Get the navigate function
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
      <Box sx={{ flexGrow: 1 }} className='small'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <img src="./pitikilini.jpg" alt="" style={{ width: "100%", height: "500px" }} />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item style={{ background: "rgb(230, 170, 20)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "400px" }}>
              <h4>Login</h4>
              <form onSubmit={submitLoginHandler}>
                <Input placeholder='Email' type='email' name="email" value={userLogin.email} onChange={changeLoginValue} style={{ width: "40%", margin: "2%" }} />

                <Input placeholder='Password' type='passowrd' name="password" value={userLogin.password} onChange={changeLoginValue} style={{ width: "40%", margin: "2%" }} />

                <Button type='submit' style={{ margin: "2%", background: "black", color: "white", width: "40%" }}>Login</Button>

                <p>Don't have an account? <Link to={'../signup'} style={{ textDecoration: "none", color: "black" }}> Signup </Link> | <Link to={'/forget/mail'} style={{ textDecoration: "none", color: "black" }}> Forget </Link></p>
              </form>
            </Item>

          </Grid>
        </Grid>
      </Box>
    </>
  );
}
