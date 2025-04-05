import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/entities/todo/redux/todoSlice";
import categoriesReducer from "@/entities/category/redux/categoriesSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer,
  },
});

// Типизация для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;