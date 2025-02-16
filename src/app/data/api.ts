const API_PATH = "http://127.0.0.1:8000/account";

interface CallOptions {
  path: string;
  method: string;
  data?: Record<string, any>;
  isAuth?: boolean;
}


// TODO: Решение проблемы с типом для headers

/*

Нужно решить проблему с headers
она связана с тем, что TypeScript не может автоматически преобразовать 
объект с типом { 'Content-Type': string; Authorization: string | undefined; } 
в тип HeadersInit, который ожидает fetch. Это происходит из-за того, 
что Authorization может быть undefined, что не соответствует ожидаемому типу.

*/

const call = ({ path, method, data, isAuth = true }: CallOptions): Promise<any> => {
  return fetch(`${API_PATH}${path}/`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": isAuth ? `Bearer ${localStorage.getItem("access")}` : undefined,
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then((data) => {
    if (isAuth && data?.code === "token_not_valid") {
      return refreshAccessToken()
        .then(() => {
          return call({ path, method, data, isAuth });
        });
    }

    return data;
  });
};

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

export const allTodos = async (): Promise<any> =>
  call({ path: "/todos", method: "GET" });
