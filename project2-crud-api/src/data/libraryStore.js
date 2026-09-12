const { ObjectId } = require('mongodb');
const { MongoConnection } = require('../config/database');
const seedData = require('./seedData');

// MongoCollectionStore talks to one real MongoDB collection.
// We can reuse it for books and authors by passing a different collection name.
class MongoCollectionStore {
  constructor(connection, collectionName) {
    this.connection = connection;
    this.collectionName = collectionName;
  }

  // Get the collection from the shared MongoDB connection.
  async collection() {
    const database = await this.connection.connect();
    return database.collection(this.collectionName);
  }

  async findAll() {
    const collection = await this.collection();

    // Find every document in this collection.
    return collection.find({}).toArray();
  }

  async findById(id) {
    const collection = await this.collection();

    // MongoDB stores ids as ObjectId values, so convert the URL string first.
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async create(document) {
    const collection = await this.collection();
    const result = await collection.insertOne(document);

    // MongoDB returns the new id separately. Add it back for the API response.
    return { ...document, _id: result.insertedId };
  }

  async update(id, document) {
    const collection = await this.collection();

    // replaceOne keeps PUT behavior simple: the sent document becomes the saved document.
    const result = await collection.replaceOne({ _id: new ObjectId(id) }, document);
    return result.matchedCount;
  }

  async remove(id) {
    const collection = await this.collection();

    // The deleted count tells the controller whether to return 204 or 404.
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
}

// MemoryCollectionStore gives the API predictable data for tests and local practice.
// It has the same method names as MongoCollectionStore, so controllers do not
// need to know which kind of store they are using.
class MemoryCollectionStore {
  constructor(items) {
    this.items = items.map((item) => ({ ...item, _id: new ObjectId() }));
  }

  async findAll() {
    return this.items;
  }

  async findById(id) {
    return this.items.find((item) => item._id.toString() === id) || null;
  }

  async create(document) {
    const created = { ...document, _id: new ObjectId() };
    this.items.push(created);
    return created;
  }

  async update(id, document) {
    const index = this.items.findIndex((item) => item._id.toString() === id);

    // Returning 0 matches MongoDB's "no matching document" behavior.
    if (index === -1) {
      return 0;
    }
    this.items[index] = { ...document, _id: this.items[index]._id };
    return 1;
  }

  async remove(id) {
    const before = this.items.length;
    this.items = this.items.filter((item) => item._id.toString() !== id);
    return before - this.items.length;
  }
}

class LibraryStore {
  constructor({ books, authors, connection }) {
    // The app exposes these as req.app.locals.store.books and
    // req.app.locals.store.authors.
    this.books = books;
    this.authors = authors;
    this.connection = connection;
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

async function createLibraryStore() {
  // Memory mode is for tests and local practice. Render should use MongoDB
  // because the assignment expects the deployed API to update the database.
  if (process.env.USE_MEMORY_STORE === 'true' || !process.env.MONGODB_URI) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('Using memory store. Add MONGODB_URI before submitting to Canvas.');
    }
    return new LibraryStore({
      books: new MemoryCollectionStore(seedData.books),
      authors: new MemoryCollectionStore(seedData.authors),
    });
  }

  const connection = new MongoConnection();
  return new LibraryStore({
    books: new MongoCollectionStore(connection, process.env.BOOKS_COLLECTION || 'books'),
    authors: new MongoCollectionStore(connection, process.env.AUTHORS_COLLECTION || 'authors'),
    connection,
  });
}

module.exports = { createLibraryStore };
