import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todos/todoSlice";
import userReducer from "./features/todos/userSlice";
import counterReducer from "./features/todos/counterSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
    counter: counterReducer,
  },
});
