import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";

function Search({ state, setter, placeholder }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsActions.setSearchResults(state));
  }, [dispatch, state]);
  return (
    <input
      type="search"
      list="options"
      size="73"
      value={state}
      placeholder={placeholder}
      onChange={(e) => setter(e.target.value)}
    ></input>
  );
}

export default Search;
