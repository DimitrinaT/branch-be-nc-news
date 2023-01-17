const express = require("express");
const app = express();
const getTopics = require("./controler");

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});
module.exports = app;
