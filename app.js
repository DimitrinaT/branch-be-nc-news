const express = require("express");
const app = express();
const { getTopics, getArticles } = require("./controler");

app.get("/api/articles", getArticles);
app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

module.exports = app;
