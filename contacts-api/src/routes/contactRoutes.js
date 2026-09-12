const express = require('express');
const controller = require('../controllers/contactController');
const { contactRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();

// W01 Part 1 requirement:
// GET /contacts returns every contact in the MongoDB contacts collection.
router.get('/', controller.getAllContacts);

// W01 Part 1 requirement:
// GET /contacts/:id returns one contact by its MongoDB ObjectId.
router.get('/:id', idRule, sendValidationErrors, controller.getContactById);

// W02 Part 2 requirement:
// POST /contacts creates a contact after all five required fields pass checks.
router.post('/', contactRules, sendValidationErrors, controller.createContact);

// W02 Part 2 requirement:
// PUT /contacts/:id replaces an existing contact with the five required fields.
router.put('/:id', idRule, contactRules, sendValidationErrors, controller.updateContact);

// W02 Part 2 requirement:
// DELETE /contacts/:id removes one contact from the collection.
router.delete('/:id', idRule, sendValidationErrors, controller.deleteContact);

module.exports = router;
