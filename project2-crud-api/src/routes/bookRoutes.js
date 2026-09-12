const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { bookRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();
const controller = makeCrudController({ storeName: 'books', itemName: 'Book' });

// GET /books returns every book.
router.get('/', controller.getAll);

// GET /books/:id returns one book by MongoDB ObjectId.
router.get('/:id', idRule, sendValidationErrors, controller.getById);

// POST /books creates one book after the nine required fields are validated.
router.post('/', bookRules, sendValidationErrors, controller.create);

// PUT /books/:id replaces one book after the id and body are validated.
router.put('/:id', idRule, bookRules, sendValidationErrors, controller.update);

// DELETE /books/:id removes one book by id.
router.delete('/:id', idRule, sendValidationErrors, controller.remove);

module.exports = router;
