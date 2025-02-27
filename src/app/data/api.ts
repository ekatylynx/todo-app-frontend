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

interface Categories {
  id: number;
  title: string;
  author: number;
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
const call = async ({ path, method, data, isAuth = true, re = false }: CallOptions): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    // credentials: 'include', // Включаем куки в запрос
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
  // console.log("RESPONSE DATA", responseData);

  if (isAuth && responseData?.code === "token_not_valid") {
    if (!re) {
      try {
        await refreshAccessToken();
        return call({ path, method, data, isAuth, re: true });
      } catch (err) {
        console.error("Auth refresh error", err);
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        window.location.reload();
      }
    } else {
      console.error("Error update token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
    }
  }

  return responseData;
};

// User Refresh Token
const refreshAccessToken = (): Promise<void> => {
  // const refresh = localStorage.getItem("refresh");
  // console.log("REFRESH TOKEN")
  return call({ 
    path: "/api/login/refresh", 
    method: "POST",
    data: { refresh: localStorage.getItem("refresh") }, 
    isAuth: false 
  }).then((data) => {
      // WARNING: DEBUG INFO ONLY
      // console.log("REFRESH", data);
      const { access } = data;
      if (access) {
        // console.log("REFRESH SUCCESS")
        localStorage.setItem("access", access);
        // console.log("IS RTEFRESH REFRESHED", prevRefresh , refresh)
        // localStorage.setItem("refresh", refresh);
        return Promise.resolve();
      } else {
        // {
        //   "detail": "Токен занесен в черный список",
        //   "code": "token_not_valid"
        // }
        return Promise.reject(data);
      }
    });
};

// // User Is Logined Check
export const isLogined = () => !!localStorage.getItem("refresh") && !!localStorage.getItem("access");


// User Sign In
export const signin = ({ email, password }: { 
  email: string; password: string }): Promise<void> => call({ 
    path: "/api/login",
    method: "POST", 
    data: { email, password }, 
    isAuth: false })
    .then(({ refresh, access }) => {
      // WARNING: DEBUG INFO ONLY
      // console.log("SIGNIN", refresh, access);
      if (refresh) localStorage.setItem("refresh", refresh);
      if (access) localStorage.setItem("access", access);
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
  call({ path: "/todos", method: "GET"});

// Categories Get All Queryset
export const allCategoriesUser = async (): Promise<Categories[]> =>
  call({ path: "/todos/categories", method: "GET"});

// Categories Get Filtered Queryset
export const allFilteredCategories = async (id): Promise<Todo[]> =>
  call({ path: `/todos/category/${id}`, method: "GET"});

// Create New Task
export const createTask = async ({
  title,
  description,
  status,
  deadlineFrom,
  deadlineTo,
  categories,
  author,
  priority,
}: {
  title: string;
  description: string;
  status: string;
  deadlineFrom?: string | null;
  deadlineTo?: string | null;
  categories: number;
  author: number;
  priority: number;
}): Promise<void> => {
  try {
    await call({
      path: "/todos/create",
      method: "POST",
      data: {
        title,
        description,
        status,
        deadline_from: deadlineFrom,
        deadline_to: deadlineTo,
        categories: categories,
        author: author,
        priority,
      },
      isAuth: true,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};