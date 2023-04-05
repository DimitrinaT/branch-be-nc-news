# NC-NEWS API

NC-News API is a RESTful API that allows users to interact with the NC-News website's data. The API provides various endpoints that enable users to read, post, and modify data such as articles, comments, topics, and users.

## Installation

1. Clone this repository to your local machine via your terminal using command _'git clone https://github.com/DimitrinaT/branch-be-nc-news.git'_ in your chosen directory location.

2. Navigate into the cloned directory 'cd be-nc-news'

3. Run 'npm install' to install all dependencies.

4. Create two new files named ".env" in the root directory of your local repository, .env.test and .env.development.

5. In the ".env" files, add the environment variables needed for the API to access the development and test databases:

- **.env.development** - add 'PGDATABASE=nc_news' to set access to a developer database.

- **.env.test** - add 'PGDATABASE=nc_news_test' to set access to the test database when Jest is running

6. You can run the tests via command 'npm test'.

7. Use command 'npm run seed' to seed your local development database.

8. Use command 'npm start' to start the app on local port 9090. Software such as Insomnia can then be used to test app features on the development database.

## URL

The production version of NC-NEWS API is hosted via Render and can be accessed at the following URL:

https://dimitrina-news.onrender.com

## API Endpoints

The following endpoints are available on the API:

- 'GET /api/articles' - returns all the articles in the database. Accepts the following query parameters: - topic: Filters the articles by topic - sort_by: Sorts the articles by the specified column (default is created_at) - order: Specifies the order to sort the articles in (asc or desc, default is desc).
- 'GET /api/topics' - returns all the topics in the database.
- 'GET /api/articles/:article_id' - returns the article with the specified ID.
- 'GET /api/articles/:article_id/comments' - returns all the comments for the article with the specified ID.
- 'POST /api/articles/:article_id/comments' - adds a comment to the article with the specified ID.
- 'PATCH /api/articles/:article_id'- updates the vote count for the article with the specified ID.
- 'GET /api/users' - returns all the users in the database.
