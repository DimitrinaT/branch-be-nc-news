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

describe("/api/articles/:article_id/comments", () => {
  test("test endpoint replies with status 200 and returns an array of comment objects ", () => {
    return request(app)
      .get("/api/articles/6/comments")
      .expect(200)
      .then((response) => {
        response.body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
      });
  });

  test("test endpoint replies with status 404 when the provided id is not in the database", () => {
    return request(app)
      .get("/api/articles/76/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toEqual("Comment Not Found");
      });
  });
  test("response with status 400 and a massage when passed an id of incorect data type ", () => {
    return request(app)
      .get("/api/articles/apple/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("test endpoint replies with status 201 and returns an object of the posted comment ", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "lurker", body: "Hello Guys" })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment.body).toEqual("Hello Guys");
        expect(body.comment.article_id).toEqual(1);
        expect(body.comment.author).toEqual("lurker");
        expect(body.comment.votes).toEqual(0);
      });
  });
  test("test endpoint replies with status 400 and returns an error message of Article ID must be a number ", () => {
    return request(app)
      .post("/api/articles/apple/comments")
      .send({ username: "lurker", body: "Hello Guys" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Article ID must be a number");
      });
  });
  test("test endpoint replies with status 404 and returns an error message of Missing proper keys and values ", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: null, body: "Hello Guys" })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Missing proper keys and values");
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("test endpoint replies with status 200 and returns an object of the updated article (incrementing)", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 2,
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: "2020-10-16T05:03:00.000Z",
          votes: 1,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("test endpoint replies with status 200 and returns an object of the updated article (decrementing)", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: -1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 2,
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: "2020-10-16T05:03:00.000Z",
          votes: -1,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("test endpoint replies with status 404 and returns an error message of article not found", () => {
    return request(app)
      .patch("/api/articles/75")
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Article Not Found");
      });
  });
  test("test endpoint replies with status 400 and returns an error message of Article ID must be a number", () => {
    return request(app)
      .patch("/api/articles/apple")
      .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Article ID must be a number");
      });
  });
  test("test endpoint replies with status 400 and returns an error message of inc_votes must be a number", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: "apple" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("inc_votes must be a number");
      });
  });
  test("test endpoint replies with status 400 and returns an error message of Missing proper keys and values", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: null })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Missing proper keys and values");
      });
  });
});

describe("/api/users", () => {
  test("test endpoint replies with status 200 and returns an array of users objects ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body.users).toEqual(testData.userData);

        response.body.users.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });
  test("test endpoint replies with status 404 when path is mispelt", () => {
    return request(app)
      .get("/api/userss")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Path not found");
      });
  });
});

describe("/api/articles?topic=cats&sort_by=article_id&order=asc", () => {
  test("test endpoint replies with status 200 and returns an array of articles objects which have topics named cats and the data is ordered by ascending order and sorted by article_id", () => {
    return request(app)
      .get("/api/articles?topic=cats&sort_by=article_id&order=asc")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toEqual(1);
        expect(response.body.articles).toEqual([
          {
            article_id: 5,
            title: "UNCOVERED: catspiracy to bring down democracy",
            topic: "cats",
            author: "rogersop",
            body: "Bastet walks amongst us, and the cats are taking arms!",
            created_at: "2020-08-03T13:14:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: "2",
          },
        ]);
      });
  });
});

describe("/api/articles?sort_by=article_id&order=asc", () => {
  test("test endpoint replies with status 200 and returns an array of articles objects the data is ordered by ascending order and sorted by article_id", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=asc")
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

test("test endpoint replies with status 400 and returns an error message of order must be either asc or desc", () => {
  return request(app)
    .get("/api/articles?order=1")
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("order must be either asc or desc");
    });
});

test("test endpoint replies with status 404 and returns an error message of articles not found", () => {
  return request(app)
    .get("/api/articles?topic=mouse&order=asc")
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Articles not found");
    });
});
