import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";  // Import Toastify components
import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/submissions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }

        const data = await response.json();
        setSubmissions(data.submissions);
      } catch (error) {
        setStatus("Error fetching submissions");
        toast.error("Error fetching submissions!");  // Show error toast
      }
    };

    fetchSubmissions();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Reviewed":
        return "bg-blue-500 text-white";
      case "Approved":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background: "linear-gradient(to bottom, #e3f2fd, #bbdefb, #90caf9)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Submissions Overview
        </h1>

        {status && (
          <div className="mb-6 text-center text-lg font-medium text-red-600">
            {status}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {submissions.map((submission) => (
            <div
              key={submission._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <div className="border-b pb-4 mb-4">
                <p className="text-gray-700 font-medium mb-2">
                  <strong>Opportunity ID:</strong> {submission._id || "N/A"}
                </p>
                <p className="text-gray-700 font-medium">
                  <strong>User:</strong> {submission.userId?.name || "Anonymous"}
                </p>
                <p className="text-gray-700 font-medium">
                  <strong>Email:</strong> {submission.userId?.email || "N/A"}
                </p>
              </div>

              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                  submission.status
                )}`}
              >
                {submission.status}
              </div>

              <p className="mt-4 text-gray-600">
                <strong>Feedback:</strong> {submission.feedback || "No feedback"}
              </p>

              <button
                onClick={() => navigate(`/submissions/edit/${submission._id}`)}
                className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Edit Submission
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notifications */}
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

export default Submissions;