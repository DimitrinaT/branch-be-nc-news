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
  test("test endpoint replies with status 404 when path is mispelt", () => {
    return request(app).get("/api/articless").expect(404);
  });
});
