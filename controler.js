const { fetchAllArticles, fetchAllTopics } = require("./model");

const getArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((error) => {
      next(error);
    });
};

const getTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics: topics });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getArticles, getTopics };
