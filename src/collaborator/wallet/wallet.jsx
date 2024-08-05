import React, { useState, useEffect } from 'react';
import Sidebar from '../Cside';
import Navbar from '../Cnav';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BsQrCodeScan } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { FaDollarSign, FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";
import { TbTransfer } from "react-icons/tb";
import { RiRefund2Fill } from "react-icons/ri";
import { SiDatefns } from "react-icons/si";
import { AiFillMessage } from "react-icons/ai";
import { TfiMoreAlt } from "react-icons/tfi";
import './wallet.css';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Setting() { // Changed "setting" to "Setting"
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    postalCode: '',
    zipCode: '',
    City: '',
    State: '',
    Country: '',
    referralCode: '',
    userType: '',
    currencyCode: '',
    balance: '',
    _id: ''
  });

  useEffect(() => {
    const fetchingData = async () => {
      const id = localStorage.getItem("userId");
      try {
        const fetchData = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/collaboratorPersonalInfo/${id}`);
        console.log("id is:", id);
        const { firstName, lastName, email, phoneNumber, postalCode, zipCode, City, State, Country, referralCode,
          userType, currencyCode, balance, _id } = fetchData.data.user;

        setUser({
          firstName,
          lastName,
          email,
          phoneNumber,
          postalCode,
          zipCode,
          City,
          State,
          Country,
          referralCode,
          userType,
          currencyCode,
          balance,
          _id
        });
        console.log(fetchData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchingData();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className='wallet'>
          <div style={{ textAlign: "center" }}>
            <h3>WALLETS BY PITIKILINI</h3>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Item style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4>{user.currencyCode} {user.balance}</h4>
                    <span>My Balance</span>
                  </div>
                  <div>
                    <img src="atm.jpg" style={{ width: "70%", height: "40px", borderRadius: "50%" }} alt="ATM" />
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Item style={{ display: 'flex', justifyContent: "space-around", background: "rgb(230, 170, 20)", height: "70px", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <BsQrCodeScan />
                    <b>Scan</b>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <MdPayment />
                    <b>Pay</b>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <FaDollarSign />
                    <b>Income</b>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <FaCreditCard />
                    <b>Card</b>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Item>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ margin: "2%", display: "flex", alignItems: "center" }}>
                      <TbTransfer />
                      <b>Transfer</b>
                    </div>
                    <div style={{ margin: "2%", display: "flex", alignItems: "center" }}>
                      <RiRefund2Fill />
                      <b>Funds</b>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ margin: "2%", display: "flex", alignItems: "center" }}>
                      <FaCreditCard />
                      <b>Repay</b>
                    </div>
                    <div style={{ margin: "2%", display: "flex", alignItems: "center" }}>
                      <SiDatefns />
                      <b>Date</b>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ margin: "2%", display: "flex", alignItems: "center" }}>
                      <AiFillMessage />
                      <b>Message</b>
                    </div>
                    <div style={{ margin: "2%", display: "flex", alignItems: "center" }}>
                      <TfiMoreAlt />
                      <b>More</b>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <h4>Hot Topics</h4>
                <Item style={{ height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgb(230, 170, 20)" }}>
                  <b>Tell You Wealth Increase</b>
                  <FaMoneyBillAlt className='icon' />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}
