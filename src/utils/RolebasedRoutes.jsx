import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthsContext";

const RolebasedRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading.....</div>;
  }

  if (!requiredRole.includes(user.role)) {
    <Navigate to="/unathorized" />;
  }
  return user ? children : <Navigate to="/login" />;
};

export default RolebasedRoutes;
