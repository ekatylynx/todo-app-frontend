import React from 'react';

import SidebarStickyElement from '@/shared/ui/SidebarStickyElement';
import { MyDatePicker } from '@/app/components/DatePicker';
import Button from '@/shared/ui/Button';
import FiltersDate from '@/app/components/FiltersDate';
import Categories from '@/app/components/Categories';

import iconAddElement from '@/shared/assets/icons/icon-add-el.svg';
import userIcon from '@/shared/assets/icons/user2.png';

import './index.scss';

/*
TODO:
1. Сделать кастомный тонкий скролл для всех браузеров

*/

const Sidebar1: React.FC = () => {
  return (
    <aside className="sidebar">
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
          className="team-icon lucide lucide-gallery-vertical-end size-4">
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
        <SidebarStickyElement
          name={'name'}
          subtitle={'emailmy@gmail.com'}
          roundImage
          leftImage={
            <img src={userIcon}></img>
          }
        />
      </div>
    </aside>
  );
};

export default Sidebar1;

// Макет Layout для страниц, которые должны содержать Header и Sidebar
