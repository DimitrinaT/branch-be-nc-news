const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getArticleById,
  getArticleComments,
  postArticleComment,
  patchArticleById,
} = require("./controler");

app.use(express.json());

app.get("/api/articles", getArticles);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postArticleComment);
app.patch("/api/articles/:article_id", patchArticleById);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

module.exports = app;
