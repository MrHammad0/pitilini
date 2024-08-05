import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, InputLabel } from '@mui/material';

// Full list of currency codes
const supportedCurrencies = [
  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'
];

const TransactionForm = () => {
  const [senderId, setSenderId] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [currencyCode, setCurrencyCode] = useState('USD'); // Default to USD
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const id = localStorage.getItem('userId');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/collaborator-send-money/${id}`, {
        senderId,
        receiverEmail,
        amount: parseFloat(amount),
        currencyCode,
      });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            style={{ width: "50%", margin: "2%" }}
            type="text"
            placeholder='Sender ID:'
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            style={{ width: "50%", margin: "2%" }}
            type="email"
            placeholder='Reciver Email:'
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            style={{ width: "50%", margin: "2%" }}
            type="number"
            placeholder='Amount:'
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Currency:</label>
          <select
            style={{ height: "25px", width: "30.5%", margin: "2%", background: "transparent", borderRadius: "6px" }}
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            required
          >
            {supportedCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <Button style={{ background: "black", color: "white", width: "50%", margin: "2%", borderRadius: "10px" }} type="submit">Send Money</Button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TransactionForm;
