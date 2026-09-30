import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    email: "ashishnikhil@gmail.com",
    name: "Ashish Nikhil",
    type: "seller",
  },
];

const authUserSlice = createSlice({
  name: "authUser",
  initialState,

  reducers: {
    addUser: (state, action) => {
      const userExists = state.some(
        (user) => user.email === action.payload.email,
      );

      if (!userExists) {
        state.push(action.payload);
      }
    },
  },
});

export const { addUser } = authUserSlice.actions;

export default authUserSlice.reducer;
