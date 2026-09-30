import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "../slice/authUserSlice";
import movieReducer from "../slice/movieSlice/movieSlice";
import userAuthStateReducer from "../slice/userStateSlice";
import likedMovieReducer from "../slice/movieLikeSlice/movieLikeSlice";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    userAuthState: userAuthStateReducer,
    movieData: movieReducer,
    likedMovie: likedMovieReducer,
  },
});

export default store;
