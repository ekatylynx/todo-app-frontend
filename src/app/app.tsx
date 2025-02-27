import { Route, Routes } from "react-router-dom"

import ProtectedRoute from "./routes/ProtectedRoute";

import TasksPage from './pages/TasksPage';
import HabitsPage from "./pages/HabitsPage";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from "./layouts";
import AuthLayout from "./layouts/AuthLayout";
import FilterTasksPage from "./pages/FilterTasksPage";

const App = () => {
  // console.log("App run")
  return (
      <Routes>
        {/* Открытые маршруты (регистрация и вход) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/signup" element={<RegisterPage />} />
          <Route path="/auth/signin" element={<LoginPage />} />
        </Route>
        
        {/* Защищенные маршруты */}
        <Route path="/" element={<ProtectedRoute  />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<TasksPage />} />
            <Route path="/categories/:id" element={<FilterTasksPage />} />
            <Route path="/main" element={<HabitsPage />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
