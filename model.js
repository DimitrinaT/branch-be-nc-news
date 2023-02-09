const db = require("./db/connection");

const fetchAllArticles = () => {
  return db
    .query(
      `SELECT articles.*,COUNT(comments.comment_id) as comment_count 
       FROM articles LEFT JOIN comments on articles.article_id = comments.article_id GROUP BY articles.article_id
       ORDER BY articles.created_at DESC`
    )
    .then((result) => {
      return result.rows;
    });
};

const fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

const fetchOneArticle = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE articles.article_id=$1`, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article id not found" });
      }

      return result.rows[0];
    });
};

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE comments.article_id=$1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found" });
      }

      return result.rows;
    });
};

const addCommentByArticleId = (article_id, username, body) => {
  if (article_id === null || username === null || body === null) {
    return Promise.reject({
      status: 404,
      msg: "Missing proper keys and values",
    });
  }

  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Article ID must be a number" });
  }
  return db
    .query(
      `INSERT INTO comments (article_id,author,body) VALUES ($1,$2,$3) RETURNING *;`,
      [article_id, username, body]
    )
    .then((result) => {
      return result.rows[0];
    });
};

const updateArticleById = (article_id, inc_votes) => {
  if (article_id === null || inc_votes === null) {
    return Promise.reject({
      status: 404,
      msg: "Missing proper keys and values",
    });
  }
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Article ID must be a number" });
  } else if (isNaN(inc_votes)) {
    return Promise.reject({ status: 400, msg: "inc_votes must be a number" });
  }

  return db
    .query(
      `UPDATE articles SET votes = votes + ($1) WHERE article_id = ($2) RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      return result.rows[0];
    });
};

const fetchAllUsers = () => {
  return db.query(`SELECT * FROM users;`).then((result) => {
    if (result.rows.lenght === 0) {
      return Promise.reject({ status: 404, msg: "Users Not Found" });
    }
    return result.rows;
  });
};

module.exports = {
  fetchAllTopics,
  fetchAllArticles,
  fetchOneArticle,
  fetchCommentsByArticleId,
  addCommentByArticleId,
  updateArticleById,
  fetchAllUsers,
};
