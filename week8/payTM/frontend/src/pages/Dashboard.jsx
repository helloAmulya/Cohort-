import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/v1/account/balance', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.balance !== undefined) setBalance(data.balance);
        else alert('Error fetching balance');
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {balance !== null ? <p>Your balance: ₹{balance.toFixed(2)}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;