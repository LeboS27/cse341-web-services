# Week 06 Video Script: Final Project Part 2

Target length: 5-8 minutes.

## Submission Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Final Project API on Render: <https://cse341-final-project-api.onrender.com>
- Final Project Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>
- OAuth login: <https://cse341-final-project-api.onrender.com/auth/github>
- OAuth status: <https://cse341-final-project-api.onrender.com/auth/oauth/status>
- YouTube video link: paste your unlisted YouTube link after upload

## Before Recording

Open:

1. Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>
2. GitHub repository: <https://github.com/LeboS27/cse341-web-services>
3. MongoDB Atlas or Compass, opened to the `cse341_final_project` database.
4. A terminal in `final-project-api`.

Check OAuth first:

<https://cse341-final-project-api.onrender.com/auth/oauth/status>

It should say `"configured": true`.

## Exact Steps And Script

### 1. Start On Swagger

Say:

> Hello, my name is Lebo. This is my CSE 341 Week 06 Final Project Part 2 demonstration. The API is deployed on Render, not localhost, and Swagger documentation is open at `/api-docs`.

Say:

> The Week 06 rubric asks for four collections with CRUD routes, validation, OAuth-protected routes, unit tests for GET and GET all, deployment, and individual contribution documentation.

### 2. Show All Four Collections

Scroll through Swagger and point to:

- `events`
- `volunteers`
- `registrations`
- `announcements`

Say:

> The final project now has four collections: `events`, `volunteers`, `registrations`, and `announcements`. All four collections have GET, POST, PUT, and DELETE routes in Swagger.

### 3. Show OAuth Login

Open:

```text
https://cse341-final-project-api.onrender.com/auth/github
```

Log in with GitHub.

Copy the token from the success page.

Return to Swagger.

Click `Authorize`, paste the token, click `Authorize`, then `Close`.

Say:

> I logged in using GitHub OAuth. Swagger is now authorized with a bearer token, so protected routes can be tested.

### 4. Prove Protected Routes Block Logged-Out Users

If Swagger is authorized, click `Authorize`, then `Logout`, then `Close`.

Click `POST /registrations`, `Try it out`, and send a valid body.

Say:

> Without a token, the protected route returns `401 Authentication required`. That proves protected routes require authentication.

Click `Authorize` again and paste the token back in.

### 5. Test Registrations CRUD

Click `GET /registrations`, then `Try it out`, then `Execute`.

Say:

> `GET /registrations` returns all records from the third collection.

Click `POST /registrations` and use:

```json
{
  "eventTitle": "API Showcase Night",
  "attendeeName": "Week Six Student",
  "attendeeEmail": "week6.student@example.edu",
  "ticketType": "student",
  "checkedIn": false,
  "registeredAt": "2026-09-30T12:00:00.000Z"
}
```

Click `Execute`.

Say:

> `POST /registrations` returns `201`, so the registration was created.

Copy the new id.

Use that id with `PUT /registrations/{id}` and change `checkedIn` to `true`.

Say:

> `PUT /registrations/{id}` returns `204`, so the update worked.

Use the same id with `DELETE /registrations/{id}`.

Say:

> `DELETE /registrations/{id}` returns `204`, so delete works for the third collection.

### 6. Test Announcements CRUD

Click `GET /announcements`, then `Try it out`, then `Execute`.

Say:

> `GET /announcements` returns all records from the fourth collection.

Click `POST /announcements` and use:

```json
{
  "title": "Week Six Demo Announcement",
  "message": "This record is created during the Week 06 video.",
  "audience": "all",
  "publishDate": "2026-09-30T12:00:00.000Z",
  "expiresAt": "2026-10-30T12:00:00.000Z",
  "isPinned": true,
  "authorEmail": "announcements@example.edu"
}
```

Click `Execute`.

Say:

> `POST /announcements` returns `201`, so the announcement was created.

Copy the new id.

Use that id with `PUT /announcements/{id}` and change the title and `isPinned` value.

Say:

> `PUT /announcements/{id}` returns `204`, so the fourth collection updates correctly.

Use the same id with `DELETE /announcements/{id}`.

Say:

> `DELETE /announcements/{id}` returns `204`, so delete works for the fourth collection.

### 7. Show Validation

Click `POST /announcements`.

Use this invalid body:

```json
{
  "title": "",
  "message": "",
  "audience": "parents",
  "publishDate": "not-a-date",
  "expiresAt": "not-a-date",
  "isPinned": "maybe",
  "authorEmail": "not-email"
}
```

Click `Execute`.

Say:

> This invalid POST request returns status `400`, so validation is working.

Click `PUT /registrations/{id}` with a real registration id and send invalid values.

Say:

> Invalid PUT data also returns status `400`, so both POST and PUT routes validate data before saving.

### 8. Show MongoDB

Open MongoDB.

Show the `cse341_final_project` database.

Show these collections:

- `events`
- `volunteers`
- `registrations`
- `announcements`

Say:

> The deployed API is connected to MongoDB, and the database contains all four final-project collections.

### 9. Show Tests

Open the terminal in `final-project-api`.

Run:

```powershell
npm test
```

Say:

> The tests cover GET all and GET by id for all four collections. They also check OAuth session behavior, protected write routes, validation, and logout.

When the tests pass, say:

> All tests pass, so the testing requirement is complete.

### 10. Show GitHub Files

Open GitHub and show:

- `final-project-api/src/app.test.js`
- `final-project-api/src/routes`
- `final-project-api/src/middleware/validate.js`
- `final-project-api/src/middleware/auth.js`
- `final-project-api/swagger.json`
- `final-project-api/.env.example`

Say:

> GitHub shows the test file, separated route files, validation middleware, OAuth middleware, and Swagger documentation. `.env.example` only has placeholders, so secrets are not stored in GitHub.

### 11. Contributions And Closing

Say:

> My individual contributions are: first, I built the `events` and `volunteers` collections for Week 05. Second, I added the `registrations` and `announcements` collections for Week 06. Third, I added GitHub OAuth protection. Fourth, I added route tests for GET all and GET by id across all four collections.

Say:

> This completes Week 06 Final Project Part 2 because the deployed API has four collections, Swagger documentation, CRUD operations, validation, OAuth-protected routes, passing tests, MongoDB updates, and secrets kept out of GitHub.
