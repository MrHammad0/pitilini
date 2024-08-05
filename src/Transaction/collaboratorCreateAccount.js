import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/collaborator-add-funds`, {
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
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/collaborator-capture-funds`, {
        orderId,
        userId: '66a277733cc2bbe4fe24ba6a', // Replace with actual user ID
        newCurrencyCode: currencyCode, // Send the selected currency code
      });
      if (response.data.error && response.data.error === 'Order already captured') {
        setMessage('Order already captured. Cannot capture again.');
      } else {
        setMessage(`Success: ${response.data.status}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>Add Funds</h2>
      <form onSubmit={handleAddFunds}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Currency Code:</label>
          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            required
          >
            {paypalSupportedCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Funds</button>
      </form>
      {approvalLink && (
        <div>
          <p>Please approve the payment by clicking the link below:</p>
          <a href={approvalLink} target="_blank" rel="noopener noreferrer">Approve Payment</a>
        </div>
      )}
      {orderId && (
        <div>
          <h2>Capture Funds</h2>
          <form onSubmit={handleCaptureFunds}>
            <div>
              <label>Order ID:</label>
              <input
                type="text"
                value={orderId}
                readOnly
              />
            </div>
            <button type="submit">Capture Funds</button>
          </form>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddFunds;
