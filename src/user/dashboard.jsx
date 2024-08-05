import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FaUser, FaCartPlus, FaDollarSign, FaTruck } from 'react-icons/fa';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './user.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(230, 170, 20)",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
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
    const fetchTransactions = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/successfull/transaction/${id}`);
        setData(response.data.data);
        console.log("Transaction data:", response.data.data);
      } catch (error) {
        console.log("Error fetching transaction data:", error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/userPersonalInfo/${id}`);
        const { firstName, lastName, email, phoneNumber, postalCode, zipCode, City, State, Country, referralCode, userType, currencyCode, balance, _id } = response.data.user;

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
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const transactions = data.slice(-10); // Get the latest 10 transactions
    const labels = transactions.map((_, index) => `Transaction ${index + 1}`);
    const dataPoints = transactions.map(txn => txn.TransactionAmount);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transaction History',
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
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }} className='sidebardashUser'>
          <Box>
            <Grid item xs={12} >
              <Navbar />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <Item className='DFItems'>
                  <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <FaUser />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>Name</span>
                      <span>{user.firstName} {user.lastName}</span>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Item className='DFItems'>
                  <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <FaCartPlus />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>Referral Code</span>
                      <span>{user.referralCode}</span>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Item className='DFItems'>
                  <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <FaDollarSign />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>Balance</span>
                      <span>{user.currencyCode} {user.balance}</span>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Item className='DFItems'>
                  <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <FaTruck />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>User Id</span>
                      <span>{user._id}</span>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Item>
                  <canvas ref={chartRef} />
                </Item>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <h3 style={{ color: 'rgb(230, 170, 20)' }}>Transaction History</h3>
                <Item>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Sender ID</StyledTableCell>
                          <StyledTableCell align="right">Receiver ID</StyledTableCell>
                          <StyledTableCell align="right">Transaction Amount</StyledTableCell>
                          <StyledTableCell align="right">Sender Email</StyledTableCell>
                          <StyledTableCell align="right">Receiver Email</StyledTableCell>
                          <StyledTableCell align="right">Date</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.length > 0 ? (
                          data.map((row) => (
                            <StyledTableRow key={row.SenderId}>
                              <StyledTableCell component="th" scope="row">
                                {row.SenderId}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.ReceiverId}</StyledTableCell>
                              <StyledTableCell align="right">{row.TransactionCurrency} {row.TransactionAmount}</StyledTableCell>
                              <StyledTableCell align="right">{row.senderEmail}</StyledTableCell>
                              <StyledTableCell align="right">{row.ReciverEmail}</StyledTableCell>
                              <StyledTableCell align="right">{formatDate(row.Date)}</StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : (
                          <StyledTableRow>
                            <StyledTableCell colSpan={6} align="center">
                              No transactions found
                            </StyledTableCell>
                          </StyledTableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
