import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "./Post";
import Search from "./Search";

function Home() {
  const searchResults = useSelector((state) => state.posts.searchResults);

  const mappedPosts = [...searchResults].map((p) => (
    <Post key={p.id} post={p} />
  ));

  const nav = useNavigate();

  return (
    <div className="home">
      <div className="edit-a-post-btn">
        <button onClick={() => nav("/edit")}>Edit A Post</button>
      </div>
      <Search />
      <div className="posts-container">{mappedPosts}</div>
    </div>
  );
}

export default Home;
