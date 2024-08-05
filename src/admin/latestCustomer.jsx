import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import './admin.css'
import { FaDollarSign, FaUser } from 'react-icons/fa';
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {

    const [transact, setTransact] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/full/successfull/collaborator/transaction`);
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

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

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
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/collaborator`);
                setUsers(response.data);
                console.log(response);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);
    return (
        <>
            <Card  >
                <CardContent>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item style={{ background: "rgb(230, 170, 20)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Link to={'/admin/collaborator/details'} style={{ textDecoration: "none", cursor: "pointer", color: "black" }}>
                                                <span>Collaborators</span>
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
                                <Item style={{ background: "rgb(230, 170, 20)" }}>
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


                        </Grid>
                    </Box>
                    <br />
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Sender Email</StyledTableCell>
                                    <StyledTableCell>Sender Id</StyledTableCell>
                                    <StyledTableCell>Reciver Email</StyledTableCell>
                                    <StyledTableCell>Receiver Id </StyledTableCell>
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
                </CardContent>
            </Card>


        </>
    );
}
