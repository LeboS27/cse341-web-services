const { ObjectId } = require('mongodb');
const { MongoConnection } = require('../config/database');
const { MemoryAuthStore, MongoAuthStore } = require('./authStore');
const seedData = require('./seedData');

// MongoCollectionStore talks to one real MongoDB collection.
// The same class is reused for every final-project collection.
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

// MemoryCollectionStore is used for tests and local practice.
// It matches the Mongo store methods so the controllers do not need special logic.
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

class FinalProjectStore {
  constructor({ announcements, auth, events, registrations, volunteers, connection }) {
    this.announcements = announcements;
    this.auth = auth;
    this.events = events;
    this.registrations = registrations;
    this.volunteers = volunteers;
    this.connection = connection;
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

async function createFinalProjectStore() {
  if (process.env.USE_MEMORY_STORE === 'true' || !process.env.MONGODB_URI) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('Using memory store. Add MONGODB_URI before submitting to Canvas.');
    }

    return new FinalProjectStore({
      announcements: new MemoryCollectionStore(seedData.announcements),
      auth: new MemoryAuthStore(),
      events: new MemoryCollectionStore(seedData.events),
      registrations: new MemoryCollectionStore(seedData.registrations),
      volunteers: new MemoryCollectionStore(seedData.volunteers),
    });
  }

  const connection = new MongoConnection();
  return new FinalProjectStore({
    announcements: new MongoCollectionStore(connection, process.env.ANNOUNCEMENTS_COLLECTION || 'announcements'),
    auth: new MongoAuthStore(connection, {
      usersCollectionName: process.env.USERS_COLLECTION || 'users',
      sessionsCollectionName: process.env.SESSIONS_COLLECTION || 'sessions',
    }),
    events: new MongoCollectionStore(connection, process.env.EVENTS_COLLECTION || 'events'),
    registrations: new MongoCollectionStore(connection, process.env.REGISTRATIONS_COLLECTION || 'registrations'),
    volunteers: new MongoCollectionStore(connection, process.env.VOLUNTEERS_COLLECTION || 'volunteers'),
    connection,
  });
}

module.exports = { createFinalProjectStore };
