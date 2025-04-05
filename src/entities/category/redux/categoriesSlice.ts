import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Categories } from "@/entities/category/model";
import { Todo } from "@/entities/todo/model";
import { allCategoriesUser, allFilteredCategories } from "../api";

export const fetchCategories = createAsyncThunk<Categories[], void, { rejectValue: string }>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await allCategoriesUser();
      if (data && Array.isArray(data)) {
        return data;
      }
      return rejectWithValue("No categories received");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch categories";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchFilteredTodos = createAsyncThunk<
  { categoryId: number; todos: Todo[] },
  number,
  { rejectValue: string }
>(
  "categories/fetchFilteredTodos",
  async (categoryId, { rejectWithValue }) => {
    try {
      const todos = await allFilteredCategories(categoryId);
      if (todos && Array.isArray(todos)) {
        return { categoryId, todos };
      }
      return rejectWithValue("No filtered todos received");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch filtered todos";
      return rejectWithValue(errorMessage);
    }
  }
);

interface CategoriesState {
  categories: Categories[];
  filteredTodos: { [categoryId: number]: Todo[] };
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  filteredTodos: {},
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Categories[]>) => {
        state.loading = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Unknown error";
      });

    builder
      .addCase(fetchFilteredTodos.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        fetchFilteredTodos.fulfilled,
        (state, action: PayloadAction<{ categoryId: number; todos: Todo[] }>) => {
          state.loading = "succeeded";
          state.filteredTodos[action.payload.categoryId] = action.payload.todos;
        }
      )
      .addCase(fetchFilteredTodos.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

export default categoriesSlice.reducer;