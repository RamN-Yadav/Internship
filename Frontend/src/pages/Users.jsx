import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";  // Import Toastify components
import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS

const Users = () => {
  const { user, loading } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch all users if the user is Admin or Recruiter
  useEffect(() => {
    if (user && (user.role === "Admin" || user.role === "Recruiter")) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("http://localhost:7000/api/users", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch users.");
          }

          const data = await response.json();
          setUsers(data);
          toast.success("Users loaded successfully!");  // Success toast
        } catch (err) {
          setError(err.message);
          toast.error("Error fetching users: " + err.message);  // Error toast
        }
      };

      fetchUsers();
    }
  }, [user]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Unauthorized message
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">
            Please log in to view your profile.
          </h2>
        </div>
      </div>
    );
  }

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleColors = {
      Admin: "bg-red-500 text-white",
      Recruiter: "bg-blue-500 text-white",
      Participant: "bg-green-500 text-white",
    };

    return (
      <span
        className={`text-sm px-2 py-1 rounded-full font-semibold ${roleColors[role]}`}
      >
        {role}
      </span>
    );
  };

  return (
    <div
      id="image4"
      className="min-h-screen py-10 px-4"
      style={{
        background: "linear-gradient(to bottom right, #d1f7d6, #6fcf97)",
      }}
    >
      <div className="max-w-6xl mx-auto shadow-lg rounded-lg p-8 bg-white">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          {user.name}'s Profile
        </h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg text-gray-700 mb-8 text-center">
          <strong>Role:</strong> <RoleBadge role={user.role} />
        </p>

        {(user.role === "Admin" || user.role === "Recruiter") && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              All Users
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error:</strong> {error}
              </div>
            )}

            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-700 mb-4">User List</h3>
              <ul className="divide-y divide-gray-300">
                {users.map((u) => (
                  <li key={u._id} className="py-4">
                    <p className="text-gray-800">
                      <strong>Name:</strong> {u.name}
                    </p>
                    <p className="text-gray-800">
                      <strong>Email:</strong> {u.email}
                    </p>
                    <p className="text-gray-800">
                      <strong>Role:</strong> <RoleBadge role={u.role} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        style={{
          right: '20px',
          left: 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '18px',
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

export default Users;