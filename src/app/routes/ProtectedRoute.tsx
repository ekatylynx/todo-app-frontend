import { Navigate, Outlet } from "react-router-dom";
import { isLogined } from "@/shared/api/api";

const ProtectedRoute = () => {
  return isLogined() ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;