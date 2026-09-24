const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { eventRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();

const eventFields = [
  'title',
  'description',
  'location',
  'startDate',
  'endDate',
  'category',
  'capacity',
  'isPublic',
  'organizerEmail',
];

const controller = makeCrudController({
  storeName: 'events',
  itemName: 'Event',
  allowedFields: eventFields,
});

// GET /events returns every event.
router.get('/', controller.getAll);

// GET /events/:id returns one event by MongoDB ObjectId.
router.get('/:id', idRule, sendValidationErrors, controller.getById);

// POST /events creates one event after every required field is validated.
router.post('/', eventRules, sendValidationErrors, controller.create);

// PUT /events/:id replaces one event after the id and body are validated.
router.put('/:id', idRule, eventRules, sendValidationErrors, controller.update);

// DELETE /events/:id removes one event by id.
router.delete('/:id', idRule, sendValidationErrors, controller.remove);

module.exports = router;
