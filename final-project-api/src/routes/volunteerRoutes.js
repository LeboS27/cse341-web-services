const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { requireAuth } = require('../middleware/auth');
const { idRule, sendValidationErrors, volunteerRules } = require('../middleware/validate');

const router = express.Router();

const volunteerFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'role',
  'availability',
  'status',
];

const controller = makeCrudController({
  storeName: 'volunteers',
  itemName: 'Volunteer',
  allowedFields: volunteerFields,
});

// GET /volunteers returns every volunteer.
router.get('/', controller.getAll);

// GET /volunteers/:id returns one volunteer by MongoDB ObjectId.
router.get('/:id', idRule, sendValidationErrors, controller.getById);

// POST /volunteers creates one volunteer after required fields are validated.
router.post('/', requireAuth, volunteerRules, sendValidationErrors, controller.create);

// PUT /volunteers/:id replaces one volunteer after the id and body are validated.
router.put('/:id', requireAuth, idRule, volunteerRules, sendValidationErrors, controller.update);

// DELETE /volunteers/:id removes one volunteer by id.
router.delete('/:id', requireAuth, idRule, sendValidationErrors, controller.remove);

module.exports = router;
