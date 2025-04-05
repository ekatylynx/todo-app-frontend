import { User } from "../user/model";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  priority: string;
  created_at: string;
  updated_at?: string;
  from_deadline?: string | null;
  until_deadline?: string | null;
  categories: number[];
	created_at_moscow?: string;
}

// Типы для входных данных Todo
export interface CreateTodoPayload {
  title: string;
  description: string;
  priority: string;
  status: boolean;
  from_deadline?: string | null;
  until_deadline?: string | null;
  categories?: number[];
  updated_at?: string;
}

export interface ApiResponse {
  code?: string;
  message?: string;
  access?: string;
  refresh?: string;
  detail?: string;
  data?: Record<string, unknown>;
  todos?: Todo[]; // Добавьте это поле, если API может возвращать массив задач\
  user?: User;
  users?: User[];
}

export interface CallOptions {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: Record<string, unknown>;
  isAuth?: boolean;
  re: boolean;
}