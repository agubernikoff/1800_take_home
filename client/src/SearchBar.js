import React, { useState } from "react";
import Search from "./Search";
import AutocompleteOptions from "./AutocompleteOptions";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="search-container">
      <label>Search for a post by title: </label>
      <Search state={searchText} setter={setSearchText} />
      <AutocompleteOptions />
    </div>
  );
}

export default SearchBar;
