import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todos/todoSlice";
import userSlice from "./features/todos/userSlice";

export default configureStore({
  reducer: {
    todos: todoSlice,
    user: userSlice,
  },
});
