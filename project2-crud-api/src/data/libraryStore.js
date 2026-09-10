const { ObjectId } = require('mongodb');
const { MongoConnection } = require('../config/database');
const seedData = require('./seedData');

class MongoCollectionStore {
  constructor(connection, collectionName) {
    this.connection = connection;
    this.collectionName = collectionName;
  }

  async collection() {
    const database = await this.connection.connect();
    return database.collection(this.collectionName);
  }

  async findAll() {
    const collection = await this.collection();
    return collection.find({}).toArray();
  }

  async findById(id) {
    const collection = await this.collection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async create(document) {
    const collection = await this.collection();
    const result = await collection.insertOne(document);
    return { ...document, _id: result.insertedId };
  }

  async update(id, document) {
    const collection = await this.collection();
    const result = await collection.replaceOne({ _id: new ObjectId(id) }, document);
    return result.matchedCount;
  }

  async remove(id) {
    const collection = await this.collection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
}

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
  if (process.env.USE_MEMORY_STORE === 'true' || !process.env.MONGODB_URI) {
    console.warn('Using memory store. Add MONGODB_URI before submitting to Canvas.');
    return new LibraryStore({
      books: new MemoryCollectionStore(seedData.books),
      authors: new MemoryCollectionStore(seedData.authors),
    });
  }

  const connection = new MongoConnection();
  return new LibraryStore({
    books: new MongoCollectionStore(connection, 'books'),
    authors: new MongoCollectionStore(connection, 'authors'),
    connection,
  });
}

module.exports = { createLibraryStore };
