# Week 03 Project: Project 2 Part 1 Video Script

Use this for the Week 03 Project 2 Part 1 CRUD Operations video.

Target length: 5-8 minutes.

## Submission Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Project 2 API on Render: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
- YouTube video link: paste your unlisted YouTube link after upload

## Important Note Before Recording

Week 04 authentication is already finished in this project, so Swagger requires a login token before testing `POST`, `PUT`, and `DELETE`.

That is okay for Week 03. In the video, say:

> This project already includes the Week 04 login layer, so I will log in first. After that, I will demonstrate the Week 03 CRUD requirements for both collections.

## Tabs To Open Before You Start

Open these tabs in this order:

1. Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
2. GitHub repo: <https://github.com/LeboS27/cse341-web-services>
3. MongoDB Atlas or Compass, opened to the `cse341_library` database.

Do not show the real MongoDB connection string or password.

## Exact Clicks And Words

### 1. Start On Swagger

Click the Swagger tab.

Say:

> Hello, my name is Lebo. This is my CSE 341 Week 03 Project 2 Part 1 CRUD Operations demonstration. The API is deployed on Render, not localhost. The live Swagger documentation is open at `/api-docs`.

Say:

> The Week 03 rubric asks for Swagger documentation, CRUD endpoints for at least two collections, validation, error handling, deployment, and no secrets in GitHub.

### 2. Show The Two Collections

Scroll through Swagger until you can see the `books` routes and the `authors` routes.

Say:

> My two MongoDB collections are `books` and `authors`. The `books` collection has nine fields: title, authorName, isbn, genre, publishedYear, pages, language, available, and rating. That is more than the seven-field requirement.

### 3. Log In For Protected Write Routes

Scroll to `POST /auth/register`.

Click `POST /auth/register`.

Click `Try it out`.

In the request body box, replace the example with this JSON. Change the email number if you have already used it:

```json
{
  "name": "Week Three Demo",
  "email": "week3demo1001@example.com",
  "password": "Password123!"
}
```

Click `Execute`.

Say:

> This project already has the Week 04 authentication layer, so I am registering a demo user first. This gives me a token so I can test the protected Week 03 create, update, and delete routes.

In the response body, highlight the `token` value.

Copy only the token text, without the quotation marks.

Scroll to the top of Swagger.

Click the green `Authorize` button.

Paste the token into the value box.

Click `Authorize`.

Click `Close`.

Say:

> Now Swagger is authorized, so the protected routes can be tested directly from the documentation.

### 4. Books: GET All

Scroll to `GET /books`.

Click `GET /books`.

Click `Try it out`.

Click `Execute`.

Say:

> First I am testing `GET /books`. This returns all books from MongoDB. The response status is `200`, and the response body shows book records from the database.

Copy one `_id` value from the response. Keep it somewhere temporary, like Notepad, because you will use it for the next step.

### 5. Books: GET By ID

Click `GET /books/{id}`.

Click `Try it out`.

Paste the copied book `_id` into the `id` box.

Click `Execute`.

Say:

> Now I am testing `GET /books/{id}`. This returns one specific book by MongoDB ObjectId. The response status is `200`, so the retrieve-by-id route is working.

### 6. Books: POST Create

Click `POST /books`.

Click `Try it out`.

Paste this JSON into the request body:

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

Click `Execute`.

Say:

> Now I am testing `POST /books`. Swagger returns status `201`, which means the book was created successfully.

Copy the `id` value from the response. This is the new book id.

Click the MongoDB tab.

If you are in MongoDB Atlas:

1. Click `Database`.
2. Click `Browse Collections`.
3. Click the `cse341_library` database.
4. Click the `books` collection.
5. Click the refresh button.

If you are in MongoDB Compass:

1. Click the `cse341_library` database.
2. Click the `books` collection.
3. Click the refresh button.

Say:

> I am refreshing the MongoDB `books` collection. The temporary demo book appears here, so the POST route updated the database.

### 7. Books: PUT Update

Go back to the Swagger tab.

Click `PUT /books/{id}`.

Click `Try it out`.

Paste the new book id into the `id` box.

Paste this JSON into the request body:

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

Click `Execute`.

Say:

> Now I am testing `PUT /books/{id}`. Swagger returns status `204`, which means the update worked and there is no response body.

Click the MongoDB tab.

Refresh the `books` collection.

Say:

> After refreshing MongoDB, the book title and fields are updated. This proves the PUT route changes the database.

### 8. Books: DELETE

Go back to Swagger.

Click `DELETE /books/{id}`.

Click `Try it out`.

Paste the same new book id into the `id` box.

Click `Execute`.

Say:

> Now I am testing `DELETE /books/{id}`. Swagger returns status `204`, so the delete route worked.

Click the MongoDB tab.

Refresh the `books` collection.

Say:

> The temporary demo book is gone, so the delete request also updated the database.

### 9. Authors: GET All

Go back to Swagger.

Click `GET /authors`.

