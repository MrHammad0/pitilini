import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EuropeShipmentForm = () => {
  const [formData, setFormData] = useState({
    Country: '',
    Name: '',
    LastName: '',
    IBAN: '',
    NameOfTheBank: ''
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
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/create/initial/Europe/mlc/shipment`, formData);
      setResponseMessage(response.data.message);
      setResponseType('success');
      localStorage.setItem("IntialEuropeShipId", response.data.response._id);
      navigate('/mlc/Europe/product');

    } catch (error) {
      setResponseMessage('Europe Shipment not created');
      setResponseType('error');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Europe Shipment
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
            label="Country"
            name="Country"
            value={formData.Country}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="IBAN"
            name="IBAN"
            value={formData.IBAN}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name Of The Bank"
            name="NameOfTheBank"
            value={formData.NameOfTheBank}
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

export default EuropeShipmentForm;
