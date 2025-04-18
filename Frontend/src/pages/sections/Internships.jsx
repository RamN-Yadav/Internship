import React, { useEffect, useState } from "react";

const Internships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/opportunities?type=Internship")
      .then((res) => res.json())
      .then((data) => setInternships(data))
      .catch((err) => console.error("Error fetching internships:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 via-green-300 to-green-500 p-10">
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">🎓 Internships</h1>

      {internships.length === 0 ? (
        <p className="text-white text-lg">No Internships available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {internships.map((internship) => (
            <div
              key={internship._id}
              className="bg-white shadow-xl rounded-2xl p-6 transform transition duration-300 hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-green-600">{internship.title}</h2>
              <p className="text-gray-700 mt-2">{internship.description}</p>
              <span className="text-gray-500 text-sm block mt-4">
                📅 Deadline: {new Date(internship.deadline).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Internships;