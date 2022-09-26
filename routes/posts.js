const express = require("express");
const router = express.Router();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/", async (req, res) => {
  const response = await fetch("http://jsonplaceholder.typicode.com/posts");
  const body = await response.json();
  res.json(body);
});

module.exports = router;
