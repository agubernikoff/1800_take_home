import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice;
