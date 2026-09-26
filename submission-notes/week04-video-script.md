# Week 04 Project: Project 2 Part 2 Authentication Video Script

Use this for the Week 04 Project 2 Part 2 Authentication video.

Target length: 5-8 minutes.

## Submission Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Project 2 API on Render: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
- GitHub OAuth login: <https://cse341-project2-crud-api-zoq8.onrender.com/auth/github>
- OAuth status check: <https://cse341-project2-crud-api-zoq8.onrender.com/auth/oauth/status>
- YouTube video link: paste your unlisted YouTube link after upload

## Check This Before Recording

Open this link first:

<https://cse341-project2-crud-api-zoq8.onrender.com/auth/oauth/status>

It should show:

```json
"configured": true
```

If it shows `false`, add these Render environment variables before recording:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `OAUTH_CALLBACK_URL`
- `OAUTH_STATE_SECRET`

The GitHub OAuth callback URL should be:

```text
https://cse341-project2-crud-api-zoq8.onrender.com/auth/github/callback
```

Do not show the real GitHub client secret, MongoDB password, or `.env` file in the video.

## Tabs To Open Before You Start

Open these tabs in this order:

1. Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
2. GitHub repo: <https://github.com/LeboS27/cse341-web-services>
3. OAuth status: <https://cse341-project2-crud-api-zoq8.onrender.com/auth/oauth/status>
4. MongoDB Atlas or Compass, opened to the `cse341_library` database.

## Exact Clicks And Words

### 1. Start On Swagger

Click the Swagger tab.

Say:

> Hello, my name is Lebo. This is my CSE 341 Week 04 Project 2 Part 2 Authentication demonstration. The API is deployed on Render, not localhost, and the live Swagger documentation is open at `/api-docs`.

Say:

> The Week 04 rubric asks for Swagger documentation, CRUD endpoints for two collections, validation, error handling, deployment, OAuth authentication, protected routes, and a MongoDB database with at least two collections.

### 2. Show The Two Collections

Scroll in Swagger until you can see the `books` routes and the `authors` routes.

Say:

> My two MongoDB collections are `books` and `authors`. Both collections have GET, POST, PUT, and DELETE routes documented in Swagger.

Say:

> The `books` collection has nine fields: title, authorName, isbn, genre, publishedYear, pages, language, available, and rating. That is more than the seven-field requirement.

### 3. Show OAuth Is Configured

Click the OAuth status tab.

If the page shows `"configured": true`, say:

> This status route shows GitHub OAuth is configured on the deployed Render app. The callback URL points back to this same Render deployment.

If the page shows `"configured": false`, stop recording and fix the Render OAuth environment variables first.

### 4. Show A Protected Route Blocks Logged-Out Users

Go back to the Swagger tab.

Scroll to `POST /books`.

Click `POST /books`.

Click `Try it out`.

Paste this JSON into the request body:

