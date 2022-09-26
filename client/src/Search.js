import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AutocompleteOptions from "./AutocompleteOptions";
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
        list="options"
        size="70"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <AutocompleteOptions />
    </div>
  );
}

export default Search;
