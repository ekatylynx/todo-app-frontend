import { API_PATH } from "../config/api";
import { AUTH_ENDPOINTS } from "../config/api";

import { CallOptions, ApiResponse } from "@/entities/todo/model";

export const call = async <T>({ path, method, data, isAuth = true, re = false }: CallOptions): Promise<T> => {
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

  const responseData: T = await response.json();
  // console.log("RESPONSE DATA", responseData);

  // Если isAuth true и в ответе есть code: "token_not_valid":
  if (isAuth && (responseData as ApiResponse)?.code === "token_not_valid") {
    if (!re) { // Если это первая попытка (re = false), пытается обновить токен через refreshAccessToken() и повторяет запрос.
      try {
        await refreshAccessToken();
        return call<T>({ path, method, data, isAuth, re: true });
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
export const refreshAccessToken = (): Promise<void> => {
  // console.log("REFRESH TOKEN")
  return call<ApiResponse>({
    path: AUTH_ENDPOINTS.REFRESH, // POST-запрос с текущим refresh-токеном.
    method: "POST",
    data: { refresh: localStorage.getItem("refresh") }, 
    isAuth: false,
    re: false
  }).then((data) => {
      // console.log("REFRESH", data);
      const { access } = data;
      if (access) {
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
