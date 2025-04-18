import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaEdit } from "react-icons/fa";
import udatebg from "../assets/udatebg.avif";
import { ToastContainer, toast } from "react-toastify";  // Import toastify components
import "react-toastify/dist/ReactToastify.css";  // Import toastify styles

const EditOpportunity = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [opportunity, setOpportunity] = useState({
    title: "",
    description: "",
    type: "Hackathon",
    deadline: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:7000/api/opportunities/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpportunity({
            title: data.title,
            description: data.description,
            type: data.type,
            deadline: new Date(data.deadline).toISOString().split("T")[0],
          });
        } else {
          toast.error("Failed to fetch opportunity details.");
          console.error("Failed to fetch opportunity details");
        }
      } catch (error) {
        toast.error("An error occurred while fetching details.");
        console.error("Error:", error);
      }
    };

    fetchOpportunity();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunity((prevOpportunity) => ({
      ...prevOpportunity,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:7000/api/opportunities/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(opportunity),
      });

      if (response.ok) {
        toast.success("Opportunity updated successfully!");
        setTimeout(() => {
          navigate("/view-opportunity");
        }, 2000);
      } else {
        toast.error("Failed to update opportunity.");
        console.error("Failed to update opportunity");
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "Admin" && user?.role !== "Recruiter") {
    return <p className="text-red-600 text-center mt-10">Unauthorized Access</p>;
  }

  return (
    <div
      id="image7"
      className="relative min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${udatebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2 mb-6">
          <FaEdit /> Edit Opportunity
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={opportunity.title}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={opportunity.description}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={opportunity.type}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="Hackathon">Hackathon</option>
            <option value="Quiz">Quiz</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={opportunity.deadline}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
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
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? "Updating..." : "Update Opportunity"}
        </button>
      </form>

      <ToastContainer
        position="top-center"
        style={{
          right: "20px",
          left: "auto",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "15px",
          width: "400px",
          padding: "20px",
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

export default EditOpportunity;