
import React, { useState, useEffect } from 'react';
import Adminnav from './adminnav';
import AdminSidebar from './adminSidebar';
import './admin.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

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

export default function AdminDash() {
  const [selectedRegion, setSelectedRegion] = useState('USA');
  const [users, setUsers] = useState([]);
  const [mlcEurope, setMlcEurope] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/USD/USA/ship`);
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/USD/Europe/ship`);
        setMlcEurope(response.data);
        console.log(response);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <>
      <Adminnav />
      <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <div className='userDetails'>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <label htmlFor="region-select">Select Region:</label>
            <select style={{ backgroundColor: 'rgb(230, 170, 20)', color: 'black', border: 'none', borderRadius: '15px', height: '40px' }} id="region-select" value={selectedRegion} onChange={handleRegionChange}>
              <option value="USA">USA Shipment</option>
              <option value="Europe">Europe Shipment</option>
            </select>
          </div>
          <br />
          {selectedRegion === 'USA' && (
            <div>
              <h4 style={{ textAlign: 'center' }}>USD USA Shipment Details</h4>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Last Name</StyledTableCell>
                      <StyledTableCell>Account Number</StyledTableCell>
                      <StyledTableCell>Recipient Address</StyledTableCell>
                      <StyledTableCell>Route Number</StyledTableCell>
                      <StyledTableCell>Swift Code</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <StyledTableRow key={user.id}>
                          <StyledTableCell component="th" scope="row">
                            {user.Name}
                          </StyledTableCell>
                          <StyledTableCell>{user.LastName}</StyledTableCell>
                          <StyledTableCell>{user.AccountNumber}</StyledTableCell>
                          <StyledTableCell>{user.RecipientAddress}</StyledTableCell>
                          <StyledTableCell>{user.RouteNumber}</StyledTableCell>
                          <StyledTableCell>{user.SwiftCode}</StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={6} align="center">
                          No shipping status yet
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {selectedRegion === 'Europe' && (
            <div>
              <h4 style={{ textAlign: 'center' }}>USD Europe Shipment Details</h4>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Last Name</StyledTableCell>
                      <StyledTableCell>Country</StyledTableCell>
                      <StyledTableCell>IBAN</StyledTableCell>
                      <StyledTableCell>Name Of The Bank</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mlcEurope.length > 0 ? (
                      mlcEurope.map((user) => (
                        <StyledTableRow key={user.id}>
                          <StyledTableCell component="th" scope="row">
                            {user.Name}
                          </StyledTableCell>
                          <StyledTableCell>{user.LastName}</StyledTableCell>
                          <StyledTableCell>{user.Country}</StyledTableCell>
                          <StyledTableCell>{user.IBAN}</StyledTableCell>
                          <StyledTableCell>{user.NameOfTheBank}</StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={5} align="center">
                          No shipping status yet
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
