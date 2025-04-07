import { Link } from "react-router-dom";
// import archiveTasks from '@/shared/assets/icons/archive-ok.svg';
import userIcon from '@/shared/assets/icons/user2.png';
import './index.scss';

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
  return (
    <div className='header'>
      <div className="header-nav">
        <ul className="header-nav-links">
          <li className="header-link-item"><Link to="/" className="header-link-item-href transition-colors">Home</Link></li>
          <li className="header-link-item"><Link to="/habits" className="header-link-item-href transition-colors">Habits</Link></li>
          <li className="header-link-item"><Link to="/h" className="header-link-item-href transition-colors">Tasks</Link></li>
          <li className="header-link-item"><Link to="/ha" className="header-link-item-href transition-colors">Events</Link></li>
        </ul>
        <div className="header-function-block">
          {/* <button className="header-btn-archive-tsk"><img className="icon-archive-tsk" src={archiveTasks} alt="icon-archive-task" /></button> */}
          <Link className="header-btn-user" to="/profile/my"><img className="icon-user" src={userIcon} alt="icon-user" /></Link>
          <div className="header-nav-date">
            <span className="header-nav-link header-name-weekday">{currentDayName}</span>
            <span className="header-nav-link subtitle-gray">{formatWithLeadingZero(currentDay)}/{formatWithLeadingZero(currentMonth)}/{currentYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;