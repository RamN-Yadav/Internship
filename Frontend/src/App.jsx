import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecruiterDashboard from "./pages/Dashboard/RecruiterDashboard";
import ParticipantDashboard from "./pages/Dashboard/ParticipantDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import NavBar from "./pages/NavBar";
import NotFound from "./NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import CreateOpportunity from "./pages/CreateOpportunity";
import OpportunityDetails from "./pages/OpportunityDetails";
import NotificationsPage from "./NotificationsPage";
import EditOpportunity from "./pages/EditOpportunity";
import Users from "./pages/Users";
import SubmitOpportunity from "./pages/SubmitOpportunity";
import Submissions from "./pages/Submissions";
import EditSubmission from "./pages/EditSubmission";
import Footer from "./pages/Footer";
import Hackathons from "./pages/sections/Hackthons";
import Quizzes from "./pages/sections/Quizzes";
import Internships from "./pages/sections/Internships";
import Jobs from "./pages/sections/Jobs";
import Leaderboard from "./pages/sections/Leaderboard"
const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/view-opportunity/" element={<OpportunityDetails />} />
          <Route path="/opportunity/:_id/edit" element={<EditOpportunity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/leaderboard/admin" element={<Leaderboard/>} />
          <Route 
            path="/dashboard/admin"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <div className="p-4">
                  <AdminDashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recruiter"
            element={
              <ProtectedRoute roles={["Recruiter"]}>
                <div className="p-4">
                  <RecruiterDashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/participant"
            element={
              <ProtectedRoute roles={["Participant"]}>
                <div className="p-4">
                  <ParticipantDashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/submission/:_id"
            element={
              <ProtectedRoute roles={["Participant"]}>
                <div className="p-4">
                  <SubmitOpportunity />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-opportunity"
            element={
              <ProtectedRoute roles={["Admin", "Recruiter"]}>
                <CreateOpportunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/submissions"
            element={
              <ProtectedRoute roles={["Admin", "Recruiter"]}>
                <Submissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submissions/edit/:_id"
            element={
              <ProtectedRoute roles={["Admin", "Recruiter"]}>
                <EditSubmission />
              </ProtectedRoute>
            }
          />
           <Route path="/hackathons" element={<Hackathons/>} />
           <Route path="/quizzes" element={<Quizzes/>} />
           <Route path="/internships" element={<Internships/>} />
            <Route path="/jobs" element={<Jobs/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
   
  );
};

export default App;