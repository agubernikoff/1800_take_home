import React from "react";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const nav = useNavigate();
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
      <button onClick={() => nav("/edit")}>Edit</button>
    </div>
  );
}

export default Post;
