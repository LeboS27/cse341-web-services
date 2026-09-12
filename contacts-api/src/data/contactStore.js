const { ObjectId } = require('mongodb');
const { MongoConnection } = require('../config/database');
const seedContacts = require('./seedContacts.json');

// This store talks to the real MongoDB contacts collection.
// Render uses this store because Render has MONGODB_URI in its environment.
class MongoContactStore {
  constructor(connection) {
    this.connection = connection;
  }

  // Every database operation starts by getting the same MongoDB collection.
  // The MongoConnection class caches the connection after the first call.
  async collection() {
    const database = await this.connection.connect();
    return database.collection(process.env.CONTACTS_COLLECTION || 'contacts');
  }

  async findAll() {
    const collection = await this.collection();

    // Sorting makes the GET all response stable and easier to demonstrate.
    return collection.find({}).sort({ lastName: 1, firstName: 1 }).toArray();
  }

  async findById(id) {
    const collection = await this.collection();

    // MongoDB stores ids as ObjectId values, not plain strings.
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async create(contact) {
    const collection = await this.collection();
    const result = await collection.insertOne(contact);

    // MongoDB returns the new id separately, so we add it back for the response.
    return { ...contact, _id: result.insertedId };
  }

  async update(id, contact) {
    const collection = await this.collection();

    // replaceOne keeps the document aligned with the five required fields.
    const result = await collection.replaceOne({ _id: new ObjectId(id) }, contact);
    return result.matchedCount;
  }

  async remove(id) {
    const collection = await this.collection();

    // deleteOne returns how many documents were deleted. The controller uses
    // that number to decide between 204 success and 404 not found.
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }

  async close() {
    await this.connection.close();
  }
}

// This practice store runs without MongoDB.
// It helps you learn and demo routes locally before adding your real .env file.
// Tests also use this store so automated checks do not change the real database.
class MemoryContactStore {
  constructor() {
    this.contacts = seedContacts.map((contact) => ({
      ...contact,
      _id: new ObjectId(),
    }));
  }

  async findAll() {
    return [...this.contacts].sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  async findById(id) {
    return this.contacts.find((contact) => contact._id.toString() === id) || null;
  }

  async create(contact) {
    const newContact = { ...contact, _id: new ObjectId() };
    this.contacts.push(newContact);
    return newContact;
  }

  async update(id, contact) {
    const index = this.contacts.findIndex((item) => item._id.toString() === id);

    // Returning 0 matches MongoDB's "nothing was found" behavior.
    if (index === -1) {
      return 0;
    }
    this.contacts[index] = { ...contact, _id: this.contacts[index]._id };
    return 1;
  }

  async remove(id) {
    const before = this.contacts.length;
    this.contacts = this.contacts.filter((contact) => contact._id.toString() !== id);
    return before - this.contacts.length;
  }

  async close() {
    // Nothing needs to close when data is stored in memory.
  }
}

async function createContactStore() {
  // Local practice can run without a database. Render should not use memory
  // mode because the rubric expects real MongoDB data.
  if (process.env.USE_MEMORY_STORE === 'true' || !process.env.MONGODB_URI) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('Using memory store. Add MONGODB_URI before submitting to Canvas.');
    }
    return new MemoryContactStore();
  }

  return new MongoContactStore(new MongoConnection());
}

module.exports = {
  createContactStore,
  MemoryContactStore,
  MongoContactStore,
};
