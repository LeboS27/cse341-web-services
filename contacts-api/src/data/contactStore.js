const { ObjectId } = require('mongodb');
const { MongoConnection } = require('../config/database');
const seedContacts = require('./seedContacts.json');

// This store talks to the real MongoDB contacts collection.
class MongoContactStore {
  constructor(connection) {
    this.connection = connection;
  }

  async collection() {
    const database = await this.connection.connect();
    return database.collection(process.env.CONTACTS_COLLECTION || 'contacts');
  }

  async findAll() {
    const collection = await this.collection();
    return collection.find({}).sort({ lastName: 1, firstName: 1 }).toArray();
  }

  async findById(id) {
    const collection = await this.collection();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async create(contact) {
    const collection = await this.collection();
    const result = await collection.insertOne(contact);
    return { ...contact, _id: result.insertedId };
  }

  async update(id, contact) {
    const collection = await this.collection();
    const result = await collection.replaceOne({ _id: new ObjectId(id) }, contact);
    return result.matchedCount;
  }

  async remove(id) {
    const collection = await this.collection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }

  async close() {
    await this.connection.close();
  }
}

// This practice store runs without MongoDB.
// It helps you learn and demo routes locally before adding your real .env file.
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
  if (process.env.USE_MEMORY_STORE === 'true' || !process.env.MONGODB_URI) {
    console.warn('Using memory store. Add MONGODB_URI before submitting to Canvas.');
    return new MemoryContactStore();
  }

  return new MongoContactStore(new MongoConnection());
}

module.exports = {
  createContactStore,
  MemoryContactStore,
  MongoContactStore,
};
