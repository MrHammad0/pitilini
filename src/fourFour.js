// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go to Homepage</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa'
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: '1rem'
  },
  link: {
    fontSize: '1.2rem',
    color: 'rgb(230, 170, 20)',
    textDecoration: 'none'
  }
};

export default NotFound;
