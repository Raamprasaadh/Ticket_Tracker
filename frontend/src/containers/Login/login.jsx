import React, { useState } from 'react';
import Form from '../../components/Form/form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    try {
      // Replace 'http://localhost:5000/login' with your actual API endpoint
      const response = await axios.post('http://localhost:4000/login', {
        username,
        password
      });

      // Assuming the response includes a success status or token
      if (response.status === 200) {
        // On success, redirect to the dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle error response
      setError('Login failed. Please check your credentials and try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <Form
      title="Login"
      fields={[
        { label: 'Username', type: 'text', value: username, onChange: setUsername, required: true },
        { label: 'Password', type: 'password', value: password, onChange: setPassword, required: true },
      ]}
      submitLabel="Login"
      link="/signup"
      linkLabel="Don't have an account? Sign Up"
      onSubmit={handleSubmit}
    />
    {error && <Typography color="error">{error}</Typography>}  
    </div>
    
  );
};

export default LoginPage;
