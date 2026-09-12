# Web Services With Node.js, Express, MongoDB, Swagger, OAuth, And Testing

![Web services course cover](../diagrams/web-services-cover.png)

## How To Use This Book

This book is written for CSE 341 Web Services. It follows the course from Week 01 through Week 07 and explains the ideas using the projects in this workspace:

- `w01-individual-activity` for the Week 01 Individual Activity.
- `contacts-api` for Weeks 01 and 02.
- `project2-crud-api` for Week 03.

The goal is not only to finish assignments. The deeper goal is to understand what each file does, why the file exists, and how a backend API behaves when a client sends a request.

This is a living manuscript. The first version focuses on the code already built for Weeks 01-03 and the concepts already read from the Week 01-07 learning material. Later revisions can expand each chapter into a longer printable book.

## Table Of Contents

Part One: Core Course Path

1. What Web Services Are
2. The Course Stack
3. HTTP In Plain Language
4. Week 01: Node, Express, GET Routes, And MongoDB
5. Week 02: Full CRUD And Swagger Documentation
6. Week 03: Designing Your Own API
7. Validation And Error Handling
8. Week 04: Authentication, OAuth, And JWT Concepts
9. Week 05: API Gateways And Managers
10. Week 06: Testing With Jest And Supertest
11. Week 07: Explaining Your Work In Interviews
12. Code Walkthrough: Contacts API
13. Code Walkthrough: Project 2 CRUD API
14. Submission Strategy
15. Glossary

Part Two: Week-By-Week Study Guide

- Week 01 Deep Study: Web Services And Node Architecture
- Week 02 Deep Study: HTTP Requests And API Documentation
- Week 03 Deep Study: REST, Alternatives, Validation, And Error Handling
- Week 04 Deep Study: OAuth And Protected Routes
- Week 05 Deep Study: API Gateways
- Week 06 Deep Study: Testing
- Week 07 Deep Study: Talking About Your Work

Part Three: Backend Developer Field Guide

16. Thinking In Layers
17. The Request Lifecycle
18. Designing Good Resources
19. Database Modeling With MongoDB
20. Environment Variables And Secrets
21. Swagger As A Learning Tool
22. Validation Strategy
23. Error Handling Strategy
24. Deployment Thinking
25. Video Proof
26. Reading `package.json`
27. Reading `server.js`
28. Reading Route Files
29. Reading Controllers
30. Reading Data Store Files
31. Reading Validation Files
32. Reading Tests
33. What "Above And Beyond" Means For These Assignments
34. How To Make Your Own Changes Safely
35. Capstone Mental Model

Part Four: Deeper Course Expansion

36. Week 04 OAuth In Plain Language
37. Designing Protected Routes
38. Week 05 API Gateways And Managers
39. Week 06 Testing More Deeply
40. Week 07 Resume And Interview Preparation
41. Full Request Examples From The Course Projects
42. A Practical Debugging Map
43. Submission And Video Master Checklist

Part Five: Hands-On Workbook

44. Contacts API File-By-File Study
45. MongoDB Atlas Workbook
46. Render And GitHub Workbook
47. Swagger Practice Workbook
48. Safe Change Workbook
49. Week 01, Week 02, And Week 03 Requirement Matrix
50. Personal Study Plan For Mastery

## Chapter 1: What Web Services Are

A web service is a program that accepts requests over the web and returns useful information or performs useful work. In this course, the web service is usually a Node.js and Express application. A frontend, browser, mobile app, Swagger page, or REST client sends a request. The Express server receives that request, reads the URL and HTTP method, talks to MongoDB when needed, and returns JSON.

The word "API" means Application Programming Interface. That sounds larger than it needs to. In simple language, an API is a set of rules that tells other programs how to talk to your program.

For example:

```http
GET /contacts
```

means "please give me all contacts."

```http
GET /contacts/66f1f53b6b39b57b5a147901
```

means "please give me the contact with this exact id."

```http
POST /contacts
Content-Type: application/json

{
  "firstName": "Mary",
  "lastName": "Jackson",
  "email": "mary.jackson@example.com",
  "favoriteColor": "red",
  "birthday": "1921-04-09"
}
```

means "please create a new contact using this JSON body."

The important lesson is that an API is a contract. The server promises that certain URLs and methods exist. The client promises to send data in the shape the server expects.

## Chapter 2: The Course Stack

CSE 341 uses a practical backend stack:

- Node.js runs JavaScript outside the browser.
- Express makes it easier to build HTTP routes.
- MongoDB stores documents as flexible JSON-like data.
- dotenv keeps secrets out of GitHub.
- Swagger documents and tests API routes.
- Render publishes the API online.
- OAuth protects routes and manages login later in the course.
- Jest and Supertest help prove that routes work.

The course expects you to become comfortable learning from real documentation. That is why each week links to outside resources. Technologies change, but the ability to read documentation and apply it is the long-term skill.

## Chapter 3: HTTP In Plain Language

HTTP is the request and response system of the web. A client sends a request. A server sends a response.

```mermaid
sequenceDiagram
  participant Client
  participant API as Express API
  participant DB as MongoDB
  Client->>API: GET /contacts
  API->>DB: Find contacts
  DB-->>API: Contact documents
  API-->>Client: JSON response
```

The most common methods in this course are:

- `GET`: read data.
- `POST`: create data.
- `PUT`: replace or update data.
- `DELETE`: remove data.

Status codes matter because they tell the client what happened:

- `200`: success with data.
- `201`: created successfully.
- `204`: success with no response body.
- `400`: the request was bad, often because validation failed.
- `404`: the requested item or route was not found.
- `500`: the server had an unexpected problem.

## Chapter 4: Week 01 - Node, Express, GET Routes, And MongoDB

Week 01 starts with the foundation. You need your tools installed, then you create a Node project, create an Express server, connect to MongoDB, and write GET routes.

The Week 01 Individual Activity teaches the simplest possible backend idea: a frontend asks for data, and a backend returns JSON. The official starter frontend calls this URL:

```js
fetch('http://localhost:8080/professional')
```

That tells us the backend must run on port `8080` and must have a route named `/professional`.

In `w01-individual-activity/server.js`, the route looks like this:

```js
app.get('/professional', (req, res) => {
  res.json({
    professionalName: 'Lebohang CSE 341 Student'
  });
});
```

The real file returns more fields than this short example, but the idea is the same. `app.get` creates a GET route. `res.json` sends JSON back to the frontend. The frontend then places that data into the HTML.

The Contacts API has this shape:

```mermaid
flowchart LR
  Browser[Browser or REST Client] --> Express[Express Server]
  Express --> ContactsRoute[/contacts route]
  ContactsRoute --> Controller[Contact Controller]
  Controller --> Store[Contact Store]
  Store --> Mongo[(MongoDB contacts)]
```

The Week 01 rubric asks for:

- A GET request that returns all contacts.
- A GET request that returns one contact by id.
- MongoDB data.
- Render deployment.
- Secrets stored in `.env`.
- MVC-style architecture.

In this workspace, those requirements live in `contacts-api`.

The route file is simple on purpose:

```js
router.get('/', controller.getAllContacts);
router.get('/:id', idRule, sendValidationErrors, controller.getContactById);
```

The route file answers the question: "What URLs exist?"

The controller answers the question: "What should happen when this URL is called?"

The data store answers the question: "How do we read or write the database?"

This separation is what the course means when it asks for MVC-style architecture. It keeps the code from becoming one giant server file.

## Chapter 5: Week 02 - Full CRUD And Swagger Documentation

Week 02 adds the rest of CRUD.

CRUD means:

- Create
- Read
- Update
- Delete

In HTTP terms:

- Create is usually `POST`.
- Read is usually `GET`.
- Update is often `PUT`.
- Delete is `DELETE`.

In the Contacts API:

```js
router.post('/', contactRules, sendValidationErrors, controller.createContact);
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);
router.delete('/:id', idRule, sendValidationErrors, controller.deleteContact);
```

Notice that POST and PUT use `contactRules`. This means data is checked before it reaches the database. That is important because a database should not be filled with incomplete or invalid records.

Swagger matters because it makes the API understandable to another person. A good Swagger page tells the user:

- Which routes exist.
- Which method each route uses.
- Which fields are required.
- Which responses can happen.
- How to test the route.

For the Week 02 video, the strongest demonstration is to open `/api-docs` on Render and use Swagger to test each route while also showing MongoDB Compass changing.

## Chapter 6: Week 03 - Designing Your Own API

Week 03 is a turning point. Instead of only extending Contacts, you design a new API of your choice.

The Week 03 project must have:

- At least two collections.
- At least one collection with seven or more fields.
- GET, POST, PUT, and DELETE for the collections.
- Swagger documentation.
- Validation.
- Error handling.
- Render deployment.
- No secrets in GitHub.

In this workspace, `project2-crud-api` uses a library idea:

- `books`
- `authors`

The `books` collection has these fields:

- `title`
- `authorName`
- `isbn`
- `genre`
- `publishedYear`
- `pages`
- `language`
- `available`
- `rating`

That is nine fields, which goes beyond the minimum seven-field rule.

The Week 3 project also uses a reusable controller factory:

```js
const controller = makeCrudController({ storeName: 'books', itemName: 'Book' });
```

That line means "build a full CRUD controller for the books store." The same pattern is used for authors. This keeps the code shorter while still being readable.

## Chapter 7: Validation And Error Handling

Validation asks: "Is the request data acceptable?"

![Validation and error flow](../diagrams/validation-error-flow.png)

The image above shows the validation idea visually. A request arrives with JSON. The API checks it. Good data continues to the database and returns success. Bad data branches away before it reaches the database and returns an error response.

For Contacts, a valid contact must have:

- `firstName`
- `lastName`
- `email`
- `favoriteColor`
- `birthday`

The validation file says this in code:

```js
body('email').trim().isEmail().withMessage('email must be a valid email address.')
```

That means the email field must look like a real email address. If the client sends `not-an-email`, the API returns `400`.

Error handling asks: "What should happen when something goes wrong?"

Good APIs do not crash silently. They return useful responses.

Example:

```json
{
  "error": "Contact not found",
  "message": "No contact exists with id 66f1f53b6b39b57b5a147901."
}
```

This is better than a blank page or a confusing stack trace.

## Chapter 8: Week 04 - Authentication, OAuth, And JWT Concepts

Week 04 introduces authentication and OAuth.

Authentication means proving who a user is. Authorization means deciding what that user is allowed to do.

OAuth is useful because it allows an application to rely on a trusted provider, such as Google, for login. Instead of your app collecting and storing passwords directly, the provider handles identity and gives your app proof that the user logged in.

The course also introduces JWTs. A JWT is a signed token that can carry claims about a user. A claim is a fact, such as a user id or email address. The course says JWTs are useful to understand, but OAuth is the main requirement.

In a course project, protected routes usually look like this conceptually:

```mermaid
flowchart LR
  Request[Client Request] --> AuthCheck{Logged in?}
  AuthCheck -- No --> Reject[401 Unauthorized]
  AuthCheck -- Yes --> Controller[Run Controller]
  Controller --> Database[(MongoDB)]
```

For the Week 04 video, you need to show login/logout and at least two protected routes that cannot be used until authentication is present.

## Chapter 9: Week 05 - API Gateways And Managers

An API gateway sits in front of APIs and helps manage traffic. In small class projects, you usually call Express directly. In larger systems, a gateway can handle concerns like:

- Routing requests to the right service.
- Rate limiting.
- Authentication checks.
- Logging.
- Monitoring.
- Versioning.

Examples from the course material include Azure API Management, AWS API Gateway, Kong, Tyk, KrakenD, and Express Gateway.

The key idea is that a gateway protects and organizes APIs once a system grows beyond one simple server.

## Chapter 10: Week 06 - Testing With Jest And Supertest

Testing proves that code still works after changes. In API projects, tests are especially helpful because routes depend on many moving parts:

- Request method.
- URL path.
- Input body.
- Database result.
- Status code.
- Response JSON.

Jest is a test runner. Supertest is a tool that sends fake HTTP requests to an Express app during tests.

A route test often reads like this:

```js
const response = await request(app).get('/contacts');
expect(response.status).toBe(200);
expect(Array.isArray(response.body)).toBe(true);
```

In simple language, this says:

"Call GET /contacts. The API should respond with status 200. The body should be an array."

Week 06 requires GET and GET-all tests for final project routes. That means each collection should have tests for:

- `GET /collection`
- `GET /collection/:id`

The Contacts API now has tests in `contacts-api/src/app.test.js`. A test starts by creating a real Express app:

```js
const store = new MemoryContactStore();
const app = createApp({ store });
```

This is important. We are not testing a fake route function in isolation. We are asking Express to handle a request the same way it would when the app is running.

Then the test sends a request:

```js
const response = await request(app).get('/contacts');
```

This line means "pretend to be a client and call GET /contacts." The server answers, and the test checks the answer.

```js
expect(response.status).toBe(200);
expect(response.body).toHaveLength(5);
```

That means the route should succeed and return the five seed contacts.

The Project 2 API has tests in `project2-crud-api/src/app.test.js`. Those tests cover both collections:

- `GET /books`
- `GET /books/:id`
- invalid `POST /books`
- `GET /authors`
- `GET /authors/:id`

Even though Week 03 does not require tests yet, adding them early is useful. It makes later work easier and helps you trust changes. If you modify a route, you can run `npm test` and quickly see whether the main behavior still works.

### Why Tests Use Memory Mode

The tests use memory mode because tests should be repeatable. A test that depends on your live MongoDB database can fail because the database changed, the internet dropped, or a password was missing. Memory mode keeps the same route behavior but uses predictable sample data.

For the Canvas video, use MongoDB. For fast local learning, tests can use memory mode.