```json
{
  "title": "Temporary Week 04 Demo Book",
  "authorName": "Demo Author",
  "isbn": "9780000000004",
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

> I am trying a protected route before logging in. The API returns `401 Authentication required`, so protected routes cannot be used by logged-out users.

### 5. Log In With GitHub OAuth

Open a new browser tab.

Paste this link into the address bar:

```text
https://cse341-project2-crud-api-zoq8.onrender.com/auth/github
```

Press `Enter`.

If GitHub asks you to sign in, sign in.

If GitHub asks you to authorize the app, click the green `Authorize` button.

When the `OAuth Login Successful` page appears, say:

> I logged in using GitHub OAuth. The app created a server-side session and returned a bearer token that I can use in Swagger.

Highlight and copy the token from the success page.

Do not read the token out loud.

### 6. Authorize Swagger

Go back to the Swagger tab.

Scroll to the top.

Click the green `Authorize` button.

Paste the token into the value box.

Click `Authorize`.

Click `Close`.

Say:

> Swagger is now sending my OAuth login token with protected requests.

### 7. Prove The Token Belongs To The Logged-In User

Scroll to `GET /auth/me`.

Click `GET /auth/me`.

Click `Try it out`.

Click `Execute`.

Say:

> `GET /auth/me` returns my logged-in user profile. The response shows the user information, but it does not expose a password hash or secret.

### 8. Books: GET All

Scroll to `GET /books`.

Click `GET /books`.

Click `Try it out`.

Click `Execute`.

Say:

> First I am testing `GET /books`. This route returns all books from MongoDB with status `200`.

Copy one `_id` value from the response and keep it somewhere temporary, like Notepad.

### 9. Books: GET By ID

Click `GET /books/{id}`.

Click `Try it out`.

Paste the copied book `_id` into the `id` box.

Click `Execute`.

Say:

> `GET /books/{id}` returns one book by MongoDB ObjectId. This proves the single-record GET route is working.

### 10. Books: POST Create

Click `POST /books`.

Click `Try it out`.

Paste this JSON into the request body:

```json
{
  "title": "Temporary Week 04 Demo Book",
  "authorName": "Demo Author",
  "isbn": "9780000000004",
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

> Now I am testing `POST /books` while logged in. The response status is `201`, so the protected create route worked.

Copy the new `id` from the response.

Go to MongoDB Atlas or Compass.

Open the `cse341_library` database.

Click the `books` collection.

Click refresh.

Say:

> I refreshed MongoDB, and the temporary book appears in the `books` collection. This proves the POST request updated the database.

### 11. Books: PUT Update

Go back to Swagger.

Click `PUT /books/{id}`.

Click `Try it out`.

Paste the new book id into the `id` box.

Paste this JSON into the request body:

```json
{
  "title": "Temporary Week 04 Demo Book Updated",
  "authorName": "Demo Author",
  "isbn": "9780000000004",
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

Go back to MongoDB.

Refresh the `books` collection.

Say:

> MongoDB now shows the updated book data, so the PUT route changed the database.

### 12. Books: DELETE

Go back to Swagger.

Click `DELETE /books/{id}`.

Click `Try it out`.

Paste the same new book id into the `id` box.

Click `Execute`.

Say:

> Now I am testing `DELETE /books/{id}`. Swagger returns status `204`, so the delete route worked.

Go back to MongoDB.

Refresh the `books` collection.

Say:

> The temporary book is gone from MongoDB, so DELETE also updates the database.

### 13. Authors: GET All

Go back to Swagger.

Click `GET /authors`.

Click `Try it out`.

Click `Execute`.

Say:

> Now I am testing the second collection, `authors`. `GET /authors` returns all authors from MongoDB with status `200`.

Copy one author `_id` value from the response.

### 14. Authors: GET By ID

Click `GET /authors/{id}`.

Click `Try it out`.

Paste the copied author id into the `id` box.

Click `Execute`.

Say:

> `GET /authors/{id}` returns one author by ObjectId. That proves the second collection also supports single-record GET requests.

### 15. Authors: POST Create

Click `POST /authors`.

Click `Try it out`.

Paste this JSON into the request body:

```json
{
  "name": "Temporary Week 04 Demo Author",
  "country": "United States",
  "birthYear": 1990,
  "primaryGenre": "Education",
  "website": "https://example.com"
}
```

Click `Execute`.

Say:

> Now I am testing `POST /authors`. The response status is `201`, so a new author was created while logged in.

Copy the new author `id` from the response.

Go to MongoDB.

Click the `authors` collection.

Click refresh.

Say:

> The temporary author appears in MongoDB, so the authors POST route updates the database too.

### 16. Authors: PUT Update

Go back to Swagger.

Click `PUT /authors/{id}`.

Click `Try it out`.

Paste the new author id into the `id` box.

Paste this JSON into the request body:

```json
{
  "name": "Temporary Week 04 Demo Author Updated",
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

### 17. Authors: DELETE

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

> The temporary author is no longer in MongoDB. This proves delete works for the second collection.

### 18. Show Validation On POST

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

> Now I am showing validation on a POST route. This request has missing and invalid values, so the API returns status `400` with validation details.

### 19. Show Validation On PUT

Click `GET /authors`.

Click `Try it out`.

Click `Execute`.

Copy one real author `_id`.

Click `PUT /authors/{id}`.

Click `Try it out`.

Paste the copied author id into the `id` box.

Paste this bad JSON:

```json
{
  "name": "",
  "country": "",
  "birthYear": 3000,
  "primaryGenre": "",
  "website": "not-a-url"
}
```

Click `Execute`.

Say:

> Now I am showing validation on a PUT route. The API returns status `400`, so invalid updates are blocked before they reach MongoDB.

### 20. Show Error Handling

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

### 21. Show Logout

Scroll to `POST /auth/logout`.

Click `POST /auth/logout`.

Click `Try it out`.

Click `Execute`.

Say:

> Now I am logging out. The API returns status `204`, so the session token was removed.

Scroll to `GET /auth/me`.

Click `GET /auth/me`.

Click `Try it out`.

Click `Execute`.

Say:

> After logout, the same token no longer works. The API returns `401 Authentication required`, which proves logout is working.

### 22. Show GitHub Architecture And Secrets

Click the GitHub tab.

Click the `project2-crud-api` folder.

Say:

> Now I am showing the GitHub repository. The Project 2 code is in the `project2-crud-api` folder.

Click `src`.

Click `routes`.

Click `authRoutes.js`.

Say:

> The auth routes include GitHub OAuth, the current-user route, and logout.

Go back to `src`.

Click `controllers`.

Click `authController.js`.

Say:

> The auth controller starts the GitHub OAuth flow, handles the callback, creates the user session, and returns the bearer token used by Swagger.

Go back to `src`.

Click `middleware`.

Click `auth.js`.

Say:

> The auth middleware protects private routes by checking for a valid bearer token. If the token is missing or invalid, the request gets a `401` response.

Go back to `middleware`.

Click `validate.js`.

Say:

> The validation middleware checks the POST and PUT bodies for both collections before data is saved.

Go back to the repository root.

Click `.gitignore`.

Say:

> The `.env` file is ignored, so MongoDB credentials and OAuth secrets are not pushed to GitHub.

If you show `.env.example`, say:

> `.env.example` only contains placeholder names for the required settings. It does not contain real passwords or secrets.

### 23. Show MongoDB Database Requirement

Click the MongoDB tab.

Open the `cse341_library` database.

Show the `books` collection and the `authors` collection.

Say:

> The MongoDB database has at least two collections: `books` and `authors`.

Click the `books` collection.

Open one book document.

Say:

> This book document has more than seven fields, including title, authorName, isbn, genre, publishedYear, pages, language, available, and rating.

### 24. Closing Statement

Return to Swagger or stay on MongoDB.

Say:

> To summarize, this Week 04 Project 2 API is deployed on Render and documented in Swagger. It has two MongoDB collections, `books` and `authors`, and both collections support GET, POST, PUT, and DELETE. POST, PUT, and DELETE are protected by authentication. I logged in using GitHub OAuth, tested protected routes, showed logout, showed validation with `400` responses, showed error handling with `400` and `404` responses, and showed MongoDB updates. Sensitive credentials are stored in environment variables and are not pushed to GitHub. This completes my Week 04 Authentication project.

## Very Short Checklist While Recording

- Show Render Swagger, not localhost.
- Show OAuth status says `"configured": true`.
- Try `POST /books` before login and show `401`.
- Log in with GitHub OAuth through `/auth/github`.
- Copy the token from the success page.
- Click Swagger `Authorize` and paste the token.
- Run `GET /auth/me`.
- Books: GET all, GET by id, POST, PUT, DELETE.
- Authors: GET all, GET by id, POST, PUT, DELETE.
- Show MongoDB after create, update, and delete.
- Show bad POST data returns `400`.
- Show bad PUT data returns `400`.
- Show invalid id returns `400`.
- Show missing record returns `404`.
- Run `POST /auth/logout`, then show `GET /auth/me` returns `401`.
- Show GitHub `.gitignore` proves `.env` is not pushed.
- Show MongoDB has `books` and `authors`, and `books` has more than seven fields.
