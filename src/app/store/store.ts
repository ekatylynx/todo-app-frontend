// // store.js

import { configureStore } from '@reduxjs/toolkit';
// import categoriesReducer from '../features/categories/categoriesSlice';
// import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    // categories: categoriesReducer,
    // todos: todosReducer,
  },
});