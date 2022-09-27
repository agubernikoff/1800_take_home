import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";
import Search from "./Search";
import AutocompleteOptions from "./AutocompleteOptions";

function EditForm() {
  const searchResults = useSelector((state) => state.posts.searchResults);
  const clickedPost = useSelector((state) => state.posts.clickedPost);

  const [title, setTitle] = useState(clickedPost ? clickedPost.title : "");
  const [body, setBody] = useState(clickedPost ? clickedPost.body : "");
  const id = useRef();
  const userId = useRef();

  const [error, setError] = useState("");

  console.log(title, body, id, userId);

  useEffect(() => {
    if (searchResults[0] && title.toLowerCase() === searchResults[0].title) {
      setBody(searchResults[0].body);
      id.current = searchResults[0].id;
      userId.current = searchResults[0].userId;
    } else if (title === "" && !clickedPost) {
      setBody("");
      id.current = null;
      userId.current = null;
    }
  }, [clickedPost, searchResults, title]);

  const dispatch = useDispatch();

  const nav = useNavigate();

  function handleCancel(e) {
    e.preventDefault();
    dispatch(postsActions.setClickedPost(null));
    nav("/");
  }

  function handleSubmit(e) {
    const updatedPost = {
      title: title,
      body: body,
      id: clickedPost ? clickedPost.id : id.current,
      userId: clickedPost ? clickedPost.userId : userId.current,
    };
    e.preventDefault();
    if (
      updatedPost.title &&
      updatedPost.body &&
      updatedPost.id &&
      updatedPost.userId
    ) {
      dispatch(postsActions.editPost(updatedPost));
      dispatch(postsActions.setClickedPost(null));
      nav("/");
    } else {
      setError(
        "Please make sure you have correctly selected a post to edit and have not left any fields blank"
      );
      setTimeout(() => setError(""), 5000);
    }
  }

  return (
    <div className="form-container">
      <h1>Edit A Post</h1>
      <form>
        <div>
          <label>TITLE: </label>
          <Search
            state={title}
            setter={setTitle}
            placeholder="Enter a complete title or choose from the autcomplete list to select a post to edit"
          />
        </div>
        <div className="body-input-container">
          <label>BODY: </label>
          <textarea
            type="text"
            cols="71"
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="form-btn-container">
          <button onClick={(e) => handleCancel(e)}>CANCEL</button>
          <button onClick={(e) => handleSubmit(e)}>SUBMIT</button>
        </div>
      </form>
      {error ? <p>{error}</p> : null}
      <AutocompleteOptions />
    </div>
  );
}

export default EditForm;
