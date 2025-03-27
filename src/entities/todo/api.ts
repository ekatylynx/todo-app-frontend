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
      path: TODO_ENDPOINTS.CREATE_TODO,
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
