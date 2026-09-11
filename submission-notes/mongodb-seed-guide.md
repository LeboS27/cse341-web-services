# MongoDB Seed Guide

Use this guide when preparing the real MongoDB databases for Canvas submission videos.

## Contacts API Database

Database name:

```text
cse341_contacts
```

Collection name:

```text
contacts
```

Insert at least five documents:

```json
[
  {
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada.lovelace@example.com",
    "favoriteColor": "blue",
    "birthday": "1815-12-10"
  },
  {
    "firstName": "Grace",
    "lastName": "Hopper",
    "email": "grace.hopper@example.com",
    "favoriteColor": "navy",
    "birthday": "1906-12-09"
  },
  {
    "firstName": "Katherine",
    "lastName": "Johnson",
    "email": "katherine.johnson@example.com",
    "favoriteColor": "green",
    "birthday": "1918-08-26"
  },
  {
    "firstName": "Margaret",
    "lastName": "Hamilton",
    "email": "margaret.hamilton@example.com",
    "favoriteColor": "black",
    "birthday": "1936-08-17"
  },
  {
    "firstName": "Dorothy",
    "lastName": "Vaughan",
    "email": "dorothy.vaughan@example.com",
    "favoriteColor": "purple",
    "birthday": "1910-09-20"
  }
]
```

## Project 2 Database

Database name:

```text
cse341_library
```

Collections:

```text
books
authors
```

Books:

```json
[
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
  },
  {
    "title": "Eloquent JavaScript",
    "authorName": "Marijn Haverbeke",
    "isbn": "9781593279509",
    "genre": "Programming",
    "publishedYear": 2018,
    "pages": 472,
    "language": "English",
    "available": true,
    "rating": 4.5
  },
  {
    "title": "Designing Data-Intensive Applications",
    "authorName": "Martin Kleppmann",
    "isbn": "9781449373320",
    "genre": "Distributed Systems",
    "publishedYear": 2017,
    "pages": 616,
    "language": "English",
    "available": false,
    "rating": 4.8
  }
]
```

Authors:

```json
[
  {
    "name": "Robert C. Martin",
    "country": "United States",
    "birthYear": 1952,
    "primaryGenre": "Software Engineering",
    "website": "https://cleancoder.com"
  },
  {
    "name": "Marijn Haverbeke",
    "country": "Netherlands",
    "birthYear": 1980,
    "primaryGenre": "Programming",
    "website": "https://marijnhaverbeke.nl"
  },
  {
    "name": "Martin Kleppmann",
    "country": "United Kingdom",
    "birthYear": 1984,
    "primaryGenre": "Distributed Systems",
    "website": "https://martin.kleppmann.com"
  }
]
```

## What To Show In The Video

- The database name.
- The collection names.
- The fields on each document.
- POST creating a document.
- PUT changing a document.
- DELETE removing a document.
