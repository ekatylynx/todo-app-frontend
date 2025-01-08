import { Route, Routes } from "react-router-dom"

import TasksPage from './pages/TasksPage';
import HabitsPage from "./pages/HabitsPage";
import RegisterPage from './pages/RegisterPage';
import Layout from "./layouts";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<TasksPage />} />
          <Route path="/main" element={<HabitsPage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth" element={<RegisterPage />} />
        </Route>
      </Routes>
  );
}

export default App;
