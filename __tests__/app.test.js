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
    return request(app).get("/api/topiks").expect(404);
  });
});
