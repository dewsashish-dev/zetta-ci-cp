import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const userAuthState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },

    userLogout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, userLogout } = userAuthState.actions;

export default userAuthState.reducer;
