import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // অথবা cookie check
    if (token) {
      navigate('/home'); // যদি already logged in হয়
    }
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
        { withCredentials: true }
      );
      console.log(res);

      const { accessToken, user } = res.data;

      // Save token in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to home
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.message || 'User not cradientialed');
      // console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username / Email / Phone */}
          <div>
            <label className="block text-gray-700">
              Username / Email / Phone
            </label>
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              placeholder="Enter username, email or phone"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/forget-password" className="text-blue-500 hover:underline">
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
