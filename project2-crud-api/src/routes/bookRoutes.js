const express = require('express');
const { makeCrudController } = require('../controllers/makeCrudController');
const { bookRules, idRule, sendValidationErrors } = require('../middleware/validate');

const router = express.Router();
const controller = makeCrudController({ storeName: 'books', itemName: 'Book' });

router.get('/', controller.getAll);
router.get('/:id', idRule, sendValidationErrors, controller.getById);
router.post('/', bookRules, sendValidationErrors, controller.create);
router.put('/:id', idRule, bookRules, sendValidationErrors, controller.update);
router.delete('/:id', idRule, sendValidationErrors, controller.remove);

module.exports = router;
