import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import styles from "./forget.module.css";
import { Input } from '@mui/material';
import { Link } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ForgetPassword() {
  const [user, setUser] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const changeValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user.newPassword !== user.confirmPassword) {
      toast.error("New and Confirm passwords must match");
      return;
    }

    if (!user.newPassword || !user.confirmPassword) {
      toast.error("Password fields can't be empty");
      return;
    }

    const token = localStorage.getItem("forgetToken");

    if (!token) {
      toast.error("Invalid or missing token. Please try the password reset process again.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/forgetpassword/${token}`, user, {
        headers: {
          Authorization: 'No Auth',
        },
      });
      console.log('response', response);
      toast.success("Password Changed Successfully");
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <Grid container >
        <Grid item xs={12} md={6} lg={6}>
          <Item>                            <img src="../pitikilini.jpg" alt="PITIKLINI LOGO" className={styles.payswiftlogoimg} />
          </Item>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Item>
            <div className={styles.centerForgetDiv}>
              <form onSubmit={submitHandler}>
                <div>
                  <h2>Forget Password</h2>
                  <Input
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    placeholder='New Password'
                    value={user.newPassword}
                    onChange={changeValue}
                    required
                    className={styles.ForgetPasswordInput}
                  />
                </div>
                <div>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                    value={user.confirmPassword}
                    onChange={changeValue}
                    required
                    className={styles.ForgetPasswordInput}
                  />
                </div>
                <button className={styles.forgetButton} type='submit' disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
                <Link to={'/login'} style={{ color: 'black' }}>Login</Link>
              </form>
            </div>
          </Item>
        </Grid>

      </Grid>
    </>
  );
}
