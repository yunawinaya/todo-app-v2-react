import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setLoggedInUser: (state, action) => action.payload,
  },
});

export const { setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
