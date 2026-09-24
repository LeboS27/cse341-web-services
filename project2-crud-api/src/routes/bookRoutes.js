const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { requireAuth } = require('../middleware/auth');
const { bookRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();

// These are the official fields for the books collection.
// The controller uses this list so extra request fields are not saved.
const bookFields = ['title', 'authorName', 'isbn', 'genre', 'publishedYear', 'pages', 'language', 'available', 'rating'];

const controller = makeCrudController({
  storeName: 'books',
  itemName: 'Book',
  allowedFields: bookFields,
});

// GET /books returns every book.
router.get('/', controller.getAll);

// GET /books/:id returns one book by MongoDB ObjectId.
router.get('/:id', idRule, sendValidationErrors, controller.getById);

// POST /books creates one book after login and validation.
router.post('/', requireAuth, bookRules, sendValidationErrors, controller.create);

// PUT /books/:id replaces one book after login, id validation, and body validation.
router.put('/:id', requireAuth, idRule, bookRules, sendValidationErrors, controller.update);

// DELETE /books/:id removes one book by id after login.
router.delete('/:id', requireAuth, idRule, sendValidationErrors, controller.remove);

module.exports = router;
