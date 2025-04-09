import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/entities/todo/redux/todoSlice";
import categoriesReducer from "@/entities/category/redux/categoriesSlice";

import sidebarReducer from '@/app/model/sidebarSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer,
    sidebar: sidebarReducer,
  },
});

// Типизация для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;