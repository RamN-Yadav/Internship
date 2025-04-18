import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Leaderboard = () => {
  const { user, loading } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
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
          
          const usersWithScores = data.map(u => ({
            ...u,
            score: Math.floor(Math.random() * 9) + 1,
          }));
          
          setUsers(usersWithScores.sort((a, b) => b.score - a.score));
          
          toast.success("Leaderboard loaded successfully!");
        } catch (err) {
          setError(err.message);
          toast.error("Error fetching leaderboard: " + err.message);
        }
      };

      fetchUsers();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Leaderboard</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b border-gray-300 text-left">User</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Jobs Applied</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id} className="border-b border-gray-300">
                  <td className="py-2 px-4 text-gray-800">{index + 1}. {u.name}</td>
                  <td className="py-2 px-4 text-gray-800 font-bold">
                    {u.score} 
                    {u.score > 6 && <span className="ml-2 text-green-600 font-semibold">🏆 High Achiever</span>}
                    {u.score < 3 && <span className="ml-2 text-red-600 font-semibold">🔻 Needs Improvement</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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

export default Leaderboard;