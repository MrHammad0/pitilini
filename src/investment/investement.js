import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Input } from '@mui/material';
import Sidebar from '../user/sidebar';
import Navbar from '../user/navbar';
import './inves.css'
import { Link } from 'react-router-dom';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const cardElementOptions = {
  style: {
    base: {
      color: 'black',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: 'black',
      },
      padding: '10px 12px',
      border: '1px solid rgb(230, 170, 20)',
      borderRadius: '4px',
      backgroundColor: 'rgb(230, 170, 20)',
    },
    invalid: {
      color: 'black',
      iconColor: 'black',
    },
  },
};

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/create-subscription-invetement`, {
        email,
        paymentMethodId: paymentMethod.id,
      });

      if (response.data.error) {
        setError(response.data.error.message);
      } else {
        setSuccess('Subscription successful!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className='invest'>
          <Box sx={{ flexGrow: 1 }} style={{ marginTop: "1%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={6}>
                <div style={{ width: "70%", marginLeft: "10%" }}>
                  <div style={{ display: "flex", alignItems: 'center', justifyContent: "start", marginLeft: "4%" }}>
                    <img src='/pitikilini.jpg' style={{ width: "25px", height: "20px", borderRadius: "50%", margin: "1%" }} />
                    <strong style={{ margin: "1%" }}>Subscribe to Pitikili</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "start", marginLeft: "4%" }}>
                    <h3>£ 300.00</h3>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "4%" }}>
                      <b>Investment Plan</b>
                      <p>Plan For investment Purpose</p>
                    </div>
                    <div style={{ marginTop: '1.2%' }}>
                      <b>£ 300.00</b>
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
                      <b>£ 300.00</b>
                      <br />
                      <b>£ 0.0 </b>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <br />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <b style={{ marginLeft: "4%" }}>Total Due Today</b>
                    <b>£ 300.00</b>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Item style={{ background: "rgb(230, 170, 20)", display: "flex", flexDirection: "column", alignItems: "center", height: '100%' }}>
                  <b style={{ margin: "2%", marginTop: '5%' }}>Pay with Card</b>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', marginLeft: '4%', marginTop: '5%', width: '100%' }}>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      style={{ marginBottom: '20px', width: '95%', height: '50px' }}
                    />
                    <div style={{ marginBottom: '20px', width: '95%', padding: '10px 12px', border: '1px solid rgb(230, 170, 20)', borderRadius: '4px', backgroundColor: 'rgb(230, 170, 20)' }}>
                      <CardElement options={cardElementOptions} />
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!stripe || loading}
                      style={{ margin: "3%", background: "black", color: "white", marginBottom: '20px', width: '95%' }}
                    >
                      {loading ? 'Processing...' : 'Subscribe'}
                    </Button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>{success}</div>}
                  </form>
                  <span style={{ width: "60%", margin: "4%", marginTop: '5%' }}>By Confirming Your Subscription. You allow Pitikili.com to charge you for future payments in accordance with their terms you can always cancel your subscription. If you don't want the subscription click <Link to={'/dashboard'} style={{ color: "black" }}>skip</Link>.</span>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

const SubscriptionFormWrapper = () => (
  <Elements stripe={stripePromise}>
    <SubscriptionForm />
  </Elements>
);

export default SubscriptionFormWrapper;
