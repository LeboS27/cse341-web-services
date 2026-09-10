const express = require('express');
const controller = require('../controllers/contactController');
const { contactRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();

// GET /contacts returns every contact in the collection.
router.get('/', controller.getAllContacts);

// GET /contacts/:id returns one contact by MongoDB id.
router.get('/:id', idRule, sendValidationErrors, controller.getContactById);

// POST /contacts creates a new contact.
router.post('/', contactRules, sendValidationErrors, controller.createContact);

// PUT /contacts/:id replaces an existing contact with new field values.
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);

// DELETE /contacts/:id removes one contact from the collection.
router.delete('/:id', idRule, sendValidationErrors, controller.deleteContact);

module.exports = router;
