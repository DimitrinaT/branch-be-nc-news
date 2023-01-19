const { fetchAllArticles, fetchAllTopics } = require("./model");

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

const getTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      if (topics.length === 0) {
        res.status(404).send({ message: "Not Found" });
      } else {
        res.status(200).send({ topics: topics });
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getArticles, getTopics };
