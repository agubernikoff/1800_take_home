import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], searchResults: [] },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSearchResults(state, action) {
      const searchText = action.payload;
      const filtered = state.posts.filter((p) =>
        p.title.toUpperCase().includes(searchText.toUpperCase())
      );
      if (!searchText) state.searchResults = [];
      else state.searchResults = filtered;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice;
