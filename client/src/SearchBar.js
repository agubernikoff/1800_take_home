import React, { useState } from "react";
import Search from "./Search";
import AutocompleteOptions from "./AutocompleteOptions";

function SearchBar() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="search-container">
      <div className="search-input-container">
        <label>Search for a post by title: </label>
        <Search state={searchText} setter={setSearchText} />
      </div>
      <AutocompleteOptions />
    </div>
  );
}

export default SearchBar;
