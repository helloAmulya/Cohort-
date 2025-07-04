import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/v1/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert(data.msg || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
