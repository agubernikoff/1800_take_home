import React from "react";

function Post({ post }) {
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
      <button>Edit</button>
    </div>
  );
}

export default Post;
