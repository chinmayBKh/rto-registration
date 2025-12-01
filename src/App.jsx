import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

import UserLogin from "./components/user/UserLogin";
import ApplyVehicle from "./components/user/ApplyVehicle";
import UserDashboard from "./components/user/UserDashboard";

import OfficerLogin from "./components/officer/OfficerLogin";
import OfficerDashboard from "./components/officer/OfficerDashboard";
import UpdateStatus from "./components/officer/UpdateStatus";

import AdminDashboard from "./components/admin/AdminDashboard";

import Feedback from "./components/common/Feedback";
import HelpDesk from "./components/common/HelpDesk";
import VehicleRegistration from "./components/common/VehicleRegistration";
import RegisteringAuthority from "./components/common/RegisteringAuthority";


function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-2">
          RTO Vehicle Registration Portal
        </h1>
        <p className="text-sm text-slate-600">
          Login as User to apply for vehicle registration and track status.
          <br />
          Login as Officer to view and update applications.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

           {/* Public Routes */}
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/helpdesk" element={<HelpDesk />} />
      <Route path="/vehicle-registration" element={<VehicleRegistration />} />
      <Route path="/registering-authority" element={<RegisteringAuthority />} />

          {/* User */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/user/apply"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <ApplyVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Officer */}
          <Route path="/officer/login" element={<OfficerLogin />} />
          <Route
            path="/officer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["OFFICER"]}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/officer/update/:appId"
            element={
              <ProtectedRoute allowedRoles={["OFFICER"]}>
                <UpdateStatus />
              </ProtectedRoute>
            }
          />

          {/* Admin – optional */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

  
  
}

export default App;