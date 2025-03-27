import { call } from "@/shared/api/api";
import { AUTH_ENDPOINTS } from "@/shared/config/api";
import { ApiResponse } from "@/entities/todo/model";

// User Sign In
export const signin = ({ email, password }: { email: string; password: string }): Promise<void> => 
  call<ApiResponse>({ 
    path: AUTH_ENDPOINTS.LOGIN,
    method: "POST", 
    data: { email, password }, 
    isAuth: false,
    re: false })
    .then(({ refresh, access }) => {
      // WARNING: DEBUG INFO ONLY
      // console.log("SIGNIN", refresh, access);
      if (refresh) localStorage.setItem("refresh", refresh);
      if (access) localStorage.setItem("access", access);
    });

// User Sign Up
export const signup = ({ email, password }: { email: string; password: string }): Promise<void> => {
  return new Promise((resolve, reject) => {
    call<ApiResponse>({
      path: AUTH_ENDPOINTS.REGISTER,
      method: "POST",
      data: { email, password },
      isAuth: false,
      re: false })
    // .then(({ message, email, password }) => {
    .then(({ message }) => {
      if (message) {
        resolve();
      } else {
        // reject({ message: email || password });
        reject({ message: "Registration failed" });
      }
    })
    .catch((error) => {
      // reject({ message: email || password || "An error occurred during registration" });
      reject({ message: "An error occurred during registration", error });
    });
  });
};