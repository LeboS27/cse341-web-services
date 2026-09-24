# Project 2 CRUD API: CSE 341 Weeks 03-04

This is a library API with two MongoDB collections:

- `books`
- `authors`

The `books` collection has nine fields, so it satisfies the course rule that at least one collection should have seven or more fields.

Week 04 adds authentication. Users can register, log in, view their logged-in profile, and log out. Create, update, and delete routes are protected by bearer-token login.

## Live Links

- Render API: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
- Books route: <https://cse341-project2-crud-api-zoq8.onrender.com/books>
- Authors route: <https://cse341-project2-crud-api-zoq8.onrender.com/authors>
- GitHub repository: <https://github.com/LeboS27/cse341-web-services>

## What Week 03 Requires

- At least two collections.
- GET, POST, PUT, and DELETE routes.
- Swagger documentation that can be tested.
- Validation on POST and PUT routes.
- Error handling with clear 400 or 500 responses.
- Published API on Render.
- No secrets pushed to GitHub.

## What Week 04 Requires

- Account creation.
- Login and logout.
- Passwords stored as bcrypt hashes.
- Some API features available only when logged in.
- Swagger documentation that shows protected routes.
- Sensitive credentials kept in environment variables.

## Rubric Proof

- Two collections: `books` and `authors`
- Seven-or-more-field collection: `books` has nine fields
- Full CRUD for books: `GET /books`, `GET /books/:id`, `POST /books`, `PUT /books/:id`, `DELETE /books/:id`
- Full CRUD for authors: `GET /authors`, `GET /authors/:id`, `POST /authors`, `PUT /authors/:id`, `DELETE /authors/:id`
- Swagger: `/api-docs`
- Validation: POST and PUT routes check request bodies before saving
- Error handling: invalid ids, missing records, bad data, and unexpected errors return JSON responses
- Deployment: Render live links above
- Security: real MongoDB credentials are stored in environment variables, not GitHub
- Authentication routes: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `POST /auth/logout`
- Protected write routes: `POST`, `PUT`, and `DELETE` for `books` and `authors`
- Password storage: passwords are hashed with bcrypt before saving

## Run Locally

```powershell
npm start
```

Open:

- `http://localhost:8081/`
- `http://localhost:8081/books`
- `http://localhost:8081/authors`
- `http://localhost:8081/api-docs`

## Test The Protected Routes

1. Open `/api-docs`.
2. Run `POST /auth/register` or `POST /auth/login`.
3. Copy the returned token.
4. Click **Authorize** in Swagger.
5. Paste only the token.
6. Try a protected route such as `POST /books`.

## Environment

Copy `.env.example` to `.env`, then add your real MongoDB connection string.

Use memory mode only for practice:

```text
USE_MEMORY_STORE=true
```

For submission, use MongoDB so the video can show database updates.

Optional auth collection names:

```text
USERS_COLLECTION=users
SESSIONS_COLLECTION=sessions
```

## Extra Quality Added

This Project 2 API is prepared for later course expectations too:

- It already includes Jest and Supertest route tests.
- It uses two collections with full CRUD.
- It validates POST and PUT bodies.
- It gives clear `400`, `404`, and `500` style error responses.
- It has Swagger documentation for both collections.
- The `books` collection has nine fields, which is safely above the seven-field requirement.

## Run Tests

```powershell
npm test
```

The tests use memory mode, so they are safe to run repeatedly while learning.