### How To Read A Test

Read each test in three parts:

1. Arrange: create the app and any data needed.
2. Act: send a request.
3. Assert: check the response.

Example:

```js
test('POST /contacts rejects invalid data', async () => {
  const { app } = buildTestApp();

  const response = await request(app).post('/contacts').send({
    firstName: '',
    email: 'not-an-email'
  });

  expect(response.status).toBe(400);
});
```

In simple language:

"When someone sends bad contact data, the API should reject it with status 400."

That is exactly the behavior the course wants when it asks for validation.

## Chapter 11: Week 07 - Explaining Your Work In Interviews

Week 07 shifts toward professional preparation. This matters because building the API is only half the skill. You also need to explain what you built.

A strong interview explanation might sound like:

"I built a Node and Express API connected to MongoDB. I organized the project with route, controller, validation, and data-access layers. I documented the endpoints with Swagger and deployed the API to Render. I also added validation and error handling so bad requests return useful status codes instead of breaking the server."

That answer shows technical knowledge and ownership.

## Chapter 12: Code Walkthrough - Contacts API

The Contacts API starts in `src/server.js`.

`server.js` creates the store:

```js
const store = await createContactStore();
```

That store is either:

- A real MongoDB store when `MONGODB_URI` exists.
- A memory store when you are practicing locally.

Then it creates the app:

```js
const app = createApp({ store });
```

The app stores the database object in `app.locals`:

```js
app.locals.store = store;
```

That gives every controller access to the same store through `req.app.locals.store`.

The route:

```js
router.get('/', controller.getAllContacts);
```

calls this controller function:

```js
async function getAllContacts(req, res, next) {
  try {
    const contacts = await req.app.locals.store.findAll();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}
```

In plain language:

1. Ask the store for all contacts.
2. Return those contacts as JSON.
3. If something fails, pass the error to Express error handling.

The POST route is a little more involved:

```js
router.post('/', contactRules, sendValidationErrors, controller.createContact);
```

This route has three stages:

1. `contactRules` checks the request body.
2. `sendValidationErrors` returns 400 if anything is wrong.
3. `createContact` inserts the valid contact.

That is strong API design because the controller can assume the data already passed the basic rules.

## Chapter 13: Code Walkthrough - Project 2 CRUD API

The Project 2 API uses the same pattern, but it has two collections.

```js
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
```

This means:

- Requests beginning with `/books` go to the book routes.
- Requests beginning with `/authors` go to the author routes.

The book validation rules are stronger because the book collection is the larger collection:

```js
body('publishedYear').isInt({ min: 1000, max: 2100 })
body('pages').isInt({ min: 1 })
body('rating').isFloat({ min: 0, max: 5 })
```

These rules protect the database from impossible data, such as:

- A book published in year 12.
- A book with 0 pages.
- A rating of 9 out of 5.

The generic controller factory exists because books and authors both need the same CRUD behavior. Instead of writing almost identical code twice, the API creates a controller for each collection.

This is a careful abstraction. It removes real duplication without hiding the course concepts.

## Chapter 14: Submission Strategy

For every project submission, think like a grader:

- Can the grader open the GitHub link?
- Can the grader open the Render link?
- Can the grader open the YouTube link?
- Does the video follow the rubric order?
- Does the video show MongoDB Compass?
- Does the video show `/api-docs`?
- Does the video prove that POST, PUT, and DELETE change the database?
- Does the video show that `.env` is not on GitHub?

The video should not be only a tour. It should be proof.

## Chapter 15: Glossary

API: A set of rules that lets programs communicate.

Backend: The server-side part of an application.

Client: The program that sends requests to the server.

CRUD: Create, Read, Update, Delete.

Endpoint: A specific URL and method in an API.

Express: A Node.js framework for building web servers.

HTTP: The request-response protocol used by the web.

JSON: A common data format used by APIs.

MongoDB: A document database used in this course.

OAuth: A login and authorization standard.

Render: A hosting platform used to publish the API.

REST: A common style for designing APIs around resources and HTTP methods.

Route: Express code that maps a URL to a function.

Swagger: API documentation that can also be used for testing.

Validation: Checking incoming data before using it.

## Appendix A: Contacts API Route Notebook

This appendix explains every Contacts API route as if you were studying for a walkthrough.

### `GET /`

Purpose: confirm the API is running.

This is a friendly home route. It is not the main assignment requirement, but it helps during deployment. When Render starts your app, you can open the root URL and immediately see a JSON message instead of wondering whether the server is broken.

Expected result:

```json
{
  "message": "Welcome to the CSE 341 Contacts API.",
  "docs": "/api-docs",
  "routes": ["/contacts", "/contacts/:id"]
}
```

### `GET /contacts`

Purpose: return every contact.

This is one of the main Week 01 requirements. The route does not need a request body because it is only reading data. The controller calls `findAll`, and the store asks MongoDB for all documents in the contacts collection.

The response is an array:

```json
[
  {
    "_id": "66f1f53b6b39b57b5a147901",
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada.lovelace@example.com",
    "favoriteColor": "blue",
    "birthday": "1815-12-10"
  }
]
```

The important detail is the square brackets. Square brackets mean the response is a list.

### `GET /contacts/:id`

Purpose: return one contact.

The `:id` part is a route parameter. It means Express should accept a value in that spot and store it as `req.params.id`.

Example:

```http
GET /contacts/66f1f53b6b39b57b5a147901
```

Before the controller runs, the validation middleware checks whether the id is a valid MongoDB ObjectId. This avoids asking MongoDB to search with an invalid id.

Possible responses:

- `200` if the contact exists.
- `400` if the id is not shaped like a MongoDB ObjectId.
- `404` if the id is valid but no contact exists.

### `POST /contacts`

Purpose: create one contact.

This is part of the Week 02 requirements. A POST request sends a JSON body. The body must include all required fields.

```json
{
  "firstName": "Mary",
  "lastName": "Jackson",
  "email": "mary.jackson@example.com",
  "favoriteColor": "red",
  "birthday": "1921-04-09"
}
```

The API validates this body. If the data is good, the store inserts it into MongoDB and returns the new id.

Successful status: `201 Created`.

Why `201` instead of `200`? Because `201` is more specific. It tells the client that a new resource was created.

### `PUT /contacts/:id`

Purpose: update one contact.

This project uses PUT as a full replacement. That means the request body should include all contact fields, not only the one field you want to change.

Example:

```json
{
  "firstName": "Mary",
  "lastName": "Jackson",
  "email": "mary.jackson.updated@example.com",
  "favoriteColor": "gold",
  "birthday": "1921-04-09"
}
```

Successful status: `204 No Content`.

Why no body? A `204` response means the request worked but the server is not sending JSON back. That is common for update and delete routes.

### `DELETE /contacts/:id`

Purpose: remove one contact.

This route uses the id to find and delete one MongoDB document.

Possible responses:

- `204` if the contact was deleted.
- `400` if the id is invalid.
- `404` if the id is valid but no matching contact exists.

### Contacts API Study Exercise

After the project is running, try this:

1. Call `GET /contacts`.
2. Copy one `_id`.
3. Call `GET /contacts/:id`.
4. Create a new contact with POST.
5. Update that new contact with PUT.
6. Delete that contact with DELETE.
7. Send bad data and confirm the API returns `400`.

This exercise teaches the whole request lifecycle.

## Appendix B: Project 2 Route Notebook

Project 2 uses two collections: books and authors. The route pattern is intentionally similar for both collections.

### Books Collection

The books collection is the larger collection. It has nine fields:

```json
{
  "title": "Clean Code",
  "authorName": "Robert C. Martin",
  "isbn": "9780132350884",
  "genre": "Software Engineering",
  "publishedYear": 2008,
  "pages": 464,
  "language": "English",
  "available": true,
  "rating": 4.7
}
```

This satisfies the course rule that at least one collection must have seven or more fields.

Book routes:

- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`

The validation rules make sure:

- Text fields are not empty.
- `publishedYear` is a realistic year.
- `pages` is positive.
- `available` is true or false.
- `rating` is between 0 and 5.

### Authors Collection

The authors collection is smaller but still useful.

```json
{
  "name": "Robert C. Martin",
  "country": "United States",
  "birthYear": 1952,
  "primaryGenre": "Software Engineering",
  "website": "https://cleancoder.com"
}
```

Author routes:

- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`

### Why The Project Uses `makeCrudController`

Books and authors need the same basic controller actions:

- get all
- get one
- create
- update
- delete

Instead of writing almost the same code twice, `makeCrudController` creates those functions for a chosen collection.

This is what the books route does:

```js
const controller = makeCrudController({ storeName: 'books', itemName: 'Book' });
```

In plain language:

"Create a CRUD controller that uses the books store and writes messages using the word Book."

This kind of abstraction is useful when it removes repetition without making the code confusing. Since both collections behave the same way, the abstraction fits.

### How To Add A Third Collection

Imagine you want to add a `publishers` collection.

You would:

1. Add seed data in `src/data/seedData.js`.
2. Add a store property in `src/data/libraryStore.js`.
3. Add validation rules in `src/middleware/validate.js`.
4. Create `src/routes/publisherRoutes.js`.
5. Connect the route in `src/app.js`.
6. Add Swagger documentation.
7. Add examples in `requests.rest`.
8. Add tests.

This is the same pattern used in real backend work. New features usually require updates in several connected places.

## Appendix C: Common Mistakes And How To Fix Them

### The API Says `MONGODB_URI is missing`

Cause: the project cannot find your MongoDB connection string.

Fix: copy `.env.example` to `.env` and add the real value:

```text
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

Do not commit `.env`.

### Render Works Locally But Not Online

Common causes:

- The Render environment variables are missing.
- The start command is wrong.
- MongoDB Atlas does not allow Render's network access.
- The app is using the wrong database name.

What to check:

1. Render logs.
2. Environment variables.
3. MongoDB Atlas network access.
4. The deployed `/api-docs` page.

### Swagger Opens But A Route Fails

Common causes:

- The route path in Swagger does not match Express.
- The request body example is missing required fields.
- The server URL in Swagger still points to localhost.
- The route works locally but Render has missing environment variables.

Swagger is documentation, but it must stay synchronized with the real route code.

### POST Or PUT Returns 400

This usually means validation is working.

Read the response body. It should tell you which field failed.

Example:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "email must be a valid email address."
    }
  ]
}
```

That response is not bad. It is the API protecting the database.

### GET By Id Returns 404

The id may be valid, but there is no matching document.

Fix:

1. Call GET-all first.
2. Copy a real `_id`.
3. Use that id in the GET-by-id route.

### The Video Is Too Long

The course often asks for a 5 to 8 minute video. Plan the video before recording. Follow the rubric exactly. Do not spend too long explaining setup; spend most of the time proving the app works.

## Appendix D: Practice Changes To Build Confidence

Try these changes when you want to learn by editing.

### Practice 1: Add A Phone Number To Contacts

Add `phoneNumber` to:

- seed contacts
- validation rules
- Swagger schema
- REST examples
- MongoDB documents

Then run:

```powershell
npm test
```

You may need to update tests if the validation expects the new field.

### Practice 2: Add A Publisher To Books

Add a `publisher` field to the books collection. This is a safe change because books already have many fields.

Update:

- `seedData.js`
- `bookRules`
- `swagger.json`
- `requests.rest`

Then create a new book through Swagger and confirm MongoDB stores the publisher.

### Practice 3: Add A Search Route

A useful extra route would be:

```http
GET /books/search?genre=Programming
```

This introduces query parameters. Query parameters are values after the `?` in a URL.

You would read it in Express with:

```js
req.query.genre
```

That connects directly to the Week 01 learning material about query parameters.

### Practice 4: Change A Status Code

Look at `updateContact`. It returns `204`. Try changing it to return `200` with a JSON message:

```json
{
  "message": "Contact updated successfully."
}
```

Both can be valid API designs. The important thing is consistency and clear documentation.

### Practice 5: Break Validation On Purpose

Temporarily send a bad email:

```json
{
  "email": "bad"
}
```

Watch the API return 400. This helps you understand that validation is not an obstacle; it is a guardrail.

## Appendix E: Lab Manual For Running The Projects

This lab manual gives exact steps. The goal is to remove mystery from the workflow.

## Lab 1: Run The Week 01 Individual Activity

Open PowerShell in:

```text
w01-individual-activity
```

Run:

```powershell
npm start
```

You should see a message saying the API is running on port `8080`.

Then open:

```text
frontend/index.html
```

The frontend JavaScript will call:

```text
http://localhost:8080/professional
```

What this proves:

- Express can start a server.
- The frontend can call the backend.
- The backend can return JSON.
- JavaScript can place API data into HTML.

What to change for practice:

- Change `professionalName`.
- Change `primaryDescription`.
- Change the GitHub or LinkedIn link.
- Restart the server.
- Refresh the frontend page.

When you change text in the JSON response, you are changing what the frontend displays. That is the core power of APIs: one backend can feed many user interfaces.

## Lab 2: Run The Contacts API In Practice Mode

Open PowerShell in:

```text
contacts-api
```

Run:

```powershell
$env:USE_MEMORY_STORE='true'
npm start
```

Open:

```text
http://localhost:8080/contacts
```

You should see five contacts.

What this proves:

- The server starts.
- The `/contacts` route works.
- The API returns an array of JSON objects.

Important note: memory mode is for practice. It does not satisfy the final database part of the rubric because it does not use MongoDB.

## Lab 3: Connect Contacts API To MongoDB

Create a file named `.env` in `contacts-api`.

Use `.env.example` as the pattern:

```text
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=cse341_contacts
CONTACTS_COLLECTION=contacts
USE_MEMORY_STORE=false
```

Then create a MongoDB database named:

