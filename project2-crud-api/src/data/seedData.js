const books = [
  {
    title: 'Clean Code',
    authorName: 'Robert C. Martin',
    isbn: '9780132350884',
    genre: 'Software Engineering',
    publishedYear: 2008,
    pages: 464,
    language: 'English',
    available: true,
    rating: 4.7
  },
  {
    title: 'Eloquent JavaScript',
    authorName: 'Marijn Haverbeke',
    isbn: '9781593279509',
    genre: 'Programming',
    publishedYear: 2018,
    pages: 472,
    language: 'English',
    available: true,
    rating: 4.5
  },
  {
    title: 'Designing Data-Intensive Applications',
    authorName: 'Martin Kleppmann',
    isbn: '9781449373320',
    genre: 'Distributed Systems',
    publishedYear: 2017,
    pages: 616,
    language: 'English',
    available: false,
    rating: 4.8
  }
];

const authors = [
  {
    name: 'Robert C. Martin',
    country: 'United States',
    birthYear: 1952,
    primaryGenre: 'Software Engineering',
    website: 'https://cleancoder.com'
  },
  {
    name: 'Marijn Haverbeke',
    country: 'Netherlands',
    birthYear: 1980,
    primaryGenre: 'Programming',
    website: 'https://marijnhaverbeke.nl'
  },
  {
    name: 'Martin Kleppmann',
    country: 'United Kingdom',
    birthYear: 1984,
    primaryGenre: 'Distributed Systems',
    website: 'https://martin.kleppmann.com'
  }
];

module.exports = { books, authors };
