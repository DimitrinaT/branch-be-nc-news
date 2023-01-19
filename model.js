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

module.exports = {fetchAllTopics, fetchAllArticles}

