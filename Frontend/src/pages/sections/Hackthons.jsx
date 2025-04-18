import React, { useEffect, useState } from "react";

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/opportunities?type=Hackathon")
      .then((res) => res.json())
      .then((data) => setHackathons(data))
      .catch((err) => console.error("Error fetching hackathons:", err));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-10"
    >
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
        🚀 Hackathons
      </h1>

      {hackathons.length === 0 ? (
        <p className="text-white text-lg">No Hackathons available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="bg-white shadow-xl rounded-2xl p-6 transform transition duration-300 hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-blue-600">{hackathon.title}</h2>
              <p className="text-gray-700 mt-2">{hackathon.description}</p>
              <span className="text-gray-500 text-sm block mt-4">
                🕒 Deadline: {new Date(hackathon.deadline).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hackathons;