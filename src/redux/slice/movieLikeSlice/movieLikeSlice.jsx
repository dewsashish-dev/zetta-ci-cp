import { createSlice } from "@reduxjs/toolkit";

const movieLikes = createSlice({
  name: "likedMovie",
  initialState: [],
  reducers: {
    toggleLike(state, action) {
      const productId = action.payload;
      const index = state.indexOf(productId);

      if (index === -1) {
        state.push(productId);
      } else {
        state.splice(index, 1);
      }
    },
    resetLike() {
      return [];
    },
  },
});

export const { toggleLike, resetLike } = movieLikes.actions;

export default movieLikes.reducer;
