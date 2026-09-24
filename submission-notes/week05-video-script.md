# Week 05 Video Script: Final Project Part 1

Target length: 5-8 minutes.

## Links To Show

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Final Project API on Render: <https://cse341-final-project-api.onrender.com>
- Final Project Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>

## Recording Steps

1. Open the GitHub repository.
2. Show the `final-project-api` folder.
3. Show the two collection route files:
   - `src/routes/eventRoutes.js`
   - `src/routes/volunteerRoutes.js`
4. Show the validation file:
   - `src/middleware/validate.js`
5. Open the deployed Swagger docs.
6. Run `GET /events`.
7. Run `POST /events`.
8. Run `PUT /events/:id`.
9. Run `DELETE /events/:id`.
10. Run `GET /volunteers`.
11. Run `POST /volunteers`.
12. Show one validation error.
13. Show MongoDB with the `events` and `volunteers` collections.
14. Mention your two individual contributions.

## Script

Hello, this is my Week 05 Final Project Part 1 walkthrough.

For this week, I created the first two collections for the final project. The project is a campus events API. The two collections are `events` and `volunteers`.

I am starting in GitHub. The code is in the `final-project-api` folder. The route files are separated by collection. The events routes are in `src/routes/eventRoutes.js`, and the volunteers routes are in `src/routes/volunteerRoutes.js`.

Each collection has full CRUD routes. For events, the API has `GET /events`, `GET /events/:id`, `POST /events`, `PUT /events/:id`, and `DELETE /events/:id`. For volunteers, the API has the same CRUD pattern using `/volunteers`.

The validation rules are in `src/middleware/validate.js`. Events require fields like title, description, location, dates, category, capacity, public status, and organizer email. Volunteers require first name, last name, email, phone, role, availability, and status.

Now I am opening the deployed Swagger documentation on Render. The Swagger page is at `/api-docs`, so the endpoints can be tested directly from the browser.

First, I will run `GET /events`. This returns the event records from the events collection.

Next, I will run `POST /events` to create a new event. I am sending all required fields. The response returns a success message and a new id.

Now I will use that id with `PUT /events/:id` to update the event. The response is `204`, which means the update worked.

Now I will use `DELETE /events/:id` to delete that event. The response is also `204`, which means the delete worked.

Next, I will run `GET /volunteers`. This returns the volunteer records from the volunteers collection.

I will run `POST /volunteers` to create a volunteer. The response returns the new volunteer id.

Now I will show validation. I am sending an invalid event with missing text, bad dates, bad capacity, and an invalid email. The API returns `400 Validation failed`, with details about the fields that need to be fixed.

Finally, I am showing MongoDB. The database has the `events` and `volunteers` collections. This proves the deployed API is connected to the database.

My two individual contributions are: first, I created the `events` collection with CRUD routes, validation, and Swagger documentation. Second, I created the `volunteers` collection with CRUD routes, validation, and Swagger documentation.

This completes Week 05 Final Project Part 1 because the first two collections are implemented, documented, deployed, and testable through Swagger.
