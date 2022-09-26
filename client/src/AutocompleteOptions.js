import React from "react";
import { useSelector } from "react-redux";

function AutocompleteOptions() {
  const posts = useSelector((state) => state.posts.posts);

  const options = [...posts].map((p) => (
    <option key={p.id}>
      {p.title
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
    </option>
  ));

  return <datalist id="options">{options}</datalist>;
}

export default AutocompleteOptions;
