import { Navigate, Outlet } from "react-router-dom";
import { isLogined } from "../data/api";

const ProtectedRoute = () => {
  return isLogined() ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;