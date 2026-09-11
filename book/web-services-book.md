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

## Expansion Plan For The Full 90-Page Version

The current manuscript is the foundation. To expand it toward roughly 90 pages, add:

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
