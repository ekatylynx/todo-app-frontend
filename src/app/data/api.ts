const API_PATH = "http://127.0.0.1:8000/account";

/**
 * TODO: 
 * - Проанализировать пришедший ответ от сервера и
 * - добавить типы для Todo
 * - разобраться с типами данных для timestamp и научиться корректно записывать его с фронта на бэк
 */

// Определяем интерфейс для данных Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  // Добавьте другие поля, если они есть в вашем API
}

interface CallOptions {
  path: string;
  method: string;
  data?: Record<string, any>;
  isAuth?: boolean;
}
interface AuthResponse {
  refresh: string;
  access: string;
}

interface ApiResponse {
  code?: string;
}
interface MessageResponse {
  message?: string; // Интерфейс для ответа при регистрации
}

// Template Api
const call = async ({ path, method, data, isAuth = true }: CallOptions): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (isAuth) {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(`${API_PATH}${path}/`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  const responseData: ApiResponse = await response.json();

  if (isAuth && responseData?.code === "token_not_valid") {
    await refreshAccessToken();
    return call({ path, method, data, isAuth });
  }

  return responseData;
};

// User Refresh Token
const refreshAccessToken = (): Promise<void> => call({ 
  path: "/api/login/refresh", 
  method: "POST", 
  data: { refresh: localStorage.getItem("refresh") }, 
  isAuth: false 
}).then(({ access }) => {
    localStorage.setItem("access", access);
  });

// User Is Logined Check
export const isLogined = () => !!localStorage.getItem("refresh") && !!localStorage.getItem("access");

// User Sign In
export const signin = ({ email, password }: { 
  email: string; password: string }): Promise<void> => call({ 
    path: "/api/login", 
    method: "POST", 
    data: { email, password }, 
    isAuth: false })
    .then(({ refresh, access }) => {
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
    });

// User Sign Up
export const signup = ({ email, password }: { email: string; password: string }): Promise<void> => {
  return new Promise((resolve, reject) => {
    call({
      path: "/api/register",
      method: "POST",
      data: { email, password },
      isAuth: false,
    })
    .then(({ message, email, password }) => {
      if (message) {
        resolve(message);
      } else {
        reject({ message: email || password });
      }
    })
    .catch((error) => {
      reject({ message: email || password || "An error occurred during registration" });
    });
  });
};

// Todo Get All Queryset
export const allTodos = async (): Promise<Todo[]> =>
  call({ path: "/todos", method: "GET" });
