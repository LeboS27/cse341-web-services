const { body, param, validationResult } = require('express-validator');
const { isValidObjectId } = require('../utils/objectId');

const idRule = [
  param('id').custom((id) => {
    if (!isValidObjectId(id)) {
      throw new Error('id must be a valid MongoDB ObjectId.');
    }
    return true;
  }),
];

const eventRules = [
  body('title').trim().notEmpty().withMessage('title is required.'),
  body('description').trim().notEmpty().withMessage('description is required.'),
  body('location').trim().notEmpty().withMessage('location is required.'),
  body('startDate').isISO8601().withMessage('startDate must be a valid ISO date.'),
  body('endDate').isISO8601().withMessage('endDate must be a valid ISO date.'),
  body('category').trim().notEmpty().withMessage('category is required.'),
  body('capacity').isInt({ min: 1 }).withMessage('capacity must be a positive whole number.').toInt(),
  body('isPublic').isBoolean().withMessage('isPublic must be true or false.').toBoolean(),
  body('organizerEmail').trim().isEmail().withMessage('organizerEmail must be valid.').normalizeEmail(),
];

const volunteerRules = [
  body('firstName').trim().notEmpty().withMessage('firstName is required.'),
  body('lastName').trim().notEmpty().withMessage('lastName is required.'),
  body('email').trim().isEmail().withMessage('email must be valid.').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('phone is required.'),
  body('role').trim().notEmpty().withMessage('role is required.'),
  body('availability').trim().notEmpty().withMessage('availability is required.'),
  body('status')
    .isIn(['pending', 'active', 'inactive'])
    .withMessage('status must be pending, active, or inactive.'),
];

function sendValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    error: 'Validation failed',
    details: errors.array().map((item) => ({
      field: item.path || item.param,
      message: item.msg,
    })),
  });
}

module.exports = {
  eventRules,
  idRule,
  sendValidationErrors,
  volunteerRules,
};
