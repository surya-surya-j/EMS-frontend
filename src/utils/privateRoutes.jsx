import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthsContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
