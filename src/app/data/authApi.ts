import { fetchAuthApi } from "./api";

export const login = async (email: string, password: string) => {
  console.log('Login function called with:', { email, password }); // Добавим отладочный вывод
  try {
    const data = await fetchAuthApi("login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Если есть токены, сохраняем их в localStorage
    if (data?.access && data?.refresh) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    }
    
    return data;
    console.log('Success:', data);
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
};
