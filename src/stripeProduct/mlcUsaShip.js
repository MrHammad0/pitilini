import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsaShipmentForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    LastName: '',
    AccountNumber: '',
    RouteNumber: '',
    RecipientAddress: '',
    SwiftCode: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [responseType, setResponseType] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/create/initial/USA/mlc/shipment`, formData);
      setResponseMessage(response.data.message);
      setResponseType('success');
      localStorage.setItem("IntialUsaShipId", response.data.response._id);
      navigate('/mlc/usa/product');

    } catch (error) {
      setResponseMessage('USA Shipment not created');
      setResponseType('error');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create USA Shipment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Account Number"
            name="AccountNumber"
            value={formData.AccountNumber}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Route Number"
            name="RouteNumber"
            value={formData.RouteNumber}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Recipient Address"
            name="RecipientAddress"
            value={formData.RecipientAddress}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Swift Code"
            name="SwiftCode"
            value={formData.SwiftCode}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" style={{ backgroundColor: 'rgb(230, 170, 20)', color: 'black' }} fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
        {responseMessage && (
          <Alert severity={responseType} sx={{ mt: 2 }}>
            {responseMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default UsaShipmentForm;
