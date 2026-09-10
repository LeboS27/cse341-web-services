const { body, param, validationResult } = require('express-validator');
const { isValidObjectId } = require('../utils/objectId');

// These rules describe what a valid contact must look like.
// They protect the database from incomplete or badly shaped data.
const contactRules = [
  body('firstName').trim().notEmpty().withMessage('firstName is required.'),
  body('lastName').trim().notEmpty().withMessage('lastName is required.'),
  body('email').trim().isEmail().withMessage('email must be a valid email address.'),
  body('favoriteColor').trim().notEmpty().withMessage('favoriteColor is required.'),
  body('birthday')
    .trim()
    .isISO8601({ strict: true })
    .withMessage('birthday must be a real date in YYYY-MM-DD format.'),
];

const idRule = [
  param('id').custom((id) => {
    if (!isValidObjectId(id)) {
      throw new Error('id must be a valid MongoDB ObjectId.');
    }
    return true;
  }),
];

// sendValidationErrors turns validation problems into a clear 400 response.
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
  contactRules,
  idRule,
  sendValidationErrors,
};
