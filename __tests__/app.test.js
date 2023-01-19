const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("/api/articles", () => {
  test("test endpoint replies with status 200 and returns an array of articles objects ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toEqual(
          testData.articleData.length
        );
        response.body.articles.forEach((article) => {
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("comment_count");
          expect(article).toHaveProperty("article_id");
        });
      });
  });
});
describe("/api/topics", () => {
  test("test endpoint replies with status 200 and returns an array of topic objects ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics).toEqual(testData.topicData);

        response.body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("description");
          expect(topic).toHaveProperty("slug");
        });
      });
  });
  test("test endpoint replies with status 404 when path is mispelt", () => {
    return request(app)
      .get("/api/topiks")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Path not found");
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("test endpoint replies with status 200 and returns one article object ", () => {
    return request(app)
      .get("/api/articles/6")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("article_img_url");
        expect(article).toHaveProperty("article_id");
      });
  });

  test("test endpoint replies with status 404 when the provided id is not in the database", () => {
    return request(app)
      .get("/api/articles/70")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article id not found");
      });
  });
  test("response with status 400 and a massage when passed an id of incorect data type ", () => {
    return request(app)
      .get("/api/articles/apple")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});
