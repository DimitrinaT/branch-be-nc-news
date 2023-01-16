# How to create the necessary environment variables

There are two databases in this project. One for real looking dev data and another for simpler test data.

1. Create two new files named ".env" in the root directory of your local repository, .env.test and .env.development.

2. In the ".env" files, add the environment variables needed for your project in the following format: PGDATABASE=<database_name_here>.
   with the correct database name for that environment (see /db/setup.sql for the database names).

3. Make sure to add ".env" to your ".gitignore" file to prevent sensitive information from being committed to your repository.

4. Run npm install.
