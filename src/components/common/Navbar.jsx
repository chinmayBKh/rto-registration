import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">RTO Portal</span>
        <span className="text-xs text-slate-300">Vehicle Registration</span>
      </div>

      <div className="flex gap-4 text-sm">
        <Link to="/" className="hover:text-indigo-300">
          Home
        </Link>

        <Link to="/user/login" className="hover:text-indigo-300">
          User Login
        </Link>
        <Link to="/officer/login" className="hover:text-indigo-300">
          Officer Login
        </Link>

        {auth.role === "USER" && (
          <>
            <Link to="/user/apply" className="hover:text-indigo-300">
              Apply
            </Link>
            <Link to="/user/dashboard" className="hover:text-indigo-300">
              User Dashboard
            </Link>
          </>
        )}

        {auth.role === "OFFICER" && (
          <Link to="/officer/dashboard" className="hover:text-indigo-300">
            Officer Dashboard
          </Link>
        )}

        {/* Admin link optional */}
        {auth.role === "ADMIN" && (
          <Link to="/admin/dashboard" className="hover:text-indigo-300">
            Admin Dashboard
          </Link>
        )}
      </div>

      {auth.isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      ) : null}
    </nav>
  );
}

export default Navbar;
