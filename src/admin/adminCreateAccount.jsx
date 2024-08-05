import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './adminSidebar';
import Navbar from './adminnav';
import { Button, Input, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// List of PayPal-supported currencies
const paypalSupportedCurrencies = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound Sterling' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'CZK', name: 'Czech Koruna' },
  { code: 'DKK', name: 'Danish Krone' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'HUF', name: 'Hungarian Forint' },
  { code: 'ILS', name: 'Israeli New Shekel' },
  { code: 'MYR', name: 'Malaysian Ringgit' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'TWD', name: 'New Taiwan Dollar' },
  { code: 'NZD', name: 'New Zealand Dollar' },
  { code: 'NOK', name: 'Norwegian Krone' },
  { code: 'PHP', name: 'Philippine Peso' },
  { code: 'PLN', name: 'Polish Zloty' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'THB', name: 'Thai Baht' },
];


const AddFunds = () => {
  const [amount, setAmount] = useState('');
  const [currencyCode, setCurrencyCode] = useState('USD'); // Default currency code
  const [orderId, setOrderId] = useState('');
  const [approvalLink, setApprovalLink] = useState('');
  const [message, setMessage] = useState('');

  const handleAddFunds = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/administrator-add-funds`, {
        amount,
        currency_code: currencyCode,
      });
      setOrderId(response.data.id);
      const approvalLink = response.data.links.find(link => link.rel === 'approve').href;
      setApprovalLink(approvalLink);
      setMessage('Please approve the payment using the link provided.');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleCaptureFunds = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/administrator-capture-funds`, {
        orderId,
        userId: '66a2202529a2ef743ef4797b', // Replace with actual user ID
        newCurrencyCode: currencyCode, // Send the selected currency code
      });
      if (response.data.error && response.data.error === 'Order already captured') {
        setMessage('Order already captured. Cannot capture again.');
      } else {
        setMessage(`Success: ${response.data.status}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error.message || error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className='userDetails'>
          <Box>
            <Grid container>
              <Grid item xs={12} md={6} lg={6}>
                <Item style={{ background: "rgb(230, 170, 20)", borderRadius: "5px", height: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ margin: "2%" }}>
                    <b>Add Funds</b>
                  </div>
                  <form onSubmit={handleAddFunds}>
                    <div>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='Amount:'
                        required
                        style={{ margin: "2%" }}
                      />
                    </div>
                    <div>
                      <InputLabel style={{ margin: "2%" }}>Currency Code:</InputLabel>
                      <select
                        value={currencyCode}
                        onChange={(e) => setCurrencyCode(e.target.value)}
                        required
                        style={{ background: "transparent", borderRadius: "5px", border: "0.1px solid black", margin: "2%" }}
                      >
                        {paypalSupportedCurrencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.name} ({currency.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button type="submit" style={{ background: "black", color: "white", margin: "2%" }}>Add Funds</Button>
                  </form>
                </Item>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Item style={{ borderRadius: "5px", height: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {approvalLink && (
                    <div >
                      <p style={{ margin: "2%" }}>Please approve the payment by clicking the link below:</p>
                      <a href={approvalLink} target="_blank" rel="noopener noreferrer" style={{ margin: "2%" }}>Approve Payment</a>
                    </div>
                  )}
                  {orderId && (
                    <div>
                      <b style={{ margin: "2%" }}>Capture Funds</b>
                      <form onSubmit={handleCaptureFunds}>
                        <div>
                          <InputLabel style={{ margin: "2%" }}>Order ID:</InputLabel>
                          <Input
                            type="text"
                            value={orderId}
                            readOnly
                            style={{ margin: "2%" }}
                          />
                        </div>
                        <Button type="submit" style={{ margin: "2%", background: "black", color: "white" }}>Capture Funds</Button>
                      </form>
                    </div>
                  )}
                  {message && <p>{message}</p>}
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddFunds;
