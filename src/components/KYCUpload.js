import React, { useState } from 'react';
import axios from 'axios';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../landingPage/footer.css'; // Ensure this path is correct

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const KYCUpload = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const [query, setQuery] = useState({
    email: "",
    queries: ""
  });

  const changeValue = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/query/send`, query);
      console.log('Your Query sending Response is :', response);
      setMessage('Your Query Sent Successfully');
      setMessageType('success');
    } catch (error) {
      console.log('Your Query sending Error is :', error);
      setMessage('Email and Query are Required');
      setMessageType('error');
    }
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (files.length === 0) {
      setMessage('Please select files to upload.');
      setMessageType('error');
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('documents', file);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/kyc/upload/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setMessageType('success');

      // Call handleSubmit only if upload is successful
      await handleSubmit(); // Ensure handleSubmit is called after the upload is successful

    } catch (error) {
      console.error('Error uploading documents:', error);
      setMessage('Error uploading documents');
      setMessageType('error');
    }
  };

  return (
    <>
      <div>
        <h1>COMMENTS</h1>
        <form onSubmit={handleUpload}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              style={{ margin: "2%", background: "black", color: "white" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
            </Button>
            <Input
              placeholder='Enter Your Email'
              type='email'
              name='email'
              value={query.email}
              onChange={changeValue}
              style={{ margin: "2%" }}
            />
            <Input
              placeholder='Enter Your Comment'
              type='text'
              name='queries'
              value={query.queries}
              onChange={changeValue}
              style={{ margin: "2%" }}
            />
            <Button type='submit' style={{ margin: "2%", background: "black", color: "white" }}>
              Submit
            </Button>
          </div>
        </form>
        {message && (
          <p style={{ color: messageType === 'success' ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default KYCUpload;
