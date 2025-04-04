export const API_PATH = "http://127.0.0.1:8000/account";

// настройки, связанные с API
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  REFRESH: '/api/login/refresh',
};

export const TODO_ENDPOINTS = {
  ALL_TODOS: '/todos',
  CREATE_TODO: '/todos/create',
  UPDATE_TODO: (id: number) => `/todos/${id}/update-status`,
};

export const CATEGORY_ENDPOINTS = {
  ALL_CATEGORIES: '/todos/categories',
  ALL_FILTERED_CATEGORIES: (id: number) => `/todos/category/${id}`,
};

export const USER_ENDPOINTS = {
  GET_USER_DATA: '/api/user/profile',
};