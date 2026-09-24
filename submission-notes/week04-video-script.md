# Week 04 Video Script: Project 2 Authentication

Target length: 5-8 minutes.

## Links To Show

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Project 2 API on Render: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>

## Recording Steps

1. Open the GitHub repository.
2. Show `project2-crud-api`.
3. Show the auth files:
   - `src/routes/authRoutes.js`
   - `src/controllers/authController.js`
   - `src/middleware/auth.js`
4. Open the Render Swagger link.
5. Run a public `GET /books`.
6. Try a protected write route without logging in and show the `401`.
7. Run `POST /auth/register` or `POST /auth/login`.
8. Copy the token.
9. Click Swagger **Authorize** and paste the token.
10. Run a protected route such as `POST /books`.
11. Show MongoDB or the Swagger response proving the database changed.
12. Run `GET /auth/me`.
13. Run `POST /auth/logout`.
14. Try `GET /auth/me` again and show the token no longer works.

## Script

Hello, this is my Week 04 Project 2 authentication walkthrough.

First, I am showing my GitHub repository. The Project 2 code is in the `project2-crud-api` folder. This project already had two collections, `books` and `authors`, with full CRUD routes from Week 03.

For Week 04, I added authentication. The main auth routes are in `src/routes/authRoutes.js`. There are routes to register, log in, view the current logged-in user, and log out.

The authentication controller is in `src/controllers/authController.js`. When a user registers, the password is hashed with bcrypt before it is saved. That means the original password is not stored in the database.

The protected route middleware is in `src/middleware/auth.js`. This file checks for an Authorization header with a bearer token. If the token is missing or invalid, the API returns a `401 Authentication required` response.

Now I am opening the deployed Swagger documentation on Render. This proves the project is published and not just running on my local machine.

I will first run `GET /books`. This route is public, so it works without logging in. Users can view the data without needing an account.

Now I will try a protected write route without logging in. I am using `POST /books`. The API rejects the request with `401 Authentication required`. This shows the route is protected.

Next, I will register a user. I am using `POST /auth/register` with a name, email, and password. The response gives me a token. I will copy the token.

Now I click Authorize in Swagger and paste the token. This tells Swagger to send the token with protected requests.

I will run `POST /books` again. This time it succeeds because I am logged in. The API returns a success response and the new book id.

I can also run `GET /auth/me` to prove the token belongs to the logged-in user. The response shows my user profile, but it does not show the password hash.

Finally, I will log out by running `POST /auth/logout`. After logout, the token is removed from the session list. If I try `GET /auth/me` again with the same token, the API rejects it.

This completes the Week 04 requirements: the app has account creation, login, logout, protected routes, Swagger documentation, and sensitive credentials stay out of GitHub.
