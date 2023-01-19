const express = require("express");
const app = express();
const getArticles = require("./controler");

app.get("/api/articles", getArticles);
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

module.exports = app;
