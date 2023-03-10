const {
  fetchAllArticles,
  fetchAllTopics,
  fetchOneArticle,
  fetchCommentsByArticleId,
  addCommentByArticleId,
  updateArticleById,
  fetchAllUsers,
} = require("./model");

const getArticles = (req, res, next) => {
  const topic = req.query.topic || "";
  const sort_by = req.query.sort_by || "created_at";
  const order = req.query.order || "desc";
  fetchAllArticles(topic, sort_by, order)
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

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchOneArticle(article_id)
    .then((article) => {
      res.send({ article });
    })
    .catch((error) => {
      next(error);
    });
};

const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((error) => {
      next(error);
    });
};
const postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  addCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};

const patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};

const getUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getArticles,
  getTopics,
  getArticleById,
  getArticleComments,
  postArticleComment,
  patchArticleById,
  getUsers,
};
