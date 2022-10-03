import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";

function Post({ post }) {
  const dispatch = useDispatch();

  const nav = useNavigate();

  //when the edit button is clicked the clickedPost value is set to that of this post and the site navigates to the edit form
  function handleClick() {
    dispatch(postsActions.setClickedPost(post));
    nav("/edit");
  }

  function handleDelete() {
    dispatch(postsActions.deletePost(post));
  }
  return (
    <div className="post" data-testid="post">
      <h2>
        {post.title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h2>
      <p>{post.body}</p>
      <p>By User {post.userId}</p>
      <button onClick={handleClick}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Post;
