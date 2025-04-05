import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { allTodos, updateStatusTodo, createTask } from "../api";

import { Todo, CreateTodoPayload } from "../model";

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const data = await allTodos();
      if (data && Array.isArray(data)) {
        return data;
      }
      return rejectWithValue("No data received");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch todos";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTodoStatus = createAsyncThunk<
  { id: number; status: boolean },
  { id: number; status: boolean },
  { rejectValue: string }
>(
  "todos/updateTodoStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await updateStatusTodo(id, status);
      return { id, status };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update todo status";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createTodo = createAsyncThunk<Todo, CreateTodoPayload, { rejectValue: string }>(
  "todos/createTodo",
  async (newTodo, { rejectWithValue }) => {
    try {
      const createdTodo = await createTask({
        title: newTodo.title,
        description: newTodo.description,
        priority: newTodo.priority,
        status: newTodo.status,
        from_deadline: newTodo.from_deadline,
        until_deadline: newTodo.until_deadline,
        categories: newTodo.categories,
      });
      console.log("API response from createTask:", createdTodo); // Для диагностики
      // Формируем полный объект Todo
      const completeTodo: Todo = {
        id: createdTodo.id,
        title: createdTodo.title,
        description: createdTodo.description,
        priority: createdTodo.priority,
        status: createdTodo.status,
        from_deadline: createdTodo.from_deadline,
        until_deadline: createdTodo.until_deadline,
        categories: createdTodo.categories || newTodo.categories || [],
        created_at: createdTodo.created_at || new Date().toISOString(),
      };
      return completeTodo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create todo";
      return rejectWithValue(errorMessage);
    }
  }
);

interface TodosState {
  todos: Todo[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: "idle",
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Unknown error";
      });

    builder
      .addCase(updateTodoStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateTodoStatus.fulfilled,
        (state, action: PayloadAction<{ id: number; status: boolean }>) => {
          const { id, status } = action.payload;
          state.todos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, status } : todo
          );
        }
      )
      .addCase(updateTodoStatus.rejected, (state, action) => {
        state.error = action.payload || "Unknown error";
      });

    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = "succeeded";
        state.todos.push(action.payload); // Добавляем новую задачу в список
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

export default todosSlice.reducer;