```text
cse341_contacts
```

Create a collection named:

```text
contacts
```

Add at least five documents. Each document should include:

```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada.lovelace@example.com",
  "favoriteColor": "blue",
  "birthday": "1815-12-10"
}
```

Run:

```powershell
npm start
```

Open:

```text
http://localhost:8080/contacts
```

What this proves:

- Your app can connect to MongoDB.
- Your collection name is correct.
- Your database records have the expected fields.

## Lab 4: Test Contacts With Swagger

Start the Contacts API and open:

```text
http://localhost:8080/api-docs
```

Try the routes in this order:

1. `GET /contacts`
2. `GET /contacts/{id}`
3. `POST /contacts`
4. `PUT /contacts/{id}`
5. `DELETE /contacts/{id}`

After POST, PUT, and DELETE, check MongoDB Compass.

What this proves:

- Swagger documentation is usable.
- The API accepts JSON bodies.
- The API changes MongoDB.
- The API returns appropriate status codes.

## Lab 5: Run Project 2 In Practice Mode

Open PowerShell in:

```text
project2-crud-api
```

Run:

```powershell
$env:USE_MEMORY_STORE='true'
npm start
```

Open:

```text
http://localhost:8081/books
http://localhost:8081/authors
```

What this proves:

- The Project 2 API starts.
- It has two collections.
- The collections return JSON.

The Project 2 API uses port `8081` so it does not collide with the Contacts API when you are practicing.

## Lab 6: Connect Project 2 To MongoDB

Create `.env` in `project2-crud-api`.

```text
PORT=8081
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=cse341_library
USE_MEMORY_STORE=false
```

Create a MongoDB database named:

```text
cse341_library
```

Create two collections:

```text
books
authors
```

Add book records with at least nine fields:

```json
{
  "title": "Clean Code",
  "authorName": "Robert C. Martin",
  "isbn": "9780132350884",
  "genre": "Software Engineering",
  "publishedYear": 2008,
  "pages": 464,
  "language": "English",
  "available": true,
  "rating": 4.7
}
```

Add author records:

```json
{
  "name": "Robert C. Martin",
  "country": "United States",
  "birthYear": 1952,
  "primaryGenre": "Software Engineering",
  "website": "https://cleancoder.com"
}
```

What this proves:

- Project 2 has at least two collections.
- One collection has seven or more fields.
- MongoDB is ready for CRUD route testing.

## Lab 7: Run Automated Tests

In `contacts-api`, run:

```powershell
npm test
```

In `project2-crud-api`, run:

```powershell
npm test
```

Passing tests prove that the main routes still behave correctly.

If a test fails, read the failure carefully. It usually tells you:

- which test failed
- what value it expected
- what value it received

Tests are not insults. Tests are feedback.

## Lab 8: Prepare For Render

Before deploying, check:

```powershell
npm start
```

Then check:

```text
/api-docs
```

On Render, set environment variables instead of uploading `.env`.

Why? Render is a cloud service. It needs the values, but GitHub should not store your secrets.

## Lab 9: Record A Strong Submission Video

The best video order is:

1. State the assignment.
2. Show GitHub.
3. Show `.env` is not in GitHub.
4. Show Render.
5. Open `/api-docs`.
6. Test required routes.
7. Show MongoDB Compass updates.
8. Mention validation and error handling.
9. End with the three links you will submit.

Do not spend half the video explaining how you installed tools. The rubric is mostly about proving the API works.

## Lab 10: Debugging Checklist

When something breaks, answer these questions:

- Is the server running?
- Is the port correct?
- Is the URL correct?
- Is the HTTP method correct?
- Did I send `Content-Type: application/json`?
- Is the JSON valid?
- Did validation reject the request?
- Is MongoDB connected?
- Does the collection name match?
- Did I copy a real `_id`?
- Is Render missing environment variables?

Write down the exact error message. Exact error messages are clues.

## Part Two: Week-By-Week Study Guide

This section turns the seven course weeks into a study path. Read it slowly. The point is to connect the course vocabulary to code you can open in this workspace.

## Week 01 Deep Study: Web Services And Node Architecture

Week 01 asks you to think like a backend developer for the first time. Earlier web courses often focus on what appears in the browser. In web services, the main product is not a page. The main product is a reliable way for other software to ask for data and receive data.

The Week 01 mental model is:

```mermaid
flowchart LR
  Person[Person using a browser] --> Frontend[Frontend JavaScript]
  Frontend --> API[Node and Express API]
  API --> Data[Data source]
  Data --> API
  API --> Frontend
  Frontend --> Page[Updated HTML page]
```

In the individual activity, the data source is just an object inside `server.js`. In the Contacts project, the data source becomes MongoDB. That is an important upgrade. A hard-coded object disappears when the server restarts. MongoDB stores records outside the app, so the data can last.

### Node.js

Node.js lets JavaScript run on the server. Before Node, JavaScript was mostly thought of as a browser language. With Node, JavaScript can:

- read environment variables
- start a web server
- connect to a database
- read files
- call other APIs
- run tests

In these projects, Node runs files like:

```powershell
node src/server.js
```

That command tells Node to execute the server file.

### Express

Express is a small framework on top of Node. Node can create a server by itself, but Express makes route handling easier.

This is a route:

```js
app.get('/professional', (req, res) => {
  res.json({ professionalName: 'Lebohang CSE 341 Student' });
});
```

Read it in simple language:

"When someone sends a GET request to `/professional`, respond with JSON."

`req` means request. It contains what the client sent.

`res` means response. It is how the server sends data back.

### REST Clients

A REST client is a tool for calling APIs without building a frontend. The course suggests tools like Postman, Thunder Client, Swagger, and the VS Code REST Client extension.

The file `contacts-api/requests.rest` is a REST Client file. It lets you click a request and send it from VS Code.

Why this matters: backend developers often build APIs before a frontend exists. REST clients let you prove your backend works by itself.

### GET Requests

GET requests should read data. They should not normally create, update, or delete data.

In Contacts:

```http
GET /contacts
```

reads all contacts.

```http
GET /contacts/:id
```

reads one contact.

The browser also uses GET when you type a normal URL into the address bar.

### Query Parameters

A query parameter is extra information after a question mark in a URL.

Example:

```http
GET /books?genre=Programming
```

The route is still `/books`, but `genre=Programming` gives the server an extra filter.

In Express:

```js
const genre = req.query.genre;
```

The current projects do not require search routes, but adding one would be a good extra learning exercise.

### Headers

Headers are metadata sent with a request or response. They describe the request instead of being the main data.

Example:

```http
Content-Type: application/json
```

This tells the server, "The body I am sending is JSON."

Without this header, Express might not know how to parse the body correctly.

### Debugging Node

Debugging means finding out why code does not behave the way you expect. In this course, common debugging steps are:

- read the terminal output
- check the URL
- check the HTTP method
- check the request body
- check the status code
- check Render logs
- check MongoDB Compass
- check whether `.env` values exist

Good debugging is calm and specific. Instead of saying "it does not work," ask:

"Which request did I send, what response did I get, and where did the result differ from what I expected?"

## Week 02 Deep Study: HTTP Requests And API Documentation

Week 02 completes the Contacts project by adding POST, PUT, DELETE, and Swagger.

### URI Hierarchies

URI hierarchy means URL design. A clean API uses URLs that feel predictable.

Good:

```http
GET /contacts
GET /contacts/:id
POST /contacts
PUT /contacts/:id
DELETE /contacts/:id
```

Less good:

```http
GET /getAllContactsNow
POST /makeNewContact
POST /deleteAContact
```

The first version uses resources and HTTP methods. The second version puts actions into the URL names. REST usually prefers the first style.

### POST

POST creates a new resource.

In `contacts-api`, POST uses this flow:

```mermaid
flowchart LR
  Request[POST /contacts] --> Validate[Check fields]
  Validate -->|valid| Insert[Insert into MongoDB]
  Validate -->|invalid| Bad[Return 400]
  Insert --> Created[Return 201 and new id]
```

POST should return enough information for the client to know what happened. This project returns the new id, which is useful because the client may want to fetch or update that contact later.

### PUT

PUT updates an existing resource. This project uses replacement-style PUT: the client sends the full contact object.

Why full replacement can be simpler for learning:

- validation is straightforward
- Swagger examples are clear
- the database update is easy to reason about

Later, you may learn PATCH, which is often used for partial updates.

### DELETE

DELETE removes a resource.

DELETE can feel risky because it changes data permanently. That is why the route requires an id and returns `404` when the id does not match anything.

### MongoDB CRUD

MongoDB CRUD maps cleanly to API CRUD:

| API Action | HTTP Method | MongoDB Operation |
| --- | --- | --- |
| Read all | GET | `find` |
| Read one | GET | `findOne` |
| Create | POST | `insertOne` |
| Update | PUT | `replaceOne` or `updateOne` |
| Delete | DELETE | `deleteOne` |

This course uses MongoDB because documents look a lot like JSON. That makes the connection between request body, database document, and JSON response easier to see.

### Linters And Formatters

A linter checks code for possible mistakes. A formatter makes code style consistent.

They do not replace understanding. They help remove distractions. When code is formatted consistently, your brain can focus on the actual logic.

Common tools:

- ESLint for linting.
- Prettier for formatting.

Because this machine ran low on disk space earlier, the current projects focus first on working code and tests. The projects can still add linting later.

### API Documentation

API documentation is the instruction manual for your backend.

Bad documentation says only:

"Use `/contacts`."

Good documentation says:

- what method to use
- what URL to call
- what body to send
- what fields are required
- what response status codes mean
- what errors can happen

Swagger is powerful because it turns documentation into a testing page. This is why the course cares that `/api-docs` works on Render.

## Week 03 Deep Study: REST, Alternatives, Validation, And Error Handling

Week 03 teaches that REST is not the only way software can communicate. It also teaches two habits that make APIs safer: validation and error handling.

### JSON Compared With XML

JSON is common in modern APIs because it maps naturally to JavaScript objects.

JSON example:

```json
{
  "firstName": "Ada",
  "lastName": "Lovelace"
}
```

XML example:

```xml
<contact>
  <firstName>Ada</firstName>
  <lastName>Lovelace</lastName>
</contact>
```

Both can represent data. JSON is usually shorter and easier to use in JavaScript.

### REST

REST organizes APIs around resources. A resource is a thing your API manages, such as contacts, books, authors, users, products, orders, or appointments.

REST uses HTTP methods to say what action should happen.

Resource:

```text
/books
```

Actions:

```http
GET /books
POST /books
GET /books/:id
PUT /books/:id
DELETE /books/:id
```

The URL names the thing. The HTTP method names the action.

### RPC

RPC means Remote Procedure Call. Instead of organizing around resources, RPC often organizes around functions.

Example:

```http
POST /createBook
POST /deleteBook
```

RPC can be useful, but REST is easier for this course because it pairs naturally with HTTP methods.

### SOAP

SOAP is an older protocol that commonly uses XML. It is more formal and heavier than most REST APIs. Some large enterprise systems still use SOAP, especially older systems that need strict contracts.

The main reason to learn about SOAP in this course is not to use it. The reason is to understand why JSON and REST became popular: they are lighter and easier for many web projects.

### GraphQL

GraphQL lets clients ask for exactly the fields they want.

REST:

```http
GET /books/123
```

GraphQL style:

```graphql
{
  book(id: "123") {
    title
    authorName
  }
}
```

GraphQL can be excellent when frontends need flexible data shapes. REST is still a great starting point because it teaches HTTP, routes, status codes, and resource design clearly.

### Validation

Validation is one of the biggest differences between beginner APIs and reliable APIs.

Without validation, someone could create a book like this:

```json
{
  "title": "",
  "publishedYear": 4,
  "pages": -10,
  "rating": 99
}
```

That data would make the app less trustworthy.

With validation, the API rejects it and explains why.

### Error Handling

Errors will happen. A database may be offline. A user may send a bad id. A route may receive missing data. Good APIs plan for errors.

The projects use `try/catch` in controllers:

```js
try {
  const contacts = await req.app.locals.store.findAll();
  res.json(contacts);
} catch (error) {
  next(error);
}
```

`next(error)` passes the problem to Express error middleware. This keeps controllers clean and lets one final error handler format the response.

## Week 04 Deep Study: OAuth And Protected Routes

Week 04 is about login and route protection.

### Authentication And Authorization

Authentication asks:

"Who are you?"

Authorization asks:

"What are you allowed to do?"

Example:

- Logging in with Google is authentication.
- Allowing only logged-in users to create, update, or delete records is authorization.

### Why OAuth Exists

OAuth lets users sign in through a trusted provider. Instead of your app storing passwords, the provider handles the sensitive login flow.

A simplified OAuth flow:

```mermaid
sequenceDiagram
  participant User
  participant App
  participant Provider as OAuth Provider
  User->>App: Click login
  App->>Provider: Redirect user to provider
  Provider->>User: Ask user to sign in
  Provider->>App: Send login result
  App->>User: Create session or token
```

In a CSE 341 project, you usually need to prove:

- user can log in
- user can log out
- protected routes reject unauthenticated access
- at least two routes are protected
- Swagger accurately documents security behavior

### What To Protect

In many APIs, GET routes can stay public while POST, PUT, and DELETE are protected. That makes sense because reading public data is less risky than changing data.

Example policy:

- Anyone can `GET /books`.
- Only logged-in users can `POST /books`.
- Only logged-in users can `PUT /books/:id`.
- Only logged-in users can `DELETE /books/:id`.

This is not the only possible policy, but it is easy to explain in a course video.

## Week 05 Deep Study: API Gateways

An API gateway is like the front desk for a group of APIs. Clients talk to the gateway. The gateway decides where requests should go.

Without a gateway:

