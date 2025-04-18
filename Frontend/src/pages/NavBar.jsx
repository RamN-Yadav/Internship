import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import NotificationBadge from "./NotificationBadge";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; // Import the icon
import logo from "../assets/logo.png"; // Import logo

const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-700 text-white shadow-lg border-2 rounded pr-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center p-1">
            <img src={logo} alt="Skill Education Logo" className="h-10 w-10 object-cover" />
          </div>
          <span className="text-xl font-bold hover:text-green-500 transition-colors duration-300 ease-in-out ml-2">
            SKILL EDUCATION
          </span>
        </Link>

        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-green-500 transition-colors duration-300 ease-in-out">
              Home
            </Link>
          </li>
          {user ? (
            <>
              {user.role === "Admin" && (
                <>
                  <li>
                    <Link to="/dashboard/admin" className="hover:text-blue-600 transition-colors duration-300 ease-in-out">
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/leaderboard/admin" className="hover:text-blue-600 transition-colors duration-300 ease-in-out">
                     Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="text-m hover:text-yellow-600 transition-colors duration-300 ease-in-out">
                      UserProfile
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/submissions" className="text-m hover:text-yellow-600 transition-colors duration-300 ease-in-out">
                      View Submission
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-opportunity" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      Manage Opportunities
                    </Link>
                  </li>
                </>
              )}
              {user.role === "Recruiter" && (
                <>
                  <li>
                    <Link to="/dashboard/recruiter" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      Recruiter Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="text-m hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      UserProfile
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-opportunity" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      Manage Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/submissions" className="text-m hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      View Submission
                    </Link>
                  </li>
                </>
              )}
              {user.role === "Participant" && (
                <>
                  <li>
                    <Link to="/dashboard/participant" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      Participant Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="text-m hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      UserProfile
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-opportunity" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                      Browse Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link to="/notifications" className="hover:text-green-500 transition-colors duration-300 ease-in-out">
                      <NotificationBadge />
                    </Link>
                  </li>
                </>
              )}

              {/* Profile and Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded flex items-center hover:bg-red-600 transition-all duration-300 ease-in-out"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-green-500 transition-colors duration-300 ease-in-out">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-green-500 transition-colors duration-300 ease-in-out">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;