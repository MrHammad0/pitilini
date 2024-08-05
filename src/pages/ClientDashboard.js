import React from 'react';
import KYCUpload from '../components/KYCUpload';

function client() {
  const userId = localStorage.getItem('userId'); 

  return (
      <KYCUpload userId={userId} />
  );
}

export default client;