```mermaid
flowchart LR
  Client --> UsersAPI[Users API]
  Client --> OrdersAPI[Orders API]
  Client --> PaymentsAPI[Payments API]
```

With a gateway:

```mermaid
flowchart LR
  Client --> Gateway[API Gateway]
  Gateway --> UsersAPI[Users API]
  Gateway --> OrdersAPI[Orders API]
  Gateway --> PaymentsAPI[Payments API]
```

Gateways become helpful when systems grow. For this class, your projects are small enough to run as one Express API. Still, understanding gateways helps you see how professional systems organize many services.

Gateway responsibilities can include:

- authentication
- rate limits
- request logging
- traffic routing
- API versioning
- monitoring

## Week 06 Deep Study: Testing

Testing is how you protect your future self. When a project gets bigger, you cannot manually click everything after every change. Tests give fast feedback.

The tests added to these projects focus on route behavior.

Contacts tests prove:

- all contacts can be read
- one contact can be read by id
- a contact can be created
- invalid contact data is rejected

Project 2 tests prove:

- all books can be read
- one book can be read by id
- invalid book data is rejected
- all authors can be read
- one author can be read by id

These tests are not the end of testing. They are a solid beginning.

More tests to add later:

- PUT success
- DELETE success
- invalid id returns 400
- missing id returns 404
- Swagger route loads
- protected routes reject unauthenticated users after OAuth is added

## Week 07 Deep Study: Talking About Your Work

Week 07 focuses on resumes and interviews. Your projects can become portfolio evidence if you explain them clearly.

A weak resume bullet:

"Made API project."

A stronger resume bullet:

"Built and deployed a Node.js/Express REST API with MongoDB CRUD operations, Swagger documentation, validation, error handling, and route tests."

That sentence is better because it names the stack, the behavior, and the quality practices.

### Interview Story Framework

Use this simple structure:

1. Problem: what needed to be built?
2. Tools: what stack did you use?
3. Design: how did you organize the code?
4. Challenge: what was tricky?
5. Result: how did you prove it worked?

Example:

"I built a Contacts API for a web services course. I used Node.js, Express, MongoDB, Swagger, and Render. I organized the code into routes, controllers, validation middleware, and data access files so each file had a clear purpose. The trickiest part was making sure bad data did not enter the database, so I added validation and clear 400 responses. I proved the app worked with Swagger, REST Client examples, and automated route tests."

That answer sounds like someone who understands the work instead of someone who only copied code.

## Part Three: Backend Developer Field Guide

This part explains the choices behind the code. When you understand the choices, you can safely make your own changes.

## Chapter 16: Thinking In Layers

Backend projects become easier when you stop thinking of them as one file and start thinking of them as layers.

The projects in this workspace use these layers:

```mermaid
flowchart TB
  Entry[Entry Point] --> App[App Setup]
  App --> Routes[Routes]
  Routes --> Middleware[Middleware]
  Middleware --> Controllers[Controllers]
  Controllers --> Store[Data Store]
  Store --> Database[(Database)]
```

Each layer has one main job.

The entry point starts the program. In Contacts, this is `src/server.js`.

The app setup creates the Express app. In Contacts, this is `src/app.js`.

Routes match URLs to controller functions. In Contacts, this is `src/routes/contactRoutes.js`.

Middleware runs between the route and the controller. Validation middleware checks request data.

Controllers handle the request and decide which response to send.

The data store talks to MongoDB.

The database stores the real records.

Why this matters: if a bug appears, you can ask which layer owns the bug.

If the URL is wrong, check routes.

If data is rejected, check validation.

If MongoDB is not reached, check the data store or `.env`.

If the wrong status code comes back, check the controller.

This is how experienced developers debug without panic.

## Chapter 17: The Request Lifecycle

Every API request travels through a path.

Example:

```http
POST /contacts
Content-Type: application/json

{
  "firstName": "Mary",
  "lastName": "Jackson",
  "email": "mary.jackson@example.com",
  "favoriteColor": "red",
  "birthday": "1921-04-09"
}
```

The request lifecycle is:

1. Express receives the request.
2. Express checks the HTTP method and URL.
3. The matching route is found.
4. Validation middleware checks the body.
5. If validation fails, the API returns `400`.
6. If validation passes, the controller runs.
7. The controller asks the store to insert the document.
8. The store sends the insert command to MongoDB.
9. MongoDB creates the record and returns the inserted id.
10. The controller sends a `201` response.

This full path is important because a route is not just one function. It is a chain of decisions.

When you record your Week 02 video, Swagger is the client. Swagger sends the request. Express handles it. MongoDB changes. You show the whole story by switching between Swagger and MongoDB Compass.

## Chapter 18: Designing Good Resources

A resource is a thing your API manages.

Good API resources are nouns:

- contacts
- books
- authors
- users
- products
- orders
- appointments

Weak route names often sound like verbs:

- createContact
- deleteBook
- updateAuthorNow

REST prefers nouns in the URL and verbs in the HTTP method.

Good:

```http
POST /contacts
DELETE /contacts/:id
```

The method says the action. The URL says the resource.

### Resource Design In Contacts

The Contacts project has one main resource:

```text
contacts
```

That is enough for Weeks 01-02 because the assignment focuses on one collection.

### Resource Design In Project 2

The Project 2 library API has two resources:

```text
books
authors
```

These resources are related but separate. A book has an author name. An author can have many books. A more advanced version could connect them by id, but Week 03 does not require relationships. It requires two collections with CRUD.

That is an important student decision: do not make the data model more complicated than the assignment needs. Good software is not the software with the most features. Good software fits the requirement clearly.

## Chapter 19: Database Modeling With MongoDB

MongoDB stores documents. A document looks like JSON.

Contacts document:

```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada.lovelace@example.com",
  "favoriteColor": "blue",
  "birthday": "1815-12-10"
}
```

Book document:

```json
{
  "title": "Clean Code",
  "authorName": "Robert C. Martin",
  "isbn": "9780132350884",
  "genre": "Software Engineering",
  "publishedYear": 2008,
  "pages": 464,
  "language": "English",
  "available": true,
  "rating": 4.7
}
```

MongoDB automatically adds `_id`.

Example:

```json
{
  "_id": "66f1f53b6b39b57b5a147901",
  "title": "Clean Code"
}
```

That `_id` is how GET-by-id, PUT, and DELETE find one exact record.

### Choosing Fields

A field should describe one piece of information.

Good contact fields:

- `firstName`
- `lastName`
- `email`
- `favoriteColor`
- `birthday`

Less helpful:

- `data`
- `info`
- `thing`

Clear field names make your API easier to document and easier to grade.

### Required Fields

If a field is required, every new record should include it. That is why validation exists.

In the Contacts API, every field is required because the assignment says the database stores those fields for each contact.

In Project 2, `website` for authors is optional because not every author needs a website. This is a realistic design choice.

### Data Types

APIs should use consistent types.

Examples:

- `firstName` is a string.
- `publishedYear` is a number.
- `available` is a boolean.
- `rating` is a number.
- `birthday` is a date string.

If `available` is sometimes `true`, sometimes `"yes"`, and sometimes `1`, the frontend has to guess. APIs should reduce guessing.

## Chapter 20: Environment Variables And Secrets

Secrets are values that should not be public.

Examples:

- MongoDB username
- MongoDB password
- OAuth client secret
- API keys

The course cares about `.env` because it teaches a professional habit: code can be public, but secrets should not be public.

The project has `.env.example`:

```text
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

This file is safe because it uses placeholders.

The real `.env` file is not safe to commit because it contains the actual password.

The `.gitignore` file says:

```text
.env
node_modules/
```

That tells Git not to track secrets or installed packages.

### Why Not Commit `node_modules`

`node_modules` can contain thousands of files. It is huge, machine-specific, and easy to recreate.

Instead of committing `node_modules`, you commit:

- `package.json`
- `package-lock.json`

Then another person can run:

```powershell
npm install
```

That recreates `node_modules`.

## Chapter 21: Swagger As A Learning Tool

Swagger is not only for graders. It is also for you.

When you write Swagger, you are forced to answer:

- What routes exist?
- What data does each route need?
- What status codes can happen?
- What does a valid body look like?
- What does this API promise?

The Contacts Swagger file documents:

- `GET /contacts`
- `POST /contacts`
- `GET /contacts/{id}`
- `PUT /contacts/{id}`
- `DELETE /contacts/{id}`

Swagger uses `{id}` while Express uses `:id`.

Express:

```js
router.get('/:id', controller.getContactById);
```

Swagger:

```json
"/contacts/{id}": {
  "get": {
    "summary": "Get one contact"
  }
}
```

They mean the same idea: this part of the URL is a variable.

### Swagger Request Bodies

A request body example helps the user send correct data.

```json
{
  "firstName": "Ruth",
  "lastName": "Bader",
  "email": "ruth.bader@example.com",
  "favoriteColor": "white",
  "birthday": "1933-03-15"
}
```

This is especially useful in your video. You do not want to type random JSON while recording. Swagger examples make the video smoother.

### Keeping Swagger Honest

Swagger must match the code.

If Express has:

```js
router.post('/', contactRules, sendValidationErrors, controller.createContact);
```

Swagger should document:

```text
POST /contacts
```

If you add a new field to validation but forget Swagger, the docs become misleading.

Good API documentation is part of the product.

## Chapter 22: Validation Strategy

Validation should happen before database writes.

Why? Because the database should store trusted shapes, not random input.

The Contacts route:

```js
router.post('/', contactRules, sendValidationErrors, controller.createContact);
```

This order matters.

First:

```js
contactRules
```

Then:

```js
sendValidationErrors
```

Then:

```js
controller.createContact
```

If validation fails, the controller never runs. That means the database insert never happens.

### Good Validation Messages

The API returns messages like:

```text
email must be a valid email address.
```

This is better than:

```text
Bad input.
```

A good validation message tells the user how to fix the request.

### Validation In Project 2

Books are validated more deeply:

```js
body('rating').isFloat({ min: 0, max: 5 })
```

That rule explains the business idea: a rating should be from 0 to 5.

Validation is not only technical. It also describes what your app believes is reasonable.

## Chapter 23: Error Handling Strategy

Error handling has two jobs:

1. Help the client understand what went wrong.
2. Keep the server from crashing unexpectedly.

The projects use route-level `try/catch`:

```js
try {
  const contact = await req.app.locals.store.findById(req.params.id);
  res.json(contact);
} catch (error) {
  next(error);
}
```

They also use final error middleware:

```js
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: 'Server error',
    message: error.message || 'Something went wrong while processing the request.'
  });
});
```

The controller catches problems near the route. The final middleware formats unexpected problems in one place.

### Expected Errors

Some errors are expected:

- invalid id
- missing contact
- bad email
- missing required field

Expected errors should have specific status codes.

### Unexpected Errors

Unexpected errors include:

- database connection failure
- coding mistakes
- server configuration problems

Unexpected errors usually become `500` responses.

When you see a `500`, check the terminal or Render logs. The client response should not expose secrets, but the server logs should help you debug.

## Chapter 24: Deployment Thinking

Running locally proves the app works on your computer. Deploying proves the app can run on the web.

Render needs:

- your GitHub repo
- a build command
- a start command
- environment variables

The start command is:

```powershell
npm start
```

That runs the `start` script in `package.json`.

For Contacts:

```json
"start": "node src/server.js"
```

For Project 2:

```json
"start": "node src/server.js"
```

Render also needs `MONGODB_URI`. You set that in Render's environment variable settings, not in GitHub.

### Why Deployment Fails

Deployment failures usually come from one of these:

- missing environment variable
- wrong start command
- app listens on the wrong port
- MongoDB network access blocks Render
- package install failed

The projects use:

```js
const port = process.env.PORT || 8080;
```

That is Render-friendly because Render can provide its own `PORT`.

## Chapter 25: Video Proof

The course rubrics are practical. They do not only ask whether the code exists. They ask for video proof that it works.

A good video is a guided proof.

### Week 01 Proof

Show:

- GET all contacts
- GET one contact by id
- Render deployment
- `.env` not in GitHub
- MVC folders
- MongoDB records

### Week 02 Proof

Show:

- Swagger at `/api-docs`
- GET all
- GET by id
- POST creates a contact
- PUT updates a contact
- DELETE removes a contact
- MongoDB changes after each write
- validation rejects bad data

### Week 03 Proof

Show:

- project idea
- two collections
- one collection with seven or more fields
- CRUD for both collections
- Swagger works
- validation works
- error handling works
- Render works
- secrets are not in GitHub

### The Best Video Habit

Say what you are proving before you prove it.

Example:

"Now I am going to prove that POST creates a contact in MongoDB. I will run the POST request in Swagger, then I will switch to MongoDB Compass and show the new document."

That helps the grader follow the evidence.

## Chapter 26: Reading `package.json`

Every Node project has a `package.json`.

It answers:

- What is the project called?
- What file starts the app?
- What commands are available?
- What packages does the app need?

Contacts example:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "node --watch src/server.js",
  "docs": "node swagger.js",
  "check": "node src/server.js --check",
  "test": "cross-env NODE_ENV=test USE_MEMORY_STORE=true jest --runInBand"
}
```

`start` runs the app normally.

`dev` runs with watch mode so Node restarts when files change.

`docs` can generate Swagger from route files.

`check` boots the app without keeping a server open.

`test` runs automated tests in memory mode.

If you understand `package.json`, you understand how to operate the project.

## Chapter 27: Reading `server.js`

The server file should be small.

Contacts:

```js
const store = await createContactStore();
const app = createApp({ store });
```

This says:

1. Create the data store.
2. Create the Express app.
3. Give the store to the app.

Then:

```js
app.listen(port, () => {
  console.log(`Contacts API is running on port ${port}`);
});
```

This starts listening for requests.

If the server file becomes huge, it is usually doing too many jobs. Move route logic into controllers. Move database logic into data files.

## Chapter 28: Reading Route Files

Route files are maps.

Contacts route map:

```js
router.get('/', controller.getAllContacts);
router.get('/:id', idRule, sendValidationErrors, controller.getContactById);
router.post('/', contactRules, sendValidationErrors, controller.createContact);
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);
router.delete('/:id', idRule, sendValidationErrors, controller.deleteContact);
```

This is almost the whole API contract in five lines.

When reading a route line, ask:

- What method is this?
- What path is this?
- Which middleware runs?
- Which controller runs?

Example:

```js
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);
```

Plain-language reading:

"For PUT requests to a specific id, validate the id, validate the contact body, send validation errors if needed, then update the contact."

## Chapter 29: Reading Controllers

Controllers are decision points.

They decide:

- which store method to call
- which status code to send
- which JSON response to send
- what to do when no record is found

Example:

```js
if (!contact) {
  return res.status(404).json({
    error: 'Contact not found',
    message: `No contact exists with id ${req.params.id}.`
  });
}
```

This is business behavior. The project is saying:

"If the id is valid but no contact exists, the correct response is 404."

That is more helpful than returning `null` with status 200.

## Chapter 30: Reading Data Store Files

The data store is where database details live.

Contacts:

```js
async findById(id) {
  const collection = await this.collection();
  return collection.findOne({ _id: new ObjectId(id) });
}
```

Plain-language reading:

"Open the contacts collection and find one document whose `_id` matches this id."

The controller does not need to know the MongoDB query. It just calls:

```js
store.findById(id)
```

This is separation of concerns. Each file owns a specific kind of knowledge.

## Chapter 31: Reading Validation Files

Validation files describe what data is acceptable.

Contact rule:

```js
body('birthday')
  .trim()
  .isISO8601({ strict: true })
  .withMessage('birthday must be a real date in YYYY-MM-DD format.');
```

Plain-language reading:

"The birthday field should be trimmed, then checked as a real date, and if it fails the API should explain the expected format."

Validation is one of the easiest places to improve an API.

You can add:

- minimum lengths
- maximum lengths
- numeric ranges
- allowed choices
- optional fields
- required fields

## Chapter 32: Reading Tests

Tests are examples with expectations.

Contacts:

```js
const response = await request(app).get('/contacts');

expect(response.status).toBe(200);
expect(response.body).toHaveLength(5);
```

Plain-language reading:

"When I call GET /contacts, the response should succeed and return five seed contacts."

Tests help you modify code with confidence.

If you change the seed data to six contacts, this test should change too:

```js
expect(response.body).toHaveLength(6);
```

Tests are not permanent laws. They are written expectations. When the intended behavior changes, update the tests to match.

## Chapter 33: What "Above And Beyond" Means For These Assignments

For this course, "above and beyond" should still be aligned with the rubric. Extra work should make the required proof clearer.

Useful extras:

- clear README
- `.env.example`
- `.gitignore`
- Swagger examples
- validation messages
- error handling
- REST Client file
- automated tests
- seed data
- video script
- diagrams

Less useful extras:

- complicated frontend not required by the assignment
- unrelated login before Week 04
- too many collections for Week 03
- a database schema so complex you cannot explain it

The best extra work makes the grader's job easy.

## Chapter 34: How To Make Your Own Changes Safely

When you change backend code, move slowly:

1. Run tests before changing anything.
2. Make one small change.
3. Run tests again.
4. Start the server.
5. Test the route manually.
6. Update Swagger.
7. Update README or book notes.
8. Commit.

This workflow protects you from confusion.

### Example Change: Add `phoneNumber`

If you add `phoneNumber` to contacts, update:

- `seedContacts.json`
- `validate.js`
- `swagger.json`
- `requests.rest`
- tests
- MongoDB data

Then record it as an improvement:

"I added phoneNumber to the Contacts API and updated validation, documentation, examples, tests, and sample data so the new field is supported everywhere."

That is how a small field change becomes a professional-quality change.

## Chapter 35: Capstone Mental Model

By the end of Week 07, you should be able to explain this whole system:

![Full course web services concept map](../diagrams/course-platform-map.png)

```mermaid
flowchart LR
  Client[Client or Swagger] --> API[Express API on Render]
  API --> Auth[OAuth Protection]
  Auth --> Routes[Routes]
  Routes --> Validation[Validation]
  Validation --> Controllers[Controllers]
  Controllers --> Mongo[(MongoDB)]
  Controllers --> Tests[Jest and Supertest prove behavior]
  API --> Docs[Swagger Documentation]
```

The exact code may change from project to project, but the concepts remain:

- clients send HTTP requests
- Express routes receive them
- middleware checks them
- controllers process them
- MongoDB stores data
- Swagger explains the contract
- OAuth protects sensitive actions
- tests prove behavior
- Render makes the API public

That is the heart of CSE 341.

## Part Four: Deeper Course Expansion

The earlier chapters gave the main path through the projects. This part slows down and studies the ideas again from another angle. The goal is to help you become comfortable enough to explain the work, change it, and debug it without feeling lost.

![Authentication and testing flow](../diagrams/auth-testing-flow.png)

## Chapter 36: Week 04 OAuth In Plain Language

Week 04 introduces OAuth. This is often the first topic in the course that feels larger than a normal route, because OAuth is not just one function. It is a conversation between several systems.

In simple language, OAuth lets a user sign in through a trusted identity provider. Your app does not need to store the user's password. Instead, the provider proves that the user signed in.

The main players are:

- The user, who wants to use your app.
- Your app, which needs to know who the user is.
- The OAuth provider, such as GitHub or Google.
- The protected route, which should only work after login.

The simplest mental picture is this:

```mermaid
sequenceDiagram
  participant User
  participant App as Your Express App
  participant Provider as OAuth Provider
  participant API as Protected API Route
  User->>App: Click login
  App->>Provider: Send user to provider
  Provider->>User: Ask user to approve login
  User->>Provider: Approve
  Provider->>App: Send proof of login
  App->>API: Allow protected request
```

The important thing is that your app is not asking the user for their provider password. If you use GitHub OAuth, GitHub handles GitHub passwords. Your app only receives proof that GitHub approved the login.

### Authentication Compared With Authorization

Authentication asks:

"Who are you?"

Authorization asks:

"What are you allowed to do?"

These two words are close, but they are not the same.

Example:

```text
Authentication: The app knows this is Lebohang.
Authorization: Lebohang is allowed to create, update, and delete records.
```

In a class project, you might protect POST, PUT, and DELETE because those routes change the database. You might leave GET routes public because anyone can read the data. Another project might protect everything.

This is a design decision. The course wants you to show that you understand the decision and can demonstrate it.

### How This Relates To The Contacts API

The Contacts API for Weeks 01 and 02 does not require OAuth. That is good, because it lets you learn CRUD first. If you added OAuth later, the project structure would make it easier.

Right now, the route file says:

```js
router.post('/', contactRules, sendValidationErrors, controller.createContact);
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);
router.delete('/:id', idRule, sendValidationErrors, controller.deleteContact);
```

If this were a Week 04 protected API, you could add an authentication middleware:

```js
router.post('/', requireLogin, contactRules, sendValidationErrors, controller.createContact);
router.put('/:id', requireLogin, idRule, contactRules, sendValidationErrors, controller.updateContact);
router.delete('/:id', requireLogin, idRule, sendValidationErrors, controller.deleteContact);
```

Read that in plain English:

"Before a user can create, update, or delete contacts, check whether the user is logged in. If the user is logged in, continue to validation and the controller."

This is why middleware matters. Middleware gives you checkpoints between the request and the final controller.

### What A Login Middleware Does

A login middleware has one main job: decide whether the request should continue.

Conceptual example:

```js
function requireLogin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'You must log in before using this route.'
    });
  }

  return next();
}
```

This does not show the full OAuth setup. It shows the key idea. If there is no logged-in user, stop the request. If there is a logged-in user, call `next()` and let the request continue.

The word `next` means "move to the next step in the Express chain."

### OAuth And Swagger

Swagger becomes more important when routes are protected. A normal route can be tested immediately. A protected route needs some kind of login or token first.

Swagger can document security so users understand which routes are protected.

A simplified security section might look like this:

```json
{
  "components": {
    "securitySchemes": {
      "OAuth2": {
        "type": "oauth2",
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "https://github.com/login/oauth/authorize",
            "tokenUrl": "https://github.com/login/oauth/access_token",
            "scopes": {}
          }
        }
      }
    }
  }
}
```

Do not memorize every symbol yet. Focus on the meaning:

- Swagger knows the route uses OAuth.
- Swagger knows where login starts.
- Swagger knows where a token can be exchanged.
- Swagger can help users test protected routes.

For a video, you would show one route failing before login and succeeding after login.

### JWTs In The Same Conversation

The course introduces JWTs as an extra concept. JWT means JSON Web Token. A token is a small string that carries information. A signed token can prove that it came from a trusted source.

A JWT often has claims. A claim is a fact.

Example claims:

```json
{
  "sub": "user-123",
  "email": "student@example.com",
  "role": "student"
}
```

In plain language:

"This token says the user id is user-123, the email is student@example.com, and the role is student."

You do not need to make JWTs the center of the course project unless the assignment asks for it. The key lesson is that modern login systems often use tokens behind the scenes.

### Week 04 Practice Questions

Ask yourself:

- Which routes should be public?
- Which routes should require login?
- What should happen if a user is not logged in?
- Should a normal user be allowed to delete records?
- What will I show in Swagger to prove the route is protected?

Strong answer:

"I protected the write routes because they change the database. A user can read public data, but creating, updating, and deleting require login. If a user is not logged in, the API returns 401."

That answer shows both technical knowledge and judgment.

## Chapter 37: Designing Protected Routes

Protected routes are routes with a locked door in front of them. The controller still does the normal work, but only after a middleware says the request is allowed.

Without protection:

```mermaid
flowchart LR
  Request[Request] --> Validation[Validation]
  Validation --> Controller[Controller]
  Controller --> Mongo[(MongoDB)]
```

With protection:

```mermaid
flowchart LR
  Request[Request] --> Auth[Check Login]
  Auth -->|Not logged in| Reject[401 Unauthorized]
  Auth -->|Logged in| Validation[Validation]
  Validation --> Controller[Controller]
  Controller --> Mongo[(MongoDB)]
```

This is not only a security pattern. It is a thinking pattern. You are deciding which steps must happen before the app trusts a request.

### Good Routes To Protect

Routes that change data are usually good candidates for protection:

```http
POST /contacts
PUT /contacts/:id
DELETE /contacts/:id
```

Routes that only read data may or may not be protected:

```http
GET /contacts
GET /contacts/:id
```

It depends on the project. A public library catalog might let everyone read books. A private medical app would protect every route.

### Status Codes For Protected Routes

Two status codes matter a lot:

- `401 Unauthorized`: the user is not logged in or did not provide valid proof.
- `403 Forbidden`: the user is logged in, but is not allowed to do this action.

Example:

```text
401: I do not know who you are.
403: I know who you are, but you cannot do this.
```

This difference is small but professional. It helps clients respond correctly.

### Where To Put Auth Code

Do not put the login check inside every controller if you can avoid it. Use middleware.

Less clean:

```js
async function deleteContact(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // delete logic continues here
}
```

Cleaner:

```js
router.delete('/:id', requireLogin, idRule, sendValidationErrors, controller.deleteContact);
```

The route line becomes a story:

"For DELETE by id, require login, validate the id, send errors if needed, then delete."

That is readable. Readable code is easier to grade and easier to maintain.

### A Protected Route Checklist

Before you call a protected route finished, check:

- The route fails when not logged in.
- The route succeeds when logged in.
- Swagger explains that the route is protected.
- The video shows both states.
- The secret values used for OAuth are not in GitHub.
- The controller still has one main job.

This matches the style of the first projects. The course is not asking for mystery. It is asking for visible proof that your API behaves correctly.

## Chapter 38: Week 05 API Gateways And Managers

Week 05 introduces API gateways and managers. This topic matters because the course projects start as one API, but real systems often grow into many services.

An API gateway sits between clients and backend services.

Without a gateway:

```mermaid
flowchart LR
  Frontend[Frontend] --> Contacts[Contacts API]
  Frontend --> Books[Books API]
  Frontend --> Users[Users API]
  Frontend --> Payments[Payments API]
```

With a gateway:

```mermaid
flowchart LR
  Frontend[Frontend] --> Gateway[API Gateway]
  Gateway --> Contacts[Contacts API]
  Gateway --> Books[Books API]
  Gateway --> Users[Users API]
  Gateway --> Payments[Payments API]
```

The frontend talks to one front door. The gateway sends each request to the right service.

### What A Gateway Can Do

An API gateway can help with:

- routing
- authentication checks
- rate limiting
- logging
- monitoring
- request and response shaping
- versioning

Routing means the gateway decides where a request goes.

Example:

```text
/contacts -> Contacts API
/books -> Library API
/users -> User API
```

Rate limiting means controlling how many requests a client can make.

Example:

```text
This client can make 100 requests per minute.
```

Logging means recording what happened:

```text
GET /contacts returned 200 in 72ms
POST /books returned 400 in 19ms
```

Monitoring means watching the system for health problems.

### Why Small Projects Usually Do Not Need A Gateway

Your CSE 341 projects can run directly on Render. That is the right level for the assignment. Adding a gateway too early would make the project harder without helping the rubric.

The Contacts API is simple:

```text
Browser or Swagger -> Render Express API -> MongoDB
```

That is enough for Weeks 01 and 02.

Project 2 is also simple:

