import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";

function Search({ state, setter, placeholder }) {
  const dispatch = useDispatch();

  //as the local state of this input field changes it is sent to the redux store where it will be used to filter the posts state to find a matching post
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
