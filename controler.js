const fetchAllTopics = require("./model");

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

module.exports = getTopics;
