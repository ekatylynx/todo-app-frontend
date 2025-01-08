import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Layout: React.FC = () => {
  return (
    <div className='main'>
      <Sidebar />
      <div className='main-container'>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

// Макет Layout для страниц, которые должны содержать Header и Sidebar.
