import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <Link
          to="/"
          className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;