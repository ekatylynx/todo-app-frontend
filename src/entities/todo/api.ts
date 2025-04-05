import { Todo } from "./model";
import { call } from "@/shared/api/api";
import { TODO_ENDPOINTS } from "@/shared/config/api";

// Todo Get All Queryset
export const allTodos = async (): Promise<Todo[]> =>
  call<Todo[]>({ path: TODO_ENDPOINTS.ALL_TODOS, method: "GET", re: false});

// Todo update status
export const updateStatusTodo = async (id: number, status: boolean): Promise<Todo[]> =>
  call({ path: TODO_ENDPOINTS.UPDATE_TODO(id), method: "PUT", data: { status },  re: false });

// Create New Task
export const createTask = async ({
  title,
  description,
  status,
  from_deadline,
  until_deadline,
  priority,
  categories,
}: {
  title: string;
  description: string;
  status: boolean;
  from_deadline?: string | null;
  until_deadline?: string | null;
  priority: string;
  categories?: number[];
}): Promise<Todo> => {
  try {
    const response = await call<Todo>({
      path: TODO_ENDPOINTS.CREATE_TODO,
      method: "POST",
      data: {
        title,
        description,
        status,
        from_deadline: from_deadline,
        until_deadline: until_deadline,
        priority,
        categories,
      },
      isAuth: true,
      re: false
    });
    return response; // Возвращаем созданную задачу
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
