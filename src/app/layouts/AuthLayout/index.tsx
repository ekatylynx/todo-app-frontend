import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className='auth-layout'>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

// Макет AuthLayout для страниц, которые не должны содержать Header и Sidebar.
