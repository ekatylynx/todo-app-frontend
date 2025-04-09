import React from 'react';

import SidebarStickyElement from '@/shared/ui/SidebarStickyElement';
import { MyDatePicker } from '@/app/components/DatePicker';
import Button from '@/shared/ui/Button';
import FiltersDate from '@/app/components/FiltersDate';
import Categories from '@/app/components/Categories';

import DropdownMenu from '@/shared/ui/DropdownMenu';
import { NavLink } from 'react-router-dom';

import iconAddElement from '@/shared/assets/icons/icon-add-el.svg';
import userIcon from '@/shared/assets/icons/user2.png';


import './index.scss';

interface SidebarProps {
  isOpen: boolean;
}

/*
TODO:
1. Сделать кастомный тонкий скролл для всех браузеров
*/

const Sidebar: React.FC<SidebarProps> = ({ isOpen  }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'close'}`}>
      <div className="sidebar-header">
        <SidebarStickyElement
         roundImage={false}
         name={'Evil Inc'}
         subtitle={'Enterprise'}
         leftImage={
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sidebar-stick-icon lucide lucide-gallery-vertical-end size-4">
          <path d="M7 2h10"></path><path d="M5 6h14"></path>
          <rect width="18" height="12" x="3" y="10" rx="2"></rect>
        </svg>
        } />
      </div>
      <nav className="sidebar-nav">
        <div className="date-picker-lib">
          <MyDatePicker />
        </div>
        <div className="sidebar-padding container-padding">
          <Button 
            text={'Add task'}
            icon={iconAddElement}
            textColor={'white'}
            textWeight={'normal'}
            classNameAdd={'btn-add-todo'}
            iconMedium
            width={'full'}
            />
        </div>
        <div className="sidebar-padding">
          <FiltersDate />
          <div className='sidebar-margin-bot'>
            <h2 className='sidebar-title'>Categories</h2>
            <Categories />
          </div>
        </div>
        
        <ul>
          {/* <li><a href="/tasks">Tasks</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/settings">Settings</a></li> */}
        </ul>
      </nav>
      <div className="sidebar-footer">
        {/* <p>© 2025 Your App</p> */}
        
        <DropdownMenu
          trigger={
            <SidebarStickyElement
              name={'name'}
              subtitle={'emailmy@gmail.com'}
              roundImage
              leftImage={
                <img src={userIcon}></img>
              }
            />
          }
         >
          <ul className="dropdown-menu-list">
            <li>
            <SidebarStickyElement
              name={'name'}
              subtitle={'emailmy@gmail.com'}
              roundImage
              leftImage={
                <img src={userIcon}></img>
              }
              sidebarStickContainerPadding="0px"
              sidebarStickPadding="4px"
            />
            </li>
            <li><div className='line-classic'></div></li>
            <li className='dropdown-menu-element'><NavLink to="/profile/my">Profile</NavLink></li>
            <li className='dropdown-menu-element'><NavLink to="/profile/account">Account</NavLink></li>
            <li className='dropdown-menu-element'><NavLink to="/profile/notifications">Notifications</NavLink></li>
            <li><div className='line-classic'></div></li>
            <li className='dropdown-menu-element'><NavLink to="/logout">Log out</NavLink></li>
          </ul>
        </DropdownMenu>   
      </div>
    </aside>
  );
};

export default Sidebar;
