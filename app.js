const express = require("express");
const app = express();
const getArticles = require("./controler");

app.get("/api/articles", getArticles);
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

module.exports = app;

// Responds with:

// an articles array of article objects, each of which should have the following properties:

// author
// title
// article_id
// topic
// created_at
// votes
// article_img_url
// comment_count which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this.
// the articles should be sorted by date in descending order
