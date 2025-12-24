import React, { use } from 'react';
import { useNavigate } from 'react-router';
const Home = () => {
  const naviget = useNavigate();
  const handleClick = () => {
    console.log('Logout button clicked');

    localStorage.removeItem('accessToken');
    naviget('/login');
  };
  return (
    <div>
      <div>
        <h1>Welcome to Our Application</h1>
        <p>
          This is the home page of our awesome application. Explore the features
          and enjoy your stay!
        </p>
        <button onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
