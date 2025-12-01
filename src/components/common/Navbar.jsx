// src/components/common/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="text-xl font-bold">
          RTO System
        </Link>

        {/* Menu Items */}
        <div className="flex gap-6 items-center text-sm">

          {/* ================= PUBLIC NAVBAR ================= */}
          {!user && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/vehicle-registration" className="hover:underline">Vehicle Registration</Link>
              <Link to="/registering-authority" className="hover:underline">Registering Authority</Link>
              <Link to="/helpdesk" className="hover:underline">Help Desk</Link>
              <Link to="/feedback" className="hover:underline">Feedback / Complaint</Link>
              <Link to="/user/login" className="hover:underline">User Login</Link>
              <Link to="/officer/login" className="hover:underline">Officer Login</Link>
            </>
          )}

          {/* ================= USER NAVBAR ================= */}
          {user && role === "USER" && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/user/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/user/apply" className="hover:underline">Apply Vehicle</Link>
              <Link to="/helpdesk" className="hover:underline">Help Desk</Link>
              <Link to="/feedback" className="hover:underline">Feedback</Link>

              <button
                onClick={handleLogout}
                className="ml-2 bg-white text-blue-600 px-3 py-1 rounded hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          )}

          {/* ================= OFFICER NAVBAR ================= */}
          {user && role === "OFFICER" && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/officer/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/registering-authority" className="hover:underline">Registering Authority</Link>

              <button
                onClick={handleLogout}
                className="ml-2 bg-white text-blue-600 px-3 py-1 rounded hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
