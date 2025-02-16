// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { getTasks, addTask } from "../services/tasksService";

// // Определяем интерфейс задачи
// interface Task {
//   id: number;
//   title: string;
// }

// // Начальное состояние
// interface TasksState {
//   list: Task[];
//   loading: boolean;
// }

// const initialState: TasksState = {
//   list: [],
//   loading: false,
// };

// // Асинхронное получение задач
// export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
//   return await getTasks();
// });

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     addNewTask(state, action: PayloadAction<Task>) {
//       state.list.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.list = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchTasks.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const { addNewTask } = tasksSlice.actions;
// export default tasksSlice.reducer;
