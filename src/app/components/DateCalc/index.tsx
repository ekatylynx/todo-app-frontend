import React, { useState, useEffect } from 'react';

import { getCalendar } from '../../data/api.js';
// import { setPriority } from 'os';

// Стандартные константы можно перенести в отдельный файл для уменьшения кода
// TODO: 1. Перенести файл backend на настоящий локальный бэк
// 2. Подключить SCSS к проекту и 
// 3. Стилизовать начальные компоненты
// 4. Добавление дополнительного функционала

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const DateCalc = () => {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    getCalendar(year, month)
      .then((c) => {
        setCalendar(c);
      });
  }, [year, month]);

  // лучше всегда указывать абстрактный аргумент (m), чем конкретный month, потому что иначе могут случиться
  // коллизии после присваивания обработчика события onClick
  // когда нужно использовать переменную в верстке, то можно использовать явно month (потому что он обновится)

  const switchPrevMonth = () => {
    setMonth((m) => {
      const v = m - 1;

      if (v < 0) {
        setYear((y) => y - 1);
        return 11;
      } else {
        return v;
      }
    });
  };

  const switchNextMonth = () => {
    setMonth((m) => {
      const v = m + 1;

      if (v > 11) {
        setYear((y) => y + 1);
        return 0;
      } else {
        return v;
      }
    });
  };

  // ПЕРЕКЛЮЧЕНИЕ ГОДОВ

  const switchPrevYear = () => {
    setYear((y) => {
      const v = y - 1;

      // if (v <= 2021) {
      //   return y;
      // } else {
      return v;
      // }
    });
  };

  const switchNextYear = () => {
    setYear((y) => {
      const v = y + 1;

      // if (v >= 2026) {
      //   return y;
      // } else {
      return v;
      // }
    });
  };

  // получение названия текущего месяца 
  // const currentNameDay = new Date().toLocaleString("en-EN", { month: "long" });

  return (
    <div className='calendar-container'>
      <header className='header-table-cal'>
        <div>
         
        </div>
        {/* <span className='header-table-month'>{currentNameDay}</span> */}

        {/* ВЫБОР МЕСЯЦА */}
        <div className='container-date'>
          <button onClick={switchPrevMonth} className='btn-switch-arrow'>&#8249;</button>
          <select className='header-select' value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {months.map((name, index) =>
              <option key={`${index}${year}`} value={index}>{name}</option>
            )}
          </select>
          <button onClick={switchNextMonth} className='btn-switch-arrow'>&#8250;</button>
        </div>

        {/* ВЫБОР ГОДА */}
        <div className='container-date'>
          <button onClick={switchPrevYear} className='btn-switch-arrow'>&#8249;</button>
          <select className='header-select' value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {Array(7).fill().map((_, index) => {
              const v = index < 3 ? year - 3 + index : index > 3 ? year + index - 3 : year;
              return (<option key={v} value={v} >{v}</option>);
            })}
          </select>
          <button onClick={switchNextYear} className='btn-switch-arrow'>&#8250;</button>
        </div>
      </header>

      {/* МЭПИНГ ДНЕЙ МЕСЯЦА */}
      <table className='table-date'>
        <thead>
          <tr className='table-date-month'>
            {weekDays.map((name, index) =>
              // решение с уникальными ключами для map элементов (складываем индекс + номер месяца + год)
              // потому что если использовать индекс массива можно столкнуться со множеством проблем (неуникальностью)
              <th key={`${index}${month}${year}`}>{name}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, index) => {
            return (
              <tr key={`${index}${month}${year}`} className='week'>
                {week.map(({ day, current, prev, next }) => {
                  // if (!day) return null;
                  // console.log("KEY", `${day}${month}${year}`);
                  // SOLUTION: когда ругается на null, то решение либо undefined либо пустой массив {}
                  return (
                    <td
                      style={current ? { color: 'red' } : prev || next ? { color: 'lightgray' } : {}} key={`${day}${prev ? month - 1 : next ? month + 1 : month}${year}`}>{day ? day : ""}
                    </td>);
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DateCalc;
