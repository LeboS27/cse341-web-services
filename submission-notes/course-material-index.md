# CSE 341 Week 01-07 Course Material Index

This file is a plain-language map of the official CSE 341 course pages used while building this workspace. It does not replace the course pages. Use it as a checklist when reviewing the projects, recording videos, and studying for the final project.

## Week 01: Web Services, REST Clients, And Node Architecture

Official pages:

- Week 01 index: <https://byui-cse.github.io/cse341-ww-course/week01/index.html>
- Tools setup: <https://byui-cse.github.io/cse341-ww-course/week01/setup.html>
- Team sign-up: <https://byui-cse.github.io/cse341-ww-course/week01/groups.html>
- Learning activity: <https://byui-cse.github.io/cse341-ww-course/week01/prepare.html>
- Individual activity: <https://byui-cse.github.io/cse341-ww-course/week01/team-activity.html>
- Contacts Part 1 project: <https://byui-cse.github.io/cse341-ww-course/week01/project.html>

Plain-language focus:

- Understand what a web service is.
- Install and check the tools needed for the course.
- Build a small API that returns JSON.
- Start the Contacts project with Express and MongoDB.
- Create `GET all` and `GET by id` routes.
- Push the work to GitHub.

Workspace evidence:

- `w01-individual-activity`
- `contacts-api`
- `submission-notes/week01-video-script.md`

## Week 02: HTTP Requests, API Documentation, And Dev Tools

Official pages:

- Week 02 index: <https://byui-cse.github.io/cse341-ww-course/week02/index.html>
- Learning activity: <https://byui-cse.github.io/cse341-ww-course/week02/prepare.html>
- Team activity: <https://byui-cse.github.io/cse341-ww-course/week02/team-activity.html>
- Contacts Part 2 project: <https://byui-cse.github.io/cse341-ww-course/week02/project.html>

Plain-language focus:

- Understand HTTP request methods.
- Add `POST`, `PUT`, and `DELETE`.
- Document routes with Swagger.
- Test the live API through `/api-docs`.
- Show MongoDB changing after create, update, and delete actions.
- Keep credentials out of GitHub.

Workspace evidence:

- `contacts-api`
- `contacts-api/swagger.json`
- `contacts-api/requests.rest`
- `submission-notes/week02-video-script.md`

## Week 03: REST, Alternatives, Validation, And Mongoose

Official pages:

- Week 03 index: <https://byui-cse.github.io/cse341-ww-course/week03/index.html>
- Learning activity: <https://byui-cse.github.io/cse341-ww-course/week03/prepare.html>
- Team activity: <https://byui-cse.github.io/cse341-ww-course/week03/team-activity.html>
- Project 2 Part 1: <https://byui-cse.github.io/cse341-ww-course/week03/project.html>

Plain-language focus:

- Understand REST more deeply.
- Learn that there are alternatives to plain REST.
- Add validation and error handling.
- Build a second API with at least two collections.
- Make one collection contain seven or more fields.
- Publish Project 2 and document it with Swagger.

Workspace evidence:

- `project2-crud-api`
- `project2-crud-api/swagger.json`
- `project2-crud-api/requests.rest`
- `submission-notes/week03-video-script.md`

## Week 04: OAuth And Authentication

Official pages:

- Week 04 index: <https://byui-cse.github.io/cse341-ww-course/week04/index.html>
- Learning activity: <https://byui-cse.github.io/cse341-ww-course/week04/prepare.html>
- Final project proposal activity: <https://byui-cse.github.io/cse341-ww-course/week04/team-activity.html>
- Project 2 authentication: <https://byui-cse.github.io/cse341-ww-course/week04/project.html>

Plain-language focus:

- Understand OAuth.
- Add login and logout.
- Protect routes that should not be open to everyone.
- Keep OAuth secrets out of GitHub.
- Start thinking about the final project proposal.

Workspace evidence:

- `book/web-services-book.md`, especially the OAuth and protected route chapters.

## Week 05: API Gateways, Managers, And Final Project Part 1

Official pages:

- Week 05 index: <https://byui-cse.github.io/cse341-ww-course/week05/index.html>
- Learning activity: <https://byui-cse.github.io/cse341-ww-course/week05/prepare.html>
- Final project part 1: <https://byui-cse.github.io/cse341-ww-course/week05/project.html>

Plain-language focus:

- Understand what API gateways and API managers are.
- Begin the final project implementation.
- Build the first two final-project collections.
- Add CRUD routes and Swagger documentation.
- Keep architecture clear from the beginning.

Workspace evidence:

- `book/web-services-book.md`, especially the API gateway and final project readiness chapters.

## Week 06: Testing And Final Project Part 2

Official pages:

- Week 06 index: <https://byui-cse.github.io/cse341-ww-course/week06/index.html>
- Learning activity: <https://byui-cse.github.io/cse341-ww-course/week06/prepare.html>
- Final project part 2: <https://byui-cse.github.io/cse341-ww-course/week06/project.html>

Plain-language focus:

- Understand route testing.
- Use tests to prove API behavior.
- Add the last two final-project collections.
- Include OAuth where required.
- Make sure GET routes are covered by tests.

Workspace evidence:

- `contacts-api/src/app.test.js`
- `project2-crud-api/src/app.test.js`
- `book/web-services-book.md`, especially the testing chapters.

## Week 07: Interview Preparation And Final Project Finish

Official pages:

- Week 07 index: <https://byui-cse.github.io/cse341-ww-course/week07/index.html>
- Learning activity: <https://byui-cse.github.io/cse341-ww-course/week07/prepare.html>
- Final project part 3: <https://byui-cse.github.io/cse341-ww-course/week07/project.html>

Plain-language focus:

- Finish the final project.
- Make sure the deployed API works.
- Make sure Swagger is complete.
- Explain your own contributions.
- Prepare to answer interview questions about Node, Express, MongoDB, routes, middleware, MVC, validation, testing, and deployment.

Workspace evidence:

- `book/web-services-book.md`, especially the interview answer bank.

## Current Live Submission Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Contacts API on Render: <https://cse341-contacts-api-y3jc.onrender.com>
- Contacts Swagger docs: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
- Project 2 API on Render: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>

## How To Use This Index

1. Open the official page for the week you are studying.
2. Read the page once for the big idea.
3. Open the matching workspace folder.
4. Match the course requirement to the file that proves it.
5. Run or test the route.
6. Add your own note to the book if something finally clicks.

The goal is not to memorize every page. The goal is to connect each course idea to working code.
