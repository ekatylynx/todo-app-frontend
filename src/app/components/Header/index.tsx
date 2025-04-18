import { Link } from "react-router-dom";
// import archiveTasks from '@/shared/assets/icons/archive-ok.svg';
import './index.scss';

import { toggleSidebar } from '@/app/model/sidebarSlice';
import { useDispatch } from 'react-redux';

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();
// const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const daysOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayName = daysOfWeekEn[date.getDay()];

// Формат даты с добавлением нулей перед единичными числами
const formatWithLeadingZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className='header'>
      <div className="header-nav">
        <div className="header-nav-2">
          <div>
            <button 
              className="header-icon-container"
              onClick={() => {
                console.log('Toggle button clicked');
                dispatch(toggleSidebar())
              }}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sidebar-stick-icon header-icon-sidebar">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
              </svg>
            </button>
          </div>
          <ul className="header-nav-links">
            <li
              className="header-link-item">
              <Link to="/"
                className="header-link-item-href transition-colors">
                Home
              </Link>
            </li>
            <li
              className="header-link-item">
              <Link to="/habits"
                className="header-link-item-href transition-colors">
                Habits
              </Link>
            </li>
            <li
              className="header-link-item">
              <Link to="/h"
                className="header-link-item-href transition-colors">
                Tasks
              </Link>
            </li>
            <li
              className="header-link-item">
              <Link to="/ha"
                className="header-link-item-href transition-colors">
                Events
              </Link>
            </li>
          </ul>
        </div>

        <div className="header-function-block">
          {/* <button className="header-btn-archive-tsk"><img className="icon-archive-tsk" src={archiveTasks} alt="icon-archive-task" /></button> */}
          <div className="header-nav-date">
            <span
              className="header-nav-link header-name-weekday">
              {currentDayName}
            </span>
            <span
              className="header-nav-link subtitle-gray">
              {formatWithLeadingZero(currentDay)}/{formatWithLeadingZero(currentMonth)}/{currentYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;