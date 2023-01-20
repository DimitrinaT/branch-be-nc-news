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
      console.log(result.rows);
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found" });
      }

      return result.rows;
    });
};

module.exports = {
  fetchAllTopics,
  fetchAllArticles,
  fetchOneArticle,
  fetchCommentsByArticleId,
};
