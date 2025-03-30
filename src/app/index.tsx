import { Suspense } from "react";
import { Route, Routes } from "react-router-dom"

import ProtectedRoute from "./routes/ProtectedRoute";

import Layout from "./layouts";
import AuthLayout from "./layouts/AuthLayout";
import { TasksPageAsync } from "@/pages/TasksPage/TasksPage.async";
import { FilterTasksPageAsync } from "@/pages/FilterTasksPage/FilterTasksPage.async";
import { UserProfilePageAsync } from "@/pages/UserProfilePage/UserProfilePage.async";
import { HabitsPageAsync } from "@/pages/HabitsPage/HabitsPage.async";
import { RegisterPageAsync } from "@/pages/RegisterPage/RegisterPage.async";
import { LoginPageAsync } from "@/pages/LoginPage/LoginPage.async";


const App = () => {
  // console.log("App run")
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        {/* Открытые маршруты (регистрация и вход) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/signup" element={<RegisterPageAsync />} />
          <Route path="/auth/signin" element={<LoginPageAsync />} />
        </Route>

        {/* Защищенные маршруты */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<TasksPageAsync />} />
            <Route path="/categories/:id" element={<FilterTasksPageAsync />} />
            <Route path="/main" element={<HabitsPageAsync />} />
            <Route path="/profile" element={<UserProfilePageAsync />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
