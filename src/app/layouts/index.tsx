import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Sidebar } from '@/app/ui/Sidebar/index';

import '@/app/ui/Sidebar/ui/index.scss';
import './index.scss';

const Layout: React.FC = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);

  return (
    <div className='layout'>
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`layout-main ${isSidebarOpen ? '' : 'with-sidebar'}`}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