```text
Swagger -> Render Library API -> MongoDB books/authors
```

That is enough for Week 03.

The purpose of Week 05 is not to force a gateway into your small app. The purpose is to understand when a gateway becomes useful.

### When A Gateway Starts To Make Sense

A gateway becomes useful when:

- many frontends need the same APIs
- many APIs need the same login rules
- traffic is high enough to need rate limits
- one public URL should hide many internal services
- the team needs central logs and monitoring
- older and newer API versions must run together

Example:

```text
Mobile app -> Gateway -> v1 Orders API
Web app -> Gateway -> v2 Orders API
Admin app -> Gateway -> Internal Reports API
```

The gateway becomes the traffic organizer.

### Gateway Thinking For Your Current APIs

Imagine combining the Contacts API and Project 2 API behind one gateway:

```text
https://api.example.com/contacts
https://api.example.com/books
https://api.example.com/authors
```

Behind the scenes:

```text
/contacts -> cse341-contacts-api-y3jc.onrender.com
/books -> cse341-project2-crud-api-zoq8.onrender.com
/authors -> cse341-project2-crud-api-zoq8.onrender.com
```

The user does not need to know which service handles which resource. The gateway hides that complexity.

### Week 05 Interview Answer

If someone asks, "What is an API gateway?" you can say:

"An API gateway is a front layer between clients and backend services. It can route requests, apply shared security rules, limit traffic, and collect logs. In a small class project I can call Express directly, but in a larger system a gateway keeps many services organized behind one public interface."

That answer is enough to show real understanding.

## Chapter 39: Week 06 Testing More Deeply

Week 06 focuses on testing with Jest. Testing is the habit that lets you change code without guessing.

In the projects, there are two kinds of proof:

- manual proof, such as Swagger and the browser
- automated proof, such as Jest and Supertest

Manual proof is good for videos. Automated proof is good for repeated confidence.

### What Jest Does

Jest runs tests and reports whether expectations passed.

A tiny test looks like this:

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

That is not an API test, but it teaches the shape:

- `test` names the behavior.
- `expect` states the expected result.
- Jest tells you whether the result matched.

### What Supertest Does

Supertest sends requests to an Express app during tests.

Example from the Contacts API idea:

```js
const response = await request(app).get('/contacts');

expect(response.status).toBe(200);
expect(response.body).toHaveLength(5);
```

Plain-language reading:

"Call GET /contacts. The API should return status 200 and five contacts."

Supertest is useful because it tests the real route chain:

```text
Express app -> route -> validation middleware -> controller -> store -> response
```

It is not just testing one small helper function. It is testing how the pieces work together.

### Why The Tests Use Memory Mode

The Contacts tests use `MemoryContactStore`.

That means:

- tests do not need the internet
- tests do not need a MongoDB password
- tests do not change the real course database
- every test starts from predictable seed data

This is a professional testing idea. Tests should be repeatable. A test that depends on a live database can fail for reasons that have nothing to do with your code.

For example, a live MongoDB test might fail because:

- the cluster is paused
- the password changed
- the IP address is blocked
- another test deleted a record
- Render is asleep

Memory mode removes those distractions.

### What The Contacts Tests Prove

The Contacts API tests prove:

- `GET /contacts` returns the seed contacts
- `GET /contacts/:id` returns one contact
- `POST /contacts` creates a contact
- `PUT /contacts/:id` updates a contact
- `DELETE /contacts/:id` removes a contact
- invalid POST data returns `400`

That lines up well with Week 02 because Week 02 cares about all five CRUD endpoints and database updates. The live database proof still happens in the video, but the tests prove the route behavior in code.

### What Tests Do Not Prove

Tests are strong, but they do not prove everything.

The local Contacts tests do not prove:

- Render is deployed
- MongoDB Atlas is reachable
- YouTube video is viewable
- Canvas links are pasted correctly
- the grader can access a private repo

That is why the submission checklist still matters.

This is a healthy mindset: tests are evidence, not magic.

### Good API Test Names

A good test name reads like a promise.

Good:

```js
test('POST /contacts creates a new contact', async () => {
  // test code
});
```

Weak:

```js
test('test 3', async () => {
  // test code
});
```

The name should help you understand what broke.

If the test fails, the terminal can say:

```text
POST /contacts creates a new contact
```

That is useful. You know exactly where to look.

### Arrange, Act, Assert

Most tests have three parts.

Arrange:

```js
const { app } = buildTestApp();
```

Act:

```js
const response = await request(app).get('/contacts');
```

Assert:

```js
expect(response.status).toBe(200);
```

In plain language:

1. Set up the world.
2. Do the thing.
3. Check what happened.

This pattern keeps tests easy to read.

### Week 06 Practice Task

Add a test for a missing contact.

Expected behavior:

```text
GET /contacts/validButMissingId should return 404
```

To do that, you need a valid ObjectId that does not exist in the memory store.

Example:

```js
test('GET /contacts/:id returns 404 when the contact is missing', async () => {
  const { app } = buildTestApp();

  const response = await request(app).get('/contacts/507f1f77bcf86cd799439011');

  expect(response.status).toBe(404);
});
```

This is a good learning test because it checks a real user problem: asking for something that is not there.

## Chapter 40: Week 07 Resume And Interview Preparation

Week 07 turns your project work into professional language. This is important because a project only helps your career if you can explain it.

The course gives interview questions about Node, Express, MVC, MongoDB, HTTP, middleware, validation, testing, and risk. These are not random. They are the vocabulary behind the work you just built.

### Turning Course Work Into Resume Bullets

A weak resume bullet says:

```text
Made API for class.
```

A stronger bullet says:

```text
Built and deployed a Node.js and Express REST API with MongoDB persistence, Swagger documentation, input validation, and Jest/Supertest route tests.
```

That bullet is stronger because it names tools and outcomes.

Another option:

```text
Implemented CRUD endpoints for contacts, books, and authors using MVC-style route, controller, validation, and data-access layers.
```

That bullet shows architecture.

### Interview Story For The Contacts API

A strong interview answer might sound like this:

"I built a Contacts API with Node.js, Express, and MongoDB. The first version supported GET all contacts and GET one contact by id. Then I expanded it to full CRUD with POST, PUT, and DELETE. I documented the routes with Swagger, added validation for required fields, and deployed it to Render. I also kept secrets out of GitHub by using environment variables."

That answer has a beginning, middle, and result.

Beginning:

"I built a Contacts API."

Middle:

"I added routes, validation, Swagger, and deployment."

Result:

"It runs online and follows security habits."

### Interview Story For Project 2

For Project 2:

"I designed a library API with two MongoDB collections: books and authors. The books collection has more than seven fields, including title, author name, ISBN, genre, published year, pages, language, availability, and rating. I created CRUD routes for both collections, documented them in Swagger, added validation and error handling, and deployed the API to Render."

That answer proves you can design something, not only follow a starter.

### Common Interview Questions From This Course

What is Node.js?

Node.js is a runtime that lets JavaScript run outside the browser. In this course, Node runs the backend server.

What is Express?

Express is a Node framework for building web servers and API routes.

What is middleware?

Middleware is code that runs between the incoming request and the final route handler. It can parse JSON, check login, validate input, or handle errors.

What does MVC mean?

MVC means Model, View, Controller. In this course, the idea is to separate route logic, controller logic, and database access instead of putting everything in one file.

What is MongoDB?

MongoDB is a document database. It stores data in flexible documents that look similar to JSON.

What is an ObjectId?

An ObjectId is MongoDB's special id type. It uniquely identifies a document.

What is validation?

Validation checks incoming data before the app uses it or saves it.

What is sanitizing?

Sanitizing means cleaning input so it is safer and more consistent. For example, trimming spaces from text fields is a small form of sanitizing.

What is the difference between 400 and 500 status codes?

`400` means the client sent a bad request. `500` means the server had an unexpected problem.

### Your Personal Course Summary

By Week 07, you should be able to say:

"I understand how a client sends an HTTP request to an Express API, how routes and middleware handle that request, how controllers talk to MongoDB through a data layer, how Swagger documents the contract, how Render hosts the app, how environment variables protect secrets, and how tests prove the main routes still work."

That sentence is long, but it is the course in one breath.

## Chapter 41: Full Request Examples From The Course Projects

This chapter gives complete examples that you can study and modify.

### Example 1: Get All Contacts

Request:

```http
GET https://cse341-contacts-api-y3jc.onrender.com/contacts
```

Meaning:

"Give me every contact."

Expected response:

```json
[
  {
    "_id": "6aa5a54d0c84337849981672",
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada.lovelace@example.com",
    "favoriteColor": "blue",
    "birthday": "1815-12-10"
  }
]
```

Important details:

- It uses `GET`.
- It does not need a request body.
- It returns an array.
- The data comes from MongoDB.

### Example 2: Create A Contact

Request:

```http
POST https://cse341-contacts-api-y3jc.onrender.com/contacts
Content-Type: application/json

{
  "firstName": "Test",
  "lastName": "Student",
  "email": "test.student@example.com",
  "favoriteColor": "orange",
  "birthday": "2000-05-15"
}
```

Meaning:

"Create a new contact with these fields."

Expected response:

```json
{
  "message": "Contact created successfully.",
  "id": "66f1f53b6b39b57b5a147901",
  "contact": {
    "firstName": "Test",
    "lastName": "Student",
    "email": "test.student@example.com",
    "favoriteColor": "orange",
    "birthday": "2000-05-15",
    "_id": "66f1f53b6b39b57b5a147901"
  }
}
```

Important details:

- It uses `POST`.
- It needs a JSON body.
- The API validates the body.
- The response status is `201`.
- MongoDB creates the `_id`.

### Example 3: Update A Contact

Request:

```http
PUT https://cse341-contacts-api-y3jc.onrender.com/contacts/66f1f53b6b39b57b5a147901
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Student",
  "email": "updated.student@example.com",
  "favoriteColor": "green",
  "birthday": "2000-05-15"
}
```

Meaning:

"Replace this contact with these updated field values."

Expected response:

```text
204 No Content
```

Important details:

- It uses `PUT`.
- It needs an id in the URL.
- It needs a full valid JSON body.
- The response status is `204`.
- You prove the update by reading the contact again or checking MongoDB.

### Example 4: Delete A Contact

Request:

```http
DELETE https://cse341-contacts-api-y3jc.onrender.com/contacts/66f1f53b6b39b57b5a147901
```

Meaning:

"Remove this contact."

Expected response:

```text
204 No Content
```

Important details:

- It uses `DELETE`.
- It needs an id in the URL.
- It does not need a request body.
- You prove deletion by checking MongoDB or trying to GET the same id again.

### Example 5: Bad Contact Data

Request:

```http
POST https://cse341-contacts-api-y3jc.onrender.com/contacts
Content-Type: application/json

{
  "firstName": "",
  "lastName": "Example",
  "email": "not-an-email",
  "favoriteColor": "",
  "birthday": "not-a-date"
}
```

Expected response:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "firstName",
      "message": "firstName is required."
    }
  ]
}
```

The exact list of details can include more fields. The important point is that the API rejects bad data before MongoDB saves it.

## Chapter 42: A Practical Debugging Map

When something breaks, do not guess wildly. Use the layer map.

```mermaid
flowchart TB
  Problem[Problem appears] --> URL{Wrong URL?}
  URL -->|Yes| Routes[Check route file]
  URL -->|No| Method{Wrong method?}
  Method -->|Yes| Routes
  Method -->|No| Validation{400 response?}
  Validation -->|Yes| ValidateFile[Check validation file and request body]
  Validation -->|No| Missing{404 response?}
  Missing -->|Yes| IdCheck[Check id and database document]
  Missing -->|No| ServerError{500 response?}
  ServerError -->|Yes| Logs[Check terminal or Render logs]
  ServerError -->|No| DataIssue[Check MongoDB data and Swagger docs]
