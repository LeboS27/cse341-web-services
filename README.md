# CSE 341 Web Services Workspace

This workspace contains the projects and learning notes for CSE 341 Web Services.

## Projects

- `w01-individual-activity`: Week 01 Individual Activity backend for the provided frontend.
- `contacts-api`: Weeks 01-02 Contacts API.
- `project2-crud-api`: Week 03 Project 2 CRUD API.
- `book`: course book and long-form explanations.
- `submission-notes`: checklists and video scripts for Canvas submissions.
- `diagrams`: reusable diagrams for the book and project explanations.

## High-Value Submission Notes

- [Week 01 video script](submission-notes/week01-video-script.md)
- [Week 02 video script](submission-notes/week02-video-script.md)
- [Week 03 video script](submission-notes/week03-video-script.md)
- [MongoDB seed guide](submission-notes/mongodb-seed-guide.md)
- [Route reference](submission-notes/route-reference.md)

## Submitted Project Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Contacts API on Render: <https://cse341-contacts-api-y3jc.onrender.com>
- Contacts Swagger docs: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
- Project 2 API on Render: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>

## Tool Status

Installed and checked:

- Git
- Node.js
- npm
- Visual Studio Code
- GitHub CLI was installed, but the current terminal may need to be reopened before `gh` appears on PATH.
- MongoDB Shell was installed, but the current terminal may need to be reopened before `mongosh` appears on PATH.

Not installed:

- Render CLI. Render deployment can be completed from the Render website, which is also what the course setup material uses.

## Important Secret Rule

Never commit `.env`.

MongoDB connection strings contain usernames and passwords. Each project has an `.env.example` file that shows the shape of the settings without exposing real credentials.

## Local Practice Mode

Both APIs support `USE_MEMORY_STORE=true`. This lets the routes run without MongoDB so you can learn, test, and record practice walkthroughs.

For final Canvas submissions, use real MongoDB. The rubrics expect the video to show database data and updates.

## Local Ports

- Week 01 Individual Activity: `http://localhost:8080/professional`
- Contacts API: `http://localhost:8080/contacts`
- Project 2 CRUD API: `http://localhost:8081/books` and `http://localhost:8081/authors`

Run only one project on port 8080 at a time. The Week 01 Individual Activity and Contacts API both default to 8080 because their course instructions expect that port.

## Run All Local Checks

From the workspace root:

```powershell
.\check-all.ps1
```

This checks:

- Week 01 Individual Activity boot.
- Contacts API boot and route tests.
- Project 2 API boot and route tests.

## Suggested GitHub Setup

After reopening PowerShell so `gh` is on PATH:

```powershell
gh auth login
gh repo create cse341-web-services --private --source . --remote origin --push
```

You may also create the repository manually on GitHub, then run:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/cse341-web-services.git
git add .
git commit -m "Build CSE 341 week 1 through 3 APIs"
git push -u origin main
```

Canvas graders need access to the repository. Make it public or add the grader if your instructor requires a private repo.
