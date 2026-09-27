const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { requireAuth } = require('../middleware/auth');
const { idRule, registrationRules, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();

const registrationFields = [
  'eventTitle',
  'attendeeName',
  'attendeeEmail',
  'ticketType',
  'checkedIn',
  'registeredAt',
];

const controller = makeCrudController({
  storeName: 'registrations',
  itemName: 'Registration',
  allowedFields: registrationFields,
});

router.get('/', controller.getAll);
router.get('/:id', idRule, sendValidationErrors, controller.getById);
router.post('/', requireAuth, registrationRules, sendValidationErrors, controller.create);
router.put('/:id', requireAuth, idRule, registrationRules, sendValidationErrors, controller.update);
router.delete('/:id', requireAuth, idRule, sendValidationErrors, controller.remove);

module.exports = router;
