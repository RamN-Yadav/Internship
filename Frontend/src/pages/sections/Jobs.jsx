import React, { useEffect, useState } from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/opportunities?type=Job")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-red-100 via-red-300 to-red-500 p-10">
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">💼 Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-white text-lg">No Jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-xl rounded-2xl p-6 transform transition duration-300 hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-red-600">{job.title}</h2>
              <p className="text-gray-700 mt-2">{job.description}</p>
              <span className="text-gray-500 text-sm block mt-4">
                📅 Deadline: {new Date(job.deadline).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;