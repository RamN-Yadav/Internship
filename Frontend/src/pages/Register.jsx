import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerbg from "../assets/registerbg.jpg"; // Import the background image
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Participant",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the form is submitted
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      if (response.ok) {
        setLoading(false);
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000); // Redirect after toast
      } else {
        const data = await response.json();
        setLoading(false);
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
      setError("An error occurred, please try again.");
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${registerbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md opacity-90">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        style={{
          right: "20px",  // Right side of the screen
          left: "auto",  // Ensure it's not aligned to the left
          top: "50%",  // Vertically center the toast
          transform: "translateY(-50%)",  // Adjust for exact centering
          fontSize: "18px",  // Increase the text size
          width: "400px",  // Wider toast
          padding: "20px", // Add more padding
        }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default Register;