export const calendar = (year, month) => {
  
  
  // Какой день недели - число
  const getWeekDay = (year, month, day) => {
    // ВС, ПН, ВТ, СР, ЧТ, ПТ, СБ
    const days = [6, 0, 1, 2, 3, 4, 5];

    return days[new Date(year, month, day).getDay()];
  }

  // Сколько дней в месяце
  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  // Число недель в месяце
  const getWeeks = (year, month) => {
    const  d = new Date(year, month + 1, 0);
    return Math.ceil((d.getDate() - (d.getDay() ? d.getDay() : 7 )) / 7) + 1;
  };

  const indent = getWeekDay(year, month, 1);
  const days = daysInMonth(year, month + 1);
  const weeks = getWeeks(year, month);

  const data = [];
  let day = 1;

  const current = new Date();
  const isCurrent = current.getMonth() == month && current.getFullYear() == year;

  const prevDays = daysInMonth(year, month);

  for (let week = 1; week <= weeks; week++) {
    const w = [];

    let i = 1;

    for (let dayNum = 1; dayNum <= 7; dayNum++) {
      if (week === 1 && dayNum <= indent) {
        w.push({ day: prevDays - indent + dayNum, current: false, prev: true });
      } else if (day <= days) {
        w.push({ day, current: isCurrent && current.getDate() == day });
        day += 1;
      } else if (w.length < 7) {
        w.push({ day: i, current: false, next: true });
        i += 1;
      }
    }

    data.push(w);
  }

  return data;
};