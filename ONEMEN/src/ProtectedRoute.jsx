import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to={`/login?redirect=${location.pathname}`} replace />;
};

export default ProtectedRoute;
