import React, { useState } from 'react';
import axios from 'axios';

const PaymentLinkForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [description, setDescription] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/create-payment-link`, {
        amount: amount * 100, // Amount in cents
        currency,
        description,
      });
      setPaymentLink(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="Currency"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Create Payment Link</button>
      </form>
      {paymentLink && (
        <div>
          <p>Payment Link:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a>
        </div>
      )}
    </div>
  );
};

export default PaymentLinkForm;
