import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Pay = () => {
    const { paymentLinkId } = useParams();
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Fetch payment link details to get the amount
        const fetchPaymentLinkDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/payment-link/${paymentLinkId}`);
                setAmount(response.data.amount);
            } catch (error) {
                console.error('Error fetching payment link details', error);
            }
        };

        fetchPaymentLinkDetails();
    }, [paymentLinkId]);

    const handleToken = async (token) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/complete-payment`, {
                paymentLinkId,
                token: token.id
            });
            setStatus(response.data.message);
        } catch (error) {
            setStatus('Payment failed');
            console.error('Error completing payment', error);
        }
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (
        <Item style={{ display: 'flex', backgroundColor: 'rgb(230, 170, 20)', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Complete Payment</h1>
                {amount > 0 ? (
                    <StripeCheckout
                        stripeKey="pk_test_51PDchJ09iEbiKxfWdsTUhsTd9uQLmKGsVwHlPNVeGM0Mz7BwDdaGNpRhxvrddIg6PL4OyXUxHnSbhzvVRWOjDxrY00hbMvDYZ9"
                        token={handleToken}
                        name="Payment"
                        amount={amount * 100} // amount in cents
                    />
                ) : (
                    <p>Loading payment details...</p>
                )}
                {status && <p>{status}</p>}
            </div>
        </Item>
    );
};

export default Pay;
