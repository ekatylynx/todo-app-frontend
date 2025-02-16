import { Route, Routes } from "react-router-dom"

import ProtectedRoute from "./routes/ProtectedRoute";

import TasksPage from './pages/TasksPage';
import HabitsPage from "./pages/HabitsPage";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from "./layouts";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
      <Routes>
        {/* Открытые маршруты (регистрация и вход) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
        
        {/* Защищенные маршруты */}
        <Route path="/" element={<ProtectedRoute  />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<TasksPage />} />
            <Route path="/main" element={<HabitsPage />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
