const API_PATH = "http://127.0.0.1:8000/account";

/**
 * TODO: 
 * - Проанализировать пришедший ответ от сервера и
 * - добавить типы для Todo
 * - разобраться с типами данных для timestamp и научиться корректно записывать его с фронта на бэк
 */

// ==================== Types ====================
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
  deadline_from: string | null;
  deadline_to: string | null;
  categories: number[];
}

interface Categories {
  id: number;
  title: string;
  author: number;
}
// interface AuthResponse {
//   refresh: string;
//   access: string;
// }

interface ApiResponse {
  code?: string;
}
// interface MessageResponse {
//   message?: string; // Интерфейс для ответа при регистрации
// }

// ==================== Basic Type Requests ====================
interface CallOptions {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: Record<string, unknown>;
  isAuth?: boolean;
  re: boolean;
}


const call = async ({ path, method, data, isAuth = true, re = false }: CallOptions): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    // credentials: 'include', // Включаем куки в запрос, если необходимо
  };

  // если isAuth true - добавляет auth заголовки + токены
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

  // Если isAuth true и в ответе есть code: "token_not_valid":
  if (isAuth && responseData?.code === "token_not_valid") {
    if (!re) { // Если это первая попытка (re = false), пытается обновить токен через refreshAccessToken() и повторяет запрос.
      try {
        await refreshAccessToken();
        return call({ path, method, data, isAuth, re: true });
      } catch (err) {
        console.error("Auth refresh error", err);
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        window.location.reload();
      }
    } else { // Если вторая попытка (re = true), удаляет токены из localStorage и перезагружает страницу.
      console.error("Error update token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
    }
  }

  return responseData;   //  Возвращает responseData (результат запроса или ошибку).
};


// User Refresh Token
const refreshAccessToken = (): Promise<void> => {
  // console.log("REFRESH TOKEN")
  return call({ 
    path: "/api/login/refresh", // POST-запрос с текущим refresh-токеном.
    method: "POST",
    data: { refresh: localStorage.getItem("refresh") }, 
    isAuth: false,
    re: false
  }).then((data) => {
      // WARNING: DEBUG INFO ONLY
      // console.log("REFRESH", data);
      const { access } = data;
      if (access) {
        // console.log("REFRESH SUCCESS")
        localStorage.setItem("access", access); // При успехе сохраняет новый access-токен в localStorage.
        // console.log("IS RTEFRESH REFRESHED", prevRefresh , refresh)
        return Promise.resolve();
      } else {
        return Promise.reject(data);
      }
    });
};

// // User Is Logined Check
export const isLogined = () => !!localStorage.getItem("refresh") && !!localStorage.getItem("access"); //     Логика: Возвращает true, если в localStorage есть оба токена (refresh и access).


// User Sign In
export const signin = ({ email, password }: { 
  email: string; password: string }): Promise<void> => call({ 
    path: "/api/login",
    method: "POST", 
    data: { email, password }, 
    isAuth: false,
    re: false })
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
      re: false })
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
  call({ path: "/todos", method: "GET", re: false});

// Categories Get All Queryset
export const allCategoriesUser = async (): Promise<Categories[]> =>
  call({ path: "/todos/categories", method: "GET", re: false});

// Categories Get Filtered Queryset
export const allFilteredCategories = async (id: number): Promise<Todo[]> =>
  call({ path: `/todos/category/${id}`, method: "GET", re: false});

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
      re: false
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};


export const updateStatusTodo = async (id, status): Promise<Todo[]> =>
  call({ path: `/todos/${id}/update-status`, method: "PUT", data: { status },  re: false });