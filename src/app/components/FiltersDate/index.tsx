import searchIcon from '@/shared/assets/icons/icon-search.svg';
import './index.scss';

const currentDay = new Date().getDate();

const FiltersDate = () => {
  return (
    <div className='filters'>
      <div className="filters-conteiner">

        <button className='filters-btn'>
        <img className='icon-small' src={searchIcon} alt='icon search ' />
          Search</button>

        {/* TODO: переделать все svg в файлы */}
        <button className='filters-btn'>
          <span className='current-day'>{currentDay}</span>
          <svg className='filters-icon' viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 3c.277 0 .5.223.5.5v4a.499.499 0 1 1-1 0v-4c0-.277.223-.5.5-.5Zm-17 0c.277 0 .5.223.5.5v4a.499.499 0 1 1-1 0v-4c0-.277.223-.5.5-.5Zm-5 2C.678 5 0 5.678 0 6.5v19c0 .822.678 1.5 1.5 1.5h27c.822 0 1.5-.678 1.5-1.5v-19c0-.822-.678-1.5-1.5-1.5h-3c-.656 0-.664 1 0 1h3c.286 0 .5.214.5.5v19c0 .286-.214.5-.5.5h-27a.488.488 0 0 1-.5-.5v-19c0-.286.214-.5.5-.5h3c.672 0 .66-1 0-1h-3Zm7 0c-.65 0-.66 1 0 1h13c.656 0 .668-1 0-1h-13Z"/></svg>
          Today</button>

        <button className='filters-btn'>
          <svg
            className='filters-icon'
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 19h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm8 0h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm-16 0h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm8-6h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm8 0h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm-16 0h3c.277 0 .5.223.5.5s-.223.5-.5.5h-3c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm18-10c.277 0 .5.223.5.5v4c0 .277-.223.5-.5.5s-.5-.223-.5-.5v-4c0-.277.223-.5.5-.5zm-17 0c.277 0 .5.223.5.5v4c0 .277-.223.5-.5.5S6 7.777 6 7.5v-4c0-.277.223-.5.5-.5zm-5 2C.678 5 0 5.678 0 6.5v19c0 .822.678 1.5 1.5 1.5h27c.822 0 1.5-.678 1.5-1.5v-19c0-.822-.678-1.5-1.5-1.5h-3c-.656 0-.664 1 0 1h3c.286 0 .5.214.5.5v19c0 .286-.214.5-.5.5h-27c-.286 0-.5-.214-.5-.5v-19c0-.286.214-.5.5-.5h3c.672 0 .66-1 0-1zm7 0c-.65 0-.66 1 0 1h13c.656 0 .668-1 0-1z" /></svg>
          Upcoming</button>
        <button className='filters-btn'>
        <svg className='filters-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="#000000"></path> </g></svg>
          Filters and tags</button>
      </div>
    </div>
  );
}

export default FiltersDate;