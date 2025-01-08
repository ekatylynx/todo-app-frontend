import { calendar } from './backend';

export const getCalendar = (year, month) => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calendar(year, month));
    }, 0);
  });
};
