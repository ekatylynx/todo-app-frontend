import { Navigate, Outlet } from "react-router-dom";
import { isLogined } from "../data/api";

const ProtectedRoute = () => {
  // const isAuthenticated = !!localStorage.getItem("access_token"); // Замени на свою логику проверки авторизации
  // const isAuthenticated = !!localStorage.getItem("access"); // Замени на свою логику проверки авторизации
  // const isAuthenticated = ;


  return isLogined() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;