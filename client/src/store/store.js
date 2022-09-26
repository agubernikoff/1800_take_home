import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts-slice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export default store;
