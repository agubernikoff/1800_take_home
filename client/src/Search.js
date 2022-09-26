import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "./store/posts-slice";

function Search() {
  const posts = useSelector((state) => state.posts.posts);

  const options = [...posts].map((p) => (
    <option key={p.id}>
      {p.title
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
    </option>
  ));

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
      <datalist id="options">{options}</datalist>
    </div>
  );
}

export default Search;
