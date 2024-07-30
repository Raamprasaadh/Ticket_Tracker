import React, { useState } from 'react';
import axios from 'axios';
import Form from '../../components/Form/form';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Basic client-side validation
    if (password !== confirmPassword) {
      // setError('Passwords do not match');
      return;
    }

    try {
      // Replace 'http://localhost:4000/signup' with your actual API endpoint
      const response = await axios.post('http://localhost:4000/signup', {
        email,
        username,
        password
      });

      // Handle success response
      if (response.status === 201) {
        // setSuccess('Signup successful!');
        // Redirect to login page or home page
         window.location.href = '/login'; // Uncomment if you want to redirect
      }
    } catch (err) {
      // Handle error response
      // setError('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Form
      title="Sign Up"
      fields={[
        { label: 'Email', type: 'text', value: email, onChange: setEmail, required: true },
        { label: 'Username', type: 'text', value: username, onChange: setUsername, required: true },
        { label: 'Password', type: 'password', value: password, onChange: setPassword, required: true },
        { label: 'Confirm Password', type: 'password', value: confirmPassword, onChange: setConfirmPassword, required: true },
      ]}
      submitLabel="Sign Up"
      link="/login"
      linkLabel="Already have an account? Login"
      onSubmit={handleSubmit}
    />
  );
};

export default SignupPage;
