import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Search from "./Search";

function Home() {
  const posts = useSelector((state) => state.posts.posts);

  const mappedPosts = [...posts].map((p) => <Post key={p.id} post={p} />);
  return (
    <div className="home">
      <Search />
      <div className="posts-container">{mappedPosts}</div>
    </div>
  );
}

export default Home;
