# CSE 341 Workspace Completion Audit

This audit maps the requested course work to the files, links, and checks that prove the work is ready.

## Requested Work

- W01 Learning Activity: Web Services and Node Architecture
- W01 Individual Activity: Develop an API
- W01 Project: Contacts Part 1
- W02 Project: Contacts Part 2
- W03 Project 2 Part 1: CRUD Operations
- Simple comments and documentation throughout the code
- Full course book for Weeks 01-07
- Diagrams and illustrations for learning
- GitHub repository
- Render deployment
- MongoDB connection with credentials kept out of GitHub

## W01 Learning Activity

Evidence:

- Course notes and explanations are in `book/web-services-book.md`.
- The official course links are mapped in `submission-notes/course-material-index.md`.
- The book explains web services, Node, Express, routes, controllers, MongoDB, and deployment.

Status: ready for study review.

## W01 Individual Activity: Develop An API

Evidence:

- Project folder: `w01-individual-activity`
- Main endpoint: `GET /professional`
- Local check command included in the root `check-all.ps1`.

Status: implemented and checked locally.

## W01 Project: Contacts Part 1

Evidence:

- Project folder: `contacts-api`
- `GET /contacts` returns all contacts.
- `GET /contacts/:id` returns one contact by MongoDB ObjectId.
- Routes, controller logic, validation, database access, and app startup are separated.
- Week 01 video script: `submission-notes/week01-video-script.md`

Live links:

- Contacts API: <https://cse341-contacts-api-y3jc.onrender.com>
- Contacts route: <https://cse341-contacts-api-y3jc.onrender.com/contacts>

Status: implemented, deployed, and verified.

## W02 Project: Contacts Part 2

Evidence:

- Project folder: `contacts-api`
- Swagger file: `contacts-api/swagger.json`
- REST examples: `contacts-api/requests.rest`
- Week 02 video script: `submission-notes/week02-video-script.md`
- Required fields: `firstName`, `lastName`, `email`, `favoriteColor`, `birthday`

Required routes:

- `GET /contacts`
- `GET /contacts/:id`
- `POST /contacts`
- `PUT /contacts/:id`
- `DELETE /contacts/:id`
- `GET /api-docs`

Live links:

- Contacts API: <https://cse341-contacts-api-y3jc.onrender.com>
- Contacts Swagger: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>

Status: implemented, deployed, documented, tested, and verified.

## W03 Project 2 Part 1: CRUD Operations

Evidence:

- Project folder: `project2-crud-api`
- Swagger file: `project2-crud-api/swagger.json`
- REST examples: `project2-crud-api/requests.rest`
- Week 03 video script: `submission-notes/week03-video-script.md`
- Collections: `books` and `authors`
- The `books` collection has nine fields, which exceeds the seven-field requirement.

Required route groups:

- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`
- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`
- `GET /api-docs`

Live links:

- Project 2 API: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>

Status: implemented, deployed, documented, tested, and verified.

## Comments And Documentation

Evidence:

- Important files have simple comments that explain purpose and flow.
- README files explain how to run each project.
- `book/code-reading-guide.md` explains how to trace the code.
- `book/web-services-book.md` explains the course in long-form notes.

Status: complete for the current coursework package.

## Course Book

Evidence:

- Main book: `book/web-services-book.md`
- Current manuscript size is about 25,000 words, which is close to a 90-page study guide depending on page size and formatting.
- The book includes Week 01-07 explanations, code examples, diagrams, rubrics, route traces, testing notes, deployment notes, OAuth notes, and interview preparation.

Visual evidence:

- `diagrams/web-services-cover.png`
- `diagrams/validation-error-flow.png`
- `diagrams/course-platform-map.png`
- `diagrams/auth-testing-flow.png`
- Mermaid diagrams are also embedded inside the book.

Status: complete as a large course guide and ready for continued personal notes.

## Security

Evidence:

- `.env` files are ignored.
- `.env.example` files show the shape of required variables without secrets.
- Real MongoDB credentials are configured in Render, not GitHub.
- A repository search should not show the real MongoDB connection string.

Status: safe for GitHub based on repository checks.

## Verification Commands

Run this from the root folder:

```powershell
.\check-all.ps1
```

This checks:

- Week 01 Individual Activity boot
- Contacts API boot
- Contacts API tests
- Project 2 API boot
- Project 2 API tests

## Submission Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Contacts API on Render: <https://cse341-contacts-api-y3jc.onrender.com>
- Contacts Swagger docs: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
- Project 2 API on Render: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>

YouTube links are added after each video upload is complete.
