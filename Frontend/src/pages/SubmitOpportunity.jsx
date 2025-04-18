import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import detail from '../assets/detail.jpg';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify components
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const SubmitOpportunity = () => {
  const { _id } = useParams();  // Extract opportunity ID from URL params
  const [file, setFile] = useState(null);  // File state
  const [loading, setLoading] = useState(false);  // Track loading state

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select a file to upload.');  // Show error toast
      return;
    }

    setLoading(true);  // Start loading indicator

    const formData = new FormData();
    formData.append('image', file);  // Append file to FormData
    formData.append('opportunityId', _id);  // Append opportunity ID to FormData

    try {
      // Make API call to submit the file
      const response = await fetch('http://localhost:7000/api/submissions/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Use stored token
        },
        body: formData,  // Send file and opportunity ID
      });

      if (!response.ok) {
        throw new Error('Error uploading file.');
      }

      toast.success('Submission successful!');  // Show success toast
    } catch (error) {
      toast.error('Error uploading file.');  // Show error toast
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center transition duration-300 ease-in-out hover:bg-opacity-80"
      style={{
        backgroundImage: `url(${detail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'darken',
      }}
    >
      <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-lg bg-opacity-90">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Submit Your File
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Opportunity ID (Read-only) */}
          <div>
            <label
              htmlFor="opportunityId"
              className="block text-lg font-medium text-gray-700"
            >
              Opportunity ID:
            </label>
            <input
              type="text"
              id="opportunityId"
              value={_id}
              readOnly
              className="w-full mt-2 rounded-lg border-gray-300 bg-gray-100 p-3 text-gray-800 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700"
            >
              Choose File:
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full mt-2 rounded-lg border border-gray-300 p-3 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 active:bg-blue-700 transition duration-300"
            disabled={loading}  // Disable the button while loading
          >
            {loading ? 'Submitting...' : 'Submit'} {/* Change text while loading */}
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        style={{
          right: '20px',
          left: 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '15px',
          width: '400px',
          padding: '20px',
        }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default SubmitOpportunity;