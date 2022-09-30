import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";
import Search from "./Search";
import AutocompleteOptions from "./AutocompleteOptions";

function EditForm() {
  const searchResults = useSelector((state) => state.posts.searchResults);
  const clickedPost = useSelector((state) => state.posts.clickedPost);

  const dispatch = useDispatch();

  const nav = useNavigate();

  //if there is a clicked post the form populates with that post's information
  //if not the form loads with empty values in the inputs
  const [title, setTitle] = useState(clickedPost ? clickedPost.title : "");
  const [body, setBody] = useState(clickedPost ? clickedPost.body : "");
  const id = useRef();
  const userId = useRef();

  const [error, setError] = useState("");

  //title input acts as a searchbar so when an existing title is entered the rest of the form, as well as the post id and the userId, will populate with the post's information.
  //if the title input is cleared the body field and corresponding id and userId values will be reset and the user can search for a new post.
  useEffect(() => {
    if (
      searchResults[0] &&
      title.toLowerCase() === searchResults[0].title.toLowerCase()
    ) {
      setBody(searchResults[0].body);
      id.current = searchResults[0].id;
      userId.current = searchResults[0].userId;
    } else if (title === "" && !clickedPost) {
      setBody("");
      id.current = null;
      userId.current = null;
    }
  }, [clickedPost, searchResults, title]);

  //when the cancel button is clicked the clickedPost value is set back to null and the site navigates back to the homepage
  function handleCancel(e) {
    e.preventDefault();
    dispatch(postsActions.setClickedPost(null));
    nav("/");
  }

  function handleSubmit(e) {
    //an updatedPost object is created with the form's input values and the id/userId of either the clickedPost if there is one or the post that is found via searching for the title
    const updatedPost = {
      title: title,
      body: body,
      id: clickedPost ? clickedPost.id : id.current,
      userId: clickedPost ? clickedPost.userId : userId.current,
    };
    e.preventDefault();
    //if all of the updatedPost's values are correctly set the posts array is updated in the redux store,the clickedPost is reset, and the site navigates back to the homepage
    if (
      updatedPost.title &&
      updatedPost.body &&
      updatedPost.id &&
      updatedPost.userId
    ) {
      dispatch(postsActions.editPost(updatedPost));
      dispatch(postsActions.setClickedPost(null));
      nav("/");
    }
    //if the all of the updatedPost's values are not correctly set an error message is displayed for 5 seconds
    else {
      setError(
        "Please make sure you have correctly selected a post to edit and have not left any fields blank"
      );
      setTimeout(() => setError(""), 5000);
    }
  }

  return (
    <div className="form-container" data-testid="editForm">
      <h1>Edit A Post</h1>
      <form>
        <div className="input-container">
          <label>TITLE: </label>
          <Search
            state={title}
            setter={setTitle}
            placeholder="Enter a complete title or choose from the autcomplete list to select a post to edit"
          />
        </div>
        <div className="input-container">
          <label>BODY: </label>
          <textarea
            type="text"
            data-testid="body"
            // cols="71"
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
