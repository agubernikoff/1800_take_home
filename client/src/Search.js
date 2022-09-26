import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";

function Search() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(postsActions.setSearchResults(searchText));
  }, [dispatch, searchText]);
  return (
    <div className="search-container">
      <label>Search for a post by title: </label>
      <input
        type="search"
        size="70"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
    </div>
  );
}

export default Search;
