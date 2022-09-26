import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Search from "./Search";
import AutocompleteOptions from "./AutocompleteOptions";

function EditForm() {
  const searchResults = useSelector((state) => state.posts.searchResults);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (searchResults[0] && title.toLowerCase() === searchResults[0].title)
      setBody(searchResults[0].body);
    else setBody("");
  }, [searchResults, title]);

  return (
    <div className="form-container">
      <form>
        <label>TITLE: </label>
        <Search state={title} setter={setTitle} />
        <label>BODY: </label>
        <input
          value={body}
          type="text"
          onChange={(e) => setBody(e.target.value)}
        ></input>
      </form>
      <AutocompleteOptions />
    </div>
  );
}

export default EditForm;
