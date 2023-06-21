import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    updateTodo: (state, action) => {
      const { id, title, description, sets, completed } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.description = description;
        todo.sets = sets;
        todo.completed = completed;
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
