import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Input } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const stripePromise = loadStripe('pk_test_51PDchJ09iEbiKxfWdsTUhsTd9uQLmKGsVwHlPNVeGM0Mz7BwDdaGNpRhxvrddIg6PL4OyXUxHnSbhzvVRWOjDxrY00hbMvDYZ9'); // Replace with your Stripe Public Key

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

      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/create-subscription/netflix`, {
        email,
        paymentMethodId: paymentMethod.id,
      });



      if (response.data.error) {
        setError(response.data.error);
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
      <Box sx={{ flexGrow: 1 }} style={{ marginTop: "1%" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <div style={{ width: "70%", marginLeft: "10%" }}>
              <div style={{ display: "flex", alignItems: 'center', justifyContent: "start", marginLeft: "4%" }}>
                <img src='/pitikilini.jpg' style={{ width: "5%", height: "20px", borderRadius: "50%", margin: "1%" }} />
                <strong style={{ margin: "1%" }}>Subscribe for Netflix</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "start", marginLeft: "4%" }}>
                <h3>£ 17.00</h3>
                <span style={{ marginLeft: "1%", marginTop: "1%" }}>per month</span>
              </div>

              <br />
              <br />
              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "4%" }}>
                  <b>Subscription</b>
                  <p>Plan for Netflix monthly</p>
                </div>
                <div style={{ marginTop: '1.2%' }}>
                  <b>£ 17.00</b>
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
                  <b>£ 17.00</b>
                  <br />
                  <b>£ 0.0 </b>
                </div>
              </div>

              <br />
              <hr />
              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b style={{ marginLeft: "4%" }}>Total Due Today</b>
                <b>£ 17.00</b>
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
                  {loading ? 'Processing...' : 'Subscribe'}
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
              </form>

              <span style={{ width: "60%", margin: "4%" }}>By Confirming Your Subscription. You allow pitkilini.com to charge you for future payments in accordance with their terms you can always cancel your subscription. If you don't want the subscription click <span style={{ color: "blue" }}>Skip</span> </span>
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
