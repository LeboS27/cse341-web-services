const crypto = require('crypto');
const { ObjectId } = require('mongodb');

// MongoAuthStore keeps users and login sessions in MongoDB.
// Passwords are already hashed before they reach this store.
class MongoAuthStore {
  constructor(connection, { usersCollectionName, sessionsCollectionName }) {
    this.connection = connection;
    this.usersCollectionName = usersCollectionName;
    this.sessionsCollectionName = sessionsCollectionName;
  }

  async usersCollection() {
    const database = await this.connection.connect();
    return database.collection(this.usersCollectionName);
  }

  async sessionsCollection() {
    const database = await this.connection.connect();
    return database.collection(this.sessionsCollectionName);
  }

  async findUserByEmail(email) {
    const users = await this.usersCollection();
    return users.findOne({ email: email.toLowerCase() });
  }

  async findUserById(id) {
    const users = await this.usersCollection();
    return users.findOne({ _id: new ObjectId(id) });
  }

  async createUser(user) {
    const users = await this.usersCollection();
    const savedUser = {
      ...user,
      email: user.email.toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    const result = await users.insertOne(savedUser);
    return { ...savedUser, _id: result.insertedId };
  }

  async createSession(userId) {
    const sessions = await this.sessionsCollection();
    const session = {
      token: crypto.randomBytes(32).toString('hex'),
      userId: new ObjectId(userId),
      createdAt: new Date().toISOString(),
    };
    await sessions.insertOne(session);
    return session;
  }

  async findSession(token) {
    const sessions = await this.sessionsCollection();
    const session = await sessions.findOne({ token });
    if (!session) {
      return null;
    }

    const user = await this.findUserById(session.userId);
    if (!user) {
      return null;
    }

    return { session, user };
  }

  async deleteSession(token) {
    const sessions = await this.sessionsCollection();
    const result = await sessions.deleteOne({ token });
    return result.deletedCount;
  }
}

// MemoryAuthStore gives tests the same auth behavior without touching MongoDB.
class MemoryAuthStore {
  constructor() {
    this.users = [];
    this.sessions = [];
  }

  async findUserByEmail(email) {
    return this.users.find((user) => user.email === email.toLowerCase()) || null;
  }

  async findUserById(id) {
    return this.users.find((user) => user._id.toString() === id.toString()) || null;
  }

  async createUser(user) {
    const savedUser = {
      ...user,
      _id: new ObjectId(),
      email: user.email.toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    this.users.push(savedUser);
    return savedUser;
  }

  async createSession(userId) {
    const session = {
      token: crypto.randomBytes(32).toString('hex'),
      userId: userId.toString(),
      createdAt: new Date().toISOString(),
    };
    this.sessions.push(session);
    return session;
  }

  async findSession(token) {
    const session = this.sessions.find((item) => item.token === token);
    if (!session) {
      return null;
    }

    const user = await this.findUserById(session.userId);
    if (!user) {
      return null;
    }

    return { session, user };
  }

  async deleteSession(token) {
    const before = this.sessions.length;
    this.sessions = this.sessions.filter((session) => session.token !== token);
    return before - this.sessions.length;
  }
}

module.exports = {
  MemoryAuthStore,
  MongoAuthStore,
};
