const { ObjectId } = require('mongodb');

// MongoDB ids have a special format.
// This helper lets routes reject invalid ids before querying the database.
// That gives the user a clear 400 response instead of a confusing server error.
function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

module.exports = { isValidObjectId };
