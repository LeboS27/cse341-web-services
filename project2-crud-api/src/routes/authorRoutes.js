const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { authorRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();
const controller = makeCrudController({ storeName: 'authors', itemName: 'Author' });

// GET /authors returns every author.
router.get('/', controller.getAll);

// GET /authors/:id returns one author by MongoDB ObjectId.
router.get('/:id', idRule, sendValidationErrors, controller.getById);

// POST /authors creates one author after required fields are validated.
router.post('/', authorRules, sendValidationErrors, controller.create);

// PUT /authors/:id replaces one author after the id and body are validated.
router.put('/:id', idRule, authorRules, sendValidationErrors, controller.update);

// DELETE /authors/:id removes one author by id.
router.delete('/:id', idRule, sendValidationErrors, controller.remove);

module.exports = router;
