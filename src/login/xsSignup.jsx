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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/register/User`, User);
      console.log(response.data);
      toast.success("User Created Successfully. You are on login. Please click on login.");
      navigate('/login');
    } catch (error) {
      console.log("Data Rendering Error", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
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
            <Item style={{ background: "rgb(230, 170, 20)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <h4>Sign Up</h4>
              <form onSubmit={submitHandler}>
                <Input placeholder='First Name' name="firstName" value={User.firstName} onChange={userValue} type='text' style={{ width: "40%", margin: "2%" }} />


                <Input placeholder='Last Name' type='text' style={{ width: "40%", margin: "2%" }} name="lastName" value={User.lastName} onChange={userValue} />


                <Input placeholder='Email' type='email' style={{ width: "40%", margin: "2%" }} name="email" value={User.email} onChange={userValue} />

                <Input placeholder='Password' type='Passowrd' style={{ width: "40%", margin: "2%" }} name="password" value={User.password} onChange={userValue} />

                <Input placeholder='Referral Code' type='text' style={{ width: "40%", margin: "2%" }} name="referralCode"
                  value={User.referralCode}
                  onChange={userValue} />

                <Button type='submit' style={{ margin: "2%", background: "black", color: "white", width: "40%" }} disabled={loading}>{loading ? 'Processing...' : 'Signup'}</Button>

                <p>Already have an account? <Link to={'../login'} style={{ textDecoration: "none", color: "black" }}> Login </Link></p>
                <p> <Link to={'../collaborator/signup'} style={{ textDecoration: "none", color: "black" }}>Signup</Link> as collaborator</p>
              </form>
            </Item>

          </Grid>
        </Grid>
      </Box>
    </>
  );
}
