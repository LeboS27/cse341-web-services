# Week 03 Project: Project 2 Part 1 Video Script

Use this script for the Week 03 Project 2 Part 1 CRUD Operations video.

## Links To Submit

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Project 2 API on Render: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
- YouTube video link: paste your unlisted YouTube link after upload

## Before Recording

Open these tabs:

1. Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
2. Books endpoint: <https://cse341-project2-crud-api-zoq8.onrender.com/books>
3. Authors endpoint: <https://cse341-project2-crud-api-zoq8.onrender.com/authors>
4. GitHub repository: <https://github.com/LeboS27/cse341-web-services>
5. MongoDB Atlas or Compass, opened to the Project 2 database.

Do not show the real MongoDB connection string or database password.

## Video Goal

The video should prove these rubric items:

- The API has at least two collections.
- At least one collection has seven or more fields.
- Each collection has working CRUD routes.
- Swagger documents the routes.
- Validation rejects bad data.
- Error handling returns clear responses.
- The API is deployed on Render.
- Secrets are not stored in GitHub.

## Full Script

Hello, my name is Lebo. This is my CSE 341 Week 03 Project 2 Part 1 CRUD Operations project.

For this project, I built a small library API using Node.js, Express, MongoDB, and Swagger. The API is deployed on Render, and the database is stored in MongoDB Atlas.

The project has two MongoDB collections:

- `books`
- `authors`

The `books` collection has more than seven fields, including title, author name, ISBN, genre, published year, pages, language, availability, and rating.

Now I will show the published API. This is the Render link:

```text
https://cse341-project2-crud-api-zoq8.onrender.com
```

This is not localhost, so the project is running online.

Next, I will open the Swagger documentation:

```text
https://cse341-project2-crud-api-zoq8.onrender.com/api-docs
```

In Swagger, I can see route groups for books and authors. Each collection has the required CRUD routes.

For books, the API has:

- `GET /books`
- `GET /books/{id}`
- `POST /books`
- `PUT /books/{id}`
- `DELETE /books/{id}`

For authors, the API has:

- `GET /authors`
- `GET /authors/{id}`
- `POST /authors`
- `PUT /authors/{id}`
- `DELETE /authors/{id}`

Now I will test the books routes.

First, I open `GET /books`, click `Try it out`, and click `Execute`.

This returns all books from MongoDB. I can see JSON data, and each book includes the required fields. I will copy one `_id` value so I can test the get-by-id route.

Next, I open `GET /books/{id}`, paste that id, and click `Execute`.

This returns one book by its MongoDB ObjectId. That proves the API can read one specific document.

Now I will create a book using `POST /books`.

I click `Try it out` and use this JSON:

```json
{
  "title": "Temporary Week 03 Demo Book",
  "authorName": "Demo Author",
  "isbn": "9780000000003",
  "genre": "Education",
  "publishedYear": 2026,
  "pages": 210,
  "language": "English",
  "available": true,
  "rating": 4.5
}
```

When I execute the request, Swagger returns status `201`. That means the book was created.

Now I switch to MongoDB Atlas or Compass and refresh the `books` collection.

The new book appears in MongoDB. This proves the POST route updates the database.

Next, I copy the new book id and test `PUT /books/{id}`.

I paste the id and use this updated JSON:

```json
{
  "title": "Temporary Week 03 Demo Book Updated",
  "authorName": "Demo Author",
  "isbn": "9780000000003",
  "genre": "Education",
  "publishedYear": 2026,
  "pages": 250,
  "language": "English",
  "available": false,
  "rating": 4.2
}
```

When I execute the request, Swagger returns status `204`. That means the update worked.

I refresh MongoDB and show that the book title, pages, availability, or rating changed.

Now I test `DELETE /books/{id}` using the same id.

When I execute the request, Swagger returns status `204`, which means the delete worked. I refresh MongoDB again and show that the temporary book is gone.

Now I will show the authors collection.

I open `GET /authors`, click `Try it out`, and click `Execute`.

This returns all authors from MongoDB.

Then I copy one author `_id`, open `GET /authors/{id}`, paste the id, and execute it. This returns one author by id.

Next, I create a temporary author using `POST /authors`.

```json
{
  "name": "Temporary Week 03 Demo Author",
  "country": "United States",
  "birthYear": 1990,
  "primaryGenre": "Education",
  "website": "https://example.com"
}
```

The API returns status `201`, so the author was created. I refresh MongoDB and show that the author was added.

Then I update the same author using `PUT /authors/{id}`.

```json
{
  "name": "Temporary Week 03 Demo Author Updated",
  "country": "United States",
  "birthYear": 1991,
  "primaryGenre": "Technical Writing",
  "website": "https://example.com"
}
```

The API returns status `204`. I refresh MongoDB and show the updated author fields.

Then I delete the temporary author using `DELETE /authors/{id}`. The API returns status `204`, and MongoDB no longer shows that temporary author.

Now I will show validation.

I open `POST /books` and send bad data:

```json
{
  "title": "",
  "authorName": "",
  "isbn": "",
  "genre": "",
  "publishedYear": 999,
  "pages": 0,
  "language": "",
  "available": "maybe",
  "rating": 9
}
```

This returns status `400` and a validation error. That proves the API checks data before saving it.

Now I will show error handling.

I can test an invalid id route, such as:

```text
GET /books/not-a-real-id
```

The API returns status `400` because the id is not a valid MongoDB ObjectId.

If I use a valid-looking ObjectId that does not exist, the API returns status `404`. That means the route is found, but the record is not found.

Next, I will show the GitHub repository.

The repository has separate folders and files for a clean structure:

- `src/app.js` sets up Express, middleware, routes, and Swagger.
- `src/routes` defines the route paths.
- `src/controllers` handles request and response logic.
- `src/data` talks to MongoDB or memory mode for tests.
- `src/middleware/validate.js` checks bad input.
- `swagger.json` documents the API.

This follows the MVC-style architecture expected in the course because routes, controller logic, and database access are separated.

Finally, I will show that secrets are not stored in GitHub.

The repository has `.env.example`, but it does not contain the real MongoDB password. The real `MONGODB_URI` is stored in Render environment variables.

To summarize, this Week 03 Project 2 API is deployed on Render, uses MongoDB, has two collections, includes full CRUD routes for both books and authors, documents everything in Swagger, validates bad input, handles errors clearly, protects secrets, and follows a clean file structure.

## Short Ending

This completes my CSE 341 Week 03 Project 2 Part 1 CRUD Operations demonstration. Thank you.

## Quick Checklist

- Show Render URL, not localhost.
- Show `/api-docs`.
- Show `books` and `authors`.
- Show `books` has seven or more fields.
- Run GET all and GET by id.
- Create, update, and delete a temporary book.
- Create, update, and delete a temporary author.
- Show MongoDB changing.
- Show one validation failure with status `400`.
- Show one error-handling example.
- Show `.env` is not in GitHub.
- Submit GitHub, Render, and YouTube links.
