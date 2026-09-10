# Week 01 Individual Activity: Develop An API

This folder contains the official starter frontend from the course and a backend server that completes the activity.

## What The Frontend Expects

The file `frontend/script.js` calls:

```text
http://localhost:8080/professional
```

The backend returns JSON with the exact fields the frontend uses:

- `professionalName`
- `base64Image`
- `nameLink`
- `primaryDescription`
- `workDescription1`
- `workDescription2`
- `linkTitleText`
- `linkedInLink`
- `githubLink`

## How To Run

```powershell
npm start
```

Then open:

```text
frontend/index.html
```

The page should load data from the API.

## What This Teaches

This activity teaches the simplest API flow:

1. The browser opens the frontend.
2. JavaScript in the frontend calls `fetch`.
3. Express receives the request.
4. Express sends JSON back.
5. The frontend places the JSON values into the HTML.
