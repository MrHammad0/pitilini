import React, { useState, useEffect, useRef } from 'react';
import Cside from './Cside';
import Cnav from './Cnav';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Land() {
  const [data, setData] = useState([]);
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

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const transactData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/successfull/collaborator/transaction/${id}`);
        setData(response.data.data);
        console.log("Your Response successful is:", response);
      } catch (error) {
        console.log("Your Error is:", error);
      }
    };
    transactData();
  }, []);

  useEffect(() => {
    const fetchingData = async () => {
      const id = localStorage.getItem("userId");
      try {
        const fetchData = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/collaboratorPersonalInfo/${id}`);
        console.log("id is:", id);
        const { firstName, lastName, email, phoneNumber, postalCode, zipCode, City, State, Country, referralCode, userType, currencyCode, balance, _id } = fetchData.data.user;

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

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const latestTransactions = data.slice(-10); // Get the latest 10 transactions
    const labels = latestTransactions.map((_, index) => `Transaction ${index + 1}`);
    const dataPoints = latestTransactions.map(txn => txn.TransactionAmount);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transaction',
            data: dataPoints,
            borderColor: 'rgb(230, 170, 20)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div style={{ marginLeft: "17%" }}>
        <Cnav />
      </div>
      <div style={{ display: 'flex' }}>
        <Cside />

        <div className="sidebarland">
          <div style={{ display: "flex" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} lg={8}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Item style={{ height: "60px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                          <b>Total Balance</b>
                          <b>{user.currencyCode} {user.balance}</b>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Item style={{ height: "60px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                          <b>Referral Code</b>
                          <b>{user.referralCode}</b>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <Item style={{ height: "60px" }}>
                        <div style={{ display: "flex", flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
                          <b>ID</b>

                          <b>{user._id}</b>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Item>
                        <canvas ref={chartRef} />
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid>
                    <Grid item xs={12}>
                      <Item style={{ overflowX: "auto", height: "450px" }}>
                        <div style={{ textAlign: "center", display: "flex", justifyContent: "space-between" }}>
                          <b>Transaction History</b>
                          <b>{data.length}</b>
                        </div>

                        <br />
                        <br />
                        {data.length > 0 ? (
                          data.map((da) => (
                            <div key={da._id} style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                              <b style={{ margin: "1%" }}>Sender Email: {da.senderEmail}</b>
                              <b style={{ margin: "1%" }}>Receiver Email: {da.ReciverEmail}</b>
                              <b style={{ margin: "1%" }}>Sender ID: {da.SenderId}</b>
                              <b style={{ margin: "1%" }}>Receiver ID: {da.ReceiverId}</b>
                              <b style={{ margin: "1%" }}>Amount: {da.TransactionCurrency} {da.TransactionAmount}</b>
                              <b style={{ margin: "1%" }}>Date: {formatDate(da.Date)}</b>
                              <hr />
                            </div>
                          ))
                        ) : (
                          <div style={{ textAlign: "center", marginTop: "20px" }}>
                            No transaction history yet
                          </div>
                        )}
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>

      </div>

    </>
  );
}
