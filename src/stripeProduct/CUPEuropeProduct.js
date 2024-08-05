import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Input } from '@mui/material';
import { Link } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`); // Replace with your Stripe Public Key

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertIntialValue = async () => {
    try {
      const id = localStorage.getItem('IntialEuropeShipId');
      const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/create/Europe/CUP/shipment/${id}`)
      console.log("Europe shipment succcessfully created")
    } catch (error) {
      console.log("Europe shipment not created", error)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/create-CUP-subscription`, {
        email,
        paymentMethodId: paymentMethod.id,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess('Shipment placed successful!');
        convertIntialValue();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ marginTop: "1%" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <div style={{ width: "70%", marginLeft: "10%" }}>
              <div style={{ display: "flex", alignItems: 'center', justifyContent: "start", marginLeft: "4%" }}>
                <img src='/pitikilini.jpg' style={{ width: "5%", height: "20px", borderRadius: "50%", margin: "1%" }} />
                <strong style={{ margin: "1%" }}>Transferencia de CUP a tarjeta o cuentas bancarias</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "start", marginLeft: "4%" }}>
                <h3>€50.00 EUR</h3>
              </div>

              <br />
              <br />
              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "4%" }}>
                  <b>Shipping</b>
                  <p>Transferencia de CUP a tarjeta o cuentas bancarias</p>
                </div>
                <div style={{ marginTop: '1.2%' }}>
                  <b>€50.00 EUR</b>
                </div>
              </div>

              <br />
              <hr />
              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "4%" }}>
                  <b>SubTotal</b>
                  <p>Tax !</p>
                </div>
                <div style={{ marginTop: '1%' }}>
                  <b>€50.00 EUR</b>
                  <br />
                  <b>€ 0.0 </b>
                </div>
              </div>

              <br />
              <hr />
              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b style={{ marginLeft: "4%" }}>Total Due Today</b>
                <b>€50.00 EUR</b>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Item style={{ background: "rgb(230, 170, 20)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <b style={{ margin: "2%" }}>Pay with Card</b>
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={{ width: "50%", margin: "3%" }}
                />
                <div style={{ width: "50%", color: "black", marginLeft: "25%" }}>
                  <CardElement />
                </div>

                <Input placeholder='Card Holder Name (Optional)' type='text' style={{ width: "50%", margin: "3%" }} />
                <Input placeholder='Phone Number(Optional)' type='text' style={{ width: "50%", margin: "3%" }} />
                <Input placeholder='Country Region (Optional)' type='text' style={{ width: "50%", margin: "3%" }} />

                <Button type="submit" disabled={!stripe || loading} style={{ width: "50%", margin: "3%", background: "black", color: "white" }}>
                  {loading ? 'Processing...' : 'Confirm Shipping'}
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
              </form>

              <span style={{ width: "60%", margin: "4%" }}>By Confirming Your Shipping. You allow Pitikili.com to charge you for future payments in accordance with their terms you can always cancel your shipping. If you don't want the shipping click <Link to={'/dashboard'} style={{ color: "blue", textDecoration: 'none' }}>Skip</Link> </span>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <SubscriptionForm />
  </Elements>
);

export default App;


