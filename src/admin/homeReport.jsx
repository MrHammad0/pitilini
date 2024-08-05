import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";
import { FaDollarSign, FaUser } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './admin.css';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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

export default function BasicGrid() {
    const [transact, setTransact] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/full/successfull/transaction`);
                setTransact(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/users`);
                setUsers(response.data);
                console.log(response);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);
    const [dataa, setDataa] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        postalCode: '',
        zipCode: '',
        City: '',
        State: '',
        Country: '',
        balance: '',
        currencyCode: ''
    })
    useEffect(() => {
        const fetchingData = async () => {
            const id = localStorage.getItem("userId");
            try {
                const fetchData = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/AdministratorPersonalInfo/${id}`);
                console.log("id is:", id);
                const { firstName, lastName, email, phoneNumber, postalCode, zipCode, City, State, Country, balance,
                    currencyCode, _id
                } = fetchData.data.user;

                // Retrieve image URL from localStorage if available
                const localStorageImage = localStorage.getItem("profileImage");

                setDataa({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    postalCode,
                    zipCode,
                    City,
                    State,
                    Country,
                    balance,
                    currencyCode, _id

                });
                console.log("gg", fetchData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchingData();
    }, []);
    return (
        <>
            <h2 style={{ marginTop: '2%' }}>User Reports</h2>
            <Item>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={4} lg={4}>
                            <Item>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div><b>Id</b></div>
                                    <div>{dataa._id}</div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Item>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div><b>Balance</b></div>
                                    <div>{dataa.currencyCode} {dataa.balance}</div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Item>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div><b>Email</b></div>
                                    <div>{dataa.email}</div>
                                </div>
                            </Item>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Item>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Link to={'/admin/user/details'} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
                                            <span>Users</span>
                                        </Link>
                                        <span>{users.length}</span>
                                    </div>
                                    <div style={{ margin: "1%" }}>
                                        <h4><FaUser /></h4>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Item>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span>Total Transactions</span>
                                        <span>{transact.length}</span>
                                    </div>
                                    <div style={{ margin: "1%" }}>
                                        <h4><FaDollarSign /></h4>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Item>
                                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                    <h4><FaDollarSign /></h4>
                                    <Link to={'/admin/transfer'} style={{ textDecoration: "none", color: "black" }}>
                                        <b>Send Profit</b>
                                    </Link>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <br />
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sender Email</StyledTableCell>
                                <StyledTableCell>User Id</StyledTableCell>
                                <StyledTableCell>Receiver Email</StyledTableCell>
                                <StyledTableCell>Receiver Id</StyledTableCell>
                                <StyledTableCell>Amount</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transact.map((tran, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell style={{ display: 'flex', alignItems: 'center' }} component="th" scope="row">
                                        {tran.senderEmail}
                                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 512 512">
                                            <path fill="#f50a2d" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM127 281c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l71 71L232 136c0-13.3 10.7-24 24-24s24 10.7 24 24l0 182.1 71-71c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 393c-9.4 9.4-24.6 9.4-33.9 0L127 281z" />
                                        </svg>
                                    </StyledTableCell>
                                    <StyledTableCell>{tran.SenderId}</StyledTableCell>
                                    <StyledTableCell style={{ display: 'flex', alignItems: 'center' }}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 512 512">
                                                <path fill="#0ced1b" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z" />
                                            </svg>
                                        </div>
                                        <div>{tran.ReciverEmail}</div>
                                    </StyledTableCell>
                                    <StyledTableCell>{tran.ReceiverId}</StyledTableCell>
                                    <StyledTableCell>{tran.TransactionCurrency} {tran.TransactionAmount}</StyledTableCell>
                                    <StyledTableCell>{formatDate(tran.Date)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Item>
        </>
    );
}