Click `Try it out`.

Click `Execute`.

Say:

> Now I am testing the second collection, `authors`. `GET /authors` returns all authors from MongoDB with status `200`.

Copy one author `_id` value from the response.

### 10. Authors: GET By ID

Click `GET /authors/{id}`.

Click `Try it out`.

Paste the copied author id into the `id` box.

Click `Execute`.

Say:

> `GET /authors/{id}` returns one author by ObjectId, so the second collection also has retrieve-by-id functionality.

### 11. Authors: POST Create

Click `POST /authors`.

Click `Try it out`.

Paste this JSON into the request body:

```json
{
  "name": "Temporary Week 03 Demo Author",
  "country": "United States",
  "birthYear": 1990,
  "primaryGenre": "Education",
  "website": "https://example.com"
}
```

Click `Execute`.

Say:

> Now I am testing `POST /authors`. Swagger returns status `201`, so a new author was created.

Copy the new author `id` from the response.

Go to MongoDB.

Click the `authors` collection.

Click refresh.

Say:

> The temporary demo author appears in MongoDB, so the authors POST route works.

### 12. Authors: PUT Update

Go back to Swagger.

Click `PUT /authors/{id}`.

Click `Try it out`.

Paste the new author id into the `id` box.

Paste this JSON into the request body:

```json
{
  "name": "Temporary Week 03 Demo Author Updated",
  "country": "United States",
  "birthYear": 1991,
  "primaryGenre": "Technical Writing",
  "website": "https://example.com"
}
```

Click `Execute`.

Say:

> Now I am testing `PUT /authors/{id}`. Swagger returns status `204`, so the author update worked.

Go to MongoDB.

Refresh the `authors` collection.

Say:

> MongoDB now shows the updated author data, so the PUT route works for the second collection.

### 13. Authors: DELETE

Go back to Swagger.

Click `DELETE /authors/{id}`.

Click `Try it out`.

Paste the same new author id into the `id` box.

Click `Execute`.

Say:

> Now I am testing `DELETE /authors/{id}`. Swagger returns status `204`, so the author was deleted.

Go to MongoDB.

Refresh the `authors` collection.

Say:

> The temporary author is no longer in MongoDB. This proves delete works for the second collection too.

### 14. Show Validation

Go back to Swagger.

Click `POST /books`.

Click `Try it out`.

Paste this bad JSON:

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

Click `Execute`.

Say:

> Now I am showing validation. This request is missing required data and has invalid values. The API returns status `400` with validation details, so bad data is rejected before it is saved.

### 15. Show Error Handling

Click `GET /books/{id}`.

Click `Try it out`.

Type this into the `id` box:

```text
not-a-real-id
```

Click `Execute`.

Say:

> Now I am showing error handling. This is not a valid MongoDB ObjectId, so the API returns status `400` instead of crashing.

Replace the id with this valid-looking id:

```text
507f1f77bcf86cd799439011
```

Click `Execute`.

Say:

> This id has the correct ObjectId shape, but it does not exist in the database. The API returns status `404`, which is the correct response for a missing record.

### 16. Show GitHub And Secrets

Click the GitHub tab.

Click the `project2-crud-api` folder.

Say:

> Now I am showing the GitHub repository. The Project 2 code is in the `project2-crud-api` folder.

Click `src`.

Click `routes`.

Say:

> The route files are separated by collection. This helps keep the architecture organized.

Go back, then click `controllers`.

Say:

> The controller handles request and response logic, including try/catch error handling.

Go back, then click `middleware`.

Click `validate.js`.

Say:

> The validation middleware checks the POST and PUT data before it reaches the database.

Go back to the repository root.

Click `.gitignore`.

Say:

> The `.env` file is ignored, so MongoDB credentials are not pushed to GitHub.

If you show `.env.example`, say:

> `.env.example` only shows placeholder values. It does not contain the real password or connection string.

### 17. Closing Statement

Return to the Swagger tab or stay on GitHub.

Say:

> To summarize, this Week 03 Project 2 API is deployed on Render, documented in Swagger, and connected to MongoDB. It has two collections, `books` and `authors`. Both collections support GET, POST, PUT, and DELETE. The API validates bad data, returns proper status codes like `201`, `204`, `400`, and `404`, handles errors clearly, and keeps secrets out of GitHub. This completes my Week 03 CRUD Operations project.

## Very Short Checklist While Recording

- Show Render Swagger, not localhost.
- Say there are two collections: `books` and `authors`.
- Say `books` has nine fields.
- Log in with `POST /auth/register`.
- Press `Authorize` and paste token.
- Books: GET all, GET by id, POST, PUT, DELETE.
- Authors: GET all, GET by id, POST, PUT, DELETE.
- Show MongoDB after create, update, and delete.
- Show validation gives `400`.
- Show invalid id gives `400`.
- Show missing record gives `404`.
- Show GitHub `.gitignore` proves `.env` is not pushed.
