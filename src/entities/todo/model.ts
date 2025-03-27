export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
  deadline_from?: string | null;
  deadline_to?: string | null;
  categories: number[];
  status: boolean;
	created_at_moscow: string;
}

export interface ApiResponse {
  code?: string;
  message?: string;
  access?: string;
  refresh?: string;
  data?: Record<string, unknown>;
  todos?: Todo[]; // Добавьте это поле, если API может возвращать массив задач
}

export interface CallOptions {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: Record<string, unknown>;
  isAuth?: boolean;
  re: boolean;
}