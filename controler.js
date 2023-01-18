const fetchAllArticles = require("./model");

const getArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      if (articles.length === 0) {
        res.status(404).send({ message: "Not Found" });
      } else {
        res.status(200).send({ articles: articles });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = getArticles;
