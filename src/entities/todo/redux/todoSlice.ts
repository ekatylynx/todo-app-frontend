import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Todo } from "../model";
import { allTodos, updateStatusTodo } from "../api";

// Асинхронный thunk для получения всех задач
export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const data = await allTodos();
      if (data && Array.isArray(data)) {
        return data;
      }
      return rejectWithValue("No data received");
    } catch {
      return rejectWithValue("Failed to fetch todos");
    }
  }
);

// Асинхронный thunk для обновления статуса задачи
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
    } catch {
      return rejectWithValue("Failed to update todo status");
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
  reducers: {
    // Можно добавить дополнительные редюсеры, если это требуется
  },
  extraReducers: (builder) => {
    // Обработка fetchTodos
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

    // Обработка updateTodoStatus
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
  },
});

export default todosSlice.reducer;