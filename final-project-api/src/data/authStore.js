const crypto = require('crypto');
const { ObjectId } = require('mongodb');

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

  async findUserByProvider(provider, providerId) {
    const users = await this.usersCollection();
    return users.findOne({
      oauthProvider: provider,
      oauthId: providerId.toString(),
    });
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

  async updateUser(id, updates) {
    const users = await this.usersCollection();
    const safeUpdates = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    delete safeUpdates._id;

    await users.updateOne({ _id: new ObjectId(id) }, { $set: safeUpdates });
    return this.findUserById(id);
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

class MemoryAuthStore {
  constructor() {
    this.users = [];
    this.sessions = [];
  }

  async findUserByProvider(provider, providerId) {
    return this.users.find((user) => (
      user.oauthProvider === provider && user.oauthId === providerId.toString()
    )) || null;
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

  async updateUser(id, updates) {
    const user = await this.findUserById(id);
    if (!user) {
      return null;
    }

    Object.assign(user, updates, {
      updatedAt: new Date().toISOString(),
    });
    return user;
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