```

### If You See 400

The request reached the route, but the data failed validation.

Check:

- Is every required field present?
- Is email a real email shape?
- Is birthday in `YYYY-MM-DD` format?
- Is the id a real MongoDB ObjectId?

### If You See 404

The route or record was not found.

Check:

- Did you type the route correctly?
- Did you use `/contacts` instead of `/contact`?
- Does the id exist in MongoDB?
- Did you delete the record earlier?

### If You See 500

The server had an unexpected problem.

Check:

- Is `MONGODB_URI` set?
- Is the MongoDB password correct?
- Is the Atlas IP access list allowing Render?
- Are Render logs showing a package or startup error?

### If Swagger Works Locally But Not On Render

Check:

- Did you push the latest code?
- Did Render deploy the latest commit?
- Does Render have all environment variables?
- Does the app use `process.env.PORT`?
- Is the route path the same in Swagger and Express?

This is the kind of checklist that saves hours.

## Chapter 43: Submission And Video Master Checklist

This chapter is a practical checklist for turning working code into a strong submission.

### Week 01 Contacts Part 1

Show:

- Render URL
- `GET /contacts`
- `GET /contacts/:id`
- MongoDB collection
- no `.env` in GitHub
- no `node_modules` in GitHub
- MVC files

Say:

"This proves the API retrieves all contacts and one contact by id from MongoDB. It is deployed on Render, secrets are not in GitHub, and the project uses separated server, route, controller, and database files."

### Week 02 Contacts Part 2

Show:

- Render Swagger URL
- `GET /contacts`
- `GET /contacts/{id}`
- `POST /contacts`
- `PUT /contacts/{id}`
- `DELETE /contacts/{id}`
- MongoDB changing after POST, PUT, and DELETE
- at least five contacts with required fields
- no `.env` in GitHub
- MVC files

Say:

"This proves all five Contacts endpoints are documented in Swagger and testable through `/api-docs`. The write routes update MongoDB, the database has the required contact fields, the app is deployed, credentials are protected, and the architecture is separated."

### Week 03 Project 2 Part 1

Show:

- Project idea
- two collections
- one collection with seven or more fields
- CRUD routes in Swagger
- validation failure
- error handling
- Render deployment
- MongoDB data

Say:

"This proves I designed my own API with two collections, full CRUD, validation, error handling, Swagger documentation, MongoDB persistence, and Render deployment."

### Final Submission Habit

Before submitting any assignment, open each link in a private browser window:

- GitHub link
- Render link
- Swagger link
- YouTube link

If a private window can open the link, the grader probably can too.

Do not submit only a homepage if the assignment asks for API docs. Submit the most useful link for grading, usually `/api-docs`.

For Week 02, the strongest Render link is:

```text
https://cse341-contacts-api-y3jc.onrender.com/api-docs
```

For Week 01, either the base Contacts route or `/contacts` is useful:

```text
https://cse341-contacts-api-y3jc.onrender.com/contacts
```

For Project 2:

```text
https://cse341-project2-crud-api-zoq8.onrender.com/api-docs
```

The video should guide the grader through the evidence. You are not only saying the project works. You are showing why the rubric should give full credit.

## Part Five: Hands-On Workbook

This part is written like a guided notebook. Read it with the code open beside you. The goal is to make the projects feel editable. When you understand where each responsibility lives, you can change the API without being afraid that one small edit will break everything.

## Chapter 44: Contacts API File-By-File Study

The Contacts API is the most important project to understand first because it grows across Weeks 01 and 02. Week 01 asks for reading contacts. Week 02 asks for full CRUD and Swagger. The same project supports both.

The project lives here:

```text
contacts-api
```

The most important files are:

```text
src/server.js
src/app.js
src/routes/contactRoutes.js
src/controllers/contactController.js
src/middleware/validate.js
src/data/contactStore.js
src/config/database.js
swagger.json
requests.rest
package.json
```

Each file has a narrow job.

### `package.json`

Start with `package.json` because it tells you how the project runs.

Important section:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "node --watch src/server.js",
  "docs": "node swagger.js",
  "check": "node src/server.js --check",
  "test": "cross-env NODE_ENV=test USE_MEMORY_STORE=true jest --runInBand"
}
```

Plain-language reading:

- `start` runs the API normally.
- `dev` runs the API and restarts when files change.
- `docs` can generate Swagger support files.
- `check` makes sure the API can boot.
- `test` runs automated route checks.

Render uses `npm start`, so the `start` script matters for deployment. If `start` is wrong, Render can install packages successfully and still fail when it tries to run the app.

The dependencies also tell a story:

- `express` creates the web server and routes.
- `mongodb` talks to MongoDB Atlas.
- `dotenv` loads `.env` values while developing locally.
- `swagger-ui-express` shows the Swagger page.
- `express-validator` checks request bodies and ids.
- `cors` lets browser tools call the API.

When you can explain the package list, you can explain the shape of the project.

### `src/server.js`

`server.js` starts the app.

It does not define every route. It does not directly query MongoDB. It does not validate contacts. That restraint is a good thing.

The main flow is:

```js
const store = await createContactStore();
const app = createApp({ store });
```

Plain-language reading:

"Create the data store, then create the Express app using that store."

The data store might be real MongoDB or memory mode. The app does not need to care which one. That makes tests easier because tests can use memory mode while Render uses MongoDB.

Then:

```js
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Contacts API is running on port ${port}`);
});
```

Plain-language reading:

"Use Render's port if Render gives one. Otherwise, use 8080 locally."

This one line is a deployment habit. Many deployed services provide a `PORT` value. If your app hard-codes only `8080`, deployment can fail. If your app uses `process.env.PORT || 8080`, it works in both places.

### `src/app.js`

`app.js` builds the Express app.

It connects the pieces:

```js
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.locals.store = store;
app.use('/contacts', contactRoutes);
```

Plain-language reading:

- Allow browser requests.
- Parse JSON bodies.
- Show Swagger docs at `/api-docs`.
- Store the database object where controllers can reach it.
- Send `/contacts` requests to the contacts route file.

This is the file that wires the application together. It is like a table of contents for the server.

The home route is also useful:

```js
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the CSE 341 Contacts API.',
    docs: '/api-docs',
    week01Routes: ['GET /contacts', 'GET /contacts/:id'],
    week02Routes: ['POST /contacts', 'PUT /contacts/:id', 'DELETE /contacts/:id']
  });
});
```

This route is not the main assignment requirement, but it helps prove the app is awake. When you open the Render base URL and see JSON, you know the service started.

### `src/routes/contactRoutes.js`

The route file is the API map.

```js
router.get('/', controller.getAllContacts);
router.get('/:id', idRule, sendValidationErrors, controller.getContactById);
router.post('/', contactRules, sendValidationErrors, controller.createContact);
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);
router.delete('/:id', idRule, sendValidationErrors, controller.deleteContact);
```

Each line answers four questions:

- Which HTTP method?
- Which path?
- Which middleware runs first?
- Which controller finishes the request?

For example:

```js
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);
```

Plain-language reading:

"When a PUT request comes to one contact id, check that the id is valid, check that the contact body is valid, send any validation errors, then run the update controller."

That is a lot of behavior in one readable line.

### `src/middleware/validate.js`

Validation is where the project protects the database from bad input.

The Week 02 rubric says the Contacts collection needs these fields:

- `firstName`
- `lastName`
- `email`
- `favoriteColor`
- `birthday`

The validation file checks those fields before POST and PUT reach the controller.

Example:

```js
body('email').trim().isEmail().withMessage('email must be a valid email address.')
```

Plain-language reading:

"Trim spaces from email, then make sure it looks like an email address. If it fails, return this message."

Validation helps the user because the response explains what went wrong. It also helps the database because invalid records do not get saved.

### `src/controllers/contactController.js`

Controllers make decisions about responses.

Example:

```js
const contact = await req.app.locals.store.findById(req.params.id);

if (!contact) {
  return res.status(404).json({
    error: 'Contact not found',
    message: `No contact exists with id ${req.params.id}.`
  });
}

return res.json(contact);
```

Plain-language reading:

"Ask the store for one contact. If no contact exists, return 404. If the contact exists, return it as JSON."

The controller knows HTTP status codes. The store knows MongoDB. That separation is healthy.

The helper:

```js
function buildContactFromBody(body) {
  return CONTACT_FIELDS.reduce((contact, field) => {
    contact[field] = body[field];
    return contact;
  }, {});
}
```

Plain-language reading:

"Only save the official contact fields, even if the request body includes extra data."

This is a small professional upgrade. It keeps the database shape clean.

### `src/data/contactStore.js`

The store is where data operations live.

For MongoDB:

```js
return collection.find({}).sort({ lastName: 1, firstName: 1 }).toArray();
```

Plain-language reading:

"Find all contacts, sort them by last name and first name, and return them as an array."

For one contact:

```js
return collection.findOne({ _id: new ObjectId(id) });
```

Plain-language reading:

"Find one document whose MongoDB `_id` matches this id."

The `new ObjectId(id)` part matters because MongoDB ids are not just normal strings inside the database.

The file also has `MemoryContactStore`. That is not a replacement for MongoDB in the final video. It is a practice and testing tool. It lets the tests run without touching the real Atlas database.

### `src/config/database.js`

The database config file owns the MongoDB connection.

Important line:

```js
const uri = process.env.MONGODB_URI;
```

Plain-language reading:

"Read the private connection string from the environment."

That is the security pattern. The connection string is not written into the code. It is not pushed to GitHub. Locally it belongs in `.env`. On Render it belongs in environment variables.

### `swagger.json`

Swagger is the public contract.

The code says what the API does. Swagger says what the API promises.

For Week 02, Swagger must document:

- `GET /contacts`
- `GET /contacts/{id}`
- `POST /contacts`
- `PUT /contacts/{id}`
- `DELETE /contacts/{id}`

Notice the difference:

```text
Express: /contacts/:id
Swagger: /contacts/{id}
```

They mean the same thing: the id part changes for each record.

### `requests.rest`

The REST file is a practice sheet.

It lets you send requests from VS Code with the REST Client extension. It is not required if Swagger works, but it is helpful for learning.

A request in `requests.rest` looks like:

```http
POST {{baseUrl}}/contacts
Content-Type: application/json

{
  "firstName": "Mary",
  "lastName": "Jackson",
  "email": "mary.jackson@example.com",
  "favoriteColor": "red",
  "birthday": "1921-04-09"
}
```

This is the same request you can send through Swagger.

### Study Exercise

Open each file and answer:

- Which file starts the app?
- Which file lists the routes?
- Which file checks the body?
- Which file returns status codes?
- Which file talks to MongoDB?
- Which file documents the API?
- Which file proves the routes work in tests?

If you can answer those questions without looking at this chapter, you understand the architecture.

## Chapter 45: MongoDB Atlas Workbook

MongoDB Atlas is the hosted database service used by the deployed API. Atlas can feel intimidating at first because it has clusters, projects, users, network rules, databases, and collections. The trick is to separate those ideas.

### Organization, Project, Cluster

Atlas has a hierarchy.

```mermaid
flowchart TB
  Org[Organization] --> Project[Project]
  Project --> Cluster[Cluster0]
  Cluster --> Database[cse341_contacts]
  Database --> Collection[contacts]
  Collection --> Documents[Contact Documents]
```

An organization is the top-level account space.

A project groups related database resources.

A cluster is the actual database deployment.

A database is a named container inside the cluster.

A collection is like a folder of documents.

A document is one record.

For the Contacts API:

```text
Cluster: Cluster0
Database: cse341_contacts
Collection: contacts
```

For Project 2:

```text
Cluster: Cluster0
Database: cse341_library
Collections: books, authors
```

One cluster can hold more than one database. That is why both APIs can use the same Atlas cluster while storing data separately.

### Documents

A MongoDB document looks like JSON.

Contact document:

```json
{
  "_id": "6aa5a54d0c84337849981672",
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada.lovelace@example.com",
  "favoriteColor": "blue",
  "birthday": "1815-12-10"
}
```

The `_id` field is created by MongoDB. Your app uses it for GET by id, PUT, and DELETE.

### Why The Connection String Is Secret

The MongoDB connection string can include:

- username
- password
- cluster address
- options

That means it should be treated like a key to the database.

Bad:

```js
const uri = 'mongodb+srv://realUser:realPassword@cluster0.example.mongodb.net/';
```

Good:

```js
const uri = process.env.MONGODB_URI;
```

The good version says:

"The code knows it needs a URI, but the secret value comes from the environment."

That lets you push the code to GitHub without exposing the password.

### Network Access

Atlas uses a network access list. This controls which IP addresses are allowed to connect.

For local development, you can add your current IP address.

For Render, the app may run from cloud infrastructure where the outbound IP can change on free plans. For class projects, students often allow broader access so the deployed API can connect. If you do that, use a strong database user password and only grant the access needed for the assignment.

The important concept:

```text
MongoDB user controls who can log in.
Network access controls where connections can come from.
```

Both must be correct.

### Database User

The database user is not the same as your Atlas login.

Your Atlas login opens the dashboard.

The database user lets the application connect to the database.

In an app, the database user is used by `MONGODB_URI`. The app does not log in through the Atlas website. It connects directly to the cluster using the connection string.

### How POST Changes MongoDB

When you send:

```http
POST /contacts
```

with a valid body, the path is:

```mermaid
sequenceDiagram
  participant Swagger
  participant API
  participant Store
  participant Atlas
  Swagger->>API: POST /contacts with JSON body
  API->>API: Validate required fields
  API->>Store: create(contact)
  Store->>Atlas: insertOne(contact)
  Atlas-->>Store: insertedId
  Store-->>API: new contact with _id
  API-->>Swagger: 201 Created
```

That is why the Week 02 video should show MongoDB after POST. The route is not just returning a success message. It is changing the database.

### How PUT Changes MongoDB

PUT uses an id:

```http
PUT /contacts/6aa5a54d0c84337849981672
```

The controller asks the store to replace the document with that id.

In the Contacts API, PUT expects all five fields again. That is simpler than partial updates. The request body should include the full contact shape.

### How DELETE Changes MongoDB

DELETE uses an id and no body:

```http
DELETE /contacts/6aa5a54d0c84337849981672
```

The store sends `deleteOne` to MongoDB. MongoDB returns a count. If the count is `1`, something was deleted. If the count is `0`, no matching document existed.

The controller turns those outcomes into status codes:

```text
1 deleted -> 204
0 deleted -> 404
```

### MongoDB Study Checklist

You should be able to explain:

- what a cluster is
- what a database is
- what a collection is
- what a document is
- why `_id` matters
- why the connection string is secret
- why Render needs network access
- how POST, PUT, and DELETE change MongoDB

If you can explain those ideas, MongoDB will feel much less mysterious.

## Chapter 46: Render And GitHub Workbook

Render runs the API online. GitHub stores the code. MongoDB stores the data. These three tools work together.

```mermaid
flowchart LR
  GitHub[GitHub Repo] --> Render[Render Web Service]
  Render --> Express[Node and Express App]
  Express --> MongoDB[(MongoDB Atlas)]
