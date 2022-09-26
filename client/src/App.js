import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then((posts) => console.log(posts));
  }, []);
  return <div className="App"></div>;
}

export default App;
