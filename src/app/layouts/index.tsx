import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Sidebar1 } from '@/app/ui/Sidebar/index';

import '@/app/ui/Sidebar/ui/index.scss';
import './index.scss';

const Layout: React.FC = () => {
  return (
    <div className='layout'>
      <Sidebar1 />
      <div className='layout-main'>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

// Макет Layout для страниц, которые должны содержать Header и Sidebar.
