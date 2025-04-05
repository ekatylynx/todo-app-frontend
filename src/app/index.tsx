import { Suspense } from "react";
import { Route, Routes } from "react-router-dom"

import ProtectedRoute from "./routes/ProtectedRoute";

import Layout from "./layouts";
import AuthLayout from "./layouts/AuthLayout";
import { TasksPage } from "@/pages/TasksPage";
import { FilterTasksPage } from "@/pages/FilterTasksPage";
import { UserProfilePage } from "@/pages/UserProfilePage";
import { HabitsPage } from "@/pages/HabitsPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { LoginPage } from "@/pages/LoginPage";


const App = () => {
  // console.log("App run")
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Открытые маршруты (регистрация и вход) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/signup" element={<RegisterPage />} />
          <Route path="/auth/signin" element={<LoginPage />} />
        </Route>

        {/* Защищенные маршруты */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<TasksPage />} />
            <Route path="/categories/:id" element={<FilterTasksPage />} />
            <Route path="/main" element={<HabitsPage />} />
            <Route path="/profile/*" element={<UserProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
