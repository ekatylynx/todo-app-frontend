import { rejects } from "assert";

const API_PATH = "http://127.0.0.1:8000/account";

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





// const call = ({ path, method, data, isAuth = true }: CallOptions): Promise<any> => {
//   return fetch(`${API_PATH}${path}/`, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": isAuth ? `Bearer ${localStorage.getItem("access")}` : undefined,
//     },
//     body: JSON.stringify(data),
//   })
//   .then(res => res.json())
//   .then((data) => {
//     if (isAuth && data?.code === "token_not_valid") {
//       return refreshAccessToken()
//         .then(() => {
//           return call({ path, method, data, isAuth });
//         });
//     }

//     return data;
//   });
// };






const refreshAccessToken = (): Promise<void> => call({ 
  path: "/api/login/refresh", 
  method: "POST", 
  data: { refresh: localStorage.getItem("refresh") }, 
  isAuth: false 
}).then(({ access }) => {
    localStorage.setItem("access", access);
  });

export const isLogined = () => !!localStorage.getItem("refresh") && !!localStorage.getItem("access");

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


    export const signup = ({ email, password }: { email: string; password: string }): Promise<void> => {
      return new Promise((resolve, reject) => {
        call({
          path: "/api/register",
          method: "POST",
          data: { email, password },
          isAuth: false, // не крепим к запросу авторизационный заголовок с токенами
        })
        .then(({ message, email, password }) => {
          if (message) {
            resolve({ message});
          } else {
            reject({ message: email || password });
          }
        })
      });
    };


export const allTodos = async (): Promise<any> =>
  call({ path: "/todos", method: "GET" });
