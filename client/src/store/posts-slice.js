import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], searchResults: [], clickedPost: null },
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
    setClickedPost(state, action) {
      state.clickedPost = action.payload;
    },
    editPost(state, action) {
      const updatedPost = action.payload;
      const filtered = state.posts.filter((p) => p.id !== updatedPost.id);
      const updatedPosts = [...filtered, updatedPost];
      const sorted = updatedPosts.sort((a, b) => a.id - b.id);
      state.posts = sorted;
    },
    deletePost(state, action) {
      const deletedPost = action.payload;
      const filtered = state.posts.filter((p) => p.id !== deletedPost.id);
      const filteredSearch = state.searchResults.filter(
        (p) => p.id !== deletedPost.id
      );
      state.posts = filtered;
      state.searchResults = filteredSearch;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice;
