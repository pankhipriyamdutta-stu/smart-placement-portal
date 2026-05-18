import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PlacedStudents from "./pages/PlacedStudents";
import Leaderboard from "./pages/Leaderboard";
import Experiences from "./pages/Experiences";
import ResumeBuilder from "./pages/ResumeBuilder";
import RecruiterRegistration from "./pages/RecruiterRegister";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import NotificationPage from "./pages/NotificationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import bgImage from "./assets/college.jpg";

function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: isHome
          ? "none"
          : `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          {/* ✅ Placed Students Route */}
          <Route path="/placed-students" element={<PlacedStudents />} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/experiences" element={<ProtectedRoute><Experiences /></ProtectedRoute>} />
          <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/recruiter-register" element={<RecruiterRegistration />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
          <Route path="/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}