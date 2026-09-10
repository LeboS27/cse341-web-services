const { ObjectId } = require('mongodb');

// MongoDB ids have a special format.
// This helper lets routes reject invalid ids before querying the database.
function isValidObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

module.exports = { isValidObjectId };