```

The code moves from GitHub to Render. The API talks from Render to MongoDB.

### Why Deployment Matters

Localhost proves the app works on your computer.

Render proves the app works on the web.

The rubric says the video must show a published location, not only localhost. That is why the URL matters:

```text
https://cse341-contacts-api-y3jc.onrender.com
```

If the address says `localhost`, it is only your machine. If it says `onrender.com`, it is published.

### Build Command

Render needs to install packages.

Build command:

```text
npm ci
```

This reads `package-lock.json` and installs the exact dependency versions.

Some tutorials use:

```text
npm install
```

Both can work. `npm ci` is stricter and cleaner for deployment when a lockfile exists.

### Start Command

Render needs to start the app.

Start command:

```text
npm start
```

That runs the `start` script in `package.json`:

```json
"start": "node src/server.js"
```

If Render cannot find a start command, the app will not stay online.

### Environment Variables On Render

Render environment variables are the production version of `.env`.

For Contacts:

```text
MONGODB_URI
DATABASE_NAME
CONTACTS_COLLECTION
USE_MEMORY_STORE
```

`MONGODB_URI` is the sensitive one. It includes the database user and password. It should not appear in GitHub.

`DATABASE_NAME` is not very sensitive, but it still belongs in configuration because it can change between projects.

`USE_MEMORY_STORE` should be false on Render because the rubric expects MongoDB.

### What `render.yaml` Does

The repo has a `render.yaml` file. That file tells Render how to create the services from GitHub.

In plain language, it says:

"Create a web service for the Contacts API and a web service for Project 2. Use Node. Build with npm. Start with npm. Ask for MongoDB secrets outside the repo."

That is infrastructure as code. It means deployment settings are partly described in a file instead of only clicked in a dashboard.

### How To Verify Render Is Using The Latest Code

Check the live home route:

```text
https://cse341-contacts-api-y3jc.onrender.com
```

If it returns:

```json
{
  "message": "Welcome to the CSE 341 Contacts API.",
  "docs": "/api-docs",
  "week01Routes": ["GET /contacts", "GET /contacts/:id"],
  "week02Routes": ["POST /contacts", "PUT /contacts/:id", "DELETE /contacts/:id"]
}
```

then the deployed app is serving the newer code.

You can also check the Render dashboard deploy logs and compare the commit hash with GitHub.

### GitHub Security Check

Before submitting, look at GitHub and confirm these are not present:

```text
.env
node_modules
coverage
npm-debug.log
```

It is okay to have:

```text
.env.example
package.json
package-lock.json
```

`.env.example` teaches the shape of the environment without exposing secrets.

`package.json` and `package-lock.json` let someone recreate the dependency folder.

### Render Troubleshooting

If Render says the deploy failed, check:

- Did the GitHub push finish?
- Is `package.json` in the correct folder?
- Is the service root directory correct?
- Is `npm start` defined?
- Does the app use `process.env.PORT`?
- Is `MONGODB_URI` set on Render?
- Does MongoDB Atlas allow Render to connect?

If the app builds but the route gives a server error, check Render logs. Logs are where startup messages and database errors appear.

### Render Study Statement

You should be able to say:

"GitHub stores my source code, Render pulls that code and runs it as a web service, and MongoDB Atlas stores the data. Secrets like `MONGODB_URI` are configured in Render environment variables instead of GitHub."

That is a strong Week 01 and Week 02 explanation.

## Chapter 47: Swagger Practice Workbook

Swagger can feel like a fancy documentation page, but in this course it is also a testing tool. You can use Swagger to prove routes work in your video.

### The Swagger Page

Contacts Swagger:

```text
https://cse341-contacts-api-y3jc.onrender.com/api-docs
```

Project 2 Swagger:

```text
https://cse341-project2-crud-api-zoq8.onrender.com/api-docs
```

When you open Swagger, look for the route list. For Week 02, you need:

```text
GET /contacts
POST /contacts
GET /contacts/{id}
PUT /contacts/{id}
DELETE /contacts/{id}
```

### Testing GET All

Click:

```text
GET /contacts
```

Then:

```text
Try it out -> Execute
```

Look for:

- status `200`
- a JSON array
- five or more contacts
- the required fields

Say in your video:

"This endpoint returns all contacts from MongoDB."

### Testing GET By ID

First, run `GET /contacts` and copy one `_id`.

Then click:

```text
GET /contacts/{id}
```

Paste the id and execute.

Look for:

- status `200`
- one JSON object
- the same id

Say:

"This endpoint retrieves one contact by MongoDB ObjectId."

### Testing POST

Click:

```text
POST /contacts
```

Use a test body:

```json
{
  "firstName": "Video",
  "lastName": "Demo",
  "email": "video.demo@example.com",
  "favoriteColor": "yellow",
  "birthday": "2000-06-20"
}
```

Look for:

- status `201`
- a returned id

Then check MongoDB to prove the record exists.

### Testing PUT

Use the id from POST.

Click:

```text
PUT /contacts/{id}
```

Use:

```json
{
  "firstName": "Video",
  "lastName": "Updated",
  "email": "video.updated@example.com",
  "favoriteColor": "green",
  "birthday": "2000-06-20"
}
```

Look for:

- status `204`
- no response body

Then check MongoDB to prove the record changed.

### Testing DELETE

Use the same id.

Click:

```text
DELETE /contacts/{id}
```

Look for:

- status `204`

Then check MongoDB to prove the record is gone.

### Testing Validation

Use invalid data:

```json
{
  "firstName": "",
  "lastName": "Demo",
  "email": "not-an-email",
  "favoriteColor": "",
  "birthday": "not-a-date"
}
```

Look for:

- status `400`
- validation messages

This proves the API rejects bad input.

### Swagger Video Tip

After each route, say what status code you expected and what status code you got.

Example:

"For POST, I expect status 201 because a record is created. Swagger shows 201, and MongoDB shows the new contact."

That kind of narration makes the video easy to grade.

## Chapter 48: Safe Change Workbook

The best way to learn the course is to make small changes safely. This chapter gives a process you can repeat.

### The Rule Of One Change

Change one idea at a time.

Good:

```text
Add phoneNumber to Contacts.
```

Too much at once:

```text
Add phoneNumber, add login, rename contacts, change database names, and redesign Swagger.
```

One change lets you understand cause and effect.

### Example: Add `phoneNumber` To Contacts

Files to update:

```text
src/middleware/validate.js
src/controllers/contactController.js
src/data/seedContacts.json
swagger.json
requests.rest
src/app.test.js
MongoDB existing documents
```

Why each file matters:

- validation decides whether `phoneNumber` is required or optional
- controller decides whether `phoneNumber` is saved
- seed data supports local memory mode
- Swagger documents the new field
- REST examples show how to send it
- tests prove it works
- MongoDB data keeps the live database consistent

### Step 1: Update The Official Field List

In the Contacts controller, the official fields are:

```js
const CONTACT_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
```

If `phoneNumber` should be saved, add it:

```js
const CONTACT_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday', 'phoneNumber'];
```

Plain-language meaning:

"When saving contacts, include phoneNumber too."

### Step 2: Update Validation

If required:

```js
body('phoneNumber').trim().notEmpty().withMessage('phoneNumber is required.')
```

If optional:

```js
body('phoneNumber').optional().trim()
```

The decision matters. A required field means every POST and PUT must include it. An optional field means the API accepts contacts without it.

### Step 3: Update Swagger

Swagger should match the code. If the code accepts `phoneNumber`, the docs should show `phoneNumber`.

Otherwise, users will not know the field exists.

### Step 4: Update Tests

Add `phoneNumber` to the test body and expect it in the response.

Tests protect the change.

### Step 5: Update MongoDB

If the field is required, every existing live contact should get the new field. Otherwise, older records will no longer match the expected shape.

### Step 6: Run Checks

Run:

```powershell
.\check-all.ps1
```

Then test Swagger manually.

### Safe Change Summary

Every field change has a ripple:

```mermaid
flowchart LR
  Field[New Field] --> Validation
  Field --> Controller
  Field --> SeedData[Seed Data]
  Field --> Swagger
  Field --> Tests
  Field --> MongoDB
```

If you remember that ripple, you can change APIs confidently.

## Chapter 49: Week 01, Week 02, And Week 03 Requirement Matrix

This chapter maps requirements to evidence. This is useful before submission and before a video.

### Week 01 Learning Activity

Topic:

```text
Web Services, REST Clients, and Node Architecture
```

Evidence in the workspace:

- Node.js projects exist
- Express APIs exist
- `package.json` files define scripts
- projects use routes and JSON responses
- the book explains web services and architecture

What you should understand:

- what a web service is
- what Node does
- what Express does
- what a route is
- what JSON is
- how a client sends a request

### Week 01 Individual Activity

Requirement:

```text
Develop an API for the provided frontend.
```

Evidence:

- `w01-individual-activity/server.js`
- route: `GET /professional`
- frontend files in `w01-individual-activity/frontend`
- local boot check passes

What to say:

"The frontend calls `/professional`, and my backend returns the JSON fields the frontend needs."

### Week 01 Contacts Part 1

Requirements:

- GET all contacts
- GET one contact by id
- deployed online
- secrets not in GitHub
- MVC architecture

Evidence:

- `GET /contacts`
- `GET /contacts/:id`
- Render URL
- MongoDB Atlas data
- `.gitignore`
- `.env.example`
- routes, controllers, data, and config folders

### Week 02 Contacts Part 2

Requirements:

- GET all contacts
- GET one contact by id
- POST contact
- PUT contact
- DELETE contact
- Swagger documentation
- database updates
- at least five contacts with required fields
- deployed online
- secrets not in GitHub
- MVC architecture

Evidence:

- `contacts-api/swagger.json`
- `/api-docs` live on Render
- route tests pass
- live CRUD test passed
- MongoDB contains five contacts
- Git does not track `.env`

### Week 03 Project 2 Part 1

Requirements:

- API of your choice
- at least two collections
- one collection with seven or more fields
- full CRUD
- Swagger
- validation
- error handling
- Render deployment
- secrets protected

Evidence:

- `project2-crud-api`
- collections: `books`, `authors`
- books has nine fields
- Swagger documents routes
- validation middleware exists
- error handler exists
- Render URL works
- tests pass

### Matrix

| Requirement | Evidence |
| --- | --- |
| Node/Express architecture | `server.js`, `app.js`, routes |
| MongoDB connection | `database.js`, Render env vars |
| GET all contacts | `GET /contacts` |
| GET by id | `GET /contacts/:id` |
| POST | `POST /contacts` |
| PUT | `PUT /contacts/:id` |
| DELETE | `DELETE /contacts/:id` |
| Swagger | `/api-docs`, `swagger.json` |
| Security | `.env` ignored, Render env vars |
| MVC | routes/controllers/data/config split |
| Project 2 two collections | books and authors |
| Project 2 seven-field collection | books has nine fields |
| Testing | Jest and Supertest tests |

Use this matrix before submitting. If every row has visible proof, the submission story is strong.

## Chapter 50: Personal Study Plan For Mastery

Finishing the assignment is good. Understanding it is better. This study plan helps you turn the finished code into real skill.

### Day 1: Read The Routes

Open:

```text
contacts-api/src/routes/contactRoutes.js
project2-crud-api/src/routes/bookRoutes.js
project2-crud-api/src/routes/authorRoutes.js
```

For each route, say:

- method
- path
- middleware
- controller

Example:

"POST `/contacts` runs contact validation, sends validation errors if needed, then creates a contact."

### Day 2: Read The Controllers

Open:

```text
contacts-api/src/controllers/contactController.js
project2-crud-api/src/controllers/makeCrudController.js
```

For each function, answer:

- what store method is called?
- what status code can be returned?
- what happens when no record exists?
- what happens when an error occurs?

### Day 3: Read Validation

Open:

```text
contacts-api/src/middleware/validate.js
project2-crud-api/src/middleware/validate.js
```

Write one bad request for each rule.

Examples:

- blank first name
- invalid email
- impossible birthday
- book with zero pages
- rating above 5

Then test them in Swagger and watch for `400`.

### Day 4: Read The Data Stores

Open:

```text
contacts-api/src/data/contactStore.js
project2-crud-api/src/data/libraryStore.js
```

Find:

- `findAll`
- `findById`
- `create`
- `update`
- `remove`

Write a plain-language sentence for each.

Example:

"`remove` deletes one document by id and returns how many documents were deleted."

### Day 5: Read Swagger

Open:

```text
contacts-api/swagger.json
project2-crud-api/swagger.json
```

For each route, compare Swagger to the Express route file.

Ask:

- does the path match?
- does the method match?
- does the request body match validation?
- do the status codes match the controller?

Swagger is only useful when it is honest.

### Day 6: Run Tests

Run:

```powershell
.\check-all.ps1
```

Then open individual tests:

```text
contacts-api/src/app.test.js
project2-crud-api/src/app.test.js
```

Read each test out loud in plain language.

### Day 7: Make One Safe Change

Choose one small change:

- add an optional field
- improve a validation message
- add a missing 404 test
- add another seed record
- add one Swagger example

Make the change and run checks again.

This is how you move from "the code works" to "I understand the code."

### The Mindset

You do not need to memorize every line. You need to know where to look.

When you know:

- routes are the map
- controllers make response decisions
- validation protects input
- stores talk to data
- config handles secrets and connections
- Swagger explains the contract
- tests protect behavior

you can navigate almost any backend project in this course.

## Expansion Plan For The Full 90-Page Version

The current manuscript is now a much larger foundation. To expand it even closer to a printable 90-page course book, add:

- 8 to 10 pages on HTTP examples.
- 8 to 10 pages on Express route design.
- 8 to 10 pages walking through MongoDB and Compass.
- 8 to 10 pages on the Contacts project.
- 8 to 10 pages on Swagger and API documentation.
- 8 to 10 pages on Project 2 and designing collections.
- 8 to 10 pages on validation and error handling.
- 8 to 10 pages on OAuth.
- 6 to 8 pages on testing.
- 4 to 6 pages on deployment and video submission.

Each expansion should include:

- A plain-language explanation.
- A code example from this workspace.
- A diagram.
- A "what to change yourself" practice exercise.
- A short checklist.
