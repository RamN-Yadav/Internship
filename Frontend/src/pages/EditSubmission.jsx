import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSubmission = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch(`http://localhost:7000/api/submissions/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch submission");
        }

        const data = await response.json();
        setSubmission(data);
        setStatus(data.status);
        setFeedback(data.feedback || "");
      } catch (error) {
        toast.error("Error fetching submission details");
      }
    };
    fetchSubmission();
  }, [_id]);

  const sendMail = () => {
    if (!submission?.userId?.email) {
      toast.error("No user email found!");
      return;
    }

    const templateParams = {
      user_email: submission.userId.email,
      status,
      feedback,
    };

    emailjs
      .send("service_oi4q4pf", "template_b8hwvda", templateParams, "d1PGU-gVD3VQ2s1u_")
      .then(() => {
        toast.success("Email notification sent!");
      })
      .catch(() => {
        toast.error("Error sending email!");
      });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:7000/api/submissions/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status, feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to update submission");
      }

      toast.success("Submission updated successfully!");
      sendMail();
      setTimeout(() => navigate("/admin/submissions"), 2000);
    } catch (error) {
      toast.error("Error updating submission!");
    }
  };

  if (!submission) {
    return <div className="text-center mt-20 text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/6.jpg')] bg-cover bg-center h-screen">
      <div className="bg-gray-100 rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Edit Submission</h1>
        <form onSubmit={handleEdit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 active:bg-blue-800 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Right Center Toast Notifications */}
      <ToastContainer
  position="top-center"
  style={{
    right: "20px",
    left: "auto",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "15px",  // Increases the text size
    width: "400px",  // Makes the alert wider
    padding: "20px", // Adds more padding for a bigger look
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

export default EditSubmission;