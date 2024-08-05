import React from 'react'
import Adminnav from './adminnav'
import AdminSidebar from './adminSidebar'
import './admin.css'
import { Box, styled } from '@mui/system';
import { Button } from '@mui/base/Button';
import Grid from '@mui/material/Grid';
import { Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
const ButtonRoot = styled(Button)(({ theme }) => ({
    // Custom button styles
}));

const SvgButton = styled(ButtonRoot)({
    // SVG-based button styles
});

export default function AdminChangePassword() {
    const [user, setUser] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const changeValue = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/change/Administrator/password/${userId}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Password Change Successful", response.data);
            toast.success("Password Change Successful");
        } catch (error) {
            console.error("Password Change Failed", error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }
    return (
        <>
            <Adminnav />
            <div style={{ display: 'flex' }}>
                <AdminSidebar />
                <div className='sidebaradminDash'>
                    <div >
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container>
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className='flexinfo'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={19} viewBox="0 0 448 512">
                                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                            </svg>
                                        </div>
                                        <div className='space'>
                                            <h4>
                                                <Link to="/admin/Setting" style={{ color: "black", textDecoration: "none" }}>
                                                    Personal Info
                                                </Link>
                                            </h4>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className='flexinfo'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={19} viewBox="0 0 448 512">
                                                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                            </svg>
                                        </div>
                                        <div className='space'>
                                            <Link to="/admin/change/password" style={{ color: "black", textDecoration: "none" }}>
                                                <h4>Personal and Security</h4>
                                            </Link>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                        <hr />
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container>
                                {/* Your grid items */}
                            </Grid>
                        </Box>
                        <div style={{ textAlign: "center" }}>
                            <h2>Change Password</h2>
                            <form onSubmit={submitHandler}>
                                <Input placeholder="Email" name="email" value={user.email} onChange={changeValue} style={{ width: "50%", margin: "2%" }} />
                                <Input type="password" name="oldPassword" value={user.oldPassword} onChange={changeValue} placeholder="Old Password" style={{ width: "50%", margin: "2%" }} />
                                <Input type="password" placeholder="New Password" name="newPassword" value={user.newPassword} onChange={changeValue} style={{ width: "50%", margin: "2%" }} />
                                <Input type="password" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={changeValue} style={{ width: "50%", margin: "2%" }} />
                                <div style={{ marginTop: "4%" }}>
                                    <SvgButton className='btnSubmit' type="submit">Submit</SvgButton>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
