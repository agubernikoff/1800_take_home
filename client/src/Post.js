import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";

function Post({ post }) {
  const dispatch = useDispatch();

  const nav = useNavigate();

  function handleClick() {
    dispatch(postsActions.setClickedPost(post));
    nav("/edit");
  }
  return (
    <div className="post">
      <h2>
        {post.title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h2>
      <p>{post.body}</p>
      <p>By User {post.userId}</p>
      <button onClick={handleClick}>Edit</button>
    </div>
  );
}

export default Post;
