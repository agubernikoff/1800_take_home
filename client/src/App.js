import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postsActions } from "./store/posts-slice";
import "./App.css";
import Home from "./Home";
import EditForm from "./EditForm";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then((posts) => dispatch(postsActions.setPosts(posts)));
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/edit" element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default App;
