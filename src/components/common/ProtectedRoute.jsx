import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // role not allowed
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
