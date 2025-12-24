import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-blue-500 mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist. It might have been
        removed or the URL is incorrect.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </Link>
      <div className="mt-12">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 illustration"
          className="w-80 mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFound;
