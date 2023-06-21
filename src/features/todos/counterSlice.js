import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {}, // Initialize as an empty object
  reducers: {
    increment: (state, action) => {
      const { cardId } = action.payload;
      if (state[cardId]) {
        state[cardId] += 1;
      } else {
        state[cardId] = 1;
      }
    },
    reset: (state, action) => {
      const { cardId } = action.payload;
      state[cardId] = 0;
    },
  },
});

export const { increment, reset } = counterSlice.actions;

export default counterSlice.reducer;
