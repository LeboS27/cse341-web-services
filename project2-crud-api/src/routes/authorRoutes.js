const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { authorRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();
const controller = makeCrudController({ storeName: 'authors', itemName: 'Author' });

router.get('/', controller.getAll);
router.get('/:id', idRule, sendValidationErrors, controller.getById);
router.post('/', authorRules, sendValidationErrors, controller.create);
router.put('/:id', idRule, authorRules, sendValidationErrors, controller.update);
router.delete('/:id', idRule, sendValidationErrors, controller.remove);

module.exports = router;
