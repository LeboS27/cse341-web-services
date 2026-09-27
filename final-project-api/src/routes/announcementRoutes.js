const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { requireAuth } = require('../middleware/auth');
const { announcementRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();

const announcementFields = [
  'title',
  'message',
  'audience',
  'publishDate',
  'expiresAt',
  'isPinned',
  'authorEmail',
];

const controller = makeCrudController({
  storeName: 'announcements',
  itemName: 'Announcement',
  allowedFields: announcementFields,
});

router.get('/', controller.getAll);
router.get('/:id', idRule, sendValidationErrors, controller.getById);
router.post('/', requireAuth, announcementRules, sendValidationErrors, controller.create);
router.put('/:id', requireAuth, idRule, announcementRules, sendValidationErrors, controller.update);
router.delete('/:id', requireAuth, idRule, sendValidationErrors, controller.remove);

module.exports = router